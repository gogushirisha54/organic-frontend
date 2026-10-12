package com.organica;

import com.organica.dto.OrderDtos.CheckoutItemRequest;
import com.organica.dto.OrderDtos.CheckoutRequest;
import com.organica.dto.OrderDtos.OrderDto;
import com.organica.entity.Category;
import com.organica.entity.Coupon;
import com.organica.entity.Order;
import com.organica.entity.OrderStatus;
import com.organica.entity.Product;
import com.organica.repository.CartRepository;
import com.organica.repository.CouponRepository;
import com.organica.repository.OrderRepository;
import com.organica.repository.ProductRepository;
import com.organica.repository.UserRepository;
import com.organica.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class OrderServiceTest {

    private OrderRepository orderRepository;
    private ProductRepository productRepository;
    private UserRepository userRepository;
    private CartRepository cartRepository;
    private CouponRepository couponRepository;
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        orderRepository = Mockito.mock(OrderRepository.class);
        productRepository = Mockito.mock(ProductRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        cartRepository = Mockito.mock(CartRepository.class);
        couponRepository = Mockito.mock(CouponRepository.class);
        orderService = new OrderService(
                orderRepository,
                productRepository,
                userRepository,
                cartRepository,
                couponRepository
        );
    }

    @Test
    void createOrderCalculatesServerInrTotalsAppliesCouponAndDeductsInventory() {
        Category cat = new Category();
        cat.setId(1L);
        cat.setName("Fruits");
        cat.setSlug("fruits");

        Product mangoes = new Product();
        mangoes.setId(1L);
        mangoes.setSku("ORG-FR-001");
        mangoes.setName("Ratnagiri GI-Tagged Alphonso Mangoes");
        mangoes.setUnitSize("1 kg (4–5 pcs)");
        mangoes.setImageUrl("/img/mango.jpg");
        mangoes.setPrice(new BigDecimal("449.00"));
        mangoes.setOriginalPrice(new BigDecimal("550.00"));
        mangoes.setStockQuantity(10);
        mangoes.setCategory(cat);

        Coupon first100 = new Coupon();
        first100.setCode("FIRST100");
        first100.setDiscountType("FLAT");
        first100.setDiscountValue(new BigDecimal("100.00"));
        first100.setMinOrderAmount(new BigDecimal("499.00"));
        first100.setMaxDiscountAmount(new BigDecimal("100.00"));
        first100.setActive(true);

        when(productRepository.findById(1L)).thenReturn(Optional.of(mangoes));
        when(couponRepository.findByCodeIgnoreCase("FIRST100")).thenReturn(Optional.of(first100));
        when(orderRepository.count()).thenReturn(5L);
        when(orderRepository.save(any(Order.class))).thenAnswer(inv -> {
            Order saved = inv.getArgument(0);
            saved.setId(99L);
            return saved;
        });

        CheckoutItemRequest item = new CheckoutItemRequest();
        item.setProductId(1L);
        item.setQuantity(2); // 2 * ₹449.00 = ₹898.00 (>= ₹299 free delivery & >= ₹499 coupon min)

        CheckoutRequest req = new CheckoutRequest();
        req.setRecipientName("Ananya Sharma");
        req.setRecipientEmail("clara@organica.com");
        req.setRecipientPhone("+91 98450 71234");
        req.setShippingAddress("Flat 402, Palm Grove Residency, Indiranagar");
        req.setShippingCity("Bengaluru");
        req.setShippingState("Karnataka");
        req.setShippingPostalCode("560038");
        req.setCouponCode("FIRST100");
        req.setPaymentMethod("MOCK_UPI_QR");
        req.setItems(List.of(item));

        OrderDto result = orderService.createOrder(null, req);

        // Verify inventory was deducted (10 - 2 = 8)
        assertEquals(8, mangoes.getStockQuantity());
        // Verify server-side price calculation (₹898.00 subtotal, ₹100.00 coupon discount, ₹0.00 shipping)
        assertEquals(new BigDecimal("898.00"), result.getSubtotal());
        assertEquals(new BigDecimal("100.00"), result.getCouponDiscount());
        assertEquals(new BigDecimal("0.00"), result.getShippingFee());
        assertEquals(OrderStatus.CONFIRMED, result.getStatus());
    }
}
