
package com.organica.config;

import com.organica.entity.Category;
import com.organica.entity.Product;
import com.organica.repository.CategoryRepository;
import com.organica.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataInitializer(
            CategoryRepository categoryRepository,
            ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Create categories first so products can reference them.
        Category pantry = createCategory(
                "Organic Pantry", "organic-pantry",
                "Pantry Essentials",
                "Organic grains, pulses and everyday pantry essentials.",
                "Rice, Pulses, Grains, Flours",
                "https://images.unsplash.com/photo-1518843875459-f738682238a6"
        );

        Category spices = createCategory(
                "Herbs & Spices", "herbs-spices",
                "Herbs & Spices",
                "Natural spices and aromatic herbs for everyday cooking.",
                "Spices, Herbs, Seasonings",
                "https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
        );

        Category wellness = createCategory(
                "Natural Wellness", "natural-wellness",
                "Wellness",
                "Plant-based products for everyday wellness routines.",
                "Herbal Teas, Natural Wellness",
                "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc"
        );

        Category personalCare = createCategory(
                "Botanical Personal Care", "botanical-personal-care",
                "Personal Care",
                "Botanical-inspired essentials for daily personal care.",
                "Skin Care, Hair Care, Soaps",
                "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b"
        );

        // Add sample products only when their SKU does not already exist.
        createProduct(
                pantry, "ORG-RICE-001", "Organic Brown Rice",
                "organic-brown-rice", "500 g",
                "Whole-grain organic brown rice for everyday meals.",
                "Organic brown rice",
                "India", "249.00", "279.00", 11, 50,
                "https://images.unsplash.com/photo-1586201375761-83865001e31c",
                true, true, false, true, true
        );

        createProduct(
                pantry, "ORG-LENTIL-001", "Organic Red Lentils",
                "organic-red-lentils", "500 g",
                "Wholesome red lentils for soups, dals and curries.",
                "Organic red lentils",
                "India", "189.00", "219.00", 14, 40,
                "https://images.unsplash.com/photo-1515543904379-3d757afe72e4",
                true, false, true, false, true
        );

        createProduct(
                spices, "ORG-TURMERIC-001", "Organic Turmeric Powder",
                "organic-turmeric-powder", "100 g",
                "Aromatic turmeric powder for everyday cooking.",
                "Organic turmeric",
                "India", "129.00", "149.00", 13, 60,
                "https://images.unsplash.com/photo-1615485500704-8e990f9900f1",
                true, true, true, true, true
        );

        createProduct(
                spices, "ORG-CINNAMON-001", "Natural Cinnamon",
                "natural-cinnamon", "100 g",
                "Fragrant cinnamon for baking, drinks and cooking.",
                "Natural cinnamon",
                "India", "159.00", "179.00", 11, 35,
                "https://images.unsplash.com/photo-1600326145359-3a44909d1a39",
                false, false, true, false, true
        );

        createProduct(
                wellness, "ORG-TEA-001", "Herbal Wellness Tea",
                "herbal-wellness-tea", "100 g",
                "A soothing herbal tea blend for a relaxing daily ritual.",
                "Herbal tea blend",
                "India", "299.00", "349.00", 14, 30,
                "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
                true, true, false, true, false
        );

        createProduct(
                personalCare, "ORG-SOAP-001", "Botanical Handmade Soap",
                "botanical-handmade-soap", "100 g",
                "A botanical-inspired soap bar for everyday cleansing.",
                "Soap base, botanical extracts, fragrance",
                "India", "149.00", "169.00", 12, 45,
                "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec",
                false, false, true, false, false
        );

        System.out.println(
                "Organica data initialization complete. Products: "
                        + productRepository.count()
                        + ", Categories: " + categoryRepository.count()
        );
    }

    private Category createCategory(
            String name,
            String slug,
            String aisleGroup,
            String description,
            String subcategories,
            String imageUrl) {

        return categoryRepository.findBySlugIgnoreCase(slug)
                .orElseGet(() -> {
                    Category category = new Category();
                    category.setName(name);
                    category.setSlug(slug);
                    category.setAisleGroup(aisleGroup);
                    category.setDescription(description);
                    category.setSubcategoriesCsv(subcategories);
                    category.setImageUrl(imageUrl);
                    category.setCreatedAt(Instant.now());

                    return categoryRepository.save(category);
                });
    }

    private void createProduct(
            Category category,
            String sku,
            String name,
            String slug,
            String unitSize,
            String description,
            String ingredients,
            String origin,
            String price,
            String originalPrice,
            int discountPercent,
            int stockQuantity,
            String imageUrl,
            boolean featured,
            boolean bestSeller,
            boolean newArrival,
            boolean trending,
            boolean dailyEssential) {

        if (productRepository.findBySkuIgnoreCase(sku).isPresent()) {
            return;
        }

        Product product = new Product();
        product.setSku(sku);
        product.setName(name);
        product.setSlug(slug);
        product.setBrand("Organica Harvest");
        product.setSubcategory(category.getName());
        product.setDescription(description);
        product.setIngredients(ingredients);
        product.setOrigin(origin);
        product.setUnitSize(unitSize);
        product.setPrice(new BigDecimal(price));
        product.setOriginalPrice(new BigDecimal(originalPrice));
        product.setDiscountPercent(discountPercent);
        product.setStockQuantity(stockQuantity);
        product.setRating(new BigDecimal("4.85"));
        product.setReviewCount(24);
        product.setImageUrl(imageUrl);
        product.setFeatured(featured);
        product.setBestSeller(bestSeller);
        product.setNewArrival(newArrival);
        product.setTrending(trending);
        product.setDailyEssential(dailyEssential);
        product.setActive(true);
        product.setDietaryType("Veg");
        product.setStorageInstruction("Store in a cool, dry place");
        product.setAttributes("Quality Verified");
        product.setDeliveryEtaMins(12);
        product.setCategory(category);
        product.setCreatedAt(Instant.now());
        product.setUpdatedAt(Instant.now());

        productRepository.save(product);
    }
}
