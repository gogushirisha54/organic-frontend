package com.organica.config;

import com.organica.entity.*;
import com.organica.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Locale;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CouponRepository couponRepository;
    private final ServiceablePincodeRepository pincodeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            CouponRepository couponRepository,
            ServiceablePincodeRepository pincodeRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.couponRepository = couponRepository;
        this.pincodeRepository = pincodeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedCoupons();
        seedPincodes();
        seed24DepartmentsAndProducts();
    }

    private void seedUsers() {
        if (!userRepository.existsByEmailIgnoreCase("clara@organica.com")) {
            User customer = new User();
            customer.setFullName("Ananya Sharma");
            customer.setEmail("clara@organica.com");
            customer.setPasswordHash(passwordEncoder.encode("Customer@123"));
            customer.setPhone("+91 98450 71234");
            customer.setAddress("Flat 402, Palm Grove Residency, 100 Feet Road, Indiranagar");
            customer.setCity("Bengaluru");
            customer.setState("Karnataka");
            customer.setPostalCode("560038");
            customer.setRole(Role.ROLE_CUSTOMER);
            userRepository.save(customer);
        }

        if (!userRepository.existsByEmailIgnoreCase("admin@organica.com")) {
            User admin = new User();
            admin.setFullName("Vikramaditya Rao (Supermarket Director)");
            admin.setEmail("admin@organica.com");
            admin.setPasswordHash(passwordEncoder.encode("Admin@123"));
            admin.setPhone("+91 98201 44910");
            admin.setAddress("Organica Dark Store Hub #4, HSR Layout Sector 2");
            admin.setCity("Bengaluru");
            admin.setState("Karnataka");
            admin.setPostalCode("560102");
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);
        }
    }

    private void seedCoupons() {
        if (couponRepository.count() > 0) return;
        saveCoupon("FIRST100", "Flat ₹100 OFF on your first quick-commerce order above ₹499", "FLAT", 100, 499, 100);
        saveCoupon("BLINK15", "15% OFF up to ₹180 on Fresh Fruits, Vegetables & Organic Foods above ₹599", "PERCENTAGE", 15, 599, 180);
        saveCoupon("SUPER50", "Flat ₹50 OFF on daily grocery baskets above ₹299", "FLAT", 50, 299, 50);
        saveCoupon("FESTIVE250", "Flat ₹250 OFF on Indian Sweets, Gifting Hampers & Celebration Boxes above ₹1499", "FLAT", 250, 1499, 250);
    }

    private void saveCoupon(String code, String desc, String type, int val, int minOrder, int maxDisc) {
        Coupon c = new Coupon();
        c.setCode(code);
        c.setDescription(desc);
        c.setDiscountType(type);
        c.setDiscountValue(BigDecimal.valueOf(val));
        c.setMinOrderAmount(BigDecimal.valueOf(minOrder));
        c.setMaxDiscountAmount(BigDecimal.valueOf(maxDisc));
        c.setActive(true);
        c.setExpiryDate("2027-12-31");
        couponRepository.save(c);
    }

    private void seedPincodes() {
        if (pincodeRepository.count() > 0) return;
        savePin("560038", "Bengaluru", "Indiranagar & Domlur", "Karnataka", 11);
        savePin("560034", "Bengaluru", "Koramangala 4th Block", "Karnataka", 12);
        savePin("400050", "Mumbai", "Bandra West & Pali Hill", "Maharashtra", 14);
        savePin("110016", "New Delhi", "Hauz Khas & Green Park", "Delhi NCR", 13);
        savePin("500033", "Hyderabad", "Jubilee Hills & Banjara Hills", "Telangana", 15);
        savePin("411007", "Pune", "Aundh & Baner", "Maharashtra", 12);
        savePin("600020", "Chennai", "Adyar & Besant Nagar", "Tamil Nadu", 14);
    }

    private void savePin(String pin, String city, String area, String state, int eta) {
        ServiceablePincode sp = new ServiceablePincode();
        sp.setPincode(pin);
        sp.setCity(city);
        sp.setAreaName(area);
        sp.setState(state);
        sp.setEtaMinutes(eta);
        sp.setDeliveryFee(new BigDecimal("35.00"));
        sp.setFreeDeliveryThreshold(new BigDecimal("299.00"));
        sp.setMinOrderAmount(new BigDecimal("99.00"));
        sp.setServiceable(true);
        pincodeRepository.save(sp);
    }

    private void seed24DepartmentsAndProducts() {
        if (categoryRepository.count() > 0) return;

        String imgFruits = "/src/assets/images/qc_fruits_vegetables_1791781893304.jpg";
        String imgDairy = "/src/assets/images/qc_dairy_sweets_1791781909328.jpg";
        String imgSnacks = "/src/assets/images/qc_snacks_bakery_1791781920033.jpg";
        String imgStaples = "/src/assets/images/qc_staples_spices_1791781934012.jpg";
        String imgHome = "/src/assets/images/qc_home_personal_1791781946034.jpg";
        String imgGroceries = "/src/assets/images/prod_organic_groceries_1791780026522.jpg";
        String imgSkincare = "/src/assets/images/prod_natural_skincare_1791780040700.jpg";
        String imgWellness = "/src/assets/images/prod_wellness_supplements_1791780051619.jpg";
        String imgHousehold = "/src/assets/images/prod_eco_household_1791780066780.jpg";

        Category d1 = createDept("Fruits", "fruits", "Fresh Produce & Dairy",
                "Common Fruits,Seasonal Fruits,Exotic & Imported,Cut Fruits & Bowls,Berries,Melons & Coconuts",
                "Farm-fresh common, seasonal, exotic, imported, and hygienically cut fruits, berries, melons, and tender coconuts.", imgFruits);
        seedProduct(d1, "ORG-FR-001", "Ratnagiri GI-Tagged Alphonso Mangoes", "Organica Orchards", "Seasonal Fruits", "1 kg (4–5 pcs)", 449, 550, 38, "Organic");
        seedProduct(d1, "ORG-FR-002", "Pollachi Tender Green Coconut", "CocoPure", "Melons & Coconuts", "1 pc (Easy-Open)", 68, 80, 90, "Vegan");

        Category d2 = createDept("Vegetables", "vegetables", "Fresh Produce & Dairy",
                "Daily Vegetables,Leafy Greens,Root Vegetables,Exotic Vegetables,Mushrooms & Sprouts,Herbs & Cut Mixes",
                "Daily staples, hydroponic leafy greens, root vegetables, mushrooms, sprouts, and pre-washed salad mixes.", imgFruits);
        seedProduct(d2, "ORG-VG-011", "Hydroponic Baby Spinach (Palak)", "GreenPod Farms", "Leafy Greens", "200 g Clamshell", 58, 75, 45, "Organic");
        seedProduct(d2, "ORG-VG-012", "Ooty Fresh Button Mushrooms", "Nilgiri Harvest", "Mushrooms & Sprouts", "200 g Pack", 64, 80, 32, "Vegan");

        Category d3 = createDept("Juices and Drinks", "juices-and-drinks", "Snacks, Bakery & Confectionery",
                "Cold-Pressed & Fresh,Coconut Water & Smoothies,Soft Drinks & Mixers,Energy & Sports Drinks,Tea & Filter Coffee",
                "Cold-pressed juices, tender coconut water, smoothies, kombucha, artisan coffee, and Darjeeling teas.", imgGroceries);
        seedProduct(d3, "ORG-JD-021", "100% Cold-Pressed Valencia Orange Juice", "Raw Pressery", "Cold-Pressed & Fresh", "1 L Bottle", 245, 290, 42, "Vegan");

        Category d4 = createDept("Chocolates and Confectionery", "chocolates-and-confectionery", "Snacks, Bakery & Confectionery",
                "Artisan Dark Chocolate,Milk Chocolate & Bars,Assorted Gift Boxes,Wafers & Pralines,Candies, Toffees & Gum",
                "Single-origin Indian craft chocolates, hazelnut pralines, assorted gift boxes, wafers, and confectionery.", imgSnacks);
        seedProduct(d4, "ORG-CC-031", "Idukki 70% Single-Origin Dark Chocolate Bar", "Mason & Co", "Artisan Dark Chocolate", "70 g Bar", 265, 310, 48, "Vegan");

        Category d5 = createDept("Snacks", "snacks", "Snacks, Bakery & Confectionery",
                "Chips, Nachos & Popcorn,Indian Namkeen & Mixtures,Roasted Makhana & Snacks,Crackers & Pretzels,Nuts, Seeds & Trail Mixes",
                "Vacuum-cooked chips, nachos, traditional Bikaneri namkeen, roasted foxnuts, almonds, and trail mixes.", imgSnacks);
        seedProduct(d5, "ORG-SN-041", "Himalayan Pink Salt & Ghee Roasted Makhana", "Farmley", "Roasted Makhana & Snacks", "90 g Jar", 149, 195, 72, "Gluten-Free");

        Category d6 = createDept("Biscuits and Bakery", "biscuits-and-bakery", "Fresh Produce & Dairy",
                "Artisan Breads & Buns,Sourdough & Pav,Biscuits & Cookies,Rusks & Khari,Croissants, Muffins & Cakes",
                "Freshly baked sourdough loaves, multigrain breads, butter croissants, millet cookies, and cardamom rusks.", imgSnacks);
        seedProduct(d6, "ORG-BB-051", "Fourgrain Seeded Artisan Sourdough Loaf", "The Baker's Dozen", "Sourdough & Pav", "400 g Loaf", 185, 220, 29, "Vegan");

        Category d7 = createDept("Ice Cream and Desserts", "ice-cream-and-desserts", "Fresh Produce & Dairy",
                "Ice Cream Tubs,Cones & Bars,Matka Kulfi,Frozen Yoghurt & Gelato,Vegan Desserts & Puddings",
                "Slow-churned Belgian chocolate tubs, kesar pista matka kulfi, probiotic frozen yoghurt, and vegan gelato.", imgDairy);
        seedProduct(d7, "ORG-IC-061", "Kesar Pista Badam Matka Kulfi", "Grameen Kulfi", "Matka Kulfi", "4 x 100 ml Clay Pots", 260, 320, 38, "Veg");

        Category d8 = createDept("Indian Sweets and Festive Foods", "indian-sweets-and-festive-foods", "Snacks, Bakery & Confectionery",
                "Kaju Katli & Nut Sweets,Desi Ghee Laddus,Traditional Barfi & Halwa,Bengali & Syrup Sweets,Festive Celebration Hampers",
                "Pure A2 ghee motichoor laddus, silver-leaf kaju katli, Mysore pak, rasmalai, and festive gift boxes.", imgDairy);
        seedProduct(d8, "ORG-IS-071", "Pure Silver-Leaf Kaju Katli Diamond Box", "Anand Sweets", "Kaju Katli & Nut Sweets", "400 g Gift Box", 465, 540, 44, "Veg");

        Category d9 = createDept("Dairy and Eggs", "dairy-and-eggs", "Fresh Produce & Dairy",
                "A2 Milk & Flavoured Milk,Curd, Yoghurt & Buttermilk,Fresh Paneer & Tofu,Artisan Cheese & Butter,A2 Bilona Ghee & Cream,Free-Range Eggs & Plant Milk",
                "A2 Gir cow milk, malai paneer, Greek yoghurt, cultured butter, Vedic bilona ghee, oat milk, and free-range eggs.", imgDairy);
        seedProduct(d9, "ORG-DE-081", "Fresh Thermo-Formed Malai Paneer Block", "Akshayakalpa Organic", "Fresh Paneer & Tofu", "200 g Vacuum Pack", 115, 135, 68, "Organic");
        seedProduct(d9, "ORG-DE-082", "A2 Gir Cow Cultured Bilona Ghee", "Two Brothers Organic Farms", "A2 Bilona Ghee & Cream", "500 ml Glass Jar", 749, 890, 39, "Organic");

        Category d10 = createDept("Staples", "staples", "Staples, Kitchen & Ready Meals",
                "Basmati & Regional Rice,Chakki Atta & Special Flours,Toor, Moong & Masoor Dal,Poha, Rava, Maida & Oats,Unpolished Millets & Pulses",
                "Aged Himalayan basmati rice, stone-ground khapli & sharbati atta, unpolished dals, poha, oats, and native millets.", imgStaples);
        seedProduct(d10, "ORG-ST-091", "2-Year Aged Extra-Long Himalayan Basmati Rice", "Daawat Heritage", "Basmati & Regional Rice", "5 kg Fabric Bag", 689, 825, 48, "Organic");

        Category d11 = createDept("Cooking Essentials", "cooking-essentials", "Staples, Kitchen & Ready Meals",
                "Wood-Pressed & Cold-Pressed Oils,Whole Spices & Blends,Regional Masalas & Pastes,Rock Salt, Sugar & Jaggery,Ketchup, Sauces & Pickles",
                "Wood-pressed groundnut & mustard oils, single-origin turmeric, garam masala, organic jaggery, and heirloom pickles.", imgStaples);
        seedProduct(d11, "ORG-CE-101", "Lakadong High-Curcumin (>7.5%) Turmeric Powder", "Meghalaya Harvest", "Whole Spices & Blends", "200 g Glass Jar", 195, 240, 62, "Organic");

        Category d12 = createDept("Breakfast", "breakfast", "Staples, Kitchen & Ready Meals",
                "Muesli, Granola & Cornflakes,Peanut & Almond Butters,Raw Honey, Jams & Spreads,Pancake & Dosa Mixes,Protein & Breakfast Bars",
                "Fruit & nut muesli, stone-ground peanut butter, raw wildflower honey, fruit preserves, and millet pancake mixes.", imgGroceries);
        seedProduct(d12, "ORG-BF-111", "72% Fruit, Nut & Pumpkin Seed No-Sugar Muesli", "Yoga Bar", "Muesli, Granola & Cornflakes", "700 g Box", 369, 450, 52, "Veg");

        Category d13 = createDept("Instant and Ready-to-Eat Food", "instant-and-ready-to-eat-food", "Staples, Kitchen & Ready Meals",
                "Millet & Wheat Noodles,Heat & Eat Indian Curries,Soups & Cup Meals,Idli, Dosa & Dhokla Batters,DIY Meal Kits",
                "Zero-maida millet noodles, retort-packed dal makhani & paneer curries, fresh stone-ground idli dosa batters, and soups.", imgStaples);
        seedProduct(d13, "ORG-IR-121", "Fresh Stone-Ground Idli & Crispy Dosa Batter", "iD Fresh Food", "Idli, Dosa & Dhokla Batters", "1 kg Pouch", 88, 105, 84, "Vegan");

        Category d14 = createDept("International Food", "international-food", "Staples, Kitchen & Ready Meals",
                "Italian Pasta & Olive Oils,Asian Ramen, Nori & Sauces,Mexican Tacos, Salsa & Wraps,Middle Eastern Hummus & Olives,Imported Cheese & Crackers",
                "Bronze-die Italian durum pasta, Korean ramen, Japanese soy & miso, Mexican tortillas & salsa, and Mediterranean olives.", imgGroceries);
        seedProduct(d14, "ORG-IF-131", "Bronze-Die Durum Wheat Spaghetti (#5)", "Barilla Italia", "Italian Pasta & Olive Oils", "500 g Box", 245, 295, 58, "Vegan");

        Category d15 = createDept("Organic and Health Foods", "organic-and-health-foods", "Personal, Baby & Wellness Care",
                "Superfoods & Adaptogens,Chia, Flax & Hemp Seeds,Gluten-Free Pantry,Plant-Based Protein,Natural Sweeteners & Herbal Teas",
                "Certified organic superfoods, KSM-66 ashwagandha, ceremonial matcha, chia & hemp seeds, and plant proteins.", imgWellness);
        seedProduct(d15, "ORG-OH-141", "Sun-Dried KSM-66 Organic Ashwagandha Root Powder", "Organica Apothecary", "Superfoods & Adaptogens", "100 g Amber Jar", 380, 460, 42, "Organic");

        Category d16 = createDept("Fresh Meat and Seafood", "fresh-meat-and-seafood", "Fresh Produce & Dairy",
                "Antibiotic-Free Chicken Cuts,Pasture-Raised Goat & Lamb,Fresh Catch Fish Fillets,Cleaned Prawns & Coastal Seafood,Chef-Marinated Ready-to-Cook",
                "Cold-chain 0–4°C antibiotic-residue-free chicken, tender goat curry cuts, Norwegian salmon, and cleaned tiger prawns.", imgFruits);
        seedProduct(d16, "ORG-MS-151", "Antibiotic-Free Chicken Breast Boneless Filosofi", "Licious Cold-Chain", "Antibiotic-Free Chicken Cuts", "450 g Vacuum Pack", 279, 330, 38, "Non-Veg");

        Category d17 = createDept("Frozen Food", "frozen-food", "Fresh Produce & Dairy",
                "Frozen Green Peas & Corn,French Fries & Potato Wedges,Crispy Veg & Cheese Snacks,Chicken Nuggets & Momos,Parathas & Frozen Desserts",
                "IQF sweet green peas, sweet corn, crispy peri-peri fries, Himalayan momos, Malabar parathas, and party snacks.", imgSnacks);
        seedProduct(d17, "ORG-FF-161", "IQF Himalayan Sweet Green Peas (Safal Grade)", "Mother Dairy Safal", "Frozen Green Peas & Corn", "1 kg Family Pack", 185, 230, 74, "Vegan");

        Category d18 = createDept("Personal Care", "personal-care", "Personal, Baby & Wellness Care",
                "Botanical Face Serums & Masks,Bath Soaps & Body Wash,Shampoos, Conditioners & Hair Oils,Sunscreen & Daily Moisturisers,Oral Care, Deodorants & Grooming",
                "Clinical botanical skincare, cold-pressed hair oils, sulfate-free shampoos, mineral sunscreens, and herbal oral care.", imgSkincare);
        seedProduct(d18, "ORG-PC-171", "Rosehip + 1% Bakuchiol Cellular Renewal Facial Serum", "Flora & Stone", "Botanical Face Serums & Masks", "30 ml UV Amber Dropper", 699, 850, 34, "Vegan");

        Category d19 = createDept("Women's Hygiene", "womens-hygiene", "Personal, Baby & Wellness Care",
                "Organic Bamboo Sanitary Pads,rash-Free Panty Liners,Menstrual Cups & Period Care,Intimate Wash & Cramp Relief",
                "Dermatologically tested 100% organic cotton & bamboo sanitary pads, breathable panty liners, and natural cramp relief.", imgHome);
        seedProduct(d19, "ORG-WH-181", "100% Organic Bamboo Fibre Ultra-Thin Sanitary Pads", "Carmesi Natural", "Organic Bamboo Sanitary Pads", "12 XL Pads (Biodegradable)", 249, 299, 64, "Organic");

        Category d20 = createDept("Baby Care", "baby-care", "Personal, Baby & Wellness Care",
                "Breathable Baby Diapers & Pants,99% Pure Water Baby Wipes,Gentle Baby Wash, Lotion & Oils,Stage 1–3 Organic Baby Food,Feeding Bottles & Maternity Care",
                "Plant-based breathable diapers, 99% pure water wipes, sprouted ragi porridge, cold-pressed baby massage oil, and bottles.", imgHome);
        seedProduct(d20, "ORG-BC-191", "Plant-Based Breathable Pant-Style Baby Diapers (L)", "Pampers Pure", "Breathable Baby Diapers & Pants", "44 Pants Pack (9–14 kg)", 749, 899, 46, "Standard");

        Category d21 = createDept("Household Cleaning", "household-cleaning", "Home, Cleaning & Lifestyle",
                "Refillable Surface & Floor Cleaners,Dishwashing Liquid & Bars,Plant-Based Laundry Detergent,Bathroom & Disinfectant Sprays,Sponges, Scrubs & Microfiber Cloths",
                "Plant-derived floor cleaners, eucalyptus surface sprays, bio-enzyme laundry detergents, dish gels, and compostable scrubs.", imgHousehold);
        seedProduct(d21, "ORG-HC-201", "Eucalyptus & Spearmint Refillable Glass Surface Spray", "Organica Home", "Refillable Surface & Floor Cleaners", "500 ml Frosted Glass Bottle", 275, 340, 58, "Vegan");

        Category d22 = createDept("Paper and Disposable Products", "paper-and-disposable-products", "Home, Cleaning & Lifestyle",
                "Unbleached Bamboo Facial Tissues,Kitchen Paper Towels & Napkins,Compostable Cornstarch Garbage Bags,Parchment Paper, Foil & Cling Wrap,Bagasse Eco Meal Trays",
                "FSC-certified bamboo facial tissues, washable kitchen rolls, cornstarch biodegradable garbage bags, and parchment paper.", imgHousehold);
        seedProduct(d22, "ORG-PD-211", "100% Virgin Bamboo Unbleached Facial Tissue Box", "Beco Eco", "Unbleached Bamboo Facial Tissues", "3 Boxes (3 x 100 Pulls)", 219, 270, 76, "Vegan");

        Category d23 = createDept("Home and Kitchen", "home-and-kitchen", "Home, Cleaning & Lifestyle",
                "Borosilicate Glass Lunch Boxes,Copper & Insulated Water Bottles,Airtight Pantry Jars & Storage,Kitchen Tools & Chopping Boards,Reusable Shopping Bags & Linens",
                "Borosilicate glass tiffins, hammered pure copper water bottles, acacia chopping boards, and airtight pantry organizers.", imgHome);
        seedProduct(d23, "ORG-HK-221", "Hammered 99.9% Pure Ayurvedic Copper Water Bottle", "P-Tal Artisans", "Copper & Insulated Water Bottles", "950 ml Leak-Proof Bottle", 799, 990, 36, "Standard");

        Category d24 = createDept("Gifting and Seasonal Specials", "gifting-and-seasonal-specials", "Snacks, Bakery & Confectionery",
                "Festive Dry Fruit & Nut Boxes,Artisan Tea & Honey Hampers,Botanical Spa & Self-Care Kits,Puja Samagri & Brass Diyas,Party Hosting & Grazing Bundles",
                "Curated festive dry-fruit chests, gourmet tea & honey hampers, brass diyas, organic gulal, and celebration gift boxes.", imgDairy);
        seedProduct(d24, "ORG-GS-231", "Grand Royal Velvet Dry Fruit & Saffron Gift Chest", "Organica Bespoke", "Festive Dry Fruit & Nut Boxes", "850 g (6 Compartments)", 1299, 1599, 28, "Organic");
    }

    private Category createDept(
            String name,
            String slug,
            String aisleGroup,
            String subcategoriesCsv,
            String description,
            String imageUrl
    ) {
        Category c = new Category();
        c.setName(name);
        c.setSlug(slug);
        c.setAisleGroup(aisleGroup);
        c.setSubcategoriesCsv(subcategoriesCsv);
        c.setDescription(description);
        c.setImageUrl(imageUrl);
        return categoryRepository.save(c);
    }

    private void seedProduct(
            Category category,
            String sku,
            String name,
            String brand,
            String subcategory,
            String unitSize,
            int priceInr,
            int mrpInr,
            int stock,
            String dietaryType
    ) {
        Product p = new Product();
        p.setSku(sku);
        p.setName(name);
        p.setSlug(name.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "-") + "-" + sku.toLowerCase(Locale.ROOT));
        p.setBrand(brand);
        p.setSubcategory(subcategory);
        p.setDescription(name + " by " + brand + ". Sourced directly and quality-checked at our cold-chain dark store.");
        p.setIngredients("100% Quality Assured " + name + " (" + dietaryType + ")");
        p.setOrigin("India (Verified Partner Sourcing)");
        p.setUnitSize(unitSize);
        p.setPrice(BigDecimal.valueOf(priceInr));
        p.setOriginalPrice(BigDecimal.valueOf(mrpInr));
        int discountPct = mrpInr > priceInr
                ? BigDecimal.valueOf(mrpInr - priceInr)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(mrpInr), 0, RoundingMode.HALF_UP)
                .intValue()
                : 0;
        p.setDiscountPercent(discountPct);
        p.setStockQuantity(stock);
        p.setRating(new BigDecimal("4.85"));
        p.setReviewCount(64);
        p.setImageUrl(category.getImageUrl());
        p.setFeatured(true);
        p.setBestSeller(true);
        p.setNewArrival(false);
        p.setTrending(true);
        p.setDailyEssential(category.getId() <= 9);
        p.setActive(true);
        p.setDietaryType(dietaryType);
        p.setStorageInstruction("Store in a cool, dry place");
        p.setAttributes("FSSAI Certified · Express Dispatch");
        p.setDeliveryEtaMins(12);
        p.setCategory(category);
        productRepository.save(p);
    }
}
