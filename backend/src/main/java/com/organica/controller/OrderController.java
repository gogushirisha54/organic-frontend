package com.organica.controller;

import com.organica.dto.OrderDtos.CancelOrderRequest;
import com.organica.dto.OrderDtos.CheckoutRequest;
import com.organica.dto.OrderDtos.OrderDto;
import com.organica.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderDto> checkout(
            Authentication authentication,
            @Valid @RequestBody CheckoutRequest request
    ) {
        String email = authentication != null ? authentication.getName() : null;
        OrderDto created = orderService.createOrder(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<OrderDto> cancelOrder(
            @PathVariable Long id,
            @RequestBody(required = false) CancelOrderRequest request
    ) {
        String reason = request != null ? request.getReason() : null;
        return ResponseEntity.ok(orderService.cancelOrder(id, reason));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDto>> getMyOrders(Authentication authentication) {
        return ResponseEntity.ok(orderService.getOrdersForUser(authentication.getName()));
    }

    @GetMapping("/track/{orderNumber}")
    public ResponseEntity<OrderDto> trackOrder(@PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.trackOrderByNumber(orderNumber));
    }
}
