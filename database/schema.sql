-- ============================================================================
-- ORGANICA QUICK-COMMERCE & ORGANIC SUPERMARKET — MYSQL 8.0+ DATABASE SCHEMA
-- Database Name: organica
-- Backend: Java 17+ / Spring Boot 3.2.5 / Spring Data JPA / Hibernate
-- Supports 24 Product Departments, Subcategories, Brands, INR (₹) Pricing,
-- MRP & Discounts, Coupons, Serviceable Indian PIN Codes, Carts, and Orders
-- ============================================================================

CREATE DATABASE IF NOT EXISTS organica
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE organica;

-- 1. USERS TABLE (BCrypt hashed passwords & role-based access control)
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(40) DEFAULT '',
  address VARCHAR(255) DEFAULT '',
  city VARCHAR(100) DEFAULT '',
  state VARCHAR(80) DEFAULT '',
  postal_code VARCHAR(30) DEFAULT '',
  role VARCHAR(30) NOT NULL DEFAULT 'ROLE_CUSTOMER',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_email (email)
) ENGINE=InnoDB;

-- 2. CATEGORIES TABLE (All 24 Quick-Commerce & Supermarket Departments)
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL UNIQUE,
  aisle_group VARCHAR(120) NOT NULL DEFAULT 'Fresh Produce & Dairy',
  subcategories_csv TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_categories_slug (slug)
) ENGINE=InnoDB;

-- 3. PRODUCTS TABLE (INR Selling Price, MRP, Discount %, Brand, Subcategory, Stock)
CREATE TABLE IF NOT EXISTS products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  brand VARCHAR(120) NOT NULL DEFAULT 'Organica Harvest',
  subcategory VARCHAR(120) NOT NULL DEFAULT 'General',
  description TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  origin VARCHAR(160) NOT NULL,
  unit_size VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  discount_percent INT NOT NULL DEFAULT 0,
  stock_quantity INT NOT NULL DEFAULT 0,
  rating DECIMAL(3, 2) NOT NULL DEFAULT 4.85,
  review_count INT NOT NULL DEFAULT 24,
  image_url VARCHAR(500) NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  best_seller BOOLEAN NOT NULL DEFAULT FALSE,
  new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
  trending BOOLEAN NOT NULL DEFAULT FALSE,
  daily_essential BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  dietary_type VARCHAR(40) NOT NULL DEFAULT 'Veg',
  storage_instruction VARCHAR(255) NOT NULL DEFAULT 'Store in a cool, dry place',
  attributes VARCHAR(255) NOT NULL DEFAULT 'Quality Verified',
  delivery_eta_mins INT NOT NULL DEFAULT 12,
  category_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_products_sku (sku),
  INDEX idx_products_slug (slug),
  INDEX idx_products_category (category_id),
  INDEX idx_products_subcategory (subcategory),
  INDEX idx_products_brand (brand)
) ENGINE=InnoDB;

-- 4. COUPONS TABLE (Promo & Bank Offer Codes)
CREATE TABLE IF NOT EXISTS coupons (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  discount_type VARCHAR(20) NOT NULL DEFAULT 'FLAT',
  discount_value DECIMAL(10, 2) NOT NULL,
  min_order_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  max_discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  expiry_date VARCHAR(30) NOT NULL DEFAULT '2027-12-31',
  INDEX idx_coupons_code (code)
) ENGINE=InnoDB;

-- 5. SERVICEABLE PINCODES TABLE (Express Dark Store Delivery Zones)
CREATE TABLE IF NOT EXISTS serviceable_pincodes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  pincode VARCHAR(12) NOT NULL UNIQUE,
  city VARCHAR(100) NOT NULL,
  area_name VARCHAR(140) NOT NULL,
  state VARCHAR(100) NOT NULL,
  eta_minutes INT NOT NULL DEFAULT 12,
  delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 35.00,
  free_delivery_threshold DECIMAL(10, 2) NOT NULL DEFAULT 299.00,
  min_order_amount DECIMAL(10, 2) NOT NULL DEFAULT 99.00,
  serviceable BOOLEAN NOT NULL DEFAULT TRUE,
  INDEX idx_pincodes_code (pincode)
) ENGINE=InnoDB;

