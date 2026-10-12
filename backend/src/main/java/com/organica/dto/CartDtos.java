package com.organica.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CartDtos {

    public static class AddToCartRequest {
        @NotNull(message = "Product ID is required")
        private Long productId;

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class UpdateCartItemRequest {
        @NotNull(message = "Quantity is required")
        @Min(value = 0, message = "Quantity cannot be negative")
        private Integer quantity;

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class ApplyCouponRequest {
        private String code;

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }

    public static class CartItemDto {
        private Long id;
        private Long productId;
        private String productName;
        private String productSku;
        private String productSlug;
        private String brand;
        private String unitSize;
        private String imageUrl;
        private BigDecimal unitPrice;
        private BigDecimal originalPrice;
        private Integer quantity;
        private Integer availableStock;
        private BigDecimal lineTotal;
        private BigDecimal lineSavings;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }
        public String getProductSku() { return productSku; }
        public void setProductSku(String productSku) { this.productSku = productSku; }
        public String getProductSlug() { return productSlug; }
        public void setProductSlug(String productSlug) { this.productSlug = productSlug; }
        public String getBrand() { return brand; }
        public void setBrand(String brand) { this.brand = brand; }
        public String getUnitSize() { return unitSize; }
        public void setUnitSize(String unitSize) { this.unitSize = unitSize; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public BigDecimal getUnitPrice() { return unitPrice; }
        public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
        public BigDecimal getOriginalPrice() { return originalPrice; }
        public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public Integer getAvailableStock() { return availableStock; }
        public void setAvailableStock(Integer availableStock) { this.availableStock = availableStock; }
        public BigDecimal getLineTotal() { return lineTotal; }
        public void setLineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; }
        public BigDecimal getLineSavings() { return lineSavings; }
        public void setLineSavings(BigDecimal lineSavings) { this.lineSavings = lineSavings; }
    }

    public static class CartDto {
        private Long id;
        private Long userId;
        private List<CartItemDto> items = new ArrayList<>();
        private int itemCount;
        private BigDecimal mrpTotal = BigDecimal.ZERO;
        private BigDecimal subtotal = BigDecimal.ZERO;
        private BigDecimal productSavings = BigDecimal.ZERO;
        private String appliedCouponCode;
        private BigDecimal couponDiscount = BigDecimal.ZERO;
        private BigDecimal handlingFee = BigDecimal.ZERO;
        private BigDecimal estimatedShipping = BigDecimal.ZERO;
        private BigDecimal estimatedTax = BigDecimal.ZERO;
        private BigDecimal estimatedTotal = BigDecimal.ZERO;
        private BigDecimal freeShippingThreshold = new BigDecimal("299.00");
        private BigDecimal minOrderAmount = new BigDecimal("99.00");

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public List<CartItemDto> getItems() { return items; }
        public void setItems(List<CartItemDto> items) { this.items = items; }
        public int getItemCount() { return itemCount; }
        public void setItemCount(int itemCount) { this.itemCount = itemCount; }
        public BigDecimal getMrpTotal() { return mrpTotal; }
        public void setMrpTotal(BigDecimal mrpTotal) { this.mrpTotal = mrpTotal; }
        public BigDecimal getSubtotal() { return subtotal; }
        public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
        public BigDecimal getProductSavings() { return productSavings; }
        public void setProductSavings(BigDecimal productSavings) { this.productSavings = productSavings; }
        public String getAppliedCouponCode() { return appliedCouponCode; }
        public void setAppliedCouponCode(String appliedCouponCode) { this.appliedCouponCode = appliedCouponCode; }
        public BigDecimal getCouponDiscount() { return couponDiscount; }
        public void setCouponDiscount(BigDecimal couponDiscount) { this.couponDiscount = couponDiscount; }
        public BigDecimal getHandlingFee() { return handlingFee; }
        public void setHandlingFee(BigDecimal handlingFee) { this.handlingFee = handlingFee; }
        public BigDecimal getEstimatedShipping() { return estimatedShipping; }
        public void setEstimatedShipping(BigDecimal estimatedShipping) { this.estimatedShipping = estimatedShipping; }
        public BigDecimal getEstimatedTax() { return estimatedTax; }
        public void setEstimatedTax(BigDecimal estimatedTax) { this.estimatedTax = estimatedTax; }
        public BigDecimal getEstimatedTotal() { return estimatedTotal; }
        public void setEstimatedTotal(BigDecimal estimatedTotal) { this.estimatedTotal = estimatedTotal; }
        public BigDecimal getFreeShippingThreshold() { return freeShippingThreshold; }
        public void setFreeShippingThreshold(BigDecimal freeShippingThreshold) { this.freeShippingThreshold = freeShippingThreshold; }
        public BigDecimal getMinOrderAmount() { return minOrderAmount; }
        public void setMinOrderAmount(BigDecimal minOrderAmount) { this.minOrderAmount = minOrderAmount; }
    }
}
