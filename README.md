# Organica — Full-Stack Indian Quick-Commerce & Organic Supermarket Platform

**Organica** is a full-stack e-commerce and quick-commerce supermarket platform built with **React + Vite (Frontend)**, **Java 17+ / Spring Boot 3.2 (Backend)**, **Spring Security (BCrypt + JWT)**, and **MySQL 8.0+ (Database)**.

It combines the breadth of a **24-department Indian supermarket** (240+ products across fresh fruits, vegetables, A2 dairy, bakery, Indian festive sweets, staples, spices, snacks, ready-to-eat meals, personal care, women's hygiene, baby care, household cleaning, kitchenware, and seasonal gifting) with the speed and convenience of **Blinkit / Zepto express delivery**.

---

## Project Architecture & Folder Structure

```text
Organica/
├── frontend/                  # Standalone React + Vite frontend workspace (for VS Code multi-root)
├── src/                       # Active React + Vite frontend source (24 departments, INR checkout, admin)
│   ├── assets/images/         # High-resolution studio photography assets
│   ├── components/            # Navbar (PIN code & live search), ProductCard (+ ADD stepper), CartDrawer, Footer
│   ├── context/               # StoreContext (Auth JWT, Cart, PIN code, Wishlist, Coupons, Reorder)
│   ├── data/                  # 24-department & 240+ product supermarket catalog seed
│   ├── pages/                 # Home, Catalog (Subcategory Rail), ProductDetail, Cart, Checkout, Tracking, Auth, Wishlist, Admin
│   ├── services/              # Spring Boot REST API client (VITE_API_URL)
│   └── types/                 # TypeScript DTO interfaces matching Spring Boot DTOs
├── backend/                   # Java 17+ Spring Boot 3.2.5 Maven project
│   ├── pom.xml                # Spring Web, Spring Data JPA, Spring Security, Validation, MySQL, JJWT
│   └── src/
│       ├── main/java/com/organica/
│       │   ├── config/        # DataSeeder (Seeds 24 departments, products, coupons, PIN codes, demo users)
│       │   ├── controller/    # Auth, Category, Product, QuickCommerce, Cart, Order, User, Admin controllers
│       │   ├── dto/           # Request & Response DTOs with Jakarta Bean Validation
│       │   ├── entity/        # JPA Entities (User, Category, Product, Cart, CartItem, Order, OrderItem, Coupon, ServiceablePincode)
│       │   ├── exception/     # GlobalExceptionHandler & custom HTTP exceptions
│       │   ├── repository/    # Spring Data JPA Repositories
│       │   ├── security/      # SecurityConfig, JwtTokenProvider, JwtAuthenticationFilter, BCrypt
│       │   └── service/       # Transactional business logic, server-side INR/GST/coupon calculation, stock restoration
│       ├── main/resources/
│       │   ├── application.properties
│       │   └── application.properties.example
│       └── test/java/com/organica/
│           ├── AuthServiceTest.java
│           └── OrderServiceTest.java
├── database/
│   └── schema.sql             # MySQL 8.0+ DDL schema & 24-department seed data
└── README.md
```

---

## All 24 Supermarket & Quick-Commerce Product Departments

1. **Fruits**: Common, seasonal (GI-tagged Ratnagiri Alphonso), exotic, imported, cut fruit bowls, berries, melons, and tender coconuts.
2. **Vegetables**: Daily vegetables, hydroponic leafy greens, root vegetables, exotic vegetables, mushrooms, sprouts, herbs, and cut mixes.
3. **Juices and Drinks**: Cold-pressed juices, coconut water, smoothies, kombucha, soft drinks, energy drinks, Darjeeling tea, and filter coffee.
4. **Chocolates and Confectionery**: Single-origin dark chocolate, milk chocolate bars, assorted praline boxes, wafers, candies, and gum.
5. **Snacks**: Vacuum-cooked chips, nachos, Bikaneri namkeen, roasted makhana, crackers, almonds, pistachios, and trail mixes.
6. **Biscuits and Bakery**: Sourdough loaves, multigrain bread, pav, butter croissants, millet cookies, cardamom rusks, and muffins.
7. **Ice Cream and Desserts**: Slow-churned ice cream tubs, cones, kesar pista matka kulfi, probiotic frozen yoghurt, and vegan gelato.
8. **Indian Sweets and Festive Foods**: Silver-leaf kaju katli, A2 ghee motichoor laddus, Mysore pak, rasmalai, and festive gift hampers.
9. **Dairy and Eggs**: A2 Gir cow milk, fresh malai paneer, Greek yoghurt, cultured butter, Vedic bilona ghee, oat milk, and free-range eggs.
10. **Staples**: Aged Himalayan basmati rice, khapli & sharbati chakki atta, unpolished toor/moong dal, poha, rava, oats, and native millets.
11. **Cooking Essentials**: Wood-pressed groundnut & mustard oils, Lakadong turmeric, Guntur chilli, regional masalas, jaggery, and pickles.
12. **Breakfast**: Fruit & nut muesli, cornflakes, stone-ground peanut butter, raw wildflower honey, fruit preserves, and millet pancake mixes.
13. **Instant and Ready-to-Eat Food**: Millet noodles, stone-ground idli/dosa batter, heat-and-eat dal makhani & paneer butter masala, and soups.
14. **International Food**: Bronze-die Italian pasta, Korean kimchi ramen, Japanese soy sauce & nori, Mexican tortillas, salsa, and olives.
15. **Organic and Health Foods**: KSM-66 ashwagandha, ceremonial Uji matcha, chia/flax/hemp seeds, plant protein isolate, and stevia.
16. **Fresh Meat and Seafood**: Cold-chain antibiotic-free chicken cuts, pasture-raised goat curry cuts, Norwegian salmon, and tiger prawns.
17. **Frozen Food**: IQF sweet green peas, sweet corn, crispy peri-peri fries, jalapeno poppers, Himalayan momos, and Malabar parathas.
18. **Personal Care**: Rosehip + bakuchiol facial serum, matcha clay mask, bhringraj hair oil, sulfate-free shampoo, and mineral sunscreen.
19. **Women's Hygiene**: 100% organic bamboo sanitary pads, breathable panty liners, medical-grade menstrual cups, and cramp relief roll-ons.
20. **Baby Care**: Plant-based breathable diaper pants, 99% pure water baby wipes, sprouted ragi porridge, and cold-pressed baby massage oil.
21. **Household Cleaning**: Eucalyptus surface cleaner, neem floor cleaner, bio-enzyme laundry detergent, dish gel, and beechwood dish brushes.
22. **Paper and Disposable Products**: Unbleached bamboo facial tissues, washable kitchen rolls, cornstarch garbage bags, and parchment paper.
23. **Home and Kitchen**: Borosilicate glass lunch boxes, hammered pure copper water bottles, acacia chopping boards, and airtight pantry jars.
24. **Gifting and Seasonal Specials**: Velvet dry-fruit chests, tea & honey hampers, brass diyas, organic gulal, and party grazing bundles.

---

## Key Quick-Commerce & Full-Stack Features

* **PIN Code Serviceability & Express ETA**: Check any 6-digit Indian PIN code (e.g. `560038` Bengaluru, `400050` Mumbai, `110016` New Delhi, `500033` Hyderabad) for instant dark-store ETA (`11–15 mins`), free delivery threshold (`₹299`), and minimum order rules (`₹99`).
* **Smart Live Search**: Instant auto-suggestions dropdown with product thumbnails, INR prices, direct `+ ADD` buttons, and trending search chips.
* **Subcategory Left Rail & Multi-Faceted Filtering**: Blinkit/Zepto-style left subcategory navigation rail on department pages, plus filters for Brand, Dietary Type (`Organic`, `Veg`, `Vegan`, `Gluten-Free`, `Non-Veg`), Price Cap (`Under ₹99`, `Under ₹199`, `Under ₹499`), In-Stock Only, and server-side pagination.
* **Quick-Commerce Product Cards**: Displays discount % badge, wishlist heart toggle, express delivery ETA, brand, pack size, selling price in `₹`, struck-through MRP, stock alerts, and an instant `+ ADD` button that converts into a `- 1 +` quantity stepper.
* **Persistent Cart, Promo Coupons & Transparent INR Billing**: Supports promo codes (`FIRST100`, `BLINK15`, `SUPER50`, `FESTIVE250`) and calculates MRP total, product discount savings, coupon discount, handling fee (`₹9`), delivery fee (`FREE` above `₹299`), and 5% GST on the server.
* **Customer Retention Features**: Saved Wishlist (`/wishlist`), Recently Viewed Products shelf, Buy Again shelf, Saved Delivery Addresses (`Home`, `Work`, `Other`), **1-Click Reorder** from Order History, and **Order Cancellation before Dispatch** with automatic stock restoration.
* **Admin Operations Console (`/admin`)**: Manage 240+ products, 24 departments, low-stock alerts, customer orders, promo coupons, and serviceable PIN codes.

---

## Demo Accounts (Seeded Automatically)

| Role | Email | Password | Capabilities |
| :--- | :--- | :--- | :--- |
| **Customer** | `clara@organica.com` | `Customer@123` | Saved addresses, wishlist, coupons, checkout, 1-click reorder, order cancellation |
| **Admin** | `admin@organica.com` | `Admin@123` | Full access to `/admin` console: Products, 24 Departments, Orders, Coupons & PIN Codes |

---

## Running Locally on Windows with VS Code

### Prerequisites
1. **Node.js 18+** (Verify with `node -v`)
2. **Java JDK 17+** (Verify with `java -version`)
3. **Apache Maven 3.9+** (Verify with `mvn -version`)
4. **MySQL Server 8.0+** running on `localhost:3306`

### Step 1: Initialize the MySQL Database
Open MySQL Workbench or the MySQL CLI and execute:
```sql
SOURCE database/schema.sql;
```
*(Alternatively, Spring Boot's `createDatabaseIfNotExist=true` and `DataSeeder.java` will automatically create the schema and seed all 24 departments, products, coupons, PIN codes, and demo accounts on startup).*

### Step 2: Configure & Run the Spring Boot Backend
Open a terminal in VS Code and run:
```powershell
cd backend
# Set environment variables (or edit src/main/resources/application.properties)
$env:DB_URL="jdbc:mysql://localhost:3306/organica?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
$env:JWT_SECRET="ReplaceWithAStrong64CharacterBase64EncodedSecretKeyForLocalDevOnly123456=="

mvn spring-boot:run
```
The Spring Boot REST API will start at `http://localhost:8080/api`.

To run backend unit tests:
```powershell
cd backend
mvn test
```

### Step 3: Configure & Run the React + Vite Frontend
Open a second terminal in the project root:
```powershell
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.