-- 6. CARTS TABLE
CREATE TABLE IF NOT EXISTS carts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. CART ITEMS TABLE
CREATE TABLE IF NOT EXISTS cart_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  cart_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_cart_product (cart_id, product_id)
) ENGINE=InnoDB;

-- 8. ORDERS TABLE (With Coupon Discount, Cancellation Reason & Express ETA)
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(64) NOT NULL UNIQUE,
  user_id BIGINT NULL,
  customer_email VARCHAR(160) NOT NULL,
  recipient_name VARCHAR(120) NOT NULL,
  recipient_phone VARCHAR(40) NOT NULL,
  shipping_address VARCHAR(255) NOT NULL,
  shipping_city VARCHAR(100) NOT NULL,
  shipping_state VARCHAR(80) NOT NULL,
  shipping_postal_code VARCHAR(30) NOT NULL,
  delivery_notes VARCHAR(500) DEFAULT '',
  subtotal DECIMAL(10, 2) NOT NULL,
  coupon_code VARCHAR(40) NULL,
  coupon_discount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  shipping_fee DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'CONFIRMED',
  cancellation_reason VARCHAR(255) NULL,
  payment_method VARCHAR(60) NOT NULL,
  payment_status VARCHAR(60) NOT NULL,
  tracking_code VARCHAR(100) NOT NULL,
  estimated_delivery_mins INT NOT NULL DEFAULT 12,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_orders_number (order_number),
  INDEX idx_orders_user (user_id),
  INDEX idx_orders_status (status)
) ENGINE=InnoDB;

-- 9. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  product_id BIGINT NULL,
  product_name VARCHAR(180) NOT NULL,
  product_sku VARCHAR(64) NOT NULL,
  unit_size VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- SEED DATA: ALL 24 QUICK-COMMERCE DEPARTMENTS, COUPONS & PIN CODES
-- Note: Spring Boot's DataSeeder.java also seeds these automatically on boot.
-- ============================================================================

