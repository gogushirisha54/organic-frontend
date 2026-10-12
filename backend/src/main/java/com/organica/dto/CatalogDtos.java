package com.organica.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class CatalogDtos {

    public static class CategoryDto {
        private Long id;
        private String name;
        private String slug;
        private String description;
        private String imageUrl;
        private String aisleGroup;
        private List<String> subcategories = new ArrayList<>();
        private long productCount;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getAisleGroup() { return aisleGroup; }
        public void setAisleGroup(String aisleGroup) { this.aisleGroup = aisleGroup; }
        public List<String> getSubcategories() { return subcategories; }
        public void setSubcategories(List<String> subcategories) { this.subcategories = subcategories; }
        public long getProductCount() { return productCount; }
        public void setProductCount(long productCount) { this.productCount = productCount; }
    }

    public static class CategoryRequest {
        @NotBlank(message = "Category name is required")
        private String name;
        private String slug;
        @NotBlank(message = "Category description is required")
        private String description;
        private String imageUrl;
        private String aisleGroup;
        private List<String> subcategories = new ArrayList<>();

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getAisleGroup() { return aisleGroup; }
        public void setAisleGroup(String aisleGroup) { this.aisleGroup = aisleGroup; }
        public List<String> getSubcategories() { return subcategories; }
        public void setSubcategories(List<String> subcategories) { this.subcategories = subcategories; }
    }

    public static class ProductDto {
        private Long id;
        private String sku;
        private String name;
        private String slug;
        private String brand;
        private Long categoryId;
        private String categoryName;
        private String categorySlug;
        private String subcategory;
        private String description;
        private String ingredients;
        private String origin;
        private String unitSize;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer discountPercent;
        private Integer stockQuantity;
        private String stockStatus;
        private BigDecimal rating;
        private Integer reviewCount;
        private String imageUrl;
        private boolean featured;
        private boolean bestSeller;
        private boolean newArrival;
        private boolean trending;
        private boolean dailyEssential;
        private boolean underBudget;
        private boolean active;
        private String dietaryType;
        private String storageInstruction;
        private String attributes;
        private Integer deliveryEtaMins;
        private Instant createdAt;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getSku() { return sku; }
        public void setSku(String sku) { this.sku = sku; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getBrand() { return brand; }
        public void setBrand(String brand) { this.brand = brand; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
        public String getCategorySlug() { return categorySlug; }
        public void setCategorySlug(String categorySlug) { this.categorySlug = categorySlug; }
        public String getSubcategory() { return subcategory; }
        public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getIngredients() { return ingredients; }
        public void setIngredients(String ingredients) { this.ingredients = ingredients; }
        public String getOrigin() { return origin; }
        public void setOrigin(String origin) { this.origin = origin; }
        public String getUnitSize() { return unitSize; }
        public void setUnitSize(String unitSize) { this.unitSize = unitSize; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        public BigDecimal getOriginalPrice() { return originalPrice; }
        public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
        public Integer getDiscountPercent() { return discountPercent; }
        public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }
        public Integer getStockQuantity() { return stockQuantity; }
        public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
        public String getStockStatus() { return stockStatus; }
        public void setStockStatus(String stockStatus) { this.stockStatus = stockStatus; }
        public BigDecimal getRating() { return rating; }
        public void setRating(BigDecimal rating) { this.rating = rating; }
        public Integer getReviewCount() { return reviewCount; }
        public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public boolean isFeatured() { return featured; }
        public void setFeatured(boolean featured) { this.featured = featured; }
        public boolean isBestSeller() { return bestSeller; }
        public void setBestSeller(boolean bestSeller) { this.bestSeller = bestSeller; }
        public boolean isNewArrival() { return newArrival; }
        public void setNewArrival(boolean newArrival) { this.newArrival = newArrival; }
        public boolean isTrending() { return trending; }
        public void setTrending(boolean trending) { this.trending = trending; }
        public boolean isDailyEssential() { return dailyEssential; }
        public void setDailyEssential(boolean dailyEssential) { this.dailyEssential = dailyEssential; }
        public boolean isUnderBudget() { return underBudget; }
        public void setUnderBudget(boolean underBudget) { this.underBudget = underBudget; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
        public String getDietaryType() { return dietaryType; }
        public void setDietaryType(String dietaryType) { this.dietaryType = dietaryType; }
        public String getStorageInstruction() { return storageInstruction; }
        public void setStorageInstruction(String storageInstruction) { this.storageInstruction = storageInstruction; }
        public String getAttributes() { return attributes; }
        public void setAttributes(String attributes) { this.attributes = attributes; }
        public Integer getDeliveryEtaMins() { return deliveryEtaMins; }
        public void setDeliveryEtaMins(Integer deliveryEtaMins) { this.deliveryEtaMins = deliveryEtaMins; }
        public Instant getCreatedAt() { return createdAt; }
        public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    }

    public static class PaginatedProductsResponse {
        private List<ProductDto> content = new ArrayList<>();
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
        private List<String> availableBrands = new ArrayList<>();
        private List<String> availableSubcategories = new ArrayList<>();

        public List<ProductDto> getContent() { return content; }
        public void setContent(List<ProductDto> content) { this.content = content; }
        public int getPage() { return page; }
        public void setPage(int page) { this.page = page; }
        public int getSize() { return size; }
        public void setSize(int size) { this.size = size; }
        public long getTotalElements() { return totalElements; }
        public void setTotalElements(long totalElements) { this.totalElements = totalElements; }
        public int getTotalPages() { return totalPages; }
        public void setTotalPages(int totalPages) { this.totalPages = totalPages; }
        public List<String> getAvailableBrands() { return availableBrands; }
        public void setAvailableBrands(List<String> availableBrands) { this.availableBrands = availableBrands; }
        public List<String> getAvailableSubcategories() { return availableSubcategories; }
        public void setAvailableSubcategories(List<String> availableSubcategories) { this.availableSubcategories = availableSubcategories; }
    }

    public static class ProductRequest {
        @NotBlank(message = "SKU is required")
        private String sku;
        @NotBlank(message = "Product name is required")
        private String name;
        private String brand;
        @NotNull(message = "Category ID is required")
        private Long categoryId;
        private String subcategory;
        @NotBlank(message = "Description is required")
        private String description;
        @NotBlank(message = "Ingredients are required")
        private String ingredients;
        @NotBlank(message = "Origin is required")
        private String origin;
        @NotBlank(message = "Unit size is required")
        private String unitSize;
        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.01", message = "Price must be greater than zero")
        private BigDecimal price;
        private BigDecimal originalPrice;
        @NotNull(message = "Stock quantity is required")
        @Min(value = 0, message = "Stock quantity cannot be negative")
        private Integer stockQuantity;
        private String imageUrl;
        private boolean featured;
        private boolean bestSeller;
        private boolean newArrival;
        private boolean trending;
        private boolean dailyEssential;
        private String dietaryType;
        private String storageInstruction;
        private String attributes;
        private Boolean active;

        public String getSku() { return sku; }
        public void setSku(String sku) { this.sku = sku; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getBrand() { return brand; }
        public void setBrand(String brand) { this.brand = brand; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public String getSubcategory() { return subcategory; }
        public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getIngredients() { return ingredients; }
        public void setIngredients(String ingredients) { this.ingredients = ingredients; }
        public String getOrigin() { return origin; }
        public void setOrigin(String origin) { this.origin = origin; }
        public String getUnitSize() { return unitSize; }
        public void setUnitSize(String unitSize) { this.unitSize = unitSize; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        public BigDecimal getOriginalPrice() { return originalPrice; }
        public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
        public Integer getStockQuantity() { return stockQuantity; }
        public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public boolean isFeatured() { return featured; }
        public void setFeatured(boolean featured) { this.featured = featured; }
        public boolean isBestSeller() { return bestSeller; }
        public void setBestSeller(boolean bestSeller) { this.bestSeller = bestSeller; }
        public boolean isNewArrival() { return newArrival; }
        public void setNewArrival(boolean newArrival) { this.newArrival = newArrival; }
        public boolean isTrending() { return trending; }
        public void setTrending(boolean trending) { this.trending = trending; }
        public boolean isDailyEssential() { return dailyEssential; }
        public void setDailyEssential(boolean dailyEssential) { this.dailyEssential = dailyEssential; }
        public String getDietaryType() { return dietaryType; }
        public void setDietaryType(String dietaryType) { this.dietaryType = dietaryType; }
        public String getStorageInstruction() { return storageInstruction; }
        public void setStorageInstruction(String storageInstruction) { this.storageInstruction = storageInstruction; }
        public String getAttributes() { return attributes; }
        public void setAttributes(String attributes) { this.attributes = attributes; }
        public Boolean getActive() { return active; }
        public void setActive(Boolean active) { this.active = active; }
    }

    public static class AdminSalesSummaryDto {
        private long totalProducts;
        private long activeProducts;
        private long lowStockCount;
        private long outOfStockCount;
        private long totalCategories;
        private long totalOrders;
        private long cancelledOrders;
        private BigDecimal grossRevenueInr;
        private BigDecimal averageOrderValueInr;

        public long getTotalProducts() { return totalProducts; }
        public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }
        public long getActiveProducts() { return activeProducts; }
        public void setActiveProducts(long activeProducts) { this.activeProducts = activeProducts; }
        public long getLowStockCount() { return lowStockCount; }
        public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }
        public long getOutOfStockCount() { return outOfStockCount; }
        public void setOutOfStockCount(long outOfStockCount) { this.outOfStockCount = outOfStockCount; }
        public long getTotalCategories() { return totalCategories; }
        public void setTotalCategories(long totalCategories) { this.totalCategories = totalCategories; }
        public long getTotalOrders() { return totalOrders; }
        public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
        public long getCancelledOrders() { return cancelledOrders; }
        public void setCancelledOrders(long cancelledOrders) { this.cancelledOrders = cancelledOrders; }
        public BigDecimal getGrossRevenueInr() { return grossRevenueInr; }
        public void setGrossRevenueInr(BigDecimal grossRevenueInr) { this.grossRevenueInr = grossRevenueInr; }
        public BigDecimal getAverageOrderValueInr() { return averageOrderValueInr; }
        public void setAverageOrderValueInr(BigDecimal averageOrderValueInr) { this.averageOrderValueInr = averageOrderValueInr; }
    }
}
