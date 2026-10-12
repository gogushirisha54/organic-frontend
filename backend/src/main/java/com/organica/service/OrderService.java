package com.organica.service;

import com.organica.dto.OrderDtos.*;
import com.organica.entity.*;
import com.organica.exception.BadRequestException;
import com.organica.exception.ResourceNotFoundException;
import com.organica.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CouponRepository couponRepository;

    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            CartRepository cartRepository,
            CouponRepository couponRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.couponRepository = couponRepository;
    }

    /**
     * Creates an order inside an atomic database transaction.
     * Prices, coupon discounts, delivery fees, and GST are calculated strictly on the server
     * using authoritative database product prices — never trusting client totals.
     */
    @Transactional
    public OrderDto createOrder(String authenticatedEmail, CheckoutRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Order must contain at least one item.");
        }

        User user = null;
        if (authenticatedEmail != null) {
            user = userRepository.findByEmailIgnoreCase(authenticatedEmail).orElse(null);
        }

        Order order = new Order();
        order.setOrderNumber("ORG-2026-" + (1045 + orderRepository.count()));
        order.setUser(user);
        order.setCustomerEmail(request.getRecipientEmail().trim());
        order.setRecipientName(request.getRecipientName().trim());
        order.setRecipientPhone(request.getRecipientPhone().trim());
        order.setShippingAddress(request.getShippingAddress().trim());
        order.setShippingCity(request.getShippingCity().trim());
        order.setShippingState(request.getShippingState().trim());
        order.setShippingPostalCode(request.getShippingPostalCode().trim());
        order.setDeliveryNotes(request.getDeliveryNotes() != null ? request.getDeliveryNotes().trim() : "");
        order.setStatus(OrderStatus.CONFIRMED);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setPaymentStatus(
                "CASH_ON_DELIVERY".equalsIgnoreCase(request.getPaymentMethod())
                        ? "COD_PENDING_ON_DELIVERY"
                        : "PAID_MOCK_SANDBOX"
        );
        order.setTrackingCode("ORG-BLINK-" + request.getShippingPostalCode().trim() + "-"
                + UUID.randomUUID().toString().substring(0, 4).toUpperCase());
        order.setEstimatedDeliveryMins(12);

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CheckoutItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product ID " + itemReq.getProductId() + " not found."));

            if (product.getStockQuantity() < itemReq.getQuantity()) {
                throw new BadRequestException(
                        "Insufficient inventory for " + product.getName()
                                + ". Available: " + product.getStockQuantity()
                );
            }

            // Deduct inventory atomically inside transaction
            product.setStockQuantity(product.getStockQuantity() - itemReq.getQuantity());
            productRepository.save(product);

            BigDecimal lineSubtotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(itemReq.getQuantity()))
                    .setScale(2, RoundingMode.HALF_UP);
            subtotal = subtotal.add(lineSubtotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setProductName(product.getName());
            orderItem.setProductSku(product.getSku());
            orderItem.setUnitSize(product.getUnitSize());
            orderItem.setImageUrl(product.getImageUrl());
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setSubtotal(lineSubtotal);
            order.getItems().add(orderItem);
        }

        // Validate optional coupon code on the server
        BigDecimal couponDiscount = BigDecimal.ZERO;
        if (request.getCouponCode() != null && !request.getCouponCode().isBlank()) {
            Optional<Coupon> optCoupon = couponRepository.findByCodeIgnoreCase(request.getCouponCode().trim());
            if (optCoupon.isPresent() && optCoupon.get().isActive()) {
                Coupon c = optCoupon.get();
                if (subtotal.compareTo(c.getMinOrderAmount()) >= 0) {
                    order.setCouponCode(c.getCode());
                    if ("FLAT".equalsIgnoreCase(c.getDiscountType())) {
                        couponDiscount = c.getDiscountValue().min(subtotal);
                    } else {
                        BigDecimal rawPct = subtotal.multiply(c.getDiscountValue())
                                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                        couponDiscount = rawPct.min(c.getMaxDiscountAmount());
                    }
                }
            }
        }
        order.setCouponDiscount(couponDiscount.setScale(2, RoundingMode.HALF_UP));

        BigDecimal discountedSubtotal = subtotal.subtract(couponDiscount).max(BigDecimal.ZERO);

        BigDecimal shippingFee = subtotal.compareTo(CartService.FREE_SHIPPING_THRESHOLD) >= 0
                ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP)
                : CartService.STANDARD_SHIPPING_FEE;

        BigDecimal taxAmount = discountedSubtotal.multiply(CartService.TAX_RATE)
                .add(CartService.HANDLING_FEE)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal totalAmount = discountedSubtotal.add(shippingFee).add(taxAmount)
                .setScale(2, RoundingMode.HALF_UP);

        order.setSubtotal(subtotal.setScale(2, RoundingMode.HALF_UP));
        order.setShippingFee(shippingFee);
        order.setTaxAmount(taxAmount);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        if (user != null) {
            cartRepository.findByUserId(user.getId()).ifPresent(cart -> {
                cart.getItems().clear();
                cartRepository.save(cart);
            });
        }

        return toOrderDto(savedOrder);
    }

    /**
     * Cancels an order prior to dispatch and atomically restores product stock quantities.
     */
    @Transactional
    public OrderDto cancelOrder(Long orderId, String reason) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found."));

        if (order.getStatus() == OrderStatus.SHIPPED || order.getStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("Orders that have already been shipped or delivered cannot be cancelled.");
        }
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order is already cancelled.");
        }

        // Restore product stock quantities
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            if (product != null) {
                product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                productRepository.save(product);
            }
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setCancellationReason(reason != null && !reason.isBlank() ? reason.trim() : "Cancelled by customer before dispatch");
        Order saved = orderRepository.save(order);
        return toOrderDto(saved);
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getOrdersForUser(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toOrderDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDto trackOrderByNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumberIgnoreCase(orderNumber.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Order " + orderNumber + " not found."));
        return toOrderDto(order);
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getAllOrdersForAdmin() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toOrderDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found."));
        order.setStatus(status);
        Order saved = orderRepository.save(order);
        return toOrderDto(saved);
    }

    private OrderDto toOrderDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setUserId(order.getUser() != null ? order.getUser().getId() : null);
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setRecipientName(order.getRecipientName());
        dto.setRecipientPhone(order.getRecipientPhone());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setShippingCity(order.getShippingCity());
        dto.setShippingState(order.getShippingState());
        dto.setShippingPostalCode(order.getShippingPostalCode());
        dto.setDeliveryNotes(order.getDeliveryNotes());
        dto.setSubtotal(order.getSubtotal());
        dto.setCouponCode(order.getCouponCode());
        dto.setCouponDiscount(order.getCouponDiscount());
        dto.setShippingFee(order.getShippingFee());
        dto.setTaxAmount(order.getTaxAmount());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setCancellationReason(order.getCancellationReason());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setTrackingCode(order.getTrackingCode());
        dto.setEstimatedDeliveryMins(order.getEstimatedDeliveryMins());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());

        for (OrderItem item : order.getItems()) {
            OrderItemDto itemDto = new OrderItemDto();
            itemDto.setId(item.getId());
            itemDto.setProductId(item.getProduct() != null ? item.getProduct().getId() : null);
            itemDto.setProductName(item.getProductName());
            itemDto.setProductSku(item.getProductSku());
            itemDto.setUnitSize(item.getUnitSize());
            itemDto.setImageUrl(item.getImageUrl());
            itemDto.setUnitPrice(item.getUnitPrice());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setSubtotal(item.getSubtotal());
            dto.getItems().add(itemDto);
        }
        return dto;
    }
}