INSERT IGNORE INTO categories (id, name, slug, aisle_group, subcategories_csv, description, image_url) VALUES
(1, 'Fruits', 'fruits', 'Fresh Produce & Dairy', 'Common Fruits,Seasonal Fruits,Exotic & Imported,Cut Fruits & Bowls,Berries,Melons & Coconuts', 'Farm-fresh common, seasonal, exotic, imported, and hygienically cut fruits, berries, melons, and tender coconuts.', '/src/assets/images/qc_fruits_vegetables_1791781893304.jpg'),
(2, 'Vegetables', 'vegetables', 'Fresh Produce & Dairy', 'Daily Vegetables,Leafy Greens,Root Vegetables,Exotic Vegetables,Mushrooms & Sprouts,Herbs & Cut Mixes', 'Daily staples, hydroponic leafy greens, root vegetables, mushrooms, sprouts, and pre-washed salad mixes.', '/src/assets/images/qc_fruits_vegetables_1791781893304.jpg'),
(3, 'Juices and Drinks', 'juices-and-drinks', 'Snacks, Bakery & Confectionery', 'Cold-Pressed & Fresh,Coconut Water & Smoothies,Soft Drinks & Mixers,Energy & Sports Drinks,Tea & Filter Coffee', 'Cold-pressed juices, tender coconut water, smoothies, kombucha, artisan coffee, and Darjeeling teas.', '/src/assets/images/prod_organic_groceries_1791780026522.jpg'),
(4, 'Chocolates and Confectionery', 'chocolates-and-confectionery', 'Snacks, Bakery & Confectionery', 'Artisan Dark Chocolate,Milk Chocolate & Bars,Assorted Gift Boxes,Wafers & Pralines,Candies, Toffees & Gum', 'Single-origin Indian craft chocolates, hazelnut pralines, assorted gift boxes, wafers, and confectionery.', '/src/assets/images/qc_snacks_bakery_1791781920033.jpg'),
(5, 'Snacks', 'snacks', 'Snacks, Bakery & Confectionery', 'Chips, Nachos & Popcorn,Indian Namkeen & Mixtures,Roasted Makhana & Snacks,Crackers & Pretzels,Nuts, Seeds & Trail Mixes', 'Vacuum-cooked chips, nachos, traditional Bikaneri namkeen, roasted foxnuts, almonds, and trail mixes.', '/src/assets/images/qc_snacks_bakery_1791781920033.jpg'),
(6, 'Biscuits and Bakery', 'biscuits-and-bakery', 'Fresh Produce & Dairy', 'Artisan Breads & Buns,Sourdough & Pav,Biscuits & Cookies,Rusks & Khari,Croissants, Muffins & Cakes', 'Freshly baked sourdough loaves, multigrain breads, butter croissants, millet cookies, and cardamom rusks.', '/src/assets/images/qc_snacks_bakery_1791781920033.jpg'),
(7, 'Ice Cream and Desserts', 'ice-cream-and-desserts', 'Fresh Produce & Dairy', 'Ice Cream Tubs,Cones & Bars,Matka Kulfi,Frozen Yoghurt & Gelato,Vegan Desserts & Puddings', 'Slow-churned Belgian chocolate tubs, kesar pista matka kulfi, probiotic frozen yoghurt, and vegan gelato.', '/src/assets/images/qc_dairy_sweets_1791781909328.jpg'),
(8, 'Indian Sweets and Festive Foods', 'indian-sweets-and-festive-foods', 'Snacks, Bakery & Confectionery', 'Kaju Katli & Nut Sweets,Desi Ghee Laddus,Traditional Barfi & Halwa,Bengali & Syrup Sweets,Festive Celebration Hampers', 'Pure A2 ghee motichoor laddus, silver-leaf kaju katli, Mysore pak, rasmalai, and festive gift boxes.', '/src/assets/images/qc_dairy_sweets_1791781909328.jpg'),
(9, 'Dairy and Eggs', 'dairy-and-eggs', 'Fresh Produce & Dairy', 'A2 Milk & Flavoured Milk,Curd, Yoghurt & Buttermilk,Fresh Paneer & Tofu,Artisan Cheese & Butter,A2 Bilona Ghee & Cream,Free-Range Eggs & Plant Milk', 'A2 Gir cow milk, malai paneer, Greek yoghurt, cultured butter, Vedic bilona ghee, oat milk, and free-range eggs.', '/src/assets/images/qc_dairy_sweets_1791781909328.jpg'),
(10, 'Staples', 'staples', 'Staples, Kitchen & Ready Meals', 'Basmati & Regional Rice,Chakki Atta & Special Flours,Toor, Moong & Masoor Dal,Poha, Rava, Maida & Oats,Unpolished Millets & Pulses', 'Aged Himalayan basmati rice, stone-ground khapli & sharbati atta, unpolished dals, poha, oats, and native millets.', '/src/assets/images/qc_staples_spices_1791781934012.jpg'),
(11, 'Cooking Essentials', 'cooking-essentials', 'Staples, Kitchen & Ready Meals', 'Wood-Pressed & Cold-Pressed Oils,Whole Spices & Blends,Regional Masalas & Pastes,Rock Salt, Sugar & Jaggery,Ketchup, Sauces & Pickles', 'Wood-pressed groundnut & mustard oils, single-origin turmeric, garam masala, organic jaggery, and heirloom pickles.', '/src/assets/images/qc_staples_spices_1791781934012.jpg'),
(12, 'Breakfast', 'breakfast', 'Staples, Kitchen & Ready Meals', 'Muesli, Granola & Cornflakes,Peanut & Almond Butters,Raw Honey, Jams & Spreads,Pancake & Dosa Mixes,Protein & Breakfast Bars', 'Fruit & nut muesli, stone-ground peanut butter, raw wildflower honey, fruit preserves, and millet pancake mixes.', '/src/assets/images/prod_organic_groceries_1791780026522.jpg'),
(13, 'Instant and Ready-to-Eat Food', 'instant-and-ready-to-eat-food', 'Staples, Kitchen & Ready Meals', 'Millet & Wheat Noodles,Heat & Eat Indian Curries,Soups & Cup Meals,Idli, Dosa & Dhokla Batters,DIY Meal Kits', 'Zero-maida millet noodles, retort-packed dal makhani & paneer curries, fresh stone-ground idli dosa batters, and soups.', '/src/assets/images/qc_staples_spices_1791781934012.jpg'),
(14, 'International Food', 'international-food', 'Staples, Kitchen & Ready Meals', 'Italian Pasta & Olive Oils,Asian Ramen, Nori & Sauces,Mexican Tacos, Salsa & Wraps,Middle Eastern Hummus & Olives,Imported Cheese & Crackers', 'Bronze-die Italian durum pasta, Korean ramen, Japanese soy & miso, Mexican tortillas & salsa, and Mediterranean olives.', '/src/assets/images/prod_organic_groceries_1791780026522.jpg'),
(15, 'Organic and Health Foods', 'organic-and-health-foods', 'Personal, Baby & Wellness Care', 'Superfoods & Adaptogens,Chia, Flax & Hemp Seeds,Gluten-Free Pantry,Plant-Based Protein,Natural Sweeteners & Herbal Teas', 'Certified organic superfoods, KSM-66 ashwagandha, ceremonial matcha, chia & hemp seeds, and plant proteins.', '/src/assets/images/prod_wellness_supplements_1791780051619.jpg'),
(16, 'Fresh Meat and Seafood', 'fresh-meat-and-seafood', 'Fresh Produce & Dairy', 'Antibiotic-Free Chicken Cuts,Pasture-Raised Goat & Lamb,Fresh Catch Fish Fillets,Cleaned Prawns & Coastal Seafood,Chef-Marinated Ready-to-Cook', 'Cold-chain 0–4°C antibiotic-residue-free chicken, tender goat curry cuts, Norwegian salmon, and cleaned tiger prawns.', '/src/assets/images/qc_fruits_vegetables_1791781893304.jpg'),
(17, 'Frozen Food', 'frozen-food', 'Fresh Produce & Dairy', 'Frozen Green Peas & Corn,French Fries & Potato Wedges,Crispy Veg & Cheese Snacks,Chicken Nuggets & Momos,Parathas & Frozen Desserts', 'IQF sweet green peas, sweet corn, crispy peri-peri fries, Himalayan momos, Malabar parathas, and party snacks.', '/src/assets/images/qc_snacks_bakery_1791781920033.jpg'),
(18, 'Personal Care', 'personal-care', 'Personal, Baby & Wellness Care', 'Botanical Face Serums & Masks,Bath Soaps & Body Wash,Shampoos, Conditioners & Hair Oils,Sunscreen & Daily Moisturisers,Oral Care, Deodorants & Grooming', 'Clinical botanical skincare, cold-pressed hair oils, sulfate-free shampoos, mineral sunscreens, and herbal oral care.', '/src/assets/images/prod_natural_skincare_1791780040700.jpg'),
(19, 'Women''s Hygiene', 'womens-hygiene', 'Personal, Baby & Wellness Care', 'Organic Bamboo Sanitary Pads,Rash-Free Panty Liners,Menstrual Cups & Period Care,Intimate Wash & Cramp Relief', 'Dermatologically tested 100% organic cotton & bamboo sanitary pads, breathable panty liners, and natural cramp relief.', '/src/assets/images/qc_home_personal_1791781946034.jpg'),
(20, 'Baby Care', 'baby-care', 'Personal, Baby & Wellness Care', 'Breathable Baby Diapers & Pants,99% Pure Water Baby Wipes,Gentle Baby Wash, Lotion & Oils,Stage 1–3 Organic Baby Food,Feeding Bottles & Maternity Care', 'Plant-based breathable diapers, 99% pure water wipes, sprouted ragi porridge, cold-pressed baby massage oil, and bottles.', '/src/assets/images/qc_home_personal_1791781946034.jpg'),
(21, 'Household Cleaning', 'household-cleaning', 'Home, Cleaning & Lifestyle', 'Refillable Surface & Floor Cleaners,Dishwashing Liquid & Bars,Plant-Based Laundry Detergent,Bathroom & Disinfectant Sprays,Sponges, Scrubs & Microfiber Cloths', 'Plant-derived floor cleaners, eucalyptus surface sprays, bio-enzyme laundry detergents, dish gels, and compostable scrubs.', '/src/assets/images/prod_eco_household_1791780066780.jpg'),
(22, 'Paper and Disposable Products', 'paper-and-disposable-products', 'Home, Cleaning & Lifestyle', 'Unbleached Bamboo Facial Tissues,Kitchen Paper Towels & Napkins,Compostable Cornstarch Garbage Bags,Parchment Paper, Foil & Cling Wrap,Bagasse Eco Meal Trays', 'FSC-certified bamboo facial tissues, washable kitchen rolls, cornstarch biodegradable garbage bags, and parchment paper.', '/src/assets/images/prod_eco_household_1791780066780.jpg'),
(23, 'Home and Kitchen', 'home-and-kitchen', 'Home, Cleaning & Lifestyle', 'Borosilicate Glass Lunch Boxes,Copper & Insulated Water Bottles,Airtight Pantry Jars & Storage,Kitchen Tools & Chopping Boards,Reusable Shopping Bags & Linens', 'Borosilicate glass tiffins, hammered pure copper water bottles, acacia chopping boards, and airtight pantry organizers.', '/src/assets/images/qc_home_personal_1791781946034.jpg'),
(24, 'Gifting and Seasonal Specials', 'gifting-and-seasonal-specials', 'Snacks, Bakery & Confectionery', 'Festive Dry Fruit & Nut Boxes,Artisan Tea & Honey Hampers,Botanical Spa & Self-Care Kits,Puja Samagri & Brass Diyas,Party Hosting & Grazing Bundles', 'Curated festive dry-fruit chests, gourmet tea & honey hampers, brass diyas, organic gulal, and celebration gift boxes.', '/src/assets/images/qc_dairy_sweets_1791781909328.jpg');

