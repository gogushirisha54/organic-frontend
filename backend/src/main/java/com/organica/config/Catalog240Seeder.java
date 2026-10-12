
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
import java.util.Locale;

@Component
public class Catalog240Seeder implements CommandLineRunner {

    private final CategoryRepository categories;
    private final ProductRepository products;

    public Catalog240Seeder(
            CategoryRepository categories,
            ProductRepository products) {
        this.categories = categories;
        this.products = products;
    }

    private static final String[] SLUGS = {
        "fruits", "vegetables", "juices-and-drinks",
        "chocolates-and-confectionery", "snacks",
        "biscuits-and-bakery", "ice-cream-and-desserts",
        "indian-sweets-and-festive-foods", "dairy-and-eggs",
        "staples", "cooking-essentials", "breakfast",
        "instant-and-ready-to-eat-food", "international-food",
        "organic-and-health-foods", "fresh-meat-and-seafood",
        "frozen-food", "personal-care", "womens-hygiene",
        "baby-care", "household-cleaning",
        "paper-and-disposable-products", "home-and-kitchen",
        "gifting-and-seasonal-specials"
    };

    private static final String[][] NAMES = {
        {"Alphonso Mango", "Fresh Bananas", "Shimla Apples", "Green Grapes", "Sweet Oranges", "Papaya", "Pomegranate", "Watermelon", "Fresh Pears", "Seasonal Fruit Box"},
        {"Fresh Tomatoes", "Potatoes", "Red Onions", "Baby Spinach", "Carrots", "Cucumber", "Cauliflower", "Green Capsicum", "Button Mushrooms", "Fresh Vegetable Box"},
        {"Orange Juice", "Apple Juice", "Mango Drink", "Tender Coconut Water", "Mixed Fruit Juice", "Lemon Cooler", "Iced Tea", "Aam Panna", "Pomegranate Juice", "Ginger Lemon Drink"},
        {"Dark Chocolate Bar", "Milk Chocolate Bar", "Hazelnut Chocolate", "Chocolate Truffles", "Cocoa Wafers", "Caramel Toffees", "Fruit Candy", "Chocolate Almonds", "Cocoa Bites", "Assorted Chocolate Box"},
        {"Roasted Makhana", "Masala Peanuts", "Potato Chips", "Banana Chips", "Roasted Almonds", "Trail Mix", "Multigrain Crackers", "Roasted Chana", "Salted Cashews", "Snack Combo"},
        {"Multigrain Bread", "Butter Cookies", "Oat Biscuits", "Rusk Toast", "Chocolate Muffins", "Croissants", "Millet Cookies", "Whole Wheat Buns", "Fruit Cake", "Bakery Cookie Box"},
        {"Vanilla Ice Cream", "Chocolate Ice Cream", "Mango Sorbet", "Kesar Kulfi", "Strawberry Ice Cream", "Butterscotch Ice Cream", "Chocolate Brownie Dessert", "Frozen Yogurt", "Pista Kulfi", "Dessert Party Pack"},
        {"Kaju Katli", "Motichoor Laddu", "Mysore Pak", "Besan Laddu", "Coconut Barfi", "Rasgulla", "Soan Papdi", "Dry Fruit Halwa", "Gulab Jamun", "Festive Sweet Box"},
        {"Fresh Paneer", "Plain Curd", "Greek Yogurt", "Salted Butter", "Cow Ghee", "Fresh Milk", "Cheddar Cheese", "Buttermilk", "Free Range Eggs", "Mozzarella Cheese"},
        {"Basmati Rice", "Whole Wheat Atta", "Toor Dal", "Moong Dal", "Masoor Dal", "Poha", "Rava", "Rolled Oats", "Ragi Flour", "Millet Mix"},
        {"Turmeric Powder", "Red Chilli Powder", "Coriander Powder", "Cumin Seeds", "Mustard Oil", "Groundnut Oil", "Rock Salt", "Jaggery Powder", "Garam Masala", "Mango Pickle"},
        {"Fruit Muesli", "Honey Granola", "Peanut Butter", "Almond Butter", "Raw Honey", "Strawberry Jam", "Pancake Mix", "Dosa Mix", "Breakfast Bar", "Corn Flakes"},
        {"Instant Noodles", "Ready Dal Tadka", "Tomato Soup", "Idli Batter", "Dosa Batter", "Veg Pulao Mix", "Instant Poha", "Macaroni Pasta", "Ready Rajma", "Meal Kit"},
        {"Italian Spaghetti", "Penne Pasta", "Soy Sauce", "Chilli Sauce", "Taco Shells", "Salsa Dip", "Coconut Milk", "Ramen Noodles", "Olive Oil", "Mediterranean Olives"},
        {"Chia Seeds", "Flax Seeds", "Pumpkin Seeds", "Quinoa", "Organic Jaggery", "Coconut Sugar", "Plant Protein Mix", "Green Tea", "Millet Flour", "Trail Superfood Mix"},
        {"Chicken Breast", "Chicken Curry Cut", "Chicken Drumsticks", "Goat Curry Cut", "Fresh Rohu Fish", "Salmon Fillet", "Prawns", "Chicken Mince", "Fish Fillet", "Seafood Combo"},
        {"Frozen Green Peas", "Sweet Corn", "French Fries", "Veg Momos", "Chicken Nuggets", "Frozen Paratha", "Mixed Vegetables", "Cheese Bites", "Frozen Berries", "Frozen Snack Pack"},
        {"Botanical Soap", "Aloe Face Wash", "Herbal Shampoo", "Coconut Hair Oil", "Body Lotion", "Face Moisturizer", "Mineral Sunscreen", "Lip Balm", "Hand Wash", "Skincare Gift Set"},
        {"Organic Cotton Pads", "Daily Panty Liners", "Reusable Menstrual Cup", "Intimate Wash", "Overnight Sanitary Pads", "Ultra-Thin Pads", "Cotton Tampons", "Period Heat Patch", "Biodegradable Wipes", "Period Care Kit"},
        {"Baby Diapers", "Baby Water Wipes", "Gentle Baby Wash", "Baby Lotion", "Baby Massage Oil", "Ragi Baby Cereal", "Baby Shampoo", "Baby Powder", "Feeding Bottle", "Baby Care Gift Set"},
        {"Floor Cleaner", "Dishwashing Liquid", "Laundry Detergent", "Glass Cleaner", "Bathroom Cleaner", "Plant-Based Scrub", "Microfiber Cloth", "Cleaning Brush", "Refill Cleaner", "Home Cleaning Kit"},
        {"Bamboo Tissues", "Kitchen Paper Towels", "Paper Napkins", "Compostable Garbage Bags", "Bamboo Toilet Paper", "Paper Cups", "Paper Plates", "Parchment Paper", "Food Storage Bags", "Disposable Tableware Set"},
        {"Glass Lunch Box", "Copper Water Bottle", "Pantry Storage Jar", "Wooden Chopping Board", "Steel Water Bottle", "Reusable Shopping Bag", "Kitchen Tongs", "Glass Spice Jars", "Lunch Tote", "Kitchen Essentials Set"},
        {"Dry Fruit Gift Box", "Tea Gift Hamper", "Honey Gift Set", "Chocolate Hamper", "Festive Sweet Box", "Botanical Spa Kit", "Diya Gift Set", "Organic Snack Hamper", "Celebration Gift Basket", "Seasonal Gourmet Box"}
    };

