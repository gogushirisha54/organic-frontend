package com.organica.service;

import com.organica.dto.CatalogDtos.*;
import com.organica.entity.*;
import com.organica.exception.BadRequestException;
import com.organica.exception.ResourceNotFoundException;
import com.organica.repository.CategoryRepository;
import com.organica.repository.CouponRepository;
import com.organica.repository.OrderRepository;
import com.organica.repository.ProductRepository;
import com.organica.repository.ServiceablePincodeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class CatalogService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CouponRepository couponRepository;
    private final ServiceablePincodeRepository pincodeRepository;
    private final OrderRepository orderRepository;

    public CatalogService(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            CouponRepository couponRepository,
            ServiceablePincodeRepository pincodeRepository,
            OrderRepository orderRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.couponRepository = couponRepository;
        this.pincodeRepository = pincodeRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toCategoryDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CategoryDto createCategory(CategoryRequest request) {
        String slug = (request.getSlug() != null && !request.getSlug().isBlank())
                ? slugify(request.getSlug())
                : slugify(request.getName());

        if (categoryRepository.findBySlugIgnoreCase(slug).isPresent()) {
            throw new BadRequestException("Category with slug '" + slug + "' already exists.");
        }

        Category category = new Category();
        category.setName(request.getName().trim());
        category.setSlug(slug);
        category.setDescription(request.getDescription().trim());
        category.setAisleGroup(
                request.getAisleGroup() != null && !request.getAisleGroup().isBlank()
                        ? request.getAisleGroup().trim()
                        : "Specialty Department"
        );
        if (request.getSubcategories() != null && !request.getSubcategories().isEmpty()) {
            category.setSubcategoriesCsv(String.join(",", request.getSubcategories()));
        } else {
            category.setSubcategoriesCsv("General");
        }
        category.setImageUrl(
                request.getImageUrl() != null && !request.getImageUrl().isBlank()
                        ? request.getImageUrl().trim()
                        : "/src/assets/images/qc_fruits_vegetables_1791781893304.jpg"
        );

        Category saved = categoryRepository.save(category);
        return toCategoryDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getProducts(
            String categorySlug,
            String subcategory,
            String brand,
            String dietaryType,
            String search,
            String sort,
            Boolean inStockOnly,
            BigDecimal maxPrice
    ) {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .filter(Product::isActive)
                .filter(p -> {
                    if (categorySlug != null && !categorySlug.isBlank() && !categorySlug.equalsIgnoreCase("all")) {
                        return p.getCategory().getSlug().equalsIgnoreCase(categorySlug);
                    }
                    return true;
                })
                .filter(p -> {
                    if (subcategory != null && !subcategory.isBlank() && !subcategory.equalsIgnoreCase("all")) {
                        return p.getSubcategory().equalsIgnoreCase(subcategory.trim());
                    }
                    return true;
                })
                .filter(p -> {
                    if (brand != null && !brand.isBlank() && !brand.equalsIgnoreCase("all")) {
                        return p.getBrand().equalsIgnoreCase(brand.trim());
                    }
                    return true;
                })
                .filter(p -> {
                    if (dietaryType != null && !dietaryType.isBlank() && !dietaryType.equalsIgnoreCase("all")) {
                        return p.getDietaryType().equalsIgnoreCase(dietaryType.trim());
                    }
                    return true;
                })
                .filter(p -> {
                    if (search != null && !search.isBlank()) {
                        String q = search.trim().toLowerCase(Locale.ROOT);
                        return p.getName().toLowerCase(Locale.ROOT).contains(q)
                                || p.getBrand().toLowerCase(Locale.ROOT).contains(q)
                                || p.getSubcategory().toLowerCase(Locale.ROOT).contains(q)
                                || p.getDescription().toLowerCase(Locale.ROOT).contains(q)
                                || p.getAttributes().toLowerCase(Locale.ROOT).contains(q)
                                || p.getCategory().getName().toLowerCase(Locale.ROOT).contains(q);
                    }
                    return true;
                })
                .filter(p -> {
                    if (Boolean.TRUE.equals(inStockOnly)) {
                        return p.getStockQuantity() != null && p.getStockQuantity() > 0;
                    }
                    return true;
                })
                .filter(p -> {
                    if (maxPrice != null && maxPrice.compareTo(BigDecimal.ZERO) > 0) {
                        return p.getPrice().compareTo(maxPrice) <= 0;
                    }
                    return true;
                })
                .sorted(resolveComparator(sort))
                .map(this::toProductDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PaginatedProductsResponse getPaginatedProducts(
            String categorySlug,
            String subcategory,
            String brand,
            String dietaryType,
            String search,
            String sort,
            Boolean inStockOnly,
            BigDecimal maxPrice,
            int page,
            int size
    ) {
        List<ProductDto> filtered = getProducts(
                categorySlug,
                subcategory,
                brand,
                dietaryType,
                search,
                sort,
                inStockOnly,
                maxPrice
        );

        List<Product> categoryScoped = productRepository.findAll().stream()
                .filter(Product::isActive)
                .filter(p -> categorySlug == null
                        || categorySlug.isBlank()
                        || categorySlug.equalsIgnoreCase("all")
                        || p.getCategory().getSlug().equalsIgnoreCase(categorySlug))
                .collect(Collectors.toList());

        List<String> availableBrands = categoryScoped.stream()
                .map(Product::getBrand)
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        List<String> availableSubcategories = categoryScoped.stream()
                .map(Product::getSubcategory)
                .distinct()
                .collect(Collectors.toList());

        int safeSize = Math.max(1, size);
        int safePage = Math.max(0, page);
        long totalElements = filtered.size();
        int totalPages = Math.max(1, (int) Math.ceil((double) totalElements / safeSize));
        int fromIdx = Math.min(safePage * safeSize, filtered.size());
        int toIdx = Math.min(fromIdx + safeSize, filtered.size());

        PaginatedProductsResponse response = new PaginatedProductsResponse();
        response.setContent(filtered.subList(fromIdx, toIdx));
        response.setPage(safePage);
        response.setSize(safeSize);
        response.setTotalElements(totalElements);
        response.setTotalPages(totalPages);
        response.setAvailableBrands(availableBrands);
        response.setAvailableSubcategories(availableSubcategories);
        return response;
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getSearchSuggestions(String q) {
        if (q == null || q.trim().length() < 2) {
            return List.of();
        }
        return getProducts(null, null, null, null, q, "featured", false, null)
                .stream()
                .limit(8)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with ID " + id + " not found."));
        return toProductDto(product);
    }

    @Transactional
    public ProductDto createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

        Product product = new Product();
        applyProductFields(product, request, category);
        Product saved = productRepository.save(product);
        return toProductDto(saved);
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found."));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

        applyProductFields(product, request, category);
        Product saved = productRepository.save(product);
        return toProductDto(saved);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found.");
        }
        productRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    @Transactional
    public Coupon createCoupon(Coupon coupon) {
        coupon.setCode(coupon.getCode().trim().toUpperCase(Locale.ROOT));
        return couponRepository.save(coupon);
    }

    @Transactional
    public Coupon toggleCoupon(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coupon not found."));
        coupon.setActive(!coupon.isActive());
        return couponRepository.save(coupon);
    }

    @Transactional(readOnly = true)
    public List<ServiceablePincode> getAllPincodes() {
        return pincodeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public ServiceablePincode verifyPincode(String pincode) {
        String cleaned = pincode != null ? pincode.trim() : "";
        return pincodeRepository.findByPincode(cleaned)
                .orElseGet(() -> {
                    if (cleaned.matches("^[1-9][0-9]{5}$")) {
                        ServiceablePincode dynamic = new ServiceablePincode();
                        dynamic.setId(99L);
                        dynamic.setPincode(cleaned);
                        dynamic.setCity("Express Partner Zone");
                        dynamic.setAreaName("PIN " + cleaned + " Quick-Commerce Pod");
                        dynamic.setState("India");
                        dynamic.setEtaMinutes(15);
                        dynamic.setDeliveryFee(new BigDecimal("35.00"));
                        dynamic.setFreeDeliveryThreshold(new BigDecimal("299.00"));
                        dynamic.setMinOrderAmount(new BigDecimal("99.00"));
                        dynamic.setServiceable(true);
                        return dynamic;
                    }
                    throw new BadRequestException("Invalid 6-digit Indian PIN code.");
                });
    }

    @Transactional
    public ServiceablePincode createPincode(ServiceablePincode pincode) {
        return pincodeRepository.save(pincode);
    }

    @Transactional(readOnly = true)
    public AdminSalesSummaryDto getAdminSalesSummary() {
        List<Product> allProducts = productRepository.findAll();
        List<Order> allOrders = orderRepository.findAll();
        List<Order> activeOrders = allOrders.stream()
                .filter(o -> o.getStatus() != OrderStatus.CANCELLED)
                .collect(Collectors.toList());

        BigDecimal grossRevenue = activeOrders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal avgOrder = activeOrders.isEmpty()
                ? BigDecimal.ZERO
                : grossRevenue.divide(BigDecimal.valueOf(activeOrders.size()), 0, RoundingMode.HALF_UP);

        AdminSalesSummaryDto summary = new AdminSalesSummaryDto();
        summary.setTotalProducts(allProducts.size());
        summary.setActiveProducts(allProducts.stream().filter(Product::isActive).count());
        summary.setLowStockCount(allProducts.stream().filter(p -> p.getStockQuantity() > 0 && p.getStockQuantity() <= 18).count());
        summary.setOutOfStockCount(allProducts.stream().filter(p -> p.getStockQuantity() <= 0).count());
        summary.setTotalCategories(categoryRepository.count());
        summary.setTotalOrders(allOrders.size());
        summary.setCancelledOrders(allOrders.stream().filter(o -> o.getStatus() == OrderStatus.CANCELLED).count());
        summary.setGrossRevenueInr(grossRevenue);
        summary.setAverageOrderValueInr(avgOrder);
        return summary;
    }

    private void applyProductFields(Product product, ProductRequest request, Category category) {
        product.setSku(request.getSku().trim().toUpperCase(Locale.ROOT));
        product.setName(request.getName().trim());
        product.setSlug(slugify(request.getName() + "-" + request.getSku()));
        product.setBrand(request.getBrand() != null && !request.getBrand().isBlank() ? request.getBrand().trim() : "Organica Harvest");
        product.setSubcategory(request.getSubcategory() != null && !request.getSubcategory().isBlank() ? request.getSubcategory().trim() : "General");
        product.setDescription(request.getDescription().trim());
        product.setIngredients(request.getIngredients().trim());
        product.setOrigin(request.getOrigin().trim());
        product.setUnitSize(request.getUnitSize().trim());
        product.setPrice(request.getPrice());

        BigDecimal mrp = (request.getOriginalPrice() != null && request.getOriginalPrice().compareTo(request.getPrice()) > 0)
                ? request.getOriginalPrice()
                : request.getPrice();
        product.setOriginalPrice(mrp);

        int discountPct = 0;
        if (mrp.compareTo(request.getPrice()) > 0 && mrp.compareTo(BigDecimal.ZERO) > 0) {
            discountPct = mrp.subtract(request.getPrice())
                    .multiply(BigDecimal.valueOf(100))
                    .divide(mrp, 0, RoundingMode.HALF_UP)
                    .intValue();
        }
        product.setDiscountPercent(discountPct);
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(
                request.getImageUrl() != null && !request.getImageUrl().isBlank()
                        ? request.getImageUrl().trim()
                        : category.getImageUrl()
        );
        product.setFeatured(request.isFeatured());
        product.setBestSeller(request.isBestSeller());
        product.setNewArrival(request.isNewArrival());
        product.setTrending(request.isTrending());
        product.setDailyEssential(request.isDailyEssential());
        product.setActive(request.getActive() == null || request.getActive());
        product.setDietaryType(request.getDietaryType() != null ? request.getDietaryType() : "Veg");
        product.setStorageInstruction(request.getStorageInstruction() != null ? request.getStorageInstruction() : "Store in a cool, dry place");
        product.setAttributes(request.getAttributes() != null ? request.getAttributes() : "Quality Verified");
        product.setCategory(category);
    }

    private Comparator<Product> resolveComparator(String sort) {
        if ("price-asc".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::getPrice);
        }
        if ("price-desc".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::getPrice).reversed();
        }
        if ("discount".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::getDiscountPercent).reversed();
        }
        if ("rating".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::getRating).reversed();
        }
        if ("newest".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::getCreatedAt).reversed();
        }
        return Comparator.comparing(Product::isFeatured).reversed()
                .thenComparing(Product::getId);
    }

    private CategoryDto toCategoryDto(Category category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setSlug(category.getSlug());
        dto.setDescription(category.getDescription());
        dto.setImageUrl(category.getImageUrl());
        dto.setAisleGroup(category.getAisleGroup());
        if (category.getSubcategoriesCsv() != null && !category.getSubcategoriesCsv().isBlank()) {
            dto.setSubcategories(
                    Arrays.stream(category.getSubcategoriesCsv().split(","))
                            .map(String::trim)
                            .filter(s -> !s.isEmpty())
                            .collect(Collectors.toList())
            );
        }
        dto.setProductCount(productRepository.countByCategoryId(category.getId()));
        return dto;
    }

    public ProductDto toProductDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setSku(product.getSku());
        dto.setName(product.getName());
        dto.setSlug(product.getSlug());
        dto.setBrand(product.getBrand());
        dto.setSubcategory(product.getSubcategory());
        dto.setDescription(product.getDescription());
        dto.setIngredients(product.getIngredients());
        dto.setOrigin(product.getOrigin());
        dto.setUnitSize(product.getUnitSize());
        dto.setPrice(product.getPrice());
        dto.setOriginalPrice(product.getOriginalPrice());
        dto.setDiscountPercent(product.getDiscountPercent());
        dto.setStockQuantity(product.getStockQuantity());
        int qty = product.getStockQuantity() != null ? product.getStockQuantity() : 0;
        dto.setStockStatus(qty <= 0 ? "OUT_OF_STOCK" : (qty <= 18 ? "LOW_STOCK" : "IN_STOCK"));
        dto.setRating(product.getRating());
        dto.setReviewCount(product.getReviewCount());
        dto.setImageUrl(product.getImageUrl());
        dto.setFeatured(product.isFeatured());
        dto.setBestSeller(product.isBestSeller());
        dto.setNewArrival(product.isNewArrival());
        dto.setTrending(product.isTrending());
        dto.setDailyEssential(product.isDailyEssential());
        dto.setUnderBudget(product.getPrice().compareTo(new BigDecimal("199.00")) <= 0);
        dto.setActive(product.isActive());
        dto.setDietaryType(product.getDietaryType());
        dto.setStorageInstruction(product.getStorageInstruction());
        dto.setAttributes(product.getAttributes());
        dto.setDeliveryEtaMins(product.getDeliveryEtaMins());
        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());
        dto.setCategorySlug(product.getCategory().getSlug());
        dto.setCreatedAt(product.getCreatedAt());
        return dto;
    }

    private String slugify(String input) {
        return input.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}