INSERT IGNORE INTO coupons (id, code, description, discount_type, discount_value, min_order_amount, max_discount_amount, active, expiry_date) VALUES
(1, 'FIRST100', 'Flat ₹100 OFF on your first quick-commerce order above ₹499', 'FLAT', 100.00, 499.00, 100.00, TRUE, '2027-12-31'),
(2, 'BLINK15', '15% OFF up to ₹180 on Fresh Fruits, Vegetables & Organic Foods above ₹599', 'PERCENTAGE', 15.00, 599.00, 180.00, TRUE, '2027-12-31'),
(3, 'SUPER50', 'Flat ₹50 OFF on daily grocery baskets above ₹299', 'FLAT', 50.00, 299.00, 50.00, TRUE, '2027-12-31'),
(4, 'FESTIVE250', 'Flat ₹250 OFF on Indian Sweets, Gifting Hampers & Celebration Boxes above ₹1499', 'FLAT', 250.00, 1499.00, 250.00, TRUE, '2027-12-31');

INSERT IGNORE INTO serviceable_pincodes (id, pincode, city, area_name, state, eta_minutes, delivery_fee, free_delivery_threshold, min_order_amount, serviceable) VALUES
(1, '560038', 'Bengaluru', 'Indiranagar & Domlur', 'Karnataka', 11, 35.00, 299.00, 99.00, TRUE),
(2, '560034', 'Bengaluru', 'Koramangala 4th Block', 'Karnataka', 12, 35.00, 299.00, 99.00, TRUE),
(3, '400050', 'Mumbai', 'Bandra West & Pali Hill', 'Maharashtra', 14, 35.00, 299.00, 99.00, TRUE),
(4, '110016', 'New Delhi', 'Hauz Khas & Green Park', 'Delhi NCR', 13, 35.00, 299.00, 99.00, TRUE),
(5, '500033', 'Hyderabad', 'Jubilee Hills & Banjara Hills', 'Telangana', 15, 35.00, 299.00, 99.00, TRUE),
(6, '411007', 'Pune', 'Aundh & Baner', 'Maharashtra', 12, 35.00, 299.00, 99.00, TRUE),
(7, '600020', 'Chennai', 'Adyar & Besant Nagar', 'Tamil Nadu', 14, 35.00, 299.00, 99.00, TRUE);