    private static final String[] IMAGE_URLS = {
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
    };

    @Override
    @Transactional
    public void run(String... args) {
        int added = 0;
        int skippedCategories = 0;

        for (int departmentIndex = 0;
             departmentIndex < SLUGS.length;
             departmentIndex++) {

            final int d = departmentIndex;
            String categorySlug = SLUGS[d];

            Category category = categories
                    .findBySlugIgnoreCase(categorySlug)
                    .orElse(null);

            if (category == null) {
                skippedCategories++;
                System.err.println(
                    "Catalog seeder: category not found: " + categorySlug);
                continue;
            }

            for (int i = 0; i < NAMES[d].length; i++) {
                String sku = String.format(
                    Locale.ROOT,
                    "ORG24-%02d-%02d",
                    d + 1,
                    i + 1
                );

                if (products.findBySkuIgnoreCase(sku).isPresent()) {
                    continue;
                }

                String name = NAMES[d][i];
                int price = 49 + ((d * 37 + i * 23) % 451);
                int mrp = price + 20 + (price / 8);
                Instant now = Instant.now();

                Product p = new Product();
                p.setSku(sku);
                p.setName(name);
                p.setSlug(
                    name.toLowerCase(Locale.ROOT)
                        .replaceAll("[^a-z0-9]+", "-")
                        + "-" + sku.toLowerCase(Locale.ROOT)
                );
                p.setBrand("Organica Harvest");
                p.setSubcategory(category.getName());
                p.setDescription(
                    name + " selected for the Organica everyday collection."
                );
                p.setIngredients(name);
                p.setOrigin("India");
                p.setUnitSize("1 pack");
                p.setPrice(BigDecimal.valueOf(price));
                p.setOriginalPrice(BigDecimal.valueOf(mrp));
                p.setDiscountPercent((mrp - price) * 100 / mrp);
                p.setStockQuantity(10 + ((d * 13 + i * 7) % 91));
                p.setRating(new BigDecimal("4.50"));
                p.setReviewCount(0);
                p.setImageUrl(IMAGE_URLS[d % IMAGE_URLS.length]);
                p.setFeatured(i == 0);
                p.setBestSeller(i < 2);
                p.setNewArrival(i >= 8);
                p.setTrending(i == 1 || i == 3);
                p.setDailyEssential(d < 12);
                p.setActive(true);
                p.setDietaryType(d == 15 ? "Non-Veg" : "Veg");
                p.setStorageInstruction(
                    "Store as directed on the product packaging"
                );
                p.setAttributes("Organica catalog");
                p.setDeliveryEtaMins(12);
                p.setCategory(category);
                p.setCreatedAt(now);
                p.setUpdatedAt(now);

                products.save(p);
                added++;
            }
        }

        System.out.println(
            "Catalog seeder finished. Added: " + added
            + ", skipped missing categories: " + skippedCategories
        );
    }
}
