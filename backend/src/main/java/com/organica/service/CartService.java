package com.organica.service;

import com.organica.dto.CartDtos.*;
import com.organica.entity.Cart;
import com.organica.entity.CartItem;
import com.organica.entity.Product;
import com.organica.entity.User;
import com.organica.exception.BadRequestException;
import com.organica.exception.ResourceNotFoundException;
import com.organica.repository.CartRepository;
import com.organica.repository.ProductRepository;
import com.organica.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Service
public class CartService {

    public static final BigDecimal FREE_SHIPPING_THRESHOLD = new BigDecimal("299.00");
    public static final BigDecimal STANDARD_SHIPPING_FEE = new BigDecimal("35.00");
    public static final BigDecimal HANDLING_FEE = new BigDecimal("9.00");
    public static final BigDecimal MIN_ORDER_AMOUNT = new BigDecimal("99.00");
    public static final BigDecimal TAX_RATE = new BigDecimal("0.05"); // 5% GST

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(
            CartRepository cartRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartDto getCartForUser(String email) {
        Cart cart = getOrCreateCart(email);
        return toCartDto(cart);
    }

    @Transactional
    public CartDto addToCart(String email, AddToCartRequest request) {
        Cart cart = getOrCreateCart(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found."));

        if (product.getStockQuantity() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock for " + product.getName());
        }

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existing.isPresent()) {
            CartItem item = existing.get();
            int updatedQty = Math.min(product.getStockQuantity(), item.getQuantity() + request.getQuantity());
            item.setQuantity(updatedQty);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            cart.getItems().add(newItem);
        }

        Cart saved = cartRepository.save(cart);
        return toCartDto(saved);
    }

    @Transactional
    public CartDto updateItemQuantity(String email, Long productId, UpdateCartItemRequest request) {
        Cart cart = getOrCreateCart(email);

        if (request.getQuantity() <= 0) {
            cart.getItems().removeIf(i -> i.getProduct().getId().equals(productId));
        } else {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found."));
            cart.getItems().stream()
                    .filter(i -> i.getProduct().getId().equals(productId))
                    .findFirst()
                    .ifPresent(item -> item.setQuantity(Math.min(request.getQuantity(), product.getStockQuantity())));
        }

        Cart saved = cartRepository.save(cart);
        return toCartDto(saved);
    }

    @Transactional
    public CartDto removeItem(String email, Long productId) {
        Cart cart = getOrCreateCart(email);
        cart.getItems().removeIf(i -> i.getProduct().getId().equals(productId));
        Cart saved = cartRepository.save(cart);
        return toCartDto(saved);
    }

    @Transactional
    public CartDto clearCart(String email) {
        Cart cart = getOrCreateCart(email);
        cart.getItems().clear();
        Cart saved = cartRepository.save(cart);
        return toCartDto(saved);
    }

    private Cart getOrCreateCart(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setUser(user);
                    return cartRepository.save(c);
                });
    }

    private CartDto toCartDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUser().getId());

        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal mrpTotal = BigDecimal.ZERO;
        int itemCount = 0;

        for (CartItem item : cart.getItems()) {
            Product p = item.getProduct();
            BigDecimal lineTotal = p.getPrice()
                    .multiply(BigDecimal.valueOf(item.getQuantity()))
                    .setScale(2, RoundingMode.HALF_UP);
            BigDecimal mrpUnit = (p.getOriginalPrice() != null && p.getOriginalPrice().compareTo(p.getPrice()) > 0)
                    ? p.getOriginalPrice()
                    : p.getPrice();
            BigDecimal lineMrp = mrpUnit
                    .multiply(BigDecimal.valueOf(item.getQuantity()))
                    .setScale(2, RoundingMode.HALF_UP);

            subtotal = subtotal.add(lineTotal);
            mrpTotal = mrpTotal.add(lineMrp);
            itemCount += item.getQuantity();

            CartItemDto itemDto = new CartItemDto();
            itemDto.setId(item.getId());
            itemDto.setProductId(p.getId());
            itemDto.setProductName(p.getName());
            itemDto.setProductSku(p.getSku());
            itemDto.setProductSlug(p.getSlug());
            itemDto.setBrand(p.getBrand());
            itemDto.setUnitSize(p.getUnitSize());
            itemDto.setImageUrl(p.getImageUrl());
            itemDto.setUnitPrice(p.getPrice());
            itemDto.setOriginalPrice(mrpUnit);
            itemDto.setQuantity(item.getQuantity());
            itemDto.setAvailableStock(p.getStockQuantity());
            itemDto.setLineTotal(lineTotal);
            itemDto.setLineSavings(lineMrp.subtract(lineTotal).max(BigDecimal.ZERO));
            dto.getItems().add(itemDto);
        }

        BigDecimal shipping = (subtotal.compareTo(BigDecimal.ZERO) == 0
                || subtotal.compareTo(FREE_SHIPPING_THRESHOLD) >= 0)
                ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP)
                : STANDARD_SHIPPING_FEE;

        BigDecimal handling = subtotal.compareTo(BigDecimal.ZERO) == 0
                ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP)
                : HANDLING_FEE;

        BigDecimal tax = subtotal.multiply(TAX_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(shipping).add(handling).add(tax).setScale(2, RoundingMode.HALF_UP);

        dto.setItemCount(itemCount);
        dto.setMrpTotal(mrpTotal);
        dto.setSubtotal(subtotal.setScale(2, RoundingMode.HALF_UP));
        dto.setProductSavings(mrpTotal.subtract(subtotal).max(BigDecimal.ZERO));
        dto.setHandlingFee(handling);
        dto.setEstimatedShipping(shipping);
        dto.setEstimatedTax(tax);
        dto.setEstimatedTotal(total);
        dto.setFreeShippingThreshold(FREE_SHIPPING_THRESHOLD);
        dto.setMinOrderAmount(MIN_ORDER_AMOUNT);
        return dto;
    }
}
