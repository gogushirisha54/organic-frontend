import {
  CategoryDto,
  CouponDto,
  CustomerReview,
  DietaryType,
  OrderDto,
  ProductDto,
  ServiceablePincodeDto,
  StockStatus,
  UserDto,
} from '../types';

export const HERO_IMAGE_URL =
  '/src/assets/images/hero_organic_market_1791780009409.jpg';
export const IMG_GROCERIES =
  '/src/assets/images/prod_organic_groceries_1791780026522.jpg';
export const IMG_SKINCARE =
  '/src/assets/images/prod_natural_skincare_1791780040700.jpg';
export const IMG_WELLNESS =
  '/src/assets/images/prod_wellness_supplements_1791780051619.jpg';
export const IMG_HOUSEHOLD =
  '/src/assets/images/prod_eco_household_1791780066780.jpg';
export const IMG_FRUITS_VEG =
  '/src/assets/images/qc_fruits_vegetables_1791781893304.jpg';
export const IMG_DAIRY_SWEETS =
  '/src/assets/images/qc_dairy_sweets_1791781909328.jpg';
export const IMG_SNACKS_BAKERY =
  '/src/assets/images/qc_snacks_bakery_1791781920033.jpg';
export const IMG_STAPLES_SPICES =
  '/src/assets/images/qc_staples_spices_1791781934012.jpg';
export const IMG_HOME_PERSONAL =
  '/src/assets/images/qc_home_personal_1791781946034.jpg';

export const TRENDING_SEARCHES: string[] = [
  'Ratnagiri Alphonso Mango',
  'A2 Bilona Cow Ghee',
  'Fresh Malai Paneer',
  'Kaju Katli Gift Box',
  'Tender Coconut Water',
  'Multigrain Sourdough',
  'Roasted Peri-Peri Makhana',
  'Himalayan Basmati Rice',
  'Rosehip Bakuchiol Serum',
  'Diwali Celebration Hamper',
];

interface RawProductSeed {
  name: string;
  brand: string;
  sub: string;
  unit: string;
  price: number;
  mrp: number;
  stock: number;
  diet: DietaryType;
  storage: string;
  attr: string;
  desc: string;
}

interface DepartmentSeed {
  id: number;
  name: string;
  slug: string;
  aisleGroup: string;
  description: string;
  imageUrl: string;
  subcategories: string[];
  items: RawProductSeed[];
}

const DEPARTMENT_SEEDS: DepartmentSeed[] = [
  {
    id: 1,
    name: 'Fruits',
    slug: 'fruits',
    aisleGroup: 'Fresh Produce & Dairy',
    description:
      'Farm-fresh common, seasonal, exotic, imported, and hygienically cut fruits, berries, melons, and tender coconuts.',
    imageUrl: IMG_FRUITS_VEG,
    subcategories: [
      'Common Fruits',
      'Seasonal Fruits',
      'Exotic & Imported',
      'Cut Fruits & Bowls',
      'Berries',
      'Melons & Coconuts',
    ],
    items: [
      { name: 'Ratnagiri GI-Tagged Alphonso Mangoes', brand: 'Organica Orchards', sub: 'Seasonal Fruits', unit: '1 kg (4–5 pcs)', price: 449, mrp: 550, stock: 38, diet: 'Organic', storage: 'Store at room temperature until ripe', attr: 'Grade A · Carbide-Free Naturally Ripened', desc: 'Hand-harvested GI-tagged Ratnagiri Alphonso mangoes with rich saffron pulp and honeyed aroma.' },
      { name: 'Solapur Bhagwa Ruby Pomegranates', brand: 'Fresho Harvest', sub: 'Common Fruits', unit: '1 kg (4 pcs)', price: 189, mrp: 230, stock: 54, diet: 'Veg', storage: 'Refrigerate in crisper drawer', attr: 'Soft Seed · High Antioxidant', desc: 'Thin-skinned ruby red Bhagwa pomegranates packed with sweet, juicy arils.' },
      { name: 'Pollachi Tender Green Coconut', brand: 'CocoPure', sub: 'Melons & Coconuts', unit: '1 pc (Easy-Open)', price: 68, mrp: 80, stock: 90, diet: 'Vegan', storage: 'Chill before serving', attr: '350 ml Guaranteed Sweet Water', desc: 'Trimmed Pollachi tender coconut with laser-scored ring pull for instant hydration.' },
      { name: 'Mahabaleshwar Fresh Mulberries & Strawberries', brand: 'BerryFields', sub: 'Berries', unit: '250 g Punnet', price: 165, mrp: 210, stock: 18, diet: 'Organic', storage: 'Keep refrigerated at 2–4°C', attr: 'Morning Harvest · Pesticide-Free', desc: 'Plump, sweet-tart hill berries picked at dawn in Mahabaleshwar.' },
      { name: 'New Zealand Zespri Sungold Kiwi', brand: 'Zespri', sub: 'Exotic & Imported', unit: '3 pcs Pack', price: 195, mrp: 240, stock: 42, diet: 'Vegan', storage: 'Refrigerate once soft to touch', attr: 'Imported · 3x Vitamin C', desc: 'Golden-fleshed imported kiwifruit with tropical sweetness and smooth skin.' },
      { name: 'Chilled Rainbow Cut Fruit Salad Bowl', brand: 'Organica Kitchen', sub: 'Cut Fruits & Bowls', unit: '300 g Bowl + Fork', price: 139, mrp: 175, stock: 22, diet: 'Vegan', storage: 'Consume within 6 hours · Keep chilled', attr: 'Papaya, Pineapple, Watermelon, Kiwi & Pomegranate', desc: 'Freshly diced seasonal fruit medley prepared in an FSSAI-certified cold room.' },
      { name: 'Himachal Royal Delicious Apples', brand: 'Himalayan Crest', sub: 'Common Fruits', unit: '1 kg (4–5 pcs)', price: 210, mrp: 260, stock: 65, diet: 'Veg', storage: 'Cool dry place or refrigerator', attr: 'Unwaxed · Crisp & Juicy', desc: 'High-altitude Kinnaur and Shimla apples free from artificial wax coatings.' },
      { name: 'Yelakki Baby Bananas', brand: 'Sahyadri Farms', sub: 'Common Fruits', unit: '500 g (8–10 pcs)', price: 62, mrp: 75, stock: 80, diet: 'Veg', storage: 'Room temperature away from direct sun', attr: 'Naturally Ripened · Aromatic', desc: 'Sweet, bite-sized South Indian Yelakki bananas rich in potassium.' },
      { name: 'Imported Peruvian Hass Avocado', brand: 'Avoverde', sub: 'Exotic & Imported', unit: '2 pcs (400 g)', price: 279, mrp: 340, stock: 26, diet: 'Vegan', storage: 'Ripen at room temp, then chill', attr: 'Ready-to-Eat Creamy Texture', desc: 'Buttery, nutrient-dense Hass avocados ideal for guacamole and sourdough toast.' },
      { name: 'Kiran Seedless Dark Watermelon', brand: 'Fresho Harvest', sub: 'Melons & Coconuts', unit: '1 pc (2.2–2.8 kg)', price: 95, mrp: 125, stock: 44, diet: 'Vegan', storage: 'Chill before slicing', attr: 'Brix > 11% Sweetness Verified', desc: 'Crisp, hydrating dark-rind Kiran watermelon with ruby-red flesh.' },
    ],
  },
  {
    id: 2,
    name: 'Vegetables',
    slug: 'vegetables',
    aisleGroup: 'Fresh Produce & Dairy',
    description:
      'Daily vegetables, hydroponic leafy greens, root vegetables, exotic produce, mushrooms, culinary herbs, sprouts, and ready-to-cook cut mixes.',
    imageUrl: IMG_FRUITS_VEG,
    subcategories: [
      'Daily Vegetables',
      'Leafy Greens',
      'Root Vegetables',
      'Exotic Vegetables',
      'Mushrooms & Sprouts',
      'Herbs & Cut Mixes',
    ],
    items: [
      { name: 'Nashik Red Onions (Graded Medium)', brand: 'Organica Farms', sub: 'Daily Vegetables', unit: '1 kg Mesh Bag', price: 48, mrp: 65, stock: 120, diet: 'Veg', storage: 'Store in ventilated basket', attr: 'Dry Cured · Zero Sprouting', desc: 'Pungent, firm Nashik red onions sorted for uniform size and dry papery skins.' },
      { name: 'Hydroponic Baby Spinach (Pesticide-Free)', brand: 'Living Greens', sub: 'Leafy Greens', unit: '200 g Clamshell', price: 79, mrp: 99, stock: 34, diet: 'Organic', storage: 'Keep refrigerated at 4°C', attr: 'Triple-Washed · Ready for Salads', desc: 'Tender greenhouse-grown baby spinach leaves free from soil grit and chemical sprays.' },
      { name: 'Ooty Fresh Button Mushrooms', brand: 'Nilgiri Umami', sub: 'Mushrooms & Sprouts', unit: '200 g Punnet', price: 64, mrp: 80, stock: 29, diet: 'Vegan', storage: 'Refrigerate in paper bag', attr: 'Harvested Daily · Unbleached', desc: 'Firm, snow-white Ooty button mushrooms with delicate earthy flavour.' },
      { name: 'Heirloom Vine-Ripened Cherry Tomatoes', brand: 'Sahyadri Farms', sub: 'Exotic Vegetables', unit: '250 g Pack', price: 69, mrp: 90, stock: 45, diet: 'Organic', storage: 'Room temperature for best flavour', attr: 'Sweet Burst · Lycopene Rich', desc: 'Sun-ripened red and golden cherry tomatoes on the vine.' },
      { name: 'Agra Pahari Potatoes (Low Sugar)', brand: 'Fresho Harvest', sub: 'Root Vegetables', unit: '1 kg Pack', price: 42, mrp: 55, stock: 150, diet: 'Veg', storage: 'Cool dark pantry', attr: 'Fluffy Texture · Ideal for Roasting', desc: 'Thin-skinned Pahari potatoes with balanced starch content.' },
      { name: 'Fresh Green Broccoli Florets', brand: 'Nilgiri Umami', sub: 'Exotic Vegetables', unit: '1 pc (300–350 g)', price: 85, mrp: 110, stock: 31, diet: 'Veg', storage: 'Crisper drawer', attr: 'Compact Crown · Vitamin K Rich', desc: 'Crisp Nilgiri broccoli crowns trimmed and packed within hours of harvest.' },
      { name: 'Sprouted Mixed Moong & Moth Beans', brand: 'Organica Kitchen', sub: 'Mushrooms & Sprouts', unit: '200 g Hygienic Pack', price: 49, mrp: 60, stock: 40, diet: 'Vegan', storage: 'Keep chilled below 5°C', attr: 'RO-Water Sprouted · High Protein', desc: 'Crunchy, live sprouted green gram and moth beans for chaat and stir-fries.' },
      { name: 'Thai Stir-Fry Cut Vegetable Medley', brand: 'Organica Kitchen', sub: 'Herbs & Cut Mixes', unit: '350 g Tray', price: 115, mrp: 145, stock: 19, diet: 'Vegan', storage: 'Refrigerate & cook within 48 hrs', attr: 'Baby Corn, Bell Peppers, Broccoli & Zucchini', desc: 'Pre-washed, chef-cut vegetables ready for 5-minute wok tossing.' },
      { name: 'Fresh Italian Basil & Mint Herb Bouquet', brand: 'Living Greens', sub: 'Herbs & Cut Mixes', unit: '100 g Bunch', price: 45, mrp: 60, stock: 36, diet: 'Organic', storage: 'Keep stems in cool water', attr: 'Aromatic Essential Oil Rich', desc: 'Fragrant sweet Genovese basil and garden mint leaves.' },
      { name: 'Ooty Red Carrots & Beetroot Combo', brand: 'Fresho Harvest', sub: 'Root Vegetables', unit: '750 g Pack', price: 58, mrp: 75, stock: 62, diet: 'Veg', storage: 'Refrigerate in crisper', attr: 'Sweet & Tender · Juice Grade', desc: 'Crisp Nilgiri carrots paired with mineral-rich crimson beetroots.' },
    ],
  },
  {
    id: 3,
    name: 'Juices & Drinks',
    slug: 'juices-drinks',
    aisleGroup: 'Beverages & Confectionery',
    description:
      'Cold-pressed juices, smoothies, coconut water, sparkling sodas, energy & sports drinks, mineral water, iced teas, filter coffee, and specialty teas.',
    imageUrl: IMG_WELLNESS,
    subcategories: [
      'Cold-Pressed & Packaged Juices',
      'Coconut Water & Smoothies',
      'Soft Drinks & Mixers',
      'Energy & Sports Drinks',
      'Tea & Artisanal Coffee',
      'Water & Iced Tea',
    ],
    items: [
      { name: 'Valencia Orange Cold-Pressed Juice (No Added Sugar)', brand: 'Raw Pressery', sub: 'Cold-Pressed & Packaged Juices', unit: '1 L Bottle', price: 245, mrp: 290, stock: 32, diet: 'Vegan', storage: 'Keep refrigerated at 2–6°C', attr: 'HPP Preserved · 100% Pure Fruit', desc: 'Cold-pressed Valencia oranges with zero concentrates, water, or refined sugar.' },
      { name: 'Ceremonial First-Harvest Uji Matcha Tin', brand: 'Organica Botanicals', sub: 'Tea & Artisanal Coffee', unit: '30 g Airtight Tin', price: 890, mrp: 1050, stock: 35, diet: 'Organic', storage: 'Refrigerate after opening', attr: 'Stone-Ground in Kyoto · L-Theanine Rich', desc: 'Shade-grown first-harvest Japanese green tea powder with velvety umami finish.' },
      { name: 'Chikmagalur Single-Estate Filter Coffee Decoction Blend', brand: 'Blue Tokai', sub: 'Tea & Artisanal Coffee', unit: '250 g Valve Pack', price: 420, mrp: 480, stock: 44, diet: 'Vegan', storage: 'Airtight container away from light', attr: '80% Arabica · 20% Roasted Chicory', desc: 'Medium-dark roast South Indian filter coffee with notes of dark cocoa and roasted hazelnut.' },
      { name: 'Aamras & Alphonso Mango Nectar', brand: 'Paper Boat', sub: 'Cold-Pressed & Packaged Juices', unit: '1 L Tetra Pak', price: 110, mrp: 130, stock: 75, diet: 'Veg', storage: 'Refrigerate after opening', attr: 'No Artificial Colours or Preservatives', desc: 'Nostalgic thick Alphonso mango drink crafted from ripened Konkan fruit puree.' },
      { name: 'Tender Coconut Water with Aloe Pulp', brand: 'Storia', sub: 'Coconut Water & Smoothies', unit: '1 L Pack', price: 125, mrp: 150, stock: 58, diet: 'Vegan', storage: 'Serve chilled', attr: 'Natural Electrolytes · Zero Fat', desc: 'Refreshing tender coconut water infused with diced aloe vera cubes.' },
      { name: 'Berry Banana Probiotic Greek Yoghurt Smoothie', brand: 'Epigamia', sub: 'Coconut Water & Smoothies', unit: '180 ml Bottle', price: 75, mrp: 90, stock: 41, diet: 'Veg', storage: 'Keep refrigerated', attr: '10 g Protein · Live Cultures', desc: 'Creamy drinkable smoothie blended with real strawberries, mulberries, and Greek yoghurt.' },
      { name: 'Himalayan Natural Mineral Water Case', brand: 'Vedica', sub: 'Water & Iced Tea', unit: '6 × 1 L Bottles', price: 299, mrp: 360, stock: 60, diet: 'Vegan', storage: 'Cool dry place', attr: 'pH 7.9 Alkaline · Glacier Source', desc: 'Naturally filtered Himalayan spring water rich in calcium and magnesium bicarbonates.' },
      { name: 'Zero-Sugar Peach & Hibiscus Kombucha Iced Tea', brand: 'Bombaigirl', sub: 'Water & Iced Tea', unit: '330 ml Glass Bottle', price: 135, mrp: 160, stock: 28, diet: 'Vegan', storage: 'Keep chilled', attr: 'Live Probiotics · Only 18 kcal', desc: 'Small-batch fermented Darjeeling oolong tea infused with white peach and hibiscus.' },
      { name: 'Isotonic Electrolyte Hydration Sports Drink (Citrus)', brand: 'Fast&Up', sub: 'Energy & Sports Drinks', unit: '500 ml Bottle', price: 65, mrp: 80, stock: 85, diet: 'Vegan', storage: 'Serve cold', attr: '5 Electrolytes + Vitamin B12', desc: 'Rapid hypotonic hydration drink formulated for Indian summer heat and workouts.' },
      { name: 'Artisanal Belgian 55% Dark Hot Chocolate Mix', brand: 'Mason & Co', sub: 'Tea & Artisanal Coffee', unit: '200 g Tin', price: 385, mrp: 450, stock: 23, diet: 'Vegan', storage: 'Cool dry pantry', attr: 'Single-Origin Cacao + Organic Jaggery', desc: 'Rich drinking chocolate shaved from single-origin South Indian cacao bars.' },
    ],
  },
  {
    id: 4,
    name: 'Chocolates & Confectionery',
    slug: 'chocolates-confectionery',
    aisleGroup: 'Beverages & Confectionery',
    description:
      'Single-origin dark chocolate bars, milk chocolates, assorted praline boxes, crispy wafers, fruit candies, toffees, and mints.',
    imageUrl: IMG_SNACKS_BAKERY,
    subcategories: [
      'Dark Chocolate Bars',
      'Milk & Nut Chocolates',
      'Assorted Gift Boxes',
      'Wafers & Coated Treats',
      'Candies, Toffees & Mints',
    ],
    items: [
      { name: '70% Idukki Cacao & Sea Salt Dark Chocolate Bar', brand: 'Paul And Mike', sub: 'Dark Chocolate Bars', unit: '68 g Bar', price: 215, mrp: 250, stock: 48, diet: 'Vegan', storage: 'Store between 16–20°C', attr: 'Farm-to-Bar · Muscovado Sweetened', desc: 'International Chocolate Award winner crafted with fermented Kerala cacao beans and flaky sea salt.' },
      { name: 'Roasted Almond & Kashmiri Saffron Milk Chocolate', brand: 'Manam Chocolate', sub: 'Milk & Nut Chocolates', unit: '80 g Bar', price: 280, mrp: 325, stock: 31, diet: 'Veg', storage: 'Cool dry place', attr: '45% Single-Estate Milk Cacao', desc: 'Velvety milk chocolate studded with caramelized Mamra almonds and Pampore saffron threads.' },
      { name: 'Assorted Hazelnut Praline & Truffle Gift Box', brand: 'Fabelle', sub: 'Assorted Gift Boxes', unit: '160 g (12 Pralines)', price: 549, mrp: 650, stock: 24, diet: 'Veg', storage: 'Keep below 22°C', attr: 'Luxury Rigid Gift Box', desc: 'Handcrafted chocolate truffles filled with roasted Turkish hazelnut gianduja and espresso ganache.' },
      { name: 'Crispy Hazelnut Cocoa Wafer Cubes', brand: 'Loacker', sub: 'Wafers & Coated Treats', unit: '125 g Pouch', price: 199, mrp: 240, stock: 55, diet: 'Veg', storage: 'Reseal pouch after opening', attr: 'No Hydrogenated Fats', desc: 'Four layers of light crispy wafers filled with 75% Napolitaner hazelnut cream.' },
      { name: 'Dark Chocolate Coated Roasted Coffee Beans', brand: 'Mason & Co', sub: 'Wafers & Coated Treats', unit: '120 g Jar', price: 265, mrp: 310, stock: 29, diet: 'Vegan', storage: 'Cool pantry', attr: 'Coorg Peaberry Beans + 65% Dark Cacao', desc: 'Crunchy whole roasted coffee beans panned in bittersweet dark chocolate.' },
      { name: 'Kachha Aam & Tangy Tamarind Fruit Candies', brand: 'Pulse & Desi Pop', sub: 'Candies, Toffees & Mints', unit: '200 g Family Tub', price: 85, mrp: 100, stock: 95, diet: 'Vegan', storage: 'Ambient storage', attr: 'Real Fruit Spice Core', desc: 'Hard-boiled raw mango and imli candies with a tangy kala namak masala center.' },
      { name: 'English Butterscotch & Sea Salt Caramel Toffees', brand: 'Smoor', sub: 'Candies, Toffees & Mints', unit: '150 g Tin', price: 225, mrp: 270, stock: 37, diet: 'Veg', storage: 'Cool dry place', attr: 'Slow-Cooked Dairy Butter', desc: 'Chewy artisanal butter toffees wrapped in wax paper inside a keepsake tin.' },
      { name: '85% Extra Bitter Keto-Friendly Dark Chocolate', brand: 'Amul Artisan', sub: 'Dark Chocolate Bars', unit: '150 g Bar', price: 160, mrp: 190, stock: 70, diet: 'Vegan', storage: 'Cool dry place', attr: 'Low Sugar · High Flavanol', desc: 'Intense 85% cocoa solid dark bar with deep roasted notes.' },
      { name: 'Xylitol Spearmint & Peppermint Sugar-Free Gum', brand: 'GudGum', sub: 'Candies, Toffees & Mints', unit: 'Pack of 3 (60 pcs)', price: 135, mrp: 165, stock: 64, diet: 'Vegan', storage: 'Pocket tin', attr: 'Plastic-Free Natural Chicle Base', desc: 'Biodegradable chewing gum made from natural tree sap and organic peppermint oil.' },
      { name: 'Freeze-Dried Strawberry White & Dark Chocolate Dragees', brand: 'Smoor', sub: 'Assorted Gift Boxes', unit: '140 g Box', price: 340, mrp: 399, stock: 21, diet: 'Veg', storage: 'Keep cool', attr: 'Whole Tart Berry Center', desc: 'Whole freeze-dried strawberries enrobed in couveture chocolate.' },
    ],
  },
  {
    id: 5,
    name: 'Snacks',
    slug: 'snacks',
    aisleGroup: 'Snacks & Bakery',
    description:
      'Kettle-cooked chips, tortilla nachos, gourmet popcorn, traditional Indian namkeen & bhujia, roasted foxnuts (makhana), nuts, seeds, and trail mixes.',
    imageUrl: IMG_SNACKS_BAKERY,
    subcategories: [
      'Roasted Makhana & Healthy Snacks',
      'Namkeen, Bhujia & Mixtures',
      'Chips, Nachos & Popcorn',
      'Nuts, Dry Fruits & Trail Mixes',
      'Crackers & Dips',
    ],
    items: [
      { name: 'Himalayan Pink Salt & Black Pepper Roasted Makhana', brand: 'Farmley', sub: 'Roasted Makhana & Healthy Snacks', unit: '90 g Canister', price: 129, mrp: 165, stock: 68, diet: 'Gluten-Free', storage: 'Keep lid tightly closed', attr: 'Olive Oil Roasted · Not Fried', desc: 'Jumbo Bihar lotus seeds slow-roasted with cold-pressed olive oil and crushed black pepper.' },
      { name: 'Bikaneri CrispyMoong Dal &Aloo Bhujia Combo', brand: 'Haldiram’s', sub: 'Namkeen, Bhujia & Mixtures', unit: '2 × 400 g Pack', price: 178, mrp: 210, stock: 88, diet: 'Veg', storage: 'Airtight container', attr: 'Authentic Bikaner Moth Bean Recipe', desc: 'Classic crispy tepary bean noodles seasoned with clove, cinnamon, and black pepper.' },
      { name: 'Jalapeño & Cheddar Corn Tortilla Nacho Chips', brand: 'Cornitos', sub: 'Chips, Nachos & Popcorn', unit: '150 g Pack', price: 82, mrp: 99, stock: 74, diet: 'Gluten-Free', storage: 'Ambient dry place', attr: 'Non-GMO Stone-Ground Corn', desc: 'Crunchy stone-ground masa corn chips seasoned with fiery jalapeño and aged cheddar.' },
      { name: 'California Almonds, Pistachios & Cranberry Trail Mix', brand: 'Happilo', sub: 'Nuts, Dry Fruits & Trail Mixes', unit: '250 g Resealable Pouch', price: 269, mrp: 350, stock: 52, diet: 'Vegan', storage: 'Cool dry pantry', attr: 'High Omega-3 & Dietary Fibre', desc: 'Antioxidant blend of roasted almonds, cashews, pumpkin seeds, flaxseeds, and dried cranberries.' },
      { name: 'Kerala Coconut Oil Banana Wafer Chips', brand: 'Beyond Snack', sub: 'Chips, Nachos & Popcorn', unit: '100 g Pack', price: 65, mrp: 80, stock: 96, diet: 'Vegan', storage: 'Keep sealed', attr: 'Paper-Thin Nendran Bananas', desc: 'Authentic Nendran banana slices crisped in pure coconut oil with a pinch of turmeric and sea salt.' },
      { name: 'Hawaiian Barbeque & Caramel Gourmet Popcorn Tin', brand: '4700BC', sub: 'Chips, Nachos & Popcorn', unit: '125 g Collectible Tin', price: 159, mrp: 199, stock: 43, diet: 'Gluten-Free', storage: 'Reseal tin lid', attr: 'Mushroom Corn Kernels', desc: 'Jumbo air-popped kernels glazed with rich Madagascar vanilla caramel.' },
      { name: 'Multigrain Ragi, Jowar & Bajra Baked Lavash Crackers', brand: 'The Baker’s Dozen', sub: 'Crackers & Dips', unit: '120 g Box', price: 135, mrp: 160, stock: 39, diet: 'Veg', storage: 'Ambient storage', attr: '100% Baked · Sesame Topped', desc: 'Crisp flatbread crackers baked with ancient Indian millets and toasted white sesame.' },
      { name: 'Goan Whole Jumbo W240 Cashew Nuts', brand: 'Organica Harvest', sub: 'Nuts, Dry Fruits & Trail Mixes', unit: '250 g Glass Jar', price: 325, mrp: 395, stock: 46, diet: 'Vegan', storage: 'Cool dry place', attr: 'Export Grade W240 · Unbleached', desc: 'Creamy, crunchy whole Goan cashews roasted without oil.' },
      { name: 'Indori Khatta Meetha Poha Chivda Mixture', brand: 'Bikaji', sub: 'Namkeen, Bhujia & Mixtures', unit: '400 g Pouch', price: 112, mrp: 135, stock: 61, diet: 'Veg', storage: 'Dry pantry', attr: 'Raisins, Peanuts & Curry Leaves', desc: 'Light flattened rice snack tempered with fennel seeds, golden raisins, and roasted peanuts.' },
      { name: 'Roasted Pumpkin, Sunflower, Watermelon & Chia Seed Supermix', brand: 'True Elements', sub: 'Nuts, Dry Fruits & Trail Mixes', unit: '250 g Jar', price: 210, mrp: 265, stock: 57, diet: 'Organic', storage: 'Airtight jar', attr: '28 g Protein per 100 g', desc: 'Crunchy 5-seed superfood topper for salads, oatmeal, and mid-day snacking.' },
    ],
  },
  {
    id: 6,
    name: 'Biscuits & Bakery',
    slug: 'biscuits-bakery',
    aisleGroup: 'Snacks & Bakery',
    description:
      'Artisanal sourdough loaves, Ladi pav, French butter croissants, whole-wheat rusks, digestive biscuits, chocolate chunk cookies, and tea cakes.',
    imageUrl: IMG_SNACKS_BAKERY,
    subcategories: [
      'Sourdough, Bread & Pav',
      'Croissants, Muffins & Pastries',
      'Cookies & Digestive Biscuits',
      'Rusks & Khari',
      'Tea Cakes & Dessert Boxes',
    ],
    items: [
      { name: 'Fourgrain Seeded Artisan Sourdough Loaf', brand: 'The Baker’s Dozen', sub: 'Sourdough, Bread & Pav', unit: '400 g Loaf', price: 185, mrp: 210, stock: 28, diet: 'Vegan', storage: 'Consume within 4 days or freeze slices', attr: '36-Hour Natural Fermentation · Zero Yeast', desc: 'Crusty wild-fermented sourdough crusted with flax, sunflower, melon, and sesame seeds.' },
      { name: 'French AOP Butter Flaky Croissants (Pack of 2)', brand: 'Suchali’s Artisan Bakehouse', sub: 'Croissants, Muffins & Pastries', unit: '140 g Box', price: 195, mrp: 230, stock: 18, diet: 'Veg', storage: 'Warm in oven at 180°C for 3 mins', attr: '27 Honeycomb Laminated Layers', desc: 'Golden, shattering-crisp croissants laminated with cultured dairy butter.' },
      { name: 'Bombay Soft Ladi Pav (Zero Maida Whole Wheat)', brand: 'Harvest Gold Craft', sub: 'Sourdough, Bread & Pav', unit: '250 g (6 Pavs)', price: 52, mrp: 60, stock: 64, diet: 'Veg', storage: 'Cool dry bread box', attr: 'No Potassium Bromate · Enriched with Bran', desc: 'Pillow-soft Mumbai-style pav buns baked fresh every morning for pav bhaji and vada pav.' },
      { name: 'Belgian Dark Chocolate Chunk & Sea Salt Cookies', brand: 'Dohful', sub: 'Cookies & Digestive Biscuits', unit: '200 g Box (6 Cookies)', price: 249, mrp: 299, stock: 33, diet: 'Veg', storage: 'Microwave 10s for gooey center', attr: 'Soft-Baked · Pure Dairy Butter', desc: 'Thick, chewy bakery cookies loaded with molten Belgian dark chocolate chunks.' },
      { name: 'Cardamom & Pistachio Twice-Baked Suji Rusks', brand: 'Britannia Toastea Gold', sub: 'Rusks & Khari', unit: '300 g Pack', price: 68, mrp: 80, stock: 85, diet: 'Veg', storage: 'Airtight tin', attr: 'Real Elaichi · Chai Dipping Classic', desc: 'Golden, crunchy semolina rusks fragrant with crushed green cardamom.' },
      { name: 'Parsi Mawa & Nutmeg Dense Tea Cake', brand: 'Theobroma', sub: 'Tea Cakes & Dessert Boxes', unit: '250 g Loaf', price: 275, mrp: 310, stock: 22, diet: 'Veg', storage: 'Keep refrigerated up to 5 days', attr: 'Rich Khoya & Almond Slivers', desc: 'Irani café-style rich mawa cake spiced with freshly grated nutmeg and cardamom.' },
      { name: 'Puff Pastry Jeera & Ajwain Khari Biscuits', brand: 'Karachi Bakery', sub: 'Rusks & Khari', unit: '200 g Box', price: 110, mrp: 130, stock: 47, diet: 'Veg', storage: 'Dry airtight jar', attr: 'Flaky Hand-Rolled Puff Layers', desc: 'Light, savoury puff pastry twists seasoned with roasted cumin and carom seeds.' },
      { name: 'Rolled Oats, Jaggery & Almond Digestive Biscuits', brand: 'Unibic', sub: 'Cookies & Digestive Biscuits', unit: '250 g Family Pack', price: 79, mrp: 99, stock: 92, diet: 'Veg', storage: 'Ambient pantry', attr: 'No Refined White Sugar · High Fibre', desc: 'Wholesome tea-time biscuits sweetened with organic sugarcane jaggery.' },
      { name: 'Blueberry Crumble Eggless Bakery Muffins (Pack of 2)', brand: 'Theobroma', sub: 'Croissants, Muffins & Pastries', unit: '160 g Pack', price: 165, mrp: 195, stock: 25, diet: 'Veg', storage: 'Consume within 3 days', attr: 'Streusel Cinnamon Oat Topping', desc: 'Moist vanilla bean muffins bursting with whole blueberries and buttery oat crumble.' },
      { name: 'Overnight Overload Brownie & Blondie Dessert Box', brand: 'Sweetish House Mafia', sub: 'Tea Cakes & Dessert Boxes', unit: '240 g (4 Squares)', price: 360, mrp: 420, stock: 16, diet: 'Veg', storage: 'Serve warm or chilled', attr: 'Walnut Fudge, Nutella & Sea Salt Caramel', desc: 'Assorted box of fudgy crinkle-top brownies baked with Dutch-process cocoa.' },
    ],
  },
  {
    id: 7,
    name: 'Ice Cream & Desserts',
    slug: 'ice-cream-desserts',
    aisleGroup: 'Fresh Produce & Dairy',
    description:
      'Natural fruit & dry-fruit ice cream tubs, matka kulfi, Belgian chocolate cones, probiotic frozen yoghurt, and ready-to-serve chilled desserts.',
    imageUrl: IMG_DAIRY_SWEETS,
    subcategories: [
      'Ice Cream Tubs',
      'Matka Kulfi & Bars',
      'Crunchy Cones & Sticks',
      'Frozen Yoghurt & Keto',
      'Puddings & Packaged Desserts',
    ],
    items: [
      { name: 'Tender Coconut Natural Ice Cream Tub', brand: 'NIC Honest Ice Creams', sub: 'Ice Cream Tubs', unit: '500 ml Tub', price: 315, mrp: 360, stock: 34, diet: 'Veg', storage: 'Deep freeze at -18°C', attr: 'Real Malai Coconut Shreds · No Preservatives', desc: 'Crafted with only three ingredients: fresh milk cream, tender coconut pulp, and organic sugar.' },
      { name: 'Kesar Pista Clay Matka Kulfi (Pack of 2)', brand: 'Grameen Kulfi', sub: 'Matka Kulfi & Bars', unit: '2 × 100 ml Clay Pots', price: 150, mrp: 180, stock: 42, diet: 'Gluten-Free', storage: 'Keep frozen at -18°C', attr: 'Slow-Reduced Rabri Base', desc: 'Authentic dense Indian kulfi set in terracotta matkas with saffron and roasted pistachios.' },
      { name: 'Belgian Dark Chocolate Overload Waffle Cone', brand: 'Havmor', sub: 'Crunchy Cones & Sticks', unit: '120 ml Cone', price: 65, mrp: 75, stock: 68, diet: 'Veg', storage: 'Keep frozen', attr: 'Chocolate-Lined Crispy Waffle', desc: 'Rich dark chocolate ice cream topped with roasted almonds and fudge ripple.' },
      { name: 'Wild Berry Low-Calorie Frozen Yoghurt Tub', brand: 'NOTO Healthy Ice Cream', sub: 'Frozen Yoghurt & Keto', unit: '500 ml Tub', price: 295, mrp: 350, stock: 27, diet: 'Gluten-Free', storage: 'Freeze at -18°C', attr: '75% Less Sugar · Prebiotic Fibre', desc: 'Tangy Greek-style frozen yoghurt swirled with raspberry and blueberry compote.' },
      { name: 'Madagascar Vanilla Bean & Roasted Almond Bar', brand: 'Magnum', sub: 'Crunchy Cones & Sticks', unit: '90 ml Stick', price: 90, mrp: 99, stock: 55, diet: 'Veg', storage: 'Keep frozen', attr: 'Thick Cracking Belgian Milk Chocolate Shell', desc: 'Velvety vanilla bean ice cream encased in thick cracking chocolate and toasted almond pieces.' },
      { name: 'Sitaphal (Custard Apple) Seasonal Ice Cream Tub', brand: 'Naturals Style', sub: 'Ice Cream Tubs', unit: '500 ml Tub', price: 330, mrp: 380, stock: 19, diet: 'Veg', storage: 'Freeze at -18°C', attr: 'Real Deseeded Custard Apple Pulp', desc: 'Creamy seasonal favourite bursting with grainy, sweet custard apple pulp.' },
      { name: 'Calcutta Meetha Paan & Gulkand Kulfi Stick', brand: 'Grameen Kulfi', sub: 'Matka Kulfi & Bars', unit: '80 ml Stick', price: 58, mrp: 70, stock: 49, diet: 'Veg', storage: 'Keep frozen', attr: 'Betel Leaf, Rose Petal Jam & Fennel', desc: 'Aromatic after-dinner kulfi blended with Pushkar rose gulkand and betel leaves.' },
      { name: 'Classic Tiramisu Mascarpone Chilled Dessert Jar', brand: 'Big Chill Cakery Style', sub: 'Puddings & Packaged Desserts', unit: '180 g Glass Jar', price: 245, mrp: 290, stock: 21, diet: 'Veg', storage: 'Refrigerate at 2–5°C', attr: 'Espresso-Soaked Savoiardi & Mascarpone', desc: 'Layered Italian coffee dessert dusted with Dutch unsweetened cocoa powder.' },
      { name: 'Salted Caramel & Pecan Praline Ice Cream Tub', brand: 'Häagen-Dazs Style Craft', sub: 'Ice Cream Tubs', unit: '473 ml Pint', price: 425, mrp: 499, stock: 15, diet: 'Veg', storage: 'Freeze at -18°C', attr: 'Pure Dairy Cream · Golden Caramel Ribbon', desc: 'Ultra-dense cream ice cream ribbons with sea-salted caramel and candied pecans.' },
      { name: 'Vegan Coconut Milk Chocolate Fudge Gelato', brand: 'White Cub', sub: 'Frozen Yoghurt & Keto', unit: '450 ml Tub', price: 285, mrp: 330, stock: 24, diet: 'Vegan', storage: 'Freeze at -18°C', attr: '100% Dairy-Free · Cholesterol-Free', desc: 'Plant-based chocolate gelato churned with cold-pressed coconut milk and cacao.' },
    ],
  },
  {
    id: 8,
    name: 'Indian Sweets & Festive Foods',
    slug: 'indian-sweets-festive',
    aisleGroup: 'Beverages & Confectionery',
    description:
      'Pure A2 ghee motichoor laddus, silver-leaf Kaju Katli, Mathura peda, Bengali rasgulla, Mysurpa, and curated festive celebration hampers.',
    imageUrl: IMG_DAIRY_SWEETS,
    subcategories: [
      'Kaju Sweets & Barfi',
      'Desi Ghee Laddus',
      'Rasgulla, Gulab Jamun & Syrupy Sweets',
      'Traditional Regional Mithai',
      'Festive Gift Boxes & Hampers',
    ],
    items: [
      { name: 'Pure Silver-Leaf Kaju Katli Diamond Box', brand: 'Haldiram’s Heritage', sub: 'Kaju Sweets & Barfi', unit: '400 g Gift Box', price: 465, mrp: 540, stock: 45, diet: 'Gluten-Free', storage: 'Refrigerate after opening', attr: 'Goan W240 Cashews · Edible Chandi Vark', desc: 'Silky, melt-in-the-mouth cashew fudge diamonds topped with certified pure silver leaf.' },
      { name: 'Desi Cow Ghee Saffron Motichoor Laddu', brand: 'Anand Sweets', sub: 'Desi Ghee Laddus', unit: '250 g Box (6 pcs)', price: 235, mrp: 280, stock: 38, diet: 'Veg', storage: 'Consume within 5 days', attr: 'Fine Boondi · Melon Seeds & Kashmiri Kesar', desc: 'Soft pearls of gram flour fried in pure cow ghee and steeped in saffron cardamom syrup.' },
      { name: 'Baked Nolen Gur (Date Palm Jaggery) Rasgulla Tin', brand: 'KC Das', sub: 'Rasgulla, Gulab Jamun & Syrupy Sweets', unit: '500 g Tin (10 pcs)', price: 195, mrp: 230, stock: 52, diet: 'Gluten-Free', storage: 'Chill before serving', attr: 'Winter Bengali Date Jaggery', desc: 'Spongy chhena cottage cheese dumplings steeped in smoky caramel-toned Nolen Gur syrup.' },
      { name: 'Royal Mysore Pak (Soft Ghee Melt)', brand: 'Sri Krishna Sweets', sub: 'Traditional Regional Mithai', unit: '250 g Box', price: 290, mrp: 340, stock: 29, diet: 'Veg', storage: 'Store in cool dry place', attr: '70% Pure Cow Ghee & Roasted Besan', desc: 'Legendary South Indian fudge crafted from slow-roasted gram flour and clarified butter.' },
      { name: 'Roasted Besan & Coarse Almond Pinni Laddu', brand: 'Bombay Sweet Shop', sub: 'Desi Ghee Laddus', unit: '300 g Keepsake Box', price: 345, mrp: 399, stock: 33, diet: 'Veg', storage: '14-day shelf life at room temp', attr: 'Slow-Bhuna Besan · Crunchy Charoli', desc: 'Nutty, fragrant gram flour laddus studded with toasted almond slivers and nutmeg.' },
      { name: 'Anjeer (Fig) & Pistachio Sugar-Free Roll', brand: 'Dadus', sub: 'Kaju Sweets & Barfi', unit: '250 g Box', price: 380, mrp: 440, stock: 24, diet: 'Gluten-Free', storage: 'Keep cool', attr: 'Zero Added Sugar · Natural Fig Sweetness', desc: 'Nutrient-dense roll made purely from dried Afghan figs, pistachios, almonds, and walnuts.' },
      { name: 'Hot-Serve Khoya Gulab Jamun Tin', brand: 'Gits Artisan', sub: 'Rasgulla, Gulab Jamun & Syrupy Sweets', unit: '500 g Tin (12 pcs)', price: 165, mrp: 195, stock: 74, diet: 'Veg', storage: 'Warm for 30s before serving', attr: 'Rosewater & Green Cardamom Syrup', desc: 'Golden khoya dumplings in fragrant rose-cardamom sugar syrup.' },
      { name: 'Dharwad Peda & Mathura Kesar Peda Assortment', brand: 'Anand Sweets', sub: 'Traditional Regional Mithai', unit: '300 g Box', price: 255, mrp: 295, stock: 31, diet: 'Veg', storage: 'Cool dry place', attr: 'Caramelized Slow-Simmered Milk Solids', desc: 'Heritage milk fudge pedas slow-cooked in iron kadhais for a rich caramelized flavour.' },
      { name: 'Grand Royale Diwali Mithai & Dry Fruit Hamper', brand: 'Organica Festive', sub: 'Festive Gift Boxes & Hampers', unit: '850 g Luxury Casket', price: 1199, mrp: 1499, stock: 20, diet: 'Veg', storage: 'Cool dry place', attr: 'Kaju Katli, Pistachio Barfi, Salted Almonds & Brass Diya', desc: 'Embossed festive gift hamper combining artisan mithai, spiced dry fruits, and handcrafted brass diyas.' },
      { name: 'Agra Kesar Angoori Petha', brand: 'Panchhi Style', sub: 'Traditional Regional Mithai', unit: '400 g Pack', price: 145, mrp: 175, stock: 46, diet: 'Vegan', storage: 'Refrigerate after opening', attr: 'Translucent Ash Gourd · Saffron Infused', desc: 'Bite-sized translucent winter melon confections infused with kewra and saffron.' },
    ],
  },
  {
    id: 9,
    name: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    aisleGroup: 'Fresh Produce & Dairy',
    description:
      'A2 farm milk, thick matka dahi, fresh malai paneer, artisanal cheddar & mozzarella, cultured butter, Bilona ghee, oat milk, and free-range eggs.',
    imageUrl: IMG_DAIRY_SWEETS,
    subcategories: [
      'Milk & Plant-Based Milk',
      'Curd, Yoghurt & Buttermilk',
      'Paneer, Tofu & Cream',
      'Butter, Ghee & Cheese',
      'Free-Range & Farm Eggs',
    ],
    items: [
      { name: 'Fresh Thermo-Formed Malai Paneer Block', brand: 'Akshayakalpa Organic', sub: 'Paneer, Tofu & Cream', unit: '200 g Vacuum Pack', price: 115, mrp: 130, stock: 64, diet: 'Organic', storage: 'Keep refrigerated below 4°C', attr: 'Citric Acid Coagulated · Soft & Non-Rubbery', desc: 'Certified organic farm paneer with high milk-fat creaminess for tikkas and curries.' },
      { name: 'A2 Gir Cow Cultured Bilona Ghee', brand: 'Purity Heritage', sub: 'Butter, Ghee & Cheese', unit: '500 ml Glass Jar', price: 749, mrp: 899, stock: 39, diet: 'Organic', storage: 'Ambient pantry away from moisture', attr: 'Curd-Churned Clay Pot Method · Granular Danedar', desc: 'Golden, aromatic A2 cow ghee hand-churned from cultured whole-milk curd using the Vedic Bilona process.' },
      { name: 'Farm-Fresh Pasteurized Homogenized Toned Milk', brand: 'Amul Taaza', sub: 'Milk & Plant-Based Milk', unit: '1 L Tetra Pak', price: 74, mrp: 78, stock: 140, diet: 'Veg', storage: 'Refrigerate after opening', attr: '3.0% Fat · 8.5% SNF · Zero Preservatives', desc: 'Everyday pure pasteurized milk with long shelf life until opened.' },
      { name: 'Thick Probiotic Matka Dahi (Set Curd)', brand: 'Mother Dairy Mishti & Dahi', sub: 'Curd, Yoghurt & Buttermilk', unit: '400 g Cup', price: 52, mrp: 60, stock: 88, diet: 'Veg', storage: 'Keep refrigerated at 4°C', attr: 'Live Lactic Cultures · Creamy Cut', desc: 'Thick, naturally sweet set curd with zero added gelatin or stabilizers.' },
      { name: 'Free-Range Brown Country Hen Eggs (6 Pack)', brand: 'Eggoz Nutrition', sub: 'Free-Range & Farm Eggs', unit: '6 Eggs Carton', price: 92, mrp: 110, stock: 72, diet: 'Non-Veg', storage: 'Refrigerate pointed end down', attr: 'Herbal Hen Feed · Deep Orange Yolk · UV Sanitized', desc: 'Antibiotic-free brown eggs laid by hens raised on marigold and herbal grain feed.' },
      { name: 'Pasteurized Salted Table Butter', brand: 'Amul', sub: 'Butter, Ghee & Cheese', unit: '500 g Carton', price: 275, mrp: 285, stock: 95, diet: 'Veg', storage: 'Keep refrigerated', attr: 'Utterly Butterly Classic', desc: 'India’s iconic creamy salted dairy butter for parathas, pav bhaji, and baking.' },
      { name: 'Barista Edition Unsweetened Oat Milk', brand: 'Alt Co.', sub: 'Milk & Plant-Based Milk', unit: '1 L Pack', price: 245, mrp: 290, stock: 33, diet: 'Vegan', storage: 'Chill after opening', attr: 'Micro-Foam Steaming · Lactose-Free', desc: 'Creamy plant-based oat milk formulated to steam and pour latte art without splitting.' },
      { name: 'Shredded Mozzarella & Sharp Cheddar Pizza Cheese Blend', brand: 'Go Cheese', sub: 'Butter, Ghee & Cheese', unit: '200 g Ziplock Pouch', price: 145, mrp: 175, stock: 51, diet: 'Veg', storage: 'Keep refrigerated', attr: 'High Stretch + Aged Cheddar Tang', desc: 'Pre-shredded dual-cheese blend with anti-caking potato starch.' },
      { name: 'Spiced Jeera & Coriander Masala Chaas (Buttermilk)', brand: 'Amul Masti', sub: 'Curd, Yoghurt & Buttermilk', unit: '1 L Pack', price: 72, mrp: 80, stock: 68, diet: 'Veg', storage: 'Serve chilled', attr: 'Cooling Digestive Drink', desc: 'Refreshing churned buttermilk seasoned with roasted cumin, black salt, and ginger.' },
      { name: 'Organic High-Protein Firm Soy Tofu', brand: 'Briyas', sub: 'Paneer, Tofu & Cream', unit: '200 g Vacuum Pack', price: 85, mrp: 105, stock: 42, diet: 'Vegan', storage: 'Keep refrigerated in water', attr: 'Non-GMO Soybeans · 16 g Protein', desc: 'Pressed firm tofu ideal for pan-searing, air-frying, and Asian curries.' },
    ],
  },
  {
    id: 10,
    name: 'Staples',
    slug: 'staples',
    aisleGroup: 'Pantry, Staples & Cooking',
    description:
      'Aged Himalayan basmati rice, Chakki whole-wheat atta, unpolished toor & moong dal, rava, Indori poha, rolled oats, and ancient millets.',
    imageUrl: IMG_STAPLES_SPICES,
    subcategories: [
      'Basmati & Regional Rice',
      'Atta, Maida, Rava & Flours',
      'Dal, Lentils & Pulses',
      'Poha, Oats & Sooji',
      'Millets & Whole Grains',
    ],
    items: [
      { name: '2-Year Aged Himalayan Extra-Long Basmati Rice', brand: 'Daawat Heritage', sub: 'Basmati & Regional Rice', unit: '5 kg Burlap Bag', price: 685, mrp: 820, stock: 48, diet: 'Gluten-Free', storage: 'Cool dry pantry container', attr: '24 mm Cooked Grain Length · Biryani Grade', desc: 'Aromatic foothills basmati aged for 24 months for non-sticky, fluffy elongation.' },
      { name: 'MP Sharbati 100% Whole Wheat Chakki Atta', brand: 'Aashirvaad Select', sub: 'Atta, Maida, Rava & Flours', unit: '5 kg Pack', price: 295, mrp: 340, stock: 85, diet: 'Veg', storage: 'Airtight atta bin', attr: '100% Sehore Sharbati Wheat · Zero Maida', desc: 'Stone-milled golden Sharbati wheat flour that yields soft rotis for up to 8 hours.' },
      { name: 'Unpolished Organic Yellow Toor (Arhar) Dal', brand: 'Tata Sampann', sub: 'Dal, Lentils & Pulses', unit: '1 kg Pack', price: 179, mrp: 215, stock: 94, diet: 'Organic', storage: 'Store with bay leaf in dry jar', attr: 'Zero Oil/Water Polish · Chef Sanjeev Kapoor Curated', desc: 'Protein-rich unpolished split pigeon peas that cook rapidly into creamy dal tadka.' },
      { name: 'Thick Indori Poha (Flattened Rice Flakes)', brand: 'Tata Sampann', sub: 'Poha, Oats & Sooji', unit: '500 g Pack', price: 54, mrp: 68, stock: 110, diet: 'Gluten-Free', storage: 'Dry jar', attr: 'High Fibre · Holds Shape When Steamed', desc: 'Medium-thick rice flakes that turn light and fluffy without clumping.' },
      { name: 'Kashmiri Red Rajma (Kidney Beans)', brand: 'Organica Harvest', sub: 'Dal, Lentils & Pulses', unit: '500 g Pack', price: 115, mrp: 140, stock: 62, diet: 'Organic', storage: 'Dry airtight jar', attr: 'Small Maroon Jammu Variety · Creamy Gravy', desc: 'Heirloom Himalayan red kidney beans prized for their thin skin and buttery texture.' },
      { name: 'Stone-Ground Foxtail & Barnyard Millet Flour Combo', brand: 'Slurrp Farm', sub: 'Millets & Whole Grains', unit: '2 × 500 g Pack', price: 165, mrp: 199, stock: 41, diet: 'Gluten-Free', storage: 'Cool dry pantry', attr: 'Low Glycemic Index · Rich in Iron & Calcium', desc: 'Nutrient-dense unrefined millet flours for rotis, dosas, and savoury pancakes.' },
      { name: '100% Wholegrain Steel-Cut & Rolled Oats', brand: 'Quaker', sub: 'Poha, Oats & Sooji', unit: '1 kg Pouch', price: 189, mrp: 235, stock: 76, diet: 'Vegan', storage: 'Airtight container', attr: 'Beta-Glucan Soluble Fibre', desc: 'Heart-healthy rolled oats for overnight porridge, smoothies, and oats upma.' },
      { name: 'Double-Roasted Bombay Rava (Sooji)', brand: 'Naga', sub: 'Poha, Oats & Sooji', unit: '500 g Pack', price: 46, mrp: 55, stock: 88, diet: 'Veg', storage: 'Dry jar', attr: 'Pre-Roasted · Non-Lumping Upma & Kesari', desc: 'Coarse wheat semolina pre-roasted for fluffy rava idlis and upma.' },
      { name: 'South Indian Aged Sona Masoori Steam Rice', brand: 'India Gate', sub: 'Basmati & Regional Rice', unit: '5 kg Pack', price: 375, mrp: 440, stock: 53, diet: 'Gluten-Free', storage: 'Dry bin', attr: 'Lightweight · Everyday Meals & Pongal', desc: 'Low-starch medium-grain Sona Masoori rice ideal for daily steamed rice and lemon rice.' },
      { name: 'Unpolished Green Moong Whole & Split Chilka Dal', brand: '24 Mantra Organic', sub: 'Dal, Lentils & Pulses', unit: '1 kg Pack', price: 168, mrp: 195, stock: 67, diet: 'Organic', storage: 'Dry jar', attr: 'Easy Digestion · Khichdi & Moong Chilla', desc: 'Certified organic green gram with intact nutrient-rich hull.' },
    ],
  },
  {
    id: 11,
    name: 'Cooking Essentials',
    slug: 'cooking-essentials',
    aisleGroup: 'Pantry, Staples & Cooking',
    description:
      'Cold-pressed mustard, groundnut, and olive oils, rock salt, organic jaggery, single-origin turmeric & chillies, garam masala, pickles, and chutneys.',
    imageUrl: IMG_STAPLES_SPICES,
    subcategories: [
      'Cold-Pressed & Cooking Oils',
      'Whole Spices & Ground Masalas',
      'Salt, Sugar & Natural Jaggery',
      'Pickles, Chutneys & Pastes',
      'Sauces, Ketchup & Vinegars',
    ],
    items: [
      { name: 'Kachi Ghani Cold-Pressed Yellow Mustard Oil', brand: 'Organica Harvest', sub: 'Cold-Pressed & Cooking Oils', unit: '1 L Glass Bottle', price: 245, mrp: 295, stock: 54, diet: 'Organic', storage: 'Cool dark cupboard', attr: 'Wooden Kohlu Pressed · Natural Pungency', desc: 'Unrefined first-press Rajasthan mustard oil rich in monounsaturated fatty acids.' },
      { name: 'Estate Cold-Pressed Extra Virgin Olive Oil', brand: 'Organica Botanicals', sub: 'Cold-Pressed & Cooking Oils', unit: '500 ml Amber Glass', price: 695, mrp: 850, stock: 42, diet: 'Organic', storage: 'Away from heat and sunlight', attr: 'Acidity < 0.28% · High Polyphenol', desc: 'First-harvest Koroneiki olives cold-pressed within four hours of hand-picking.' },
      { name: 'Waigaon High-Curcumin Haldi (Turmeric) Powder', brand: 'Tata Sampann', sub: 'Whole Spices & Ground Masalas', unit: '200 g Pack', price: 78, mrp: 95, stock: 95, diet: 'Vegan', storage: 'Airtight spice box', attr: 'Guaranteed > 5% Natural Curcumin', desc: 'Single-origin Waigaon turmeric ground with intact natural essential oils.' },
      { name: 'Byadgi & Kashmiri Lal Mirch Powder Blend', brand: 'Everest', sub: 'Whole Spices & Ground Masalas', unit: '200 g Pack', price: 118, mrp: 140, stock: 82, diet: 'Vegan', storage: 'Dry masala dabba', attr: 'Vibrant Natural Crimson Colour · Mild Heat', desc: 'Low-pungency Kashmiri chillies for rich colour without overpowering spice.' },
      { name: 'Kolhapuri Sugarcane Jaggery Powder (Chemical-Free)', brand: '24 Mantra Organic', sub: 'Salt, Sugar & Natural Jaggery', unit: '500 g Pouch', price: 72, mrp: 90, stock: 77, diet: 'Organic', storage: 'Reseal tightly', attr: 'No Hydros Bleaching · Iron Rich', desc: 'Free-flowing golden jaggery powder boiled in iron pans from organic sugarcane juice.' },
      { name: 'Punjabi Royal Garam Masala (Whole Spice Ground)', brand: 'MDH Heritage', sub: 'Whole Spices & Ground Masalas', unit: '100 g Box', price: 88, mrp: 102, stock: 110, diet: 'Vegan', storage: 'Airtight tin', attr: 'Black Cardamom, Mace, Clove & Cinnamon', desc: 'Aromatic 14-spice finishing blend roasted and stone-ground in small batches.' },
      { name: 'Grandmother’s Ramkela Mango Pickle in Mustard Oil', brand: 'JhaJi Store Mithila', sub: 'Pickles, Chutneys & Pastes', unit: '250 g Glass Jar', price: 195, mrp: 240, stock: 34, diet: 'Vegan', storage: 'Use dry spoon only', attr: 'Sun-Matured · Zero Synthetic Vinegar', desc: 'Hand-cut raw Mithila mangoes cured in sun with coarsely crushed yellow mustard and kalonji.' },
      { name: 'Himalayan Pink Rock Salt (Sendha Namak)', brand: 'Tata Salt Rock', sub: 'Salt, Sugar & Natural Jaggery', unit: '1 kg Pouch', price: 98, mrp: 120, stock: 89, diet: 'Vegan', storage: 'Dry ceramic jar', attr: '84 Trace Minerals · Vrat Friendly', desc: 'Unrefined crystalline pink rock salt with balanced mineral salinity.' },
      { name: 'Homestyle Tomato Ketchup (No High-Fructose Syrup)', brand: 'Kissan Fresh', sub: 'Sauces, Ketchup & Vinegars', unit: '850 g Glass Bottle', price: 135, mrp: 165, stock: 63, diet: 'Vegan', storage: 'Refrigerate after opening', attr: '100% Sustainable Farm Tomatoes', desc: 'Thick, tangy tomato ketchup simmered with clove, onion, and garlic.' },
      { name: 'Raw Unfiltered Apple Cider Vinegar with Mother', brand: 'Kapiva', sub: 'Sauces, Ketchup & Vinegars', unit: '500 ml Amber Bottle', price: 279, mrp: 349, stock: 41, diet: 'Organic', storage: 'Shake well before use', attr: 'Himalayan Red Apples · Live Enzymes', desc: 'Unpasteurized apple cider vinegar containing live probiotic mother strands.' },
    ],
  },
  {
    id: 12,
    name: 'Breakfast',
    slug: 'breakfast',
    aisleGroup: 'Pantry, Staples & Cooking',
    description:
      'Fruit & nut muesli, golden cornflakes, dark chocolate peanut butter, raw wildflower honey, berry preserves, pancake mixes, and protein bars.',
    imageUrl: IMG_GROCERIES,
    subcategories: [
      'Muesli, Granola & Cornflakes',
      'Peanut Butter & Nut Spreads',
      'Raw Honey & Fruit Jams',
      'Pancake & Waffle Mixes',
      'Protein & Breakfast Bars',
    ],
    items: [
      { name: 'Raw Alpine Wildflower & Thyme Honey', brand: 'Organica Botanicals', sub: 'Raw Honey & Fruit Jams', unit: '380 g Glass Jar', price: 425, mrp: 520, stock: 28, diet: 'Organic', storage: 'Room temperature (do not refrigerate)', attr: 'NMR Tested 100% Pure · Unheated', desc: 'Unpasteurized raw wildflower honey rich in natural bee pollen and live enzymes.' },
      { name: 'Belgian Dark Chocolate Crunchy Peanut Butter', brand: 'Pintola', sub: 'Peanut Butter & Nut Spreads', unit: '510 g Jar', price: 239, mrp: 299, stock: 64, diet: 'Vegan', storage: 'Stir natural oil before use', attr: '26 g Protein · Zero Hydrogenated Oil', desc: 'Slow-roasted Saurashtra peanuts stone-ground with dark cocoa and crunchy peanut bits.' },
      { name: 'No-Added-Sugar 78% Fruit, Nut & Seed Muesli', brand: 'Yoga Bar', sub: 'Muesli, Granola & Cornflakes', unit: '700 g Box', price: 389, mrp: 499, stock: 47, diet: 'Veg', storage: 'Reseal inner bag', attr: 'Almonds, Cranberries, Pumpkin Seeds & Rolled Oats', desc: 'Baked wholegrain muesli loaded with Californian almonds, black raisins, and chia seeds.' },
      { name: 'Heirloom Sprouted Buckwheat & Fig Artisan Granola', brand: 'Organica Kitchen', sub: 'Muesli, Granola & Cornflakes', unit: '340 g Pouch', price: 310, mrp: 375, stock: 52, diet: 'Organic', storage: 'Cool dry pantry', attr: 'Maple Sweetened · Dehydrated at 115°F', desc: 'Activated sprouted buckwheat clusters with Mission black figs and Ceylon cinnamon.' },
      { name: 'Mahabaleshwar Whole Strawberry Fruit Preserve', brand: 'St. Dalfour Style Craft', sub: 'Raw Honey & Fruit Jams', unit: '280 g Glass Jar', price: 245, mrp: 290, stock: 33, diet: 'Vegan', storage: 'Refrigerate after opening', attr: '70% Whole Berry Fruit · Pectin Set', desc: 'Chunky strawberry preserve simmered in small copper kettles without corn syrup.' },
      { name: 'Jowar, Banana & Jaggery Kids Pancake Mix', brand: 'Slurrp Farm', sub: 'Pancake & Waffle Mixes', unit: '150 g Box', price: 139, mrp: 165, stock: 45, diet: 'Veg', storage: 'Dry pantry', attr: 'Supergrain Sorghum · No Refined Sugar', desc: 'Fluffy 5-minute breakfast pancake mix made with ancient jowar millet and real banana powder.' },
      { name: '20g Protein Double Cocoa & Almond Breakfast Bar (Pack of 4)', brand: 'The Whole Truth', sub: 'Protein & Breakfast Bars', unit: '4 × 52 g Pack', price: 399, mrp: 480, stock: 38, diet: 'Gluten-Free', storage: 'Cool dry place', attr: 'Clean Label · Dates, Cashews, Whey & Cocoa Only', desc: 'Zero artificial sweeteners, zero soy, and every single ingredient listed on the front wrapper.' },
      { name: 'Original Crispy Golden Corn Flakes', brand: 'Kellogg’s', sub: 'Muesli, Granola & Cornflakes', unit: '475 g Box', price: 175, mrp: 205, stock: 82, diet: 'Veg', storage: 'Fold liner after opening', attr: 'Iron & B-Vitamin Fortified', desc: 'Toasted golden corn flakes that stay crisp in warm or cold milk.' },
      { name: 'Stone-Ground 100% Roasted Almond Butter', brand: 'Butters & More', sub: 'Peanut Butter & Nut Spreads', unit: '200 g Glass Jar', price: 365, mrp: 430, stock: 24, diet: 'Vegan', storage: 'Room temperature', attr: 'Single Ingredient: 100% California Almonds', desc: 'Silky, unsweetened roasted almond butter rich in Vitamin E and magnesium.' },
      { name: 'Hazelnut Cocoa Spread (Palm-Oil Free)', brand: 'Fabelle Gianduja', sub: 'Peanut Butter & Nut Spreads', unit: '250 g Glass Jar', price: 295, mrp: 350, stock: 31, diet: 'Veg', storage: 'Do not refrigerate', attr: '30% Roasted Turkish Hazelnuts', desc: 'Velvety chocolate hazelnut spread crafted with cocoa butter instead of palm oil.' },
    ],
  },
  {
    id: 13,
    name: 'Instant & Ready-to-Eat Food',
    slug: 'instant-ready-food',
    aisleGroup: 'Pantry, Staples & Cooking',
    description:
      'Malabar parottas, fresh idli-dosa batter, masala noodles, gourmet soups, 3-minute Pindi chole & dal makhani, and DIY meal kits.',
    imageUrl: IMG_STAPLES_SPICES,
    subcategories: [
      'Fresh Idli-Dosa Batter & Parottas',
      'Instant Noodles & Cup Pasta',
      'Ready-to-Eat Curries & Biryanis',
      'Instant Mixes & Upma/Poha Cups',
      'Gourmet Soups & Meal Kits',
    ],
    items: [
      { name: 'Stone-Ground Idli & Crispy Dosa Fresh Batter', brand: 'iD Fresh Food', sub: 'Fresh Idli-Dosa Batter & Parottas', unit: '1 kg Spout Pouch', price: 95, mrp: 110, stock: 74, diet: 'Vegan', storage: 'Keep refrigerated at 0–4°C', attr: 'RO Water · Zero Soda or Preservatives', desc: 'Naturally fermented urad dal and rice batter for pillowy idlis and golden roast dosas.' },
      { name: 'Flaky Layered Malabar Whole-Wheat Parotta', brand: 'iD Fresh Food', sub: 'Fresh Idli-Dosa Batter & Parottas', unit: '350 g (5 Parottas)', price: 88, mrp: 105, stock: 58, diet: 'Veg', storage: 'Keep chilled · Pan-sear 2 mins', attr: 'Zero Trans Fat · Hand-Layered', desc: 'Ready-to-cook flaky Kerala parottas that puff up in two minutes on a hot tawa.' },
      { name: '2-Minute Masala Noodles (Oats & Whole Wheat)', brand: 'Maggi Nutri-Licious', sub: 'Instant Noodles & Cup Pasta', unit: '290 g (4-Pack)', price: 96, mrp: 112, stock: 120, diet: 'Veg', storage: 'Dry pantry', attr: '20 Spice Roasted Tastemaker', desc: 'Wholesome oat and wheat noodles with signature roasted masala spice sachet.' },
      { name: 'Slow-Simmered Amritsari Pindi Chole (Ready to Eat)', brand: 'MTR Authentic', sub: 'Ready-to-Eat Curries & Biryanis', unit: '300 g Retort Pack', price: 115, mrp: 140, stock: 49, diet: 'Vegan', storage: 'Heat pouch in boiling water for 3 mins', attr: 'Zero Preservatives · NASA Retort Tech', desc: 'Chickpeas slow-cooked with anardana, black cardamom, and roasted cumin.' },
      { name: 'Peshawari Black Dal Makhani (Ready to Eat)', brand: 'ITC Kitchens of India', sub: 'Ready-to-Eat Curries & Biryanis', unit: '285 g Pack', price: 149, mrp: 180, stock: 42, diet: 'Veg', storage: 'Ambient until opened', attr: 'Master Chef Bukhara Inspired Recipe', desc: 'Whole black urad lentils simmered overnight with tomato puree, ginger, and white butter.' },
      { name: 'Roasted Garlic & Sweet Corn Thick Soup Mix', brand: 'Knorr Chef’s', sub: 'Gourmet Soups & Meal Kits', unit: '4 × 50 g Value Pack', price: 165, mrp: 200, stock: 63, diet: 'Veg', storage: 'Dry cupboard', attr: '100% Real Dehydrated Vegetables · No MSG', desc: 'Comforting restaurant-style sweet corn soup ready in 3 minutes.' },
      { name: '3-Minute Cup Poha & Rava Upma Combo', brand: 'MTR Minute Fresh', sub: 'Instant Mixes & Upma/Poha Cups', unit: '2 × 70 g Cups', price: 92, mrp: 110, stock: 54, diet: 'Veg', storage: 'Just add boiling water', attr: 'Travel & Office Friendly', desc: 'Homestyle tempered poha and cashews-studded upma in convenient insulated cups.' },
      { name: 'Khaman Dhokla & Rava Idli Instant Mix Combo', brand: 'Gits', sub: 'Instant Mixes & Upma/Poha Cups', unit: '2 × 200 g Boxes', price: 128, mrp: 155, stock: 46, diet: 'Veg', storage: 'Dry pantry', attr: 'Includes Tempering Instructions', desc: 'Foolproof Gujarati spongy khaman dhokla and Karnataka rava idli mixes.' },
      { name: 'Thai Green Curry DIY 15-Minute Meal Kit', brand: 'Blue Elephant', sub: 'Gourmet Soups & Meal Kits', unit: '260 g Kit (Serves 3)', price: 295, mrp: 350, stock: 23, diet: 'Vegan', storage: 'Ambient storage', attr: 'Green Curry Paste + Coconut Milk + Kaffir Lime Leaves', desc: 'Complete Bangkok green curry kit with fresh herb paste, coconut cream, and Thai basil.' },
      { name: 'Spicy Korean Kimchi Ramen Noodle Bowl', brand: 'Nongshim Shin Style', sub: 'Instant Noodles & Cup Pasta', unit: '114 g Big Bowl', price: 119, mrp: 135, stock: 67, diet: 'Vegan', storage: 'Dry pantry', attr: 'Chewy Wheat Noodles + Fermented Kimchi Flakes', desc: 'Fiery, umami-rich Korean ramyun noodle bowl with dehydrated shiitake and kimchi.' },
    ],
  },
  {
    id: 14,
    name: 'International Food',
    slug: 'international-food',
    aisleGroup: 'Pantry, Staples & Cooking',
    description:
      'Bronze-die Italian durum pasta, San Marzano basil marinara, Japanese ramen & soy sauce, Mexican tortillas & salsa, tahini, and olives.',
    imageUrl: IMG_GROCERIES,
    subcategories: [
      'Italian Pasta, Risotto & Sauces',
      'Asian Noodles, Soy & Chili Oils',
      'Mexican Tacos, Tortillas & Salsa',
      'Mediterranean Olives, Hummus & Tahini',
      'Global Condiments & Baking',
    ],
    items: [
      { name: 'Bronze-Die Durum Wheat Penne Rigate & Spaghetti Combo', brand: 'Barilla / Borges', sub: 'Italian Pasta, Risotto & Sauces', unit: '2 × 500 g Pack', price: 325, mrp: 390, stock: 52, diet: 'Vegan', storage: 'Dry pantry', attr: '100% Italian Durum Semolina · 13g Protein', desc: 'Rough bronze-extruded surface that holds pesto and marinara sauces effortlessly.' },
      { name: 'Tuscan Sweet Basil & San Marzano Arrabbiata Sauce', brand: 'Barilla', sub: 'Italian Pasta, Risotto & Sauces', unit: '400 g Glass Jar', price: 285, mrp: 340, stock: 38, diet: 'Vegan', storage: 'Refrigerate after opening', attr: 'Sun-Ripened Italian Tomatoes + Extra Virgin Olive Oil', desc: 'Slow-simmered Italian tomato pasta sauce with chili pepper and sweet basil.' },
      { name: 'Naturally Brewed Japanese Soy Sauce', brand: 'Kikkoman', sub: 'Asian Noodles, Soy & Chili Oils', unit: '250 ml Dispenser Bottle', price: 245, mrp: 290, stock: 44, diet: 'Vegan', storage: 'Refrigerate after opening', attr: '6-Month Fermented · 4 Pure Ingredients', desc: 'Traditional honjozo brewed soy sauce with deep umami aroma and balanced saltiness.' },
      { name: 'Sichuan Crispy Garlic & Peanut Chili Oil', brand: 'Master Chow', sub: 'Asian Noodles, Soy & Chili Oils', unit: '200 g Glass Jar', price: 235, mrp: 280, stock: 49, diet: 'Vegan', storage: 'Stir before spooning', attr: 'Small-Batch Infused with Star Anise & Sichuan Pepper', desc: 'Crunchy, smoky chili oil condiment for dimsum, ramen, fried eggs, and noodles.' },
      { name: 'Soft Whole-Wheat Mexican Fajita Tortilla Wraps', brand: 'Habanero', sub: 'Mexican Tacos, Tortillas & Salsa', unit: '320 g (8 Wraps)', price: 165, mrp: 199, stock: 36, diet: 'Vegan', storage: 'Refrigerate after opening', attr: '8-Inch Soft Fold · Burrito & Quesadilla Ready', desc: 'Pliable Mexican flatbread wraps for burritos, quesadillas, and paneer fajitas.' },
      { name: 'Chunky Roasted Tomato & Jalapeño Salsa Dip', brand: 'Doritos / Wingreens', sub: 'Mexican Tacos, Tortillas & Salsa', unit: '300 g Glass Jar', price: 155, mrp: 185, stock: 58, diet: 'Vegan', storage: 'Keep refrigerated after opening', attr: 'Fire-Roasted Tomatoes, Cilantro & Lime', desc: 'Zesty restaurant-style salsa dip with diced onions and pickled jalapeños.' },
      { name: 'Spanish Pitted Green & Black Manzanilla Olives', brand: 'Figaro', sub: 'Mediterranean Olives, Hummus & Tahini', unit: '340 g Glass Jar', price: 215, mrp: 260, stock: 41, diet: 'Vegan', storage: 'Keep submerged in brine', attr: 'Harvested in Seville, Spain', desc: 'Firm, meaty Spanish table olives for pizzas, salads, and grazing boards.' },
      { name: 'Lebanese Stone-Ground White Sesame Tahini Paste', brand: 'Urban Platter', sub: 'Mediterranean Olives, Hummus & Tahini', unit: '300 g Jar', price: 275, mrp: 330, stock: 29, diet: 'Vegan', storage: 'Stir natural sesame oil', attr: '100% Hulled Toasted Sesame Seeds', desc: 'Velvety Middle Eastern sesame paste for homemade hummus and salad dressings.' },
      { name: 'Japanese Hakubaku Organic Udon & Soba Noodles', brand: 'Urban Platter', sub: 'Asian Noodles, Soy & Chili Oils', unit: '270 g Pack (3 Bundles)', price: 260, mrp: 310, stock: 27, diet: 'Organic', storage: 'Dry pantry', attr: 'Buckwheat & Wheat · 4-Minute Boil', desc: 'Authentic Japanese ribbon noodles for hot dashi broth or chilled sesame salads.' },
      { name: 'Genovese Fresh Basil, Pine Nut & Parmigiano Pesto', brand: 'Wingreens Farms', sub: 'Italian Pasta, Risotto & Sauces', unit: '180 g Jar', price: 229, mrp: 270, stock: 32, diet: 'Veg', storage: 'Keep refrigerated', attr: 'Cold-Blended with Extra Virgin Olive Oil', desc: 'Vibrant green basil pesto for pasta, sourdough bruschetta, and caprese sandwiches.' },
    ],
  },
  {
    id: 15,
    name: 'Organic & Health Foods',
    slug: 'organic-health-foods',
    aisleGroup: 'Wellness & Personal Care',
    description:
      'Adaptogenic herbs, raw cacao nibs, chia & quinoa superfoods, gluten-free pasta, stevia/monk-fruit sweeteners, and plant-based proteins.',
    imageUrl: IMG_WELLNESS,
    subcategories: [
      'Adaptogens & Herbal Powders',
      'Superfood Seeds, Quinoa & Cacao',
      'Gluten-Free & Keto Staples',
      'Natural Zero-Calorie Sweeteners',
      'Plant Protein & Collagen Boosters',
    ],
    items: [
      { name: 'Sun-Dried KSM-66 Organic Ashwagandha Root Powder', brand: 'Organica Botanicals', sub: 'Adaptogens & Herbal Powders', unit: '100 g Apothecary Jar', price: 495, mrp: 599, stock: 31, diet: 'Organic', storage: 'Cool dry place away from light', attr: 'Standardized Withanolides · Stress & Sleep Support', desc: 'Full-spectrum organic Withania somnifera root extract from single-estate farms in Rajasthan.' },
      { name: 'Dual-Extracted Lion’s Mane & Reishi Fruiting Body Elixir', brand: 'Organica Botanicals', sub: 'Adaptogens & Herbal Powders', unit: '60 ml Graduated Dropper', price: 840, mrp: 990, stock: 22, diet: 'Organic', storage: 'Room temperature', attr: '>30% Beta-D-Glucans · Cognitive Focus', desc: 'Ultrasonic dual-extracted mushroom fruiting body tincture for mental clarity and immunity.' },
      { name: 'Single-Origin Peruvian Criollo Raw Cacao Nibs', brand: 'Organica Botanicals', sub: 'Superfood Seeds, Quinoa & Cacao', unit: '250 g Glass Jar', price: 395, mrp: 460, stock: 38, diet: 'Organic', storage: 'Cool dry pantry', attr: 'Unroasted · Magnesium & Flavanol Dense', desc: 'Heirloom Criollo cacao beans fermented in banana leaves and gently crushed.' },
      { name: 'Andean White & Red Tri-Colour Organic Quinoa', brand: 'Organic India', sub: 'Superfood Seeds, Quinoa & Cacao', unit: '500 g Pack', price: 245, mrp: 295, stock: 54, diet: 'Gluten-Free', storage: 'Dry jar', attr: 'Complete 9 Essential Amino Acids · Pre-Washed Saponin-Free', desc: 'Fluffy, nutty ancient grain ideal as a high-protein substitute for white rice.' },
      { name: 'Black Raw Chia & Flaxseed Omega-3 Combo', brand: 'True Elements', sub: 'Superfood Seeds, Quinoa & Cacao', unit: '2 × 250 g Jars', price: 265, mrp: 340, stock: 63, diet: 'Organic', storage: 'Airtight jar', attr: 'Plant Omega-3 ALA + Soluble Fibre', desc: 'High-swell chia seeds and golden roasted flaxseeds for puddings and smoothies.' },
      { name: 'Monk Fruit & Erythritol 1:1 Zero-Glycemic Sweetener', brand: 'Lakanto Style / Urban Platter', sub: 'Natural Zero-Calorie Sweeteners', unit: '250 g Pouch', price: 385, mrp: 450, stock: 29, diet: 'Vegan', storage: 'Dry pantry', attr: 'Zero Calories · Zero Aftertaste · Diabetic Friendly', desc: 'Measures cup-for-cup like sugar with zero blood glucose spike.' },
      { name: 'Gluten-Free Red Lentil & Chickpea Fusilli Pasta', brand: 'WickedGud', sub: 'Gluten-Free & Keto Staples', unit: '250 g Box', price: 149, mrp: 175, stock: 47, diet: 'Gluten-Free', storage: 'Dry cupboard', attr: '21g Protein · Zero Maida · 8-Min Boil', desc: 'High-protein legume pasta that stays al dente without turning mushy.' },
      { name: 'Moringa Leaf, Spirulina & Wheatgrass Green Superfood Blend', brand: 'Kapiva', sub: 'Adaptogens & Herbal Powders', unit: '150 g Jar', price: 349, mrp: 425, stock: 35, diet: 'Organic', storage: 'Keep tightly sealed', attr: 'Alkalizing Chlorophyll + 18 Vitamins', desc: 'Shade-dried organic greens powder for morning lemon water or smoothies.' },
      { name: 'Pea & Brown Rice Isolate Plant Protein (Unflavoured)', brand: 'Cosmix / Oziva', sub: 'Plant Protein & Collagen Boosters', unit: '500 g Jar', price: 999, mrp: 1249, stock: 19, diet: 'Vegan', storage: 'Cool dry place', attr: '24g Protein per Scoop · Gut-Friendly Digestive Herbs', desc: 'Clean plant protein isolate fermented for zero bloating and smooth mixing.' },
      { name: 'Psyllium Husk (Organic Isabgol) Prebiotic Fibre', brand: 'Organic India', sub: 'Gluten-Free & Keto Staples', unit: '200 g Tin', price: 215, mrp: 250, stock: 58, diet: 'Organic', storage: 'Keep away from moisture', attr: '98% Purity Whole Husk · Keto Baking Binder', desc: 'Certified organic psyllium husk for digestive regularity and gluten-free bread baking.' },
    ],
  },
  {
    id: 16,
    name: 'Fresh Meat & Seafood',
    slug: 'fresh-meat-seafood',
    aisleGroup: 'Fresh Produce & Dairy',
    description:
      'Antibiotic-free tender chicken breast & curry cuts, pasture-raised goat mutton, Kolkata bhetki, Norwegian salmon, and cleaned tiger prawns (cold-chain delivered).',
    imageUrl: IMG_STAPLES_SPICES,
    subcategories: [
      'Fresh Chicken Cuts',
      'Tender Goat & Lamb Mutton',
      'Freshwater & Marine Fish',
      'Cleaned Prawns & Seafood',
      'Chef-Marinated Ready-to-Cook',
    ],
    items: [
      { name: 'Antibiotic-Free Chicken Breast Boneless Fillets', brand: 'Licious Fresh', sub: 'Fresh Chicken Cuts', unit: '450 g Chilled Tray', price: 259, mrp: 299, stock: 34, diet: 'Non-Veg', storage: 'Keep chilled between 0–4°C', attr: '0% Hormones · Vacuum Sealed · 102g Protein per Pack', desc: 'Trimmed, skinless tender chicken breast fillets maintained in a strict 0–4°C cold chain.' },
      { name: 'Chicken Curry Cut (Small Pieces with Bone)', brand: 'Fresho Meats', sub: 'Fresh Chicken Cuts', unit: '500 g Pack', price: 169, mrp: 199, stock: 52, diet: 'Non-Veg', storage: 'Refrigerate at 0–4°C', attr: '14–16 Juicy Pieces · Farm Traceable', desc: 'Balanced mix of drumstick, thigh, and breast pieces cut for homestyle Indian curries.' },
      { name: 'Rich Goat Mutton Curry Cut (Shoulder & Ribs)', brand: 'Licious Fresh', sub: 'Tender Goat & Lamb Mutton', unit: '500 g Chilled Tray', price: 585, mrp: 660, stock: 18, diet: 'Non-Veg', storage: 'Keep chilled at 0–4°C', attr: 'Pasture-Raised Young Goat · Fine Fat Marbling', desc: 'Tender, uniform cuts of young pasture-raised goat ideal for Rogan Josh and Kosha Mangsho.' },
      { name: 'Cleaned & Deveined White Sea Prawns (Medium)', brand: 'Captain’s Catch', sub: 'Cleaned Prawns & Seafood', unit: '250 g Net Weight', price: 329, mrp: 390, stock: 26, diet: 'Non-Veg', storage: 'Keep chilled below 4°C', attr: 'Peeled, Deveined & Tail-Off · Chemical-Free', desc: 'Sweet, firm seawater white prawns cleaned and ready for garlic butter pan-searing.' },
      { name: 'Fresh Rohu (Rui) Bengali Steaks', brand: 'Licious Fresh', sub: 'Freshwater & Marine Fish', unit: '500 g Pack', price: 245, mrp: 285, stock: 31, diet: 'Non-Veg', storage: '0–4°C Cold Chain', attr: 'Descaled, Gutted & Center-Cut', desc: 'Sweet freshwater Rohu fish steaks cut cleanly for mustard macher jhol or pan fry.' },
      { name: 'Boneless Kolkata Bhetki (Barramundi) Fillets', brand: 'Captain’s Catch', sub: 'Freshwater & Marine Fish', unit: '300 g Pack', price: 465, mrp: 540, stock: 15, diet: 'Non-Veg', storage: '0–4°C Cold Chain', attr: 'Zero Pin Bones · Flaky White Flesh', desc: 'Prized estuarine Bhetki fillets ideal for crumb-fried fish fry and bhetki paturi.' },
      { name: 'Atlantic Norwegian Salmon Skin-On Fillet', brand: 'Cambay Tiger', sub: 'Freshwater & Marine Fish', unit: '250 g Vacuum Pack', price: 790, mrp: 920, stock: 12, diet: 'Non-Veg', storage: 'Keep at 0–2°C', attr: 'Air-Flown · High EPA/DHA Omega-3', desc: 'Sushi-grade Norwegian Atlantic salmon with rich orange marbling.' },
      { name: 'Old Delhi Smoked Chicken Seekh Kebab (Ready to Pan-Sear)', brand: 'Licious Chef’s Craft', sub: 'Chef-Marinated Ready-to-Cook', unit: '300 g (6 Seekhs)', price: 249, mrp: 295, stock: 28, diet: 'Non-Veg', storage: 'Keep chilled', attr: 'Charcoal Smoked · Fresh Mint & Ginger', desc: 'Juicy minced chicken thigh kebabs seasoned with royal cumin, coriander, and green chillies.' },
      { name: 'Punjabi Tandoori Chicken Tangdi (Drumsticks in Hung Curd)', brand: 'Licious Chef’s Craft', sub: 'Chef-Marinated Ready-to-Cook', unit: '400 g (4 Drumsticks)', price: 265, mrp: 315, stock: 24, diet: 'Non-Veg', storage: 'Air-fry or oven roast 18 mins', attr: 'Kashmiri Mirch & Mustard Oil Marinade', desc: 'Pre-scored chicken drumsticks marinated in thick hung curd and roasted kasuri methi.' },
      { name: 'Mutton Keema (Finely Minced Shoulder)', brand: 'Fresho Meats', sub: 'Tender Goat & Lamb Mutton', unit: '400 g Pack', price: 495, mrp: 560, stock: 19, diet: 'Non-Veg', storage: '0–4°C Cold Chain', attr: '90% Lean Meat · 10% Savoury Fat', desc: 'Freshly ground goat shoulder keema for keema matar and samosas.' },
    ],
  },
  {
    id: 17,
    name: 'Frozen Food',
    slug: 'frozen-food',
    aisleGroup: 'Fresh Produce & Dairy',
    description:
      'IQF green peas & sweet corn, crispy crinkle French fries, Jalapeño cheese poppers, edamame beans, momos, and flaky frozen parathas.',
    imageUrl: IMG_STAPLES_SPICES,
    subcategories: [
      'Frozen Peas, Corn & Edamame',
      'Fries, Wedges & Potato Snacks',
      'Veg Momos, Spring Rolls & Nuggets',
      'Frozen Parathas & Naans',
      'Frozen Berries & Pastry Sheets',
    ],
    items: [
      { name: 'Winter Harvest IQF Sweet Green Peas', brand: 'Safal / McCain', sub: 'Frozen Peas, Corn & Edamame', unit: '1 kg Value Pack', price: 185, mrp: 230, stock: 78, diet: 'Vegan', storage: 'Keep frozen at -18°C', attr: 'Individually Quick Frozen Within 3 Hours of Picking', desc: 'Tender, sweet winter garden peas flash-frozen to lock in bright green colour and nutrients.' },
      { name: 'Crispy Crinkle-Cut Golden French Fries', brand: 'McCain', sub: 'Fries, Wedges & Potato Snacks', unit: '750 g Pack', price: 165, mrp: 205, stock: 84, diet: 'Vegan', storage: 'Freeze at -18°C', attr: 'Air-Fryer Ready in 12 Mins · Zero Trans Fat', desc: 'Golden, ridged potato fries made from high-solids Gujarat Shepody potatoes.' },
      { name: 'Darjeeling Thin-Skin Corn & Cheese Steamed Momos', brand: 'Prasuma', sub: 'Veg Momos, Spring Rolls & Nuggets', unit: '24 pcs (480 g) + Spicy Sauce', price: 245, mrp: 295, stock: 41, diet: 'Veg', storage: 'Keep frozen · Steam or Pan-Sear 5 mins', attr: 'Includes Signature Schezwan Momo Dip', desc: 'Delicate translucent wrappers filled with sweet corn, molten cheddar, and spring onion.' },
      { name: 'Jalapeño & Melted Mozzarella Cheese Poppers', brand: 'McCain', sub: 'Veg Momos, Spring Rolls & Nuggets', unit: '400 g Pack', price: 215, mrp: 260, stock: 37, diet: 'Veg', storage: 'Freeze at -18°C', attr: 'Herb Breadcrumb Crust', desc: 'Crispy golden bites filled with creamy mozzarella and diced pickled jalapeños.' },
      { name: 'IQF Japanese Green Edamame Soybeans in Pods', brand: 'Urban Platter', sub: 'Frozen Peas, Corn & Edamame', unit: '400 g Pack', price: 235, mrp: 280, stock: 26, diet: 'Vegan', storage: 'Freeze at -18°C', attr: 'Boil 4 Mins & Toss with Sea Salt', desc: 'Young green soybeans in pods rich in complete plant protein and folate.' },
      { name: 'Punjabi Aloo & Methi Stuffed Whole-Wheat Parathas', brand: 'ITC Master Chef', sub: 'Frozen Parathas & Naans', unit: '400 g (5 Parathas)', price: 118, mrp: 145, stock: 53, diet: 'Veg', storage: 'Keep frozen · Tawa roast 2 mins', attr: 'Spiced Mashed Potato & Fresh Fenugreek', desc: 'Homestyle stuffed parathas ready straight from freezer to tawa without thawing.' },
      { name: 'Plant-Based Crispy Chick’n Nuggets (Soy & Pea Protein)', brand: 'Blue Tribe', sub: 'Veg Momos, Spring Rolls & Nuggets', unit: '300 g Pack', price: 249, mrp: 299, stock: 29, diet: 'Vegan', storage: 'Freeze at -18°C', attr: '100% Meat-Free · 14g Protein', desc: 'Juicy, fibrous plant-based nuggets coated in golden tempura batter.' },
      { name: 'Super-Sweet Golden American Corn Kernels', brand: 'Safal', sub: 'Frozen Peas, Corn & Edamame', unit: '500 g Pack', price: 95, mrp: 115, stock: 92, diet: 'Vegan', storage: 'Freeze at -18°C', attr: 'No Added Sugar or Preservatives', desc: 'Plump golden sweet corn kernels for butter corn cups, soups, and pizzas.' },
      { name: 'IQF Frozen Blueberries & Raspberries Smoothie Mix', brand: 'BerryFields', sub: 'Frozen Berries & Pastry Sheets', unit: '350 g Ziplock Pouch', price: 345, mrp: 410, stock: 22, diet: 'Vegan', storage: 'Keep frozen at -18°C', attr: '100% Whole Unsweetened Berries', desc: 'Flash-frozen whole blueberries and raspberries for thick smoothie bowls and baking.' },
      { name: 'Lebanese Falafel & Herb Chickpea Bites', brand: 'Sumeru', sub: 'Veg Momos, Spring Rolls & Nuggets', unit: '320 g Pack', price: 155, mrp: 185, stock: 34, diet: 'Vegan', storage: 'Freeze at -18°C', attr: 'Parsley, Garlic, Cumin & Chickpeas', desc: 'Crispy Middle Eastern falafel bullets ready for pita pockets and hummus bowls.' },
    ],
  },
  {
    id: 18,
    name: 'Personal Care',
    slug: 'personal-care',
    aisleGroup: 'Wellness & Personal Care',
    description:
      'Cold-pressed botanical facial serums, clay masks, sulphate-free shampoos, cold-process soaps, SPF 50 sunscreens, oral care, and grooming essentials.',
    imageUrl: IMG_SKINCARE,
    subcategories: [
      'Botanical Skincare & Serums',
      'Sunscreen & Moisturizers',
      'Shampoos, Conditioners & Hair Oils',
      'Cold-Process Soaps & Body Wash',
      'Oral Care, Deodorants & Grooming',
    ],
    items: [
      { name: 'Flora & Stone Rosehip + Bakuchiol Botanical Facial Serum', brand: 'Organica Apothecary', sub: 'Botanical Skincare & Serums', unit: '30 ml UV Amber Dropper', price: 895, mrp: 1099, stock: 19, diet: 'Vegan', storage: 'Cool dark vanity cabinet', attr: '1% Clinical Bakuchiol + Cold-Pressed Rosehip', desc: 'Concentrated cellular renewal facial oil that restores barrier luminosity without retinoid irritation.' },
      { name: 'Detoxifying Uji Matcha & French Green Clay Mask', brand: 'Organica Apothecary', sub: 'Botanical Skincare & Serums', unit: '50 ml Frosted Stone Jar', price: 645, mrp: 790, stock: 24, diet: 'Vegan', storage: 'Keep lid tightly closed', attr: 'Montmorillonite Clay + Colloidal Oat', desc: 'Whipped mineral clay mask that clarifies congested pores while preserving hydration.' },
      { name: 'Bergamot & Neroli Cold-Process Botanical Cleansing Bar', brand: 'Organica Apothecary', sub: 'Cold-Process Soaps & Body Wash', unit: '130 g Stone-Cured Bar', price: 245, mrp: 295, stock: 45, diet: 'Vegan', storage: 'Use drained soap dish', attr: 'Saponified Olive Oil & Raw Shea Butter', desc: 'Cured for six weeks in wooden molds with cold-pressed Calabrian bergamot rind.' },
      { name: 'SPF 50 PA++++ Invisible Niacinamide Fluid Sunscreen', brand: 'Minimalist', sub: 'Sunscreen & Moisturizers', unit: '50 g Tube', price: 379, mrp: 399, stock: 68, diet: 'Vegan', storage: 'Below 30°C', attr: 'Zero White Cast · Photostable UV Filters', desc: 'Lightweight broad-spectrum sunscreen clinically tested for Indian humidity.' },
      { name: 'Argan & Rosemary Sulphate-Free Botanical Shampoo', brand: 'Harmony & Herb', sub: 'Shampoos, Conditioners & Hair Oils', unit: '250 ml Amber Bottle', price: 345, mrp: 420, stock: 37, diet: 'Vegan', storage: 'Bathroom shelf', attr: 'No Parabens, Silicones or SLS', desc: 'Gentle plant-surfactant shampoo infused with Moroccan argan oil and rosemary leaf extract.' },
      { name: 'Ayurvedic Bringadi & Cold-Pressed Sesame Scalp Oil', brand: 'Kama Style / Forest Herb', sub: 'Shampoos, Conditioners & Hair Oils', unit: '100 ml Glass Bottle', price: 485, mrp: 560, stock: 29, diet: 'Vegan', storage: 'Cool dry place', attr: 'Bhringraj, Amla, Indigo & Virgin Coconut', desc: 'Traditional earthen-pot simmered hair oil to strengthen roots and soothe scalp dryness.' },
      { name: '10% Vitamin C + E + Ferulic Brightening Face Serum', brand: 'Minimalist', sub: 'Botanical Skincare & Serums', unit: '30 ml Bottle', price: 599, mrp: 699, stock: 44, diet: 'Vegan', storage: 'Keep away from direct sunlight', attr: 'Ethyl Ascorbic Acid · Centella Water Base', desc: 'Stable daily antioxidant serum for even skin tone and sun-damage recovery.' },
      { name: 'Ayurvedic Neem, Clove & Meswak Herbal Toothpaste', brand: 'Dabur Red / Vicco', sub: 'Oral Care, Deodorants & Grooming', unit: '200 g Value Pack + Free Brush', price: 118, mrp: 140, stock: 95, diet: 'Vegan', storage: 'Room temperature', attr: 'Fluoride-Free · 13 Potent Gum Care Herbs', desc: 'Clinically proven herbal formulation for healthy gums and lasting fresh breath.' },
      { name: 'Alum & Himalayan Cedarwood Roll-On Deodorant (0% Aluminum Chlorohydrate)', brand: 'Chemist at Play', sub: 'Oral Care, Deodorants & Grooming', unit: '50 ml Roll-On', price: 199, mrp: 249, stock: 53, diet: 'Vegan', storage: 'Ambient', attr: '5% AHA Lactic Acid · Odour Control', desc: 'Gentle underarm roll-on that prevents odour-causing bacteria without blocking pores.' },
      { name: 'Ceramide & Hyaluronic Acid Barrier Repair Moisturizer', brand: 'Dot & Key / Re’equil', sub: 'Sunscreen & Moisturizers', unit: '100 g Tube', price: 349, mrp: 395, stock: 61, diet: 'Vegan', storage: 'Cool dry place', attr: '5 Essential Ceramides · Fragrance-Free', desc: 'Rich, non-comedogenic daily moisturizer for dry to normal sensitive skin.' },
    ],
  },
  {
    id: 19,
    name: "Women's Hygiene",
    slug: 'womens-hygiene',
    aisleGroup: 'Wellness & Personal Care',
    description:
      '100% organic cotton rash-free sanitary pads, biodegradable panty liners, medical-grade menstrual cups, and soothing cramp-relief patches.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Organic Cotton Sanitary Pads',
      'Panty Liners & Intimate Wash',
      'Menstrual Cups & Period Wear',
      'Cramp Relief & Wellness',
    ],
    items: [
      { name: '100% Organic Cotton Rash-Free Sanitary Pads Combo (Heavy + Medium)', brand: 'Nua', sub: 'Organic Cotton Sanitary Pads', unit: 'Pack of 12 Pads + Disposal Pouches', price: 219, mrp: 269, stock: 74, diet: 'Standard', storage: 'Dry hygienic drawer', attr: '0% Chlorine Bleach, Dioxins or Fragrance', desc: 'Ultra-thin GOTS-certified organic cotton top-sheet pads with wider backs and hygienic disposal envelopes.' },
      { name: 'Bamboo Fiber Biodegradable XL+ Overnight Sanitary Pads', brand: 'Carmesi', sub: 'Organic Cotton Sanitary Pads', unit: 'Pack of 10 XL+ Pads', price: 195, mrp: 240, stock: 62, diet: 'Standard', storage: 'Cool dry place', attr: 'Cornstarch & Bamboo Top Layer', desc: 'Naturally soft bamboo fiber pads designed for irritation-free overnight protection.' },
      { name: 'Breathable Daily Cotton Panty Liners', brand: 'Pee Safe', sub: 'Panty Liners & Intimate Wash', unit: 'Pack of 30 Liners', price: 145, mrp: 180, stock: 81, diet: 'Standard', storage: 'Dry place', attr: 'Feather-Thin · Unscented', desc: 'Individually wrapped 100% cotton surface panty liners for everyday freshness.' },
      { name: 'Self-Heating Herbal Menstrual Cramp Relief Patches (Pack of 3)', brand: 'Nua Cramp Comfort', sub: 'Cramp Relief & Wellness', unit: '3 × 8-Hour Heat Patches', price: 179, mrp: 225, stock: 48, diet: 'Standard', storage: 'Air-activated upon opening pouch', attr: 'Air-Activated Iron & Salt Thermal Therapy', desc: 'Discreet, odourless heat patches that provide 8 hours of soothing 50°C warmth for lower abdominal cramps.' },
      { name: 'Medical-Grade Silicone Reusable Menstrual Cup (Medium)', brand: 'Sirona', sub: 'Menstrual Cups & Period Wear', unit: '1 Cup + Cotton Storage Pouch', price: 289, mrp: 399, stock: 34, diet: 'Standard', storage: 'Sterilize in boiling water before cycle', attr: 'FDA-Compliant Platinum Silicone · Lasts up to 8 Years', desc: 'Ultra-flexible, spill-proof menstrual cup offering up to 10 hours of rash-free protection.' },
      { name: 'pH 3.5 Lactic Acid & Tea Tree Intimate Foaming Wash', brand: 'VWash / Pee Safe', sub: 'Panty Liners & Intimate Wash', unit: '100 ml Pump Bottle', price: 185, mrp: 220, stock: 57, diet: 'Vegan', storage: 'Bathroom shelf', attr: 'Soap-Free & Paraben-Free', desc: 'Maintains natural vaginal flora pH balance with soothing calendula and tea tree oil.' },
      { name: 'Organic Cotton Tampons (Regular Absorbency)', brand: 'Sirona', sub: 'Menstrual Cups & Period Wear', unit: 'Box of 16 Tampons', price: 225, mrp: 270, stock: 29, diet: 'Standard', storage: 'Dry place', attr: '8-Groove Expansion · Swim Friendly', desc: '100% Viscose-free organic cotton core tampons with smooth rounded tips.' },
      { name: 'Flushable Toilet Seat Sanitizer Spray (Lavender & Mint)', brand: 'Pee Safe', sub: 'Panty Liners & Intimate Wash', unit: '75 ml Travel Spray', price: 155, mrp: 180, stock: 94, diet: 'Standard', storage: 'Keep away from flame', attr: 'Kills 99.9% Germs in 10 Seconds', desc: 'Quick-drying isopropyl toilet seat disinfectant spray for public and travel washrooms.' },
      { name: 'Disposable Leak-Proof Period Panties (M-L)', brand: 'whisper Koosh / Carmesi', sub: 'Menstrual Cups & Period Wear', unit: 'Pack of 4 Panties', price: 235, mrp: 280, stock: 39, diet: 'Standard', storage: 'Dry cupboard', attr: '360° Full-Coverage Heavy Flow Night Protection', desc: 'Soft, high-waist disposable period underwear that replaces both pad and panty on heavy nights.' },
      { name: 'Chamomile, Shatavari & Spearmint Cycle Balance Herbal Tisane', brand: 'Blue Nectar', sub: 'Cramp Relief & Wellness', unit: '20 Pyramid Tea Bags', price: 265, mrp: 320, stock: 31, diet: 'Organic', storage: 'Airtight tin', attr: 'Caffeine-Free Ayurvedic Blend', desc: 'Calming herbal infusion crafted with Shatavari root, Egyptian chamomile, and spearmint.' },
    ],
  },
  {
    id: 20,
    name: 'Baby Care',
    slug: 'baby-care',
    aisleGroup: 'Wellness & Personal Care',
    description:
      'Ultra-soft pant-style diapers, 99% pure water wipes, tear-free baby bath & massage oils, organic muslin swaddles, anti-colic bottles, and millet stage foods.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Diapers & Rash Cream',
      'Water Wipes & Hygiene',
      'Baby Bath, Lotion & Massage Oils',
      'Baby Cereal & Stage Porridges',
      'Feeding Bottles, Swaddles & Maternity',
    ],
    items: [
      { name: 'All-Round Protection Aloe Vera Pant-Style Diapers (Medium, 7–12 kg)', brand: 'Pampers Premium Care', sub: 'Diapers & Rash Cream', unit: 'Pack of 46 Pants', price: 679, mrp: 799, stock: 54, diet: 'Standard', storage: 'Dry nursery shelf', attr: '12-Hour Absorbent Gel Channels · Wetness Indicator', desc: '360° silky-soft cottony waistband diapers infused with soothing aloe vera lotion.' },
      { name: '99% Pure RO Water Unscented Baby Wipes (Pack of 2)', brand: 'Mother Sparsh', sub: 'Water Wipes & Hygiene', unit: '2 × 72 Lid Packs', price: 329, mrp: 449, stock: 68, diet: 'Vegan', storage: 'Snap moisture lid shut after use', attr: '100% Plant-Derived Medical Grade Fabric · 0% Alcohol', desc: 'Thick, biodegradable plant-fiber wipes gentle enough for newborn hands, face, and diaper area.' },
      { name: 'Organic Cotton Muslin Swaddle Wraps (Botanical Print)', brand: 'Little Bloom', sub: 'Feeding Bottles, Swaddles & Maternity', unit: 'Pack of 2 (120 × 120 cm)', price: 549, mrp: 699, stock: 27, diet: 'Standard', storage: 'Gentle machine wash', attr: 'GOTS Certified Organic Cotton · Breathable Weave', desc: 'Pre-washed, feather-soft organic cotton muslin swaddles that get softer with every wash.' },
      { name: 'Sprouted Ragi, Almond & Banana Stage-2 Porridge Mix (6+ Months)', brand: 'Early Foods / Slurrp Farm', sub: 'Baby Cereal & Stage Porridges', unit: '200 g Box', price: 245, mrp: 285, stock: 42, diet: 'Organic', storage: 'Use within 30 days of opening', attr: 'Zero Salt, Zero Sugar & Zero Milk Solids', desc: 'Freshly stone-milled sprouted finger millet porridge rich in natural calcium for growing babies.' },
      { name: 'Cold-Pressed Sweet Almond, Saffron & Sesame Baby Massage Oil', brand: 'Forest Essentials Baby / Sebamed', sub: 'Baby Bath, Lotion & Massage Oils', unit: '200 ml Bottle', price: 425, mrp: 495, stock: 33, diet: 'Vegan', storage: 'Cool dry place', attr: 'Dermatologically Tested · Mineral-Oil Free', desc: 'Nourishing Ayurvedic abhyanga massage oil for strong bones and supple baby skin.' },
      { name: 'pH 5.5 Tear-Free Extra Mild Baby Wash & Shampoo', brand: 'Sebamed Baby', sub: 'Baby Bath, Lotion & Massage Oils', unit: '200 ml Dispenser', price: 465, mrp: 520, stock: 38, diet: 'Standard', storage: 'Bathroom shelf', attr: 'Supports Acid Mantle Development · 0% Soap/Alkali', desc: 'Pediatrician-recommended ultra-mild cleanser with chamomile extract.' },
      { name: 'Zinc Oxide & Organic Shea Diaper Rash Barrier Cream', brand: 'The Moms Co.', sub: 'Diapers & Rash Cream', unit: '50 g Tube', price: 215, mrp: 265, stock: 49, diet: 'Vegan', storage: 'Nursery kit', attr: '15% Non-Nano Zinc Oxide + Chamomile', desc: 'Forms a breathable moisture barrier to soothe and prevent diaper redness overnight.' },
      { name: 'Natural Response Anti-Colic Borosilicate Glass Feeding Bottle', brand: 'Philips Avent', sub: 'Feeding Bottles, Swaddles & Maternity', unit: '240 ml Bottle', price: 695, mrp: 795, stock: 19, diet: 'Standard', storage: 'Steam sterilize before use', attr: 'BPA-Free · Breast-Like Silicone Nipple Valve', desc: 'Heat-shock resistant pharmaceutical glass bottle with anti-colic air vent.' },
      { name: 'Plant-Based Bio-Enzyme Baby Laundry Liquid Detergent', brand: 'Windmill Baby / Mamaearth', sub: 'Water Wipes & Hygiene', unit: '1 L Bottle', price: 349, mrp: 425, stock: 44, diet: 'Vegan', storage: 'Utility room', attr: '0% Optical Brighteners, Phosphates or Synthetic Dyes', desc: 'Removes milk spit-up and food stains gently while keeping infant clothes hypoallergenic.' },
      { name: 'Nursing Mother Shatavari & Fenugreek Lactation Granules', brand: 'Zandu /Himalaya', sub: 'Feeding Bottles, Swaddles & Maternity', unit: '200 g Jar', price: 260, mrp: 310, stock: 25, diet: 'Veg', storage: 'Stir 1 tbsp in warm milk', attr: 'Cardamom & Elaichi Flavour', desc: 'Traditional postnatal Ayurvedic botanical blend supporting maternal vitality.' },
    ],
  },
  {
    id: 21,
    name: 'Household Cleaning',
    slug: 'household-cleaning',
    aisleGroup: 'Home, Kitchen & Cleaning',
    description:
      'Refillable plant-distilled surface cleaners, neem floor disinfectants, bio-enzyme laundry detergents, lime dishwash gels, and cellulose scrub sponges.',
    imageUrl: IMG_HOUSEHOLD,
    subcategories: [
      'Surface & Glass Cleaners',
      'Dishwashing Gels, Bars & Brushes',
      'Laundry Detergent & Fabric Softeners',
      'Floor & Bathroom Disinfectants',
      'Sponges, Microfiber & Scrubs',
    ],
    items: [
      { name: 'Eucalyptus & Spearmint Refillable Glass Surface Cleaner', brand: 'Organica Home', sub: 'Surface & Glass Cleaners', unit: '500 ml Frosted Glass Spray', price: 345, mrp: 420, stock: 50, diet: 'Vegan', storage: 'Keep out of reach of children', attr: 'Plant Sugar Surfactant · Safe on Marble & Wood', desc: 'Cuts kitchen grease effortlessly using steam-distilled Australian blue mallee eucalyptus and spearmint.' },
      { name: 'Beechwood & Tampico Fiber Kitchen Brush + Linen Towel Set', brand: 'Organica Home', sub: 'Sponges, Microfiber & Scrubs', unit: '3-Piece Zero-Waste Set', price: 540, mrp: 650, stock: 16, diet: 'Vegan', storage: 'Air dry bristles down', attr: 'FSC Beechwood + Belgian Unbleached Flax Linen', desc: 'Compostable wooden dish brush paired with two heavyweight unbleached linen kitchen towels.' },
      { name: 'Concentrated Lemon & Aloe Bio-Enzyme Dishwash Gel', brand: 'Beco', sub: 'Dishwashing Gels, Bars & Brushes', unit: '1 L Refill Pouch', price: 189, mrp: 249, stock: 76, diet: 'Vegan', storage: 'Room temperature', attr: 'Zero Phosphate · Cuts Kadhai Grease & Odour', desc: 'Tough on burnt oil yet gentle on hands with coconut-derived cleansers and lime oil.' },
      { name: 'Front-Load & Top-Load Liquid Laundry Detergent (Lavender)', brand: 'Surf Excel Matic / Born Good', sub: 'Laundry Detergent & Fabric Softeners', unit: '2 L Refill Pack', price: 385, mrp: 460, stock: 64, diet: 'Standard', storage: 'Utility shelf', attr: 'USDA Bio-Preferred Plant Enzymes', desc: 'Low-suds concentrated laundry liquid that preserves fabric colour and softness.' },
      { name: 'Lemongrass & Pine Oil Herbal Floor Cleaner Disinfectant', brand: 'Koparo Clean', sub: 'Floor & Bathroom Disinfectants', unit: '1 L Bottle', price: 229, mrp: 289, stock: 58, diet: 'Vegan', storage: 'Dilute 1 cap in half bucket water', attr: 'Pet & Crawling-Baby Safe · Zero Benzalkonium Chloride', desc: 'Natural essential oil floor cleaner that repels ants and flies while leaving a spa-fresh aroma.' },
      { name: 'Lime-Scale & Hard-Water Bathroom Tap & Tile Descaler', brand: 'Harpic / Koparo', sub: 'Floor & Bathroom Disinfectants', unit: '500 ml Trigger Spray', price: 175, mrp: 210, stock: 45, diet: 'Standard', storage: 'Spray, wait 5 mins, rinse', attr: 'Citric & Lactic Acid Formula · Chrome Safe', desc: 'Dissolves white borewell water stains from glass shower partitions and chrome fittings.' },
      { name: 'Hygienic Pine & Cedar Toilet Bowl Cleaner Gel (Pack of 2)', brand: 'Harpic Power Plus', sub: 'Floor & Bathroom Disinfectants', unit: '2 × 1 L Value Pack', price: 345, mrp: 410, stock: 82, diet: 'Standard', storage: 'Bathroom cabinet', attr: '10x Stain Removal Rim-to-U-Bend', desc: 'Thick clinging disinfectant gel that eliminates limescale and 99.9% of bathroom bacteria.' },
      { name: 'Coconut Coir & Wood Pulp Non-Scratch Scrub Pads (Pack of 6)', brand: 'Scotch-Brite Eco', sub: 'Sponges, Microfiber & Scrubs', unit: '6 Scrubbers', price: 125, mrp: 150, stock: 94, diet: 'Vegan', storage: 'Rinse after use', attr: 'Safe on Non-Stick, Cast Iron & Glassware', desc: 'Durable plant-fiber scrubbers made from upcycled coconut husk fibres.' },
      { name: 'Hypoallergenic Plant-Based Fabric Conditioner (Morning Dew)', brand: 'Comfort / Puori', sub: 'Laundry Detergent & Fabric Softeners', unit: '860 ml Bottle', price: 215, mrp: 250, stock: 51, diet: 'Standard', storage: 'Add to dispenser drawer', attr: 'Anti-Static · Easy Ironing', desc: 'Softens cotton towels and bed linens with biodegradable conditioning agents.' },
      { name: 'Lint-Free 350 GSM Microfiber Cleaning Cloths (Pack of 4)', brand: 'Gala', sub: 'Sponges, Microfiber & Scrubs', unit: '4 Assorted Colour Cloths (40 × 40 cm)', price: 199, mrp: 249, stock: 67, diet: 'Standard', storage: 'Machine washable up to 300 times', attr: 'Streak-Free Mirrors, Screens & Kitchen Counters', desc: 'Ultra-absorbent split microfiber cloths that trap dust and grease with just water.' },
    ],
  },
  {
    id: 22,
    name: 'Paper & Disposable Products',
    slug: 'paper-disposables',
    aisleGroup: 'Home, Kitchen & Cleaning',
    description:
      'Unbleached bamboo facial tissues, washable kitchen paper towels, parchment baking sheets, aluminium foil, oxo-biodegradable garbage bags, and birchwood cutlery.',
    imageUrl: IMG_HOUSEHOLD,
    subcategories: [
      'Facial Tissues & Napkins',
      'Kitchen Paper Towels',
      'Baking Paper, Foil & Cling Wrap',
      'Compostable Garbage Bags',
      'Eco Plates, Bowls & Containers',
    ],
    items: [
      { name: '100% Virgin Bamboo 2-Ply Facial Tissue Boxes (Pack of 3)', brand: 'Beco', sub: 'Facial Tissues & Napkins', unit: '3 × 100 Pulls (300 Sheets)', price: 199, mrp: 270, stock: 88, diet: 'Vegan', storage: 'Dry living room / car', attr: 'Tree-Free Bamboo Pulp · Unbleached & Hypoallergenic', desc: 'Feather-soft, lint-free facial tissues made from fast-growing sustainable bamboo.' },
      { name: 'Reusable & Washable Bamboo Kitchen Towel Roll', brand: 'Beco', sub: 'Kitchen Paper Towels', unit: '80 Perforated Sheets (Washable up to 10x)', price: 215, mrp: 275, stock: 54, diet: 'Vegan', storage: 'Kitchen roll holder', attr: '1 Roll Replaces 6 Conventional Paper Rolls', desc: 'Super-absorbent heavy-duty kitchen sheets that can be rinsed, wrung out, and reused.' },
      { name: 'Non-Stick Silicone-Coated Parchment Baking & Air-Fryer Paper', brand: 'Oddy Uniwraps', sub: 'Baking Paper, Foil & Cling Wrap', unit: '25 Meters Roll + Cutter Box', price: 225, mrp: 280, stock: 69, diet: 'Vegan', storage: 'Pantry drawer', attr: 'Oven Safe up to 230°C · Greaseproof Roti Wrap', desc: 'Food-grade cellulose parchment paper ideal for wrapping hot rotis, baking cookies, and lining air-fryers.' },
      { name: 'Heavy-Duty 18-Micron Kitchen Aluminium Foil Roll', brand: 'Hindalco Freshwrapp', sub: 'Baking Paper, Foil & Cling Wrap', unit: '72 Meters Jumbo Roll', price: 265, mrp: 320, stock: 61, diet: 'Standard', storage: 'Kitchen drawer', attr: 'Tear-Resistant · Locks Steam & Aroma', desc: 'Thick food-safe aluminium foil for grilling, tiffin packing, and oven roasting.' },
      { name: 'Cornstarch Compostable Drawstring Garbage Bags (Medium, 19×21 inch)', brand: 'Shalimar / Beco', sub: 'Compostable Garbage Bags', unit: 'Pack of 3 Rolls (90 Bags)', price: 185, mrp: 240, stock: 96, diet: 'Vegan', storage: 'Under-sink cabinet', attr: 'CPCB Certified Compostable · Leak-Proof Star Seal', desc: 'Tear-resistant bio-resin trash bags for wet and dry kitchen waste segregation.' },
      { name: '3-Ply Ultra-Soft Toilet Tissue Rolls (Pack of 6)', brand: 'Origami', sub: 'Facial Tissues & Napkins', unit: '6 × 320 Sheets', price: 210, mrp: 260, stock: 74, diet: 'Vegan', storage: 'Dry cabinet', attr: 'Flushable · Zero Chlorine Bleach', desc: 'Plush 3-ply embossed bathroom tissue made from regenerative pulp.' },
      { name: 'Areca Palm Leaf & Bagasse Leak-Proof Party Meal Plates (Pack of 25)', brand: 'Chuk / EcoSoul', sub: 'Eco Plates, Bowls & Containers', unit: '25 × 10-Inch 4-Compartment Plates', price: 245, mrp: 299, stock: 37, diet: 'Vegan', storage: 'Dry shelf', attr: 'Microwave & Freezer Safe · 100% Backyard Compostable', desc: 'Sturdy sugarcane bagasse dinner plates that hold hot gravies without soggy bending.' },
      { name: 'BPA-Free PVC-Free Polyethylene Cling Film Wrap', brand: 'Oddy', sub: 'Baking Paper, Foil & Cling Wrap', unit: '100 Meters Roll with Slide Cutter', price: 179, mrp: 220, stock: 48, diet: 'Standard', storage: 'Kitchen drawer', attr: 'Built-In Safe Slide Cutter · Fridge Odour Barrier', desc: 'Crystal-clear food cling film for sealing cut fruits, dough bowls, and salad platters.' },
      { name: 'Cocktail & Dinner Table Serviettes (Unbleached Kraft)', brand: 'Origami', sub: 'Facial Tissues & Napkins', unit: '2 × 100 Napkins (30 × 30 cm)', price: 115, mrp: 140, stock: 83, diet: 'Vegan', storage: 'Dining sideboard', attr: '2-Ply Embossed', desc: 'Absorbent dining table napkins for everyday meals and house gatherings.' },
      { name: 'Birchwood Disposable Spoons, Forks & Knives Cutlery Kit', brand: 'EcoSoul', sub: 'Eco Plates, Bowls & Containers', unit: 'Pack of 50 Pieces', price: 149, mrp: 185, stock: 52, diet: 'Vegan', storage: 'Dry drawer', attr: 'Splinter-Free Polished Birchwood · Zero Wax Coating', desc: 'Smooth, sturdy wooden cutlery set for picnics, office lunches, and parties.' },
    ],
  },
  {
    id: 23,
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    aisleGroup: 'Home, Kitchen & Cleaning',
    description:
      'Hammered pure copper water bottles, Borosil glass lunch boxes, airtight pantry jars, stainless steel dabbas, chef knives, and organic cotton tote bags.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Copper, Steel & Glass Water Bottles',
      'Borosilicate Lunch Boxes & Tiffins',
      'Airtight Pantry Storage Jars',
      'Kitchen Tools, Knives & Peelers',
      'Mugs, Reusable Bags & Accessories',
    ],
    items: [
      { name: 'Hammered Pure Copper Ayurvedic Water Bottle (Leak-Proof)', brand: 'Aurum Coppersmiths', sub: 'Copper, Steel & Glass Water Bottles', unit: '950 ml Bottle', price: 799, mrp: 999, stock: 34, diet: 'Standard', storage: 'Clean inside with lemon & salt weekly', attr: '99.7% Lab-Certified Pure Copper · Silicone Gasket', desc: 'Hand-hammered seamless joint-free copper bottle for overnight Tamra Jal alkalizing hydration.' },
      { name: 'Borosilicate Glass Microwave-Safe 3-Container Office Lunch Box Set', brand: 'Borosil Klip-N-Store', sub: 'Borosilicate Lunch Boxes & Tiffins', unit: '3 × 320 ml Glass Containers + Insulated Bag', price: 845, mrp: 1090, stock: 28, diet: 'Standard', storage: 'Dishwasher, Oven & Freezer Safe', attr: '400°C Thermal Shock Resistant · Spill-Proof Clip Lids', desc: 'Crystal-clear borosilicate glass tiffin containers that never absorb turmeric stains or food odours.' },
      { name: 'Stackable Borosilicate Glass Pantry Jars with Acacia Wood Lids (Set of 4)', brand: 'Home Centre / Nestasia', sub: 'Airtight Pantry Storage Jars', unit: '4 × 1000 ml Jars', price: 899, mrp: 1150, stock: 24, diet: 'Standard', storage: 'Wipe wooden lid dry', attr: 'Silicone Airtight Ring · Ideal for Dals, Pasta & Dry Fruits', desc: 'Minimalist glass canisters with natural grained acacia wood lids for an organized modular kitchen.' },
      { name: 'Double-Wall Vacuum Insulated 304 Stainless Steel Flask (24 Hrs Cold / 18 Hrs Hot)', brand: 'Milton Thermosteel', sub: 'Copper, Steel & Glass Water Bottles', unit: '750 ml Bottle', price: 699, mrp: 845, stock: 46, diet: 'Standard', storage: 'Hand wash recommended', attr: 'Inner Copper Coating · Sweat-Free Matte Exterior', desc: 'Heavy-duty vacuum insulated flask for iced water in summer and hot chai on road trips.' },
      { name: 'German High-Carbon Stainless Steel Chef’s Santoku & Paring Knife Duo', brand: 'Victorinox / Wonderchef', sub: 'Kitchen Tools, Knives & Peelers', unit: '2-Piece Knife Set', price: 549, mrp: 680, stock: 31, diet: 'Standard', storage: 'Keep in knife block', attr: 'Ergonomic Non-Slip Grip · Razor-Sharp Granton Edge', desc: 'Precision-honed kitchen knives for effortless vegetable dicing, herb mincing, and fruit slicing.' },
      { name: 'Heavy-Gauge Tri-Ply Stainless Steel Tadka Pan & Chai Saucepan Combo', brand: 'Stahl / Hawkins', sub: 'Kitchen Tools, Knives & Peelers', unit: '1 L Saucepan + Spice Tadka Pan', price: 949, mrp: 1150, stock: 19, diet: 'Standard', storage: 'Induction & Gas Compatible', attr: 'Even Heat Aluminium Core · Cast Riveted Handles', desc: 'Induction-friendly tri-ply tea pan and tempering ladle built to last a lifetime.' },
      { name: 'Handcrafted Ceramic Stoneware Coffee Mugs (Set of 2, Sage Glaze)', brand: 'Fabindia / Mora Taara', sub: 'Mugs, Reusable Bags & Accessories', unit: '2 × 320 ml Mugs', price: 445, mrp: 550, stock: 37, diet: 'Standard', storage: 'Microwave & Dishwasher Safe', attr: 'Lead-Free Artisanal Reactive Glaze', desc: 'Tactile Khurja stoneware mugs finished in speckled sage green and warm sand.' },
      { name: 'Heavyweight 14oz Organic Cotton Canvas Grocery Tote with Bottle Pockets', brand: 'Organica Living', sub: 'Mugs, Reusable Bags & Accessories', unit: '1 Bag (6-Pocket Internal Organizer)', price: 249, mrp: 350, stock: 85, diet: 'Vegan', storage: 'Machine wash cold', attr: 'Holds up to 18 kg · Reinforced Cross-Stitched Handles', desc: 'Sturdy unbleached canvas market bag with dedicated upright sleeves for glass bottles and leafy greens.' },
      { name: 'Stainless Steel Fine-Mesh Tea Strainer, Lemon Squeezer & Swivel Peeler Set', brand: 'Prestige', sub: 'Kitchen Tools, Knives & Peelers', unit: '3-Piece Daily Utility Set', price: 285, mrp: 340, stock: 62, diet: 'Standard', storage: 'Dishwasher safe', attr: 'Rust-Proof 304 Grade Steel', desc: 'Essential everyday Indian kitchen tools built with heavy-gauge rust-free steel.' },
      { name: '7-Compartment Stainless Steel Masala Dabba with See-Through Lid', brand: 'Vinod Steel', sub: 'Airtight Pantry Storage Jars', unit: '20 cm Diameter + 7 Bowls + 2 Spoons', price: 595, mrp: 720, stock: 41, diet: 'Standard', storage: 'Dry spice shelf', attr: 'Shatterproof Tritan Top Window', desc: 'Mirror-polished stainless steel spice box keeping your daily tempering spices organized and visible.' },
    ],
  },
  {
    id: 24,
    name: 'Stationery & Office Supplies',
    slug: 'stationery-office',
    aisleGroup: 'Stationery, Tech & Lifestyle',
    description:
      'Hardbound dot-grid journals, smooth rollerball pens, pastel highlighters, A4 copier paper, desk organizers, sticky notes, and watercolour art supplies.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Notebooks, Journals & Pads',
      'Pens, Pencils & Highlighters',
      'Files, Folders & A4 Paper',
      'Tapes, Adhesives & Desk Tools',
      'Art, Sketching & School Supplies',
    ],
    items: [
      { name: 'A5 Hardbound 100 GSM Ivory Dot-Grid Notebook (192 Pages)', brand: 'Factor Notes / Classmate Pulse', sub: 'Notebooks, Journals & Pads', unit: '1 Hardcover Journal (Sage Linen)', price: 295, mrp: 350, stock: 54, diet: 'Standard', storage: 'Dry desk', attr: 'Lay-Flat Smyth Sewn · Fountain-Pen Friendly · Back Pocket', desc: 'Archival acid-free ivory paper journal with ribbon bookmark and elastic closure.' },
      { name: '0.5mm Liquid Ink Rollerball Pens (Blue & Black, Pack of 5)', brand: 'Uni-ball Eye / Pilot V5', sub: 'Pens, Pencils & Highlighters', unit: '5 Pens Value Pack', price: 285, mrp: 325, stock: 88, diet: 'Standard', storage: 'Cap after use', attr: 'Waterproof Pigment Ink · Tungsten Carbide Ball', desc: 'Consistent, skip-free liquid ink flow from the first word to the last drop.' },
      { name: 'Pastel Chisel-Tip Text Highlighters (Set of 6 Botanical Hues)', brand: 'Faber-Castell / Stabilo', sub: 'Pens, Pencils & Highlighters', unit: '6 Pastel Highlighters Wallet', price: 175, mrp: 210, stock: 63, diet: 'Standard', storage: 'Store horizontally', attr: 'Smudge-Proof on Inkjet & Handwritten Notes', desc: 'Soft muted pastel highlighters (sage, peach, lavender, lemon, sky, rose) easy on the eyes.' },
      { name: 'JK Cedar 80 GSM High-Brightness A4 Copier Paper Ream', brand: 'JK Paper', sub: 'Files, Folders & A4 Paper', unit: '500 Sheets Ream', price: 365, mrp: 420, stock: 45, diet: 'Standard', storage: 'Keep wrapped against humidity', attr: 'ColorLok Technology · Jam-Free Duplex Printing', desc: 'Crisp, heavy 80 GSM A4 sheets engineered for laser and inkjet home-office printers.' },
      { name: 'Super-Sticky Canary & Pastel Repositionable Notes Cube', brand: '3M Post-it', sub: 'Notebooks, Journals & Pads', unit: '4 Pads × 100 Sheets (76 × 76 mm)', price: 189, mrp: 230, stock: 72, diet: 'Standard', storage: 'Desk drawer', attr: '2x Sticking Power · Clean Removal', desc: 'Essential desk reminder pads that stick securely to monitors, walls, and planners.' },
      { name: 'Extra-Dark 2B Graphite Pencils with Dust-Free Erasers (Box of 20)', brand: 'Apsara Platinum', sub: 'Pens, Pencils & Highlighters', unit: '2 packs × 10 Pencils + Sharpeners', price: 118, mrp: 140, stock: 110, diet: 'Standard', storage: 'Pencil box', attr: 'Hexagonal Grip · Break-Resistant Bonded Lead', desc: 'Smooth, dark handwriting and sketching pencils made from sustainable linden wood.' },
      { name: '12-Pocket Expanding Accordion Document Organizer File (A4)', brand: 'Solo', sub: 'Files, Folders & A4 Paper', unit: '1 Polypropylene Folder with Index Tabs', price: 245, mrp: 299, stock: 39, diet: 'Standard', storage: 'Bookshelf', attr: 'Water-Resistant · Holds up to 350 Sheets', desc: 'Keep tax receipts, medical records, and warranties sorted with colour-coded monthly tabs.' },
      { name: 'Scotch Magic Invisible Tape Dispenser + Fevistik Glue Stick Combo', brand: '3M & Pidilite', sub: 'Tapes, Adhesives & Desk Tools', unit: '1 Desktop Tape Dispenser + 2 × 15g Glue Sticks', price: 165, mrp: 195, stock: 68, diet: 'Standard', storage: 'Desk caddy', attr: 'Writeable Matte Tape · Non-Toxic Solvent-Free Glue', desc: 'Everyday office and craft bonding combo for mending documents and school projects.' },
      { name: '24-Shade Artist Watercolour Cakes with Water-Brush Pen', brand: 'Brustro / Camlin Kokuyo', sub: 'Art, Sketching & School Supplies', unit: 'Pocket Palette Tin + Refillable Brush', price: 399, mrp: 480, stock: 26, diet: 'Standard', storage: 'Dry studio bag', attr: 'High Pigment Load · Built-In Mixing Wells', desc: 'Portable field watercolour set for botanical illustration, urban sketching, and hobby painting.' },
      { name: 'Spiral-Bound College Subject Notebook Pack (Single Line, 300 Pages)', brand: 'Classmate', sub: 'Notebooks, Journals & Pads', unit: 'Pack of 3 Notebooks', price: 315, mrp: 360, stock: 77, diet: 'Standard', storage: 'Study desk', attr: 'Elemental Chlorine-Free Whiter Pages · Micro-Perforated', desc: 'Twin-wire spiral notebooks that fold 360° flat for lecture notes and exam prep.' },
    ],
  },
  {
    id: 25,
    name: 'Electronics & Accessories',
    slug: 'electronics-accessories',
    aisleGroup: 'Stationery, Tech & Lifestyle',
    description:
      'Alkaline AA/AAA batteries, 65W GaN Type-C fast chargers, braided Lightning & USB-C cables, wired earphones, surge-protected extension boards, and LED emergency bulbs.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'AA, AAA & Coin Batteries',
      'Braided USB-C & Lightning Cables',
      'Fast Chargers & Power Adapters',
      'Earphones & Mobile Stands',
      'Surge Protectors & Smart LED Bulbs',
    ],
    items: [
      { name: 'Ultra Alkaline AA & AAA Battery Combo Pack (10-Year Shelf Life)', brand: 'Duracell Ultra', sub: 'AA, AAA & Coin Batteries', unit: 'Pack of 8 (4 × AA + 4 × AAA)', price: 289, mrp: 340, stock: 95, diet: 'Standard', storage: 'Cool dry drawer', attr: '1.5V High-Drain · Duralock Power Preserve Technology', desc: 'Long-lasting alkaline power for wireless mice, AC remotes, toys, and digital weighing scales.' },
      { name: '100W Braided Type-C to Type-C PD Fast Charging Cable (1.5 Meter)', brand: 'Portronics / Anker Style', sub: 'Braided USB-C & Lightning Cables', unit: '1.5m Nylon Braided Cable (Space Grey)', price: 299, mrp: 499, stock: 64, diet: 'Standard', storage: 'Velcro tie included', attr: 'E-Marker Smart Chip · 480 Mbps Data · 15,000+ Bend Lifespan', desc: 'Supports high-speed Power Delivery charging for MacBooks, iPads, iPhone 15/16, and Android flagships.' },
      { name: '33W Dual-Port (USB-C PD + USB-A QC 3.0) GaN Wall Charger Adapter', brand: 'Ambrane / Stuffcool', sub: 'Fast Chargers & Power Adapters', unit: '1 BIS-Certified Indian Plug Adapter', price: 649, mrp: 999, stock: 42, diet: 'Standard', storage: 'Indoor socket use', attr: 'PPS Support · Charges 0–50% in 25 Mins · Over-Voltage Protection', desc: 'Compact Gallium Nitride fast charger compatible with Samsung Super Fast Charging, iPhone, and Pixel.' },
      { name: 'In-Ear Wired Earphones with 10mm Bass Drivers & Inline HD Mic (3.5mm / Type-C)', brand: 'boAt BassHeads / Realme', sub: 'Earphones & Mobile Stands', unit: '1 Pair + 3 Silicone Ear-Tip Sizes', price: 449, mrp: 799, stock: 51, diet: 'Standard', storage: 'Carry pouch', attr: 'Tangle-Free Flat Cable · One-Button Call & Track Control', desc: 'Zero-latency wired earphones for clear Zoom/Teams calls, music, and gaming.' },
      { name: '4-Socket Surge Protector Power Strip with 2 Meter Heavy-Duty Cord', brand: 'Bajaj / Belkin Style', sub: 'Surge Protectors & Smart LED Bulbs', unit: '4 Universal Sockets + Master Switch', price: 495, mrp: 650, stock: 38, diet: 'Standard', storage: 'Workstation floor', attr: '2500W Max Load (10A) · Child Safety Shutters · Spike Guard', desc: 'Protects laptops, monitors, and routers against voltage spikes and power surges.' },
      { name: 'MFi-Certified USB-C to Lightning Braided Fast Charge Cable (1.2 Meter)', brand: 'Stuffcool', sub: 'Braided USB-C & Lightning Cables', unit: '1.2m Cable (White)', price: 599, mrp: 899, stock: 33, diet: 'Standard', storage: 'Desk organizer', attr: '27W PD Fast Charge for iPhone 12/13/14 & AirPods', desc: 'Reinforced aramid-fiber core cable engineered for uninterrupted Apple CarPlay and PD charging.' },
      { name: '9W Rechargeable Inverter Emergency LED Bulb (4-Hour Battery Backup)', brand: 'Wipro Garnet / Philips', sub: 'Surge Protectors & Smart LED Bulbs', unit: '1 B22 Base Cool Daylight LED Bulb', price: 329, mrp: 450, stock: 57, diet: 'Standard', storage: 'Standard B22 holder', attr: '2200 mAh Lithium Battery · Auto-On During Power Cuts', desc: 'Automatically switches to battery backup mode during electricity outages while charging during normal use.' },
      { name: 'Foldable Aluminium Desktop Phone & Tablet Stand (Adjustable Angle)', brand: 'Portronics MyBuddy', sub: 'Earphones & Mobile Stands', unit: '1 Anodized Alloy Stand', price: 249, mrp: 399, stock: 49, diet: 'Standard', storage: 'Folds flat for backpack', attr: 'Anti-Skid Silicone Pads · Supports 4" to 12.9" Devices', desc: 'Sturdy ergonomic desk stand for video calls, recipe reading in the kitchen, and second-screen workflows.' },
      { name: 'CR2032 3V Lithium Coin Cell Batteries (Pack of 5)', brand: 'Panasonic / Duracell', sub: 'AA, AAA & Coin Batteries', unit: '5 Blister-Packed Coin Cells', price: 150, mrp: 190, stock: 82, diet: 'Standard', storage: 'Child-resistant packaging', attr: 'Car Key Fobs, AirTags, Motherboards & Kitchen Scales', desc: 'High-density 3V lithium button batteries with leak-resistant sealing.' },
      { name: '6-in-1 Screen Cleaning Mist Spray & Microfiber Keyboard Brush Kit', brand: 'Gizga Essentials', sub: 'Earphones & Mobile Stands', unit: '100 ml Alcohol-Free Spray + Plush Cloth + Air Blower', price: 199, mrp: 299, stock: 66, diet: 'Standard', storage: 'Desk drawer', attr: 'Safe on Oleophobic MacBook, OLED TV & Spectacle Lenses', desc: 'Removes fingerprints, oil smudges, and keyboard dust without damaging anti-reflective coatings.' },
    ],
  },
  {
    id: 26,
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    aisleGroup: 'Stationery, Tech & Lifestyle',
    description:
      'Chicken & brown rice adult dog food, ocean fish cat food, Himalayan yak-milk chew bars, clumping bentonite cat litter, tick-free neem shampoos, and chew toys.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Dry & Wet Dog Food',
      'Cat Food & Pouches',
      'Healthy Dental & Training Treats',
      'Cat Litter & Hygiene Bags',
      'Pet Grooming, Bowls & Toys',
    ],
    items: [
      { name: 'Real Chicken, Egg & Brown Rice Adult Dog Food', brand: 'Pedigree Pro / Drools Focus', sub: 'Dry & Wet Dog Food', unit: '1.2 kg Ziplock Bag', price: 345, mrp: 410, stock: 48, diet: 'Non-Veg', storage: 'Reseal bag in cool dry place', attr: '24% Protein · Omega 3 & 6 for Shiny Coat · No Corn/Soy', desc: 'Complete balanced kibble formulated with human-grade chicken and digestive prebiotics.' },
      { name: 'Ocean Tuna & Salmon in Jelly Wet Cat Food Pouches (Pack of 6)', brand: 'Whiskas / Sheba', sub: 'Cat Food & Pouches', unit: '6 × 85 g Pouches', price: 279, mrp: 330, stock: 62, diet: 'Non-Veg', storage: 'Refrigerate unused portion', attr: 'Taurine Enriched · High Moisture Urinary Support', desc: 'Flaked real tuna and salmon fillets in savoury jelly for adult cats.' },
      { name: 'Himalayan Yak Milk & Cow Milk Hard Dental Dog Chew Bar', brand: 'Heads Up For Tails (HUFT)', sub: 'Healthy Dental & Training Treats', unit: '100 g Medium Chew Bar', price: 249, mrp: 299, stock: 37, diet: 'Veg', storage: 'Dry pantry', attr: '100% Natural Smoke-Dried Cheese · Reduces Tartar & Plaque', desc: 'Long-lasting artisanal Himalayan churpi cheese chew that keeps dogs occupied for hours.' },
      { name: 'Activated Charcoal & Lavender Ultra-Clumping Bentonite Cat Litter', brand: 'Purepet / Intersand Style', sub: 'Cat Litter & Hygiene Bags', unit: '5 kg Bag', price: 325, mrp: 399, stock: 44, diet: 'Standard', storage: 'Scoop daily', attr: '99% Dust-Free · Instant Hard Clumps · 14-Day Odour Lock', desc: 'Natural sodium bentonite clay litter with activated coconut charcoal to neutralize ammonia odours.' },
      { name: 'Neem, Tea Tree & Oatmeal Anti-Tick & Flea Dog Shampoo', brand: 'Captain Zack', sub: 'Pet Grooming, Bowls & Toys', unit: '200 ml Bottle', price: 285, mrp: 340, stock: 33, diet: 'Vegan', storage: 'Bathroom shelf', attr: 'pH Balanced for Canine Skin · Paraben & Sulphate Free', desc: 'Botanical conditioning pet wash that soothes itchy paws and naturally repels ticks.' },
      { name: 'Slow-Baked Pumpkin, Peanut Butter & Turmeric Dog Biscuits', brand: 'Sara’s Wholesome (HUFT)', sub: 'Healthy Dental & Training Treats', unit: '250 g Jar', price: 215, mrp: 260, stock: 51, diet: 'Veg', storage: 'Airtight jar', attr: 'Gluten-Free Oat Flour · Human-Grade Ingredients', desc: 'Crunchy oven-baked training treats free from meat by-products and artificial preservatives.' },
      { name: 'Natural Cotton Rope & Squeaky Rubber Ring Fetch Toy Combo', brand: 'Trixie / HUFT', sub: 'Pet Grooming, Bowls & Toys', unit: '2-Piece Interactive Toy Set', price: 265, mrp: 325, stock: 29, diet: 'Standard', storage: 'Washable', attr: 'Non-Toxic Natural Rubber + Unbleached Cotton Floss Rope', desc: 'Satisfies natural chewing instincts while flossing teeth and gums.' },
      { name: 'Anti-Skid Heavy Stainless Steel Pet Feeding & Water Bowl Set', brand: 'Heads Up For Tails', sub: 'Pet Grooming, Bowls & Toys', unit: '2 × 700 ml Bowls', price: 349, mrp: 420, stock: 36, diet: 'Standard', storage: 'Dishwasher safe', attr: 'Bonded Rubber Base Prevents Sliding & Spills', desc: 'Hygienic, rust-proof 304 stainless steel bowls suitable for both dogs and cats.' },
      { name: 'Biodegradable Lavender-Scented Dog Poop Pickup Bags + Dispenser', brand: 'Earth Rated Style', sub: 'Cat Litter & Hygiene Bags', unit: '4 Rolls (60 Extra-Thick Bags) + Leash Clip', price: 199, mrp: 250, stock: 74, diet: 'Standard', storage: 'Clip to walking leash', attr: '100% Leak-Proof · Cornstarch Blend', desc: 'Extra-long, easy-tear waste bags that mask odours during daily walks.' },
      { name: 'Chicken Breast & Sweet Potato Dehydrated Jerky Strips for Dogs & Cats', brand: 'Chip Chops', sub: 'Healthy Dental & Training Treats', unit: '70 g Resealable Pack', price: 175, mrp: 210, stock: 47, diet: 'Non-Veg', storage: 'Cool dry place', attr: '82% Lean Protein · Low Fat', desc: 'Slow air-dried real chicken breast fillets wrapped around sweet potato sticks.' },
    ],
  },
  {
    id: 27,
    name: 'Travel & Convenience',
    slug: 'travel-convenience',
    aisleGroup: 'Stationery, Tech & Lifestyle',
    description:
      'Windproof compact umbrellas, flight-approved 100ml toiletry kits, memory-foam neck pillows, first-aid travel pouches, luggage tags, and stain-remover pens.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Travel-Size Toiletries & Kits',
      'Umbrellas & Rain Gear',
      'Neck Pillows, Eye Masks & Comfort',
      'Emergency First-Aid & Repellents',
      'Packing Cubes & Travel Bottles',
    ],
    items: [
      { name: 'Auto-Open Windproof 8-Rib Compact Travel Umbrella (UV50+ & Rain)', brand: 'Johns / Decathlon Style', sub: 'Umbrellas & Rain Gear', unit: '1 Folding Umbrella + Waterproof Sleeve', price: 449, mrp: 599, stock: 42, diet: 'Standard', storage: 'Dry open before folding', attr: 'Fiberglass Flex Ribs · Black UV-Block Canopy · 28 cm Folded', desc: 'One-button automatic open/close umbrella engineered for Indian monsoon gusts and harsh summer sun.' },
      { name: 'Cabin-Approved Leak-Proof Silicone Travel Bottles & Toiletry Pouch Set', brand: 'Miniso / DailyObjects Style', sub: 'Packing Cubes & Travel Bottles', unit: '4 × 90 ml Silicone Squeeze Bottles + Clear Zip Bag', price: 299, mrp: 399, stock: 56, diet: 'Standard', storage: 'Rinse warm water', attr: 'TSA / DGCA 100ml Carry-On Compliant · Wide-Mouth Refill', desc: 'Soft BPA-free silicone bottles with no-drip valves for shampoo, sunscreen, and lotion.' },
      { name: 'Ergonomic Memory Foam Travel Neck Pillow with Mulberry Silk Eye Mask', brand: 'Frido / Wakefit Style', sub: 'Neck Pillows, Eye Masks & Comfort', unit: '1 Pillow + Eye Mask + Earplugs + Compact Bag', price: 599, mrp: 799, stock: 31, diet: 'Standard', storage: 'Removable washable velour cover', attr: '360° Chin & Cervical Support · Rolls into Palm-Sized Pouch', desc: 'High-density slow-rebound memory foam pillow for restful sleep on flights and overnight trains.' },
      { name: 'Complete 32-Piece Pocket First-Aid & Emergency Travel Kit', brand: 'Apollo / Hansaplast', sub: 'Emergency First-Aid & Repellents', unit: '1 Zippered Ripstop Pouch', price: 245, mrp: 299, stock: 68, diet: 'Standard', storage: 'Glovebox or backpack', attr: 'Waterproof Bandages, Antiseptic Wipes, Crepe Bandage, ORS & Scissors', desc: 'Compact emergency medical kit for road trips, treks, and home preparedness.' },
      { name: 'Citronella & Eucalyptus Natural Mosquito Repellent Roll-On + Patches', brand: 'Good Knight Fabric Roll-On', sub: 'Emergency First-Aid & Repellents', unit: '8 ml Roll-On + 24 Herbal Patches', price: 145, mrp: 175, stock: 94, diet: 'Vegan', storage: 'Apply 4 dots on clothing', attr: '0% DEET · Pediatrician Certified · 8-Hour Protection', desc: 'Stain-free pure citronella and eucalyptus oil blend that keeps mosquitoes away indoors and outdoors.' },
      { name: 'Compressed Coin Tissue Tablets (Just Add Water, Pack of 50)', brand: 'Miniso', sub: 'Travel-Size Toiletries & Kits', unit: '50 Individually Wrapped Cotton Coins', price: 159, mrp: 199, stock: 79, diet: 'Vegan', storage: 'Dry pocket', attr: 'Expands to 22 × 24 cm Thick Wet Towel with 1 tsp Water', desc: 'Space-saving 100% plant viscose compressed towels for travel, dining, and gym bags.' },
      { name: 'Instant On-The-Go Clothing Stain Remover Rescue Pen', brand: 'Tide To Go Style / Presto', sub: 'Travel-Size Toiletries & Kits', unit: '3 × 10 ml Pocket Pens', price: 275, mrp: 330, stock: 44, diet: 'Standard', storage: 'Keep capped in handbag', attr: 'Erases Coffee, Curry, Tea & Ketchup Stains Instantly', desc: 'Microfiber scrubbing tip pen that lifts fresh food and beverage spills without leaving water rings.' },
      { name: 'Foldable Pocket Travel Toothbrush & Mini Herbal Paste Duo (Pack of 2)', brand: 'Colgate / Oral-B Travel', sub: 'Travel-Size Toiletries & Kits', unit: '2 Folding Brushes + 2 × 20g Pastes', price: 135, mrp: 165, stock: 86, diet: 'Vegan', storage: 'Ventilated case', attr: 'Charcoal Soft Bristles · Snap-Lockventilated Handle', desc: 'Hygienic folding toothbrush that tucks its bristles inside the handle for dust-free travel.' },
      { name: 'Universal All-In-One International Travel Plug Adapter with Dual USB', brand: 'Ceptics / Portronics', sub: 'Packing Cubes & Travel Bottles', unit: '1 Universal Adapter (US/UK/EU/AU/IN)', price: 549, mrp: 699, stock: 27, diet: 'Standard', storage: 'Travel pouch', attr: 'Built-In 8A Safety Fuse · Works in 150+ Countries', desc: 'Slide-lock international plug converter with dual USB charging ports.' },
      { name: 'Ripstop Nylon Ultralight Folding Shopping & Gym Daypack (Folds into Pouch)', brand: 'Decathlon Forclaz Style', sub: 'Packing Cubes & Travel Bottles', unit: '15 Litre Packable Backpack (85 grams)', price: 299, mrp: 399, stock: 53, diet: 'Standard', storage: 'Folds into integrated pocket', attr: 'Water-Repellent Coating · Emergency Extra Bag', desc: 'Featherlight backup backpack that fits in your palm and unfolds to carry 15 litres.' },
    ],
  },
  {
    id: 28,
    name: 'Gardening',
    slug: 'gardening',
    aisleGroup: 'Home, Kitchen & Cleaning',
    description:
      'Enriched cocopeat & vermicompost potting mix, heirloom herb & vegetable seed kits, pruning shears, self-watering planters, and organic neem oil spray.',
    imageUrl: IMG_HOUSEHOLD,
    subcategories: [
      'Potting Mix, Vermicompost & Cocopeat',
      'Herb, Vegetable & Flower Seeds',
      'Trowels, Pruners & Watering Cans',
      'Ceramic & Self-Watering Planters',
      'Neem Oil & Organic Plant Food',
    ],
    items: [
      { name: 'Ready-to-Use Organic Potting Soil Mix with Vermicompost & Neem Cake', brand: 'Ugaoo', sub: 'Potting Mix, Vermicompost & Cocopeat', unit: '5 kg Resealable Bag', price: 249, mrp: 299, stock: 64, diet: 'Standard', storage: 'Dry balcony corner', attr: 'Soil-Free Cocopeat, Perlite, Vermicompost & Mycorrhiza', desc: 'Light, well-draining balcony potting mix that prevents root rot and feeds plants for 6 months.' },
      { name: 'Kitchen Herb Garden Heirloom Seed Kit (Basil, Mint, Coriander, Cherry Tomato, Chilli)', brand: 'AllThatGrows', sub: 'Herb, Vegetable & Flower Seeds', unit: '5 Seed Packets + Sowing Calendar + Plant Tags', price: 199, mrp: 260, stock: 72, diet: 'Organic', storage: 'Cool dry drawer', attr: 'Non-GMO Open-Pollinated · >85% Germination Rate', desc: 'Grow your own pesticide-free culinary herbs on any sunny kitchen windowsill or balcony.' },
      { name: 'Cold-Pressed Water-Soluble Neem Oil Spray for Plant Pest Protection', brand: 'TrustBasket / Ugaoo', sub: 'Neem Oil & Organic Plant Food', unit: '250 ml Concentrate + Spray Trigger', price: 215, mrp: 265, stock: 58, diet: 'Organic', storage: 'Spray leaves in evening', attr: '3000 PPM Azadirachtin · Controls Mealybugs, Aphids & Mites', desc: '100% organic botanical pest shield safe around bees, butterflies, pets, and edible herbs.' },
      { name: 'Heavy-Duty Carbon Steel Bypass Pruning Shears & Garden Trowel Set', brand: 'Falcon / Kraft Seeds', sub: 'Trowels, Pruners & Watering Cans', unit: '1 Secateur Pruner + 1 Wooden-Handle Trowel', price: 385, mrp: 480, stock: 34, diet: 'Standard', storage: 'Wipe blades after use', attr: 'Safety Thumb Lock · Cuts Stems up to 15 mm', desc: 'Rust-resistant gardening hand tools for repotting, deadheading roses, and harvesting herbs.' },
      { name: 'Low-EC Washed Cocopeat Block (Expands to 25 Litres)', brand: 'TrustBasket', sub: 'Potting Mix, Vermicompost & Cocopeat', unit: '5 kg Compressed Brick', price: 269, mrp: 340, stock: 49, diet: 'Vegan', storage: 'Soak in 20L water for 30 mins', attr: 'Sun-Dried & Triple-Washed · Retains 8x Water Weight', desc: 'Sustainable coconut husk soil conditioner that keeps balcony pots light and aerated.' },
      { name: 'Self-Watering Matte Terracotta-Tone Desk Planters (Set of 2)', brand: 'Ugaoo', sub: 'Ceramic & Self-Watering Planters', unit: '2 × 5-Inch Pots with Cotton Wick Reservoir', price: 349, mrp: 450, stock: 39, diet: 'Standard', storage: 'Refill bottom reservoir every 10 days', attr: 'Water-Level Window · Ideal for Peace Lily, Pothos & Succulents', desc: 'Keeps indoor plants hydrated automatically while you travel.' },
      { name: 'Earthworm Castings Pure Organic Vermicompost Fertilizer', brand: 'TrustBasket', sub: 'Potting Mix, Vermicompost & Cocopeat', unit: '5 kg Bag', price: 189, mrp: 240, stock: 77, diet: 'Organic', storage: 'Keep moist in shade', attr: 'Odour-Free · Rich in Humic Acid & Beneficial Microbes', desc: 'Black-gold organic manure that boosts flowering and fruiting in home gardens.' },
      { name: 'Seaweed Liquid Extract & Humic Acid Plant Growth Tonic', brand: 'IFFCO Urban Gardens', sub: 'Neem Oil & Organic Plant Food', unit: '250 ml Measured Bottle', price: 225, mrp: 275, stock: 45, diet: 'Organic', storage: 'Dilute 3 ml per litre water', attr: 'Ascophyllum Nodosum Kelp · Lush Foliage & Root Vigour', desc: 'Bio-stimulant liquid fertilizer that revives stressed indoor and balcony plants.' },
      { name: 'Long-Spout Indoor Plant Watering Can with Brass-Style Rose Head', brand: 'IKEA Style / Nestasia', sub: 'Trowels, Pruners & Watering Cans', unit: '1.8 Litre Watering Can (Sage Green)', price: 325, mrp: 399, stock: 28, diet: 'Standard', storage: 'Balcony shelf', attr: 'Precision Gooseneck Spout · No-Spill Indoor Watering', desc: 'Reaches deep under dense houseplant leaves without splashing soil onto tables.' },
      { name: 'Fragrant Rajnigandha, Marigold & Mogra Indian Flower Seed & Bulb Trio', brand: 'AllThatGrows', sub: 'Herb, Vegetable & Flower Seeds', unit: '10 Rajnigandha Bulbs + 2 Seed Packs', price: 235, mrp: 290, stock: 36, diet: 'Organic', storage: 'Plant in sunny pots', attr: 'Pollinator-Friendly Fragrant Balcony Blooms', desc: 'Bring classic Indian temple and courtyard fragrances to your balcony containers.' },
    ],
  },
  {
    id: 29,
    name: 'Celebration & Gifting',
    slug: 'celebration-gifting',
    aisleGroup: 'Stationery, Tech & Lifestyle',
    description:
      'Metallic birthday candles, handmade seed-paper greeting cards, recycled kraft gift wrap, pastel latex balloons, brass urli bowls, and gourmet gift hampers.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Birthday Candles, Toppers & Banners',
      'Greeting Cards & Gift Envelopes',
      'Wrapping Paper, Ribbons & Gift Bags',
      'Party Balloons & Table Decor',
      'Curated Gourmet & Wellness Hampers',
    ],
    items: [
      { name: 'Metallic Gold Twisted Spiral Birthday Cake Candles (Pack of 12 + Holders)', brand: 'Party Propz', sub: 'Birthday Candles, Toppers & Banners', unit: '12 Long Taper Candles (14 cm)', price: 119, mrp: 160, stock: 88, diet: 'Standard', storage: 'Cool flat drawer', attr: 'Smokeless Food-Safe Paraffin & Soy Wax · Drip-Less', desc: 'Elegant tall champagne-gold spiral candles that elevate any birthday or anniversary cake.' },
      { name: 'Plantable Wildflower Seed-Paper Greeting Cards + Shagun Envelopes Set', brand: 'Phool /21Fools', sub: 'Greeting Cards & Gift Envelopes', unit: '3 Greeting Cards + 5 Gold-Foiled Envelopes', price: 249, mrp: 320, stock: 54, diet: 'Vegan', storage: 'Dry desk', attr: 'Handcrafted Cotton Rag Paper Embedded with Basil & Marigold Seeds', desc: 'After reading, plant the card in soil to grow real wildflowers and tulsi.' },
      { name: 'Botanical Block-Print Recycled Cotton Gift Wrapping Sheets & Satin Ribbon Roll', brand: 'Fabindia / Chumbak Style', sub: 'Wrapping Paper, Ribbons & Gift Bags', unit: '5 Large Sheets (50 × 70 cm) + 10m Olive Satin Ribbon + Tags', price: 225, mrp: 280, stock: 63, diet: 'Standard', storage: 'Rolled in tube', attr: '120 GSM Thick Tree-Free Cotton Paper', desc: 'Tear-resistant artisanal gift wrap sheets that fold crisp corners without cracking.' },
      { name: 'Pastel Sage, Cream & Metallic Chrome Gold Latex Balloons Set (50 Pcs)', brand: 'Party Propz', sub: 'Party Balloons & Table Decor', unit: '50 Balloons + Garland Arch Strip + Glue Dots', price: 239, mrp: 349, stock: 71, diet: 'Standard', storage: 'Keep away from heat', attr: '100% Natural Latex · Helium & Air Compatible', desc: 'Curated neutral and gold balloon garland kit for tasteful home birthdays and baby showers.' },
      { name: 'Luxury Heavy-GSM Matte Gift Bags with Rope Handles (Set of 3 Sizes)', brand: 'Archies / Hallmark Style', sub: 'Wrapping Paper, Ribbons & Gift Bags', unit: 'Small, Medium & Large Bags + Tissue Paper', price: 215, mrp: 265, stock: 59, diet: 'Standard', storage: 'Folds flat', attr: '300 GSM Reinforced Base · Gold Foil Botanical Motif', desc: 'Ready-to-gift sturdy boutique bags for wine bottles, apparel, and sweet boxes.' },
      { name: 'Soy Wax Hand-Poured Madurai Jasmine & Sandalwood Jar Candle', brand: 'Ekam / Rosemoore', sub: 'Curated Gourmet & Wellness Hampers', unit: '180 g Frosted Amber Jar (35-Hr Burn)', price: 449, mrp: 550, stock: 34, diet: 'Vegan', storage: 'Trim cotton wick to 5mm before lighting', attr: '100% Natural Soy Wax · Lead-Free Braided Cotton Wick', desc: 'Fills living spaces with calming South Indian mogra jasmine and Mysore sandalwood notes.' },
      { name: 'Acrylic Gold “Happy Birthday” & “Congratulations” Reusable Cake Toppers', brand: 'Party Propz', sub: 'Birthday Candles, Toppers & Banners', unit: 'Pack of 2 Laser-Cut Mirror Gold Toppers', price: 145, mrp: 199, stock: 67, diet: 'Standard', storage: 'Peel protective film before use', attr: 'Food-Safe Washable Acrylic', desc: 'Sleek calligraphy cake toppers for instant celebration styling.' },
      { name: 'Temple Flower Recycled Incense Cones & Brass Holder Gift Box (Oudh & Rose)', brand: 'Phool', sub: 'Curated Gourmet & Wellness Hampers', unit: '40 Cones + Handcrafted Brass Holder', price: 265, mrp: 315, stock: 48, diet: 'Vegan', storage: 'Dry puja or living room shelf', attr: 'Upcycled Sacred Temple Flowers · 0% Charcoal', desc: 'Hand-rolled by women self-help groups in Kanpur using upcycled marigold and rose petals.' },
      { name: 'Sparkling Zero-Alcohol Belgian White Grape Celebration Drink', brand: 'Carl Jung / Jacob’s Creek Unvined', sub: 'Curated Gourmet & Wellness Hampers', unit: '750 ml Corked Champagne Bottle', price: 595, mrp: 699, stock: 26, diet: 'Vegan', storage: 'Serve chilled at 6°C', attr: '0.0% ABV · Crisp Green Apple & Citrus Bubbles', desc: 'Pop the cork for inclusive family toasts, baby showers, and festive dinners.' },
      { name: 'Artisanal Tea, Wildflower Honey, Brass Infuser & Shortbread Gratitude Hamper', brand: 'Organica Gifting', sub: 'Curated Gourmet & Wellness Hampers', unit: '4-Piece Curated Keepsake Box', price: 899, mrp: 1099, stock: 22, diet: 'Veg', storage: 'Cool dry place', attr: 'Includes Personalized Gift Note Card', desc: 'Thoughtful host, housewarming, or corporate gift box packed in a reusable linen-textured hamper.' },
    ],
  },
  {
    id: 30,
    name: 'Seasonal & Festival Collections',
    slug: 'seasonal-festival',
    aisleGroup: 'Stationery, Tech & Lifestyle',
    description:
      'Diwali diyas & rangoli kits, plant-based Holi gulal, summer thandai & aam panna concentrates, monsoon pakora & masala chai essentials, and back-to-school bundles.',
    imageUrl: IMG_HOME_PERSONAL,
    subcategories: [
      'Diwali Diyas, Torans & Puja Kits',
      'Compliant Herbal Holi Colours (Gulal)',
      'Summer Thandai, Aam Panna & Coolers',
      'Monsoon Chai & Pakora Essentials',
      'Back-to-School & Exam Combos',
    ],
    items: [
      { name: 'Handcrafted Terracotta & Brass Wax-Filled Diwali Diyas (Set of 12)', brand: 'Phool Festive', sub: 'Diwali Diyas, Torans & Puja Kits', unit: '12 Pre-Filled Cow Ghee & Soy Wax Diyas', price: 299, mrp: 375, stock: 64, diet: 'Veg', storage: 'Dry festive box', attr: '4-Hour Smokeless Burn · Hand-Painted by Rural Artisans', desc: 'Ready-to-light terracotta and brass diyas infused with lemongrass and marigold essential oils.' },
      { name: 'Certified Organic Flower-Derived Herbal Holi Gulal Box (4 Colours)', brand: 'Phool', sub: 'Compliant Herbal Holi Colours (Gulal)', unit: '4 × 100 g Pouches (Pink, Yellow, Green, Blue)', price: 345, mrp: 425, stock: 45, diet: 'Vegan', storage: 'Keep dry', attr: 'Skin-Safe Certified · Made from Tesu, Beetroot, Turmeric & Indigo · 0% Silica/Lead', desc: 'Silky-soft, washable botanical gulal scented with natural essential oils.' },
      { name: 'Banarasi Badam, Pistachio, Saffron & Rose Petal Thandai Concentrate', brand: 'Guruji / Gopaljee', sub: 'Summer Thandai, Aam Panna & Coolers', unit: '750 ml Glass Bottle', price: 365, mrp: 420, stock: 39, diet: 'Gluten-Free', storage: 'Refrigerate after opening · Mix 1:5 with chilled milk', attr: '32% Crushed Almonds, Melon Seeds, Fennel & Black Pepper', desc: 'Traditional stone-ground cooling summer and Holi elixir.' },
      { name: 'Roasted Cumin & Mint Raw Mango Aam Panna Concentrate', brand: 'Paper Boat / Mapro', sub: 'Summer Thandai, Aam Panna & Coolers', unit: '750 ml Bottle', price: 225, mrp: 270, stock: 58, diet: 'Vegan', storage: 'Stir with ice water', attr: 'Real Boiled Kairi Pulp + Kala Namak · Heatstroke Protection', desc: 'Tangy, smoky green mango cooler that replenishes electrolytes on hot afternoons.' },
      { name: 'Complete Lakshmi-Ganesh Diwali Puja Samagri Box (21 Sacred Items)', brand: 'Phool', sub: 'Diwali Diyas, Torans & Puja Kits', unit: '1 Complete Samagri Kit + Puja Vidhi Booklet', price: 499, mrp: 599, stock: 41, diet: 'Veg', storage: 'Dry altar', attr: 'Gangajal, Roli, Akshat, Camphor, Brass Bell, Kalava, Sambrani & Mishri', desc: 'Everything needed for an auspicious home or office festive puja in one organized box.' },
      { name: 'Monsoon Adrak-Elaichi Masala Chai & Crispy Onion Pakora Mix Bundle', brand: 'Girnar & Tata Sampann', sub: 'Monsoon Chai & Pakora Essentials', unit: '36 Chai Premix Sachets + 500g Fine Besan', price: 389, mrp: 455, stock: 52, diet: 'Veg', storage: 'Dry kitchen shelf', attr: 'Instant Ginger-Cardamom Karak Chai + Low-Oil-Absorption Chana Besan', desc: 'The ultimate rainy afternoon companion bundle ready in 5 minutes.' },
      { name: 'Vetiver Root (Khus) & Kashmiri Rose Sharbat Summer Duo', brand: 'Mapro / Rooh Afza Style', sub: 'Summer Thandai, Aam Panna & Coolers', unit: '2 × 750 ml Bottles', price: 375, mrp: 440, stock: 47, diet: 'Vegan', storage: 'Cool pantry', attr: 'Natural Cooling Vetiver & Damask Rose Distillate', desc: 'Fragrant botanical syrups for chilled milkshakes, falooda, lassi, and lemonades.' },
      { name: 'Natural Marble & Flower Petal Rangoli Stencil + Organic Colours Kit', brand: 'Cycle Pure', sub: 'Diwali Diyas, Torans & Puja Kits', unit: '4 Wooden Stencils + 6 × 100g Natural Rangoli Powders', price: 265, mrp: 330, stock: 38, diet: 'Vegan', storage: 'Dry box', attr: 'Non-Staining Floor Safe Marble Dust & Flower Pigments', desc: 'Create intricate festive entrance rangolis in minutes without floor stains.' },
      { name: 'Back-to-School Stainless Steel Bento Box, Leak-Proof Sipper & Geometry Kit', brand: 'Milton & Classmate', sub: 'Back-to-School & Exam Combos', unit: '3-Piece Student Starter Bundle', price: 699, mrp: 870, stock: 29, diet: 'Standard', storage: 'School backpack', attr: 'BPA-Free · Rust-Proof 304 Steel + Precision Mathematical Instruments', desc: 'All-in-one new term bundle combining healthy lunchware and classroom essentials.' },
      { name: 'Makar Sankranti Til-Gud (Sesame & Organic Jaggery) Crispy Chikki & Gajak Box', brand: 'Lonavala Maganlal Style', sub: 'Diwali Diyas, Torans & Puja Kits', unit: '400 g Airtight Tin', price: 210, mrp: 250, stock: 55, diet: 'Vegan', storage: 'Keep tin sealed', attr: 'Toasted White Sesame + Kolhapuri Jaggery + Cardamom', desc: 'Paper-thin, brittle winter sesame and peanut chikki rich in calcium and iron.' },
    ],
  },
];

// Build INITIAL_CATEGORIES (30 Departments)
export const INITIAL_CATEGORIES: CategoryDto[] = DEPARTMENT_SEEDS.map(
  (dept) => ({
    id: dept.id,
    name: dept.name,
    slug: dept.slug,
    description: dept.description,
    imageUrl: dept.imageUrl,
    subcategories: dept.subcategories,
    aisleGroup: dept.aisleGroup,
    productCount: dept.items.length,
  })
);

// Build INITIAL_PRODUCTS (300 Distinct Products = 30 Departments × 10 Products)
export const INITIAL_PRODUCTS: ProductDto[] = [];

let globalProductId = 1;
for (const dept of DEPARTMENT_SEEDS) {
  dept.items.forEach((raw, idx) => {
    const id = globalProductId++;
    const deptCode = dept.slug
      .split('-')
      .map((s) => s.slice(0, 2).toUpperCase())
      .join('')
      .slice(0, 4);
    const sku = `ORG-${deptCode}-${String(id).padStart(3, '0')}`;
    const slug = `${raw.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${id}`;

    const discountPercent =
      raw.mrp > raw.price
        ? Math.round(((raw.mrp - raw.price) / raw.mrp) * 100)
        : 0;

    const stockStatus: StockStatus =
      raw.stock <= 0
        ? 'OUT_OF_STOCK'
        : raw.stock <= 18
        ? 'LOW_STOCK'
        : 'IN_STOCK';

    // Deterministic demo rating (4.5 to 4.9) & review count
    const ratingValues = [4.9, 4.8, 4.7, 4.9, 4.6, 4.8, 4.7, 4.9, 4.8, 4.7];
    const reviewBase = ((id * 37) % 240) + 28;

    INITIAL_PRODUCTS.push({
      id,
      sku,
      name: raw.name,
      slug,
      brand: raw.brand,
      categoryId: dept.id,
      categoryName: dept.name,
      categorySlug: dept.slug,
      subcategory: raw.sub,
      description: raw.desc,
      ingredients: `${raw.attr} · Quality verified for ${dept.name}.`,
      origin: 'India (Direct Farm & Brand Partner Dispatch)',
      unitSize: raw.unit,
      price: raw.price,
      originalPrice: raw.mrp,
      discountPercent,
      stockQuantity: raw.stock,
      stockStatus,
      rating: ratingValues[idx % ratingValues.length],
      reviewCount: reviewBase,
      imageUrl: dept.imageUrl,
      featured: idx === 0 || idx === 1,
      bestSeller: idx === 0 || idx === 2 || idx === 5,
      newArrival: idx === 3 || idx === 8,
      trending: idx === 0 || idx === 4,
      dailyEssential: dept.id <= 12 && idx < 3,
      underBudget: raw.price <= 199,
      active: true,
      dietaryType: raw.diet,
      storageInstruction: raw.storage,
      attributes: raw.attr,
      deliveryEtaMins: 10 + (dept.id % 6),
      createdAt: new Date(
        Date.UTC(2026, 9, Math.max(1, 11 - (id % 10)), 10, 0, 0)
      ).toISOString(),
    });
  });
}

// Frequently Bought Together Bundles
export const FREQUENTLY_BOUGHT_TOGETHER_IDS: number[][] = [
  [1, 82, 84], // Alphonso Mangoes + A2 Bilona Ghee + Matka Dahi
  [121, 122, 108], // Idli-Dosa Batter + Malabar Parotta + Pink Rock Salt
  [51, 53, 86], // Sourdough Loaf + Bombay Pav + Amul Salted Butter
];

export const INITIAL_PINCODES: ServiceablePincodeDto[] = [
  {
    id: 1,
    pincode: '560038',
    city: 'Bengaluru',
    areaName: 'Indiranagar & Koramangala Hub',
    state: 'Karnataka',
    etaMinutes: 11,
    deliveryFee: 35,
    freeDeliveryThreshold: 299,
    minOrderAmount: 99,
    serviceable: true,
  },
  {
    id: 2,
    pincode: '400050',
    city: 'Mumbai',
    areaName: 'Bandra West & Pali Hill Dark Store',
    state: 'Maharashtra',
    etaMinutes: 12,
    deliveryFee: 35,
    freeDeliveryThreshold: 299,
    minOrderAmount: 99,
    serviceable: true,
  },
  {
    id: 3,
    pincode: '110001',
    city: 'New Delhi',
    areaName: 'Connaught Place & Lutyens Zone',
    state: 'Delhi NCR',
    etaMinutes: 14,
    deliveryFee: 35,
    freeDeliveryThreshold: 299,
    minOrderAmount: 99,
    serviceable: true,
  },
  {
    id: 4,
    pincode: '500034',
    city: 'Hyderabad',
    areaName: 'Banjara Hills & Jubilee Hills Pod',
    state: 'Telangana',
    etaMinutes: 13,
    deliveryFee: 30,
    freeDeliveryThreshold: 299,
    minOrderAmount: 99,
    serviceable: true,
  },
  {
    id: 5,
    pincode: '411001',
    city: 'Pune',
    areaName: 'Koregaon Park & Kalyani Nagar',
    state: 'Maharashtra',
    etaMinutes: 12,
    deliveryFee: 30,
    freeDeliveryThreshold: 299,
    minOrderAmount: 99,
    serviceable: true,
  },
  {
    id: 6,
    pincode: '600004',
    city: 'Chennai',
    areaName: 'Mylapore & Alwarpet Micro-Warehouse',
    state: 'Tamil Nadu',
    etaMinutes: 14,
    deliveryFee: 30,
    freeDeliveryThreshold: 299,
    minOrderAmount: 99,
    serviceable: true,
  },
];

export const INITIAL_COUPONS: CouponDto[] = [
  {
    id: 1,
    code: 'FIRST100',
    description: 'Flat ₹100 OFF on orders above ₹499',
    discountType: 'FLAT',
    discountValue: 100,
    minOrderAmount: 499,
    maxDiscountAmount: 100,
    active: true,
    expiryDate: '2026-12-31',
  },
  {
    id: 2,
    code: 'BLINK15',
    description: '15% OFF up to ₹150 on orders above ₹399',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderAmount: 399,
    maxDiscountAmount: 150,
    active: true,
    expiryDate: '2026-12-31',
  },
  {
    id: 3,
    code: 'FESTIVE250',
    description: 'Flat ₹250 OFF on festive & supermarket orders above ₹1,299',
    discountType: 'FLAT',
    discountValue: 250,
    minOrderAmount: 1299,
    maxDiscountAmount: 250,
    active: true,
    expiryDate: '2026-12-31',
  },
  {
    id: 4,
    code: 'SUPER50',
    description: 'Flat ₹50 OFF on daily essentials above ₹249',
    discountType: 'FLAT',
    discountValue: 50,
    minOrderAmount: 249,
    maxDiscountAmount: 50,
    active: true,
    expiryDate: '2026-12-31',
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    productId: 1,
    authorName: 'Ananya Deshmukh',
    authorRole: 'Culinary Nutritionist · Bandra West, Mumbai (400050)',
    rating: 5,
    title: '12-minute delivery with true supermarket breadth & organic quality',
    comment:
      'Before Organica Quick-Commerce, I had to order fresh Alphonso mangoes, A2 Bilona ghee, and cold-pressed skincare from three different apps. Having all 30 departments arrive in one insulated parcel in 12 minutes is unmatched.',
    verifiedPurchase: 'Ratnagiri GI-Tagged Alphonso Mangoes & A2 Bilona Cow Ghee',
    date: 'October 2026 (Demo Review)',
  },
  {
    id: 2,
    productId: 81,
    authorName: 'Rohan Krishnamurthy',
    authorRole: 'Software Architect · Indiranagar, Bengaluru (560038)',
    rating: 5,
    title: 'Cold-chain integrity on paneer, idli batter & artisanal bakery',
    comment:
      'The Akshayakalpa Malai Paneer, iD Dosa Batter, and Baker’s Dozen Sourdough always arrive properly chilled at 4°C. The transparent MRP savings and coupon codes make weekly grocery runs effortless.',
    verifiedPurchase: 'Fresh Thermo-Formed Malai Paneer Block & Sourdough Loaf',
    date: 'October 2026 (Demo Review)',
  },
  {
    id: 3,
    productId: 71,
    authorName: 'Dr. Meera Iyer',
    authorRole: 'Dermatologist · Jubilee Hills, Hyderabad (500034)',
    rating: 5,
    title: 'Everything from festive Kaju Katli to clean skincare & baby wipes',
    comment:
      'Whether we need last-minute Diwali mithai hampers, Pampers pants, or Minimalist SPF 50 sunscreen before a flight, the subcategory filters and instant PIN-code serviceability work seamlessly.',
    verifiedPurchase: 'Pure Silver-Leaf Kaju Katli Diamond Box & Botanical Serum',
    date: 'September 2026 (Demo Review)',
  },
];

export const DEMO_USERS: Record<
  string,
  { user: UserDto; passwordPlain: string }
> = {
  'clara@organica.com': {
    passwordPlain: 'Customer@123',
    user: {
      id: 1,
      fullName: 'Ananya Sharma (Clara)',
      email: 'clara@organica.com',
      phone: '+91 98450 71234',
      address: 'Flat 402, Palm Grove Residency, 100 Feet Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      role: 'ROLE_CUSTOMER',
      createdAt: '2026-08-14T09:00:00Z',
      savedAddresses: [
        {
          id: 1,
          label: 'Home',
          recipientName: 'Ananya Sharma',
          phone: '+91 98450 71234',
          streetAddress:
            'Flat 402, Palm Grove Residency, 100 Feet Road, Indiranagar',
          landmark: 'Near Indiranagar Metro Station',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
          isDefault: true,
        },
        {
          id: 2,
          label: 'Work',
          recipientName: 'Ananya Sharma',
          phone: '+91 98450 71234',
          streetAddress: 'Level 6, Prestige Tech Park, Outer Ring Road',
          landmark: 'Tower B Reception',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
          isDefault: false,
        },
      ],
    },
  },
  'admin@organica.com': {
    passwordPlain: 'Admin@123',
    user: {
      id: 2,
      fullName: 'Vikramaditya Nair (Dark-Store Operations Director)',
      email: 'admin@organica.com',
      phone: '+91 98201 44900',
      address: 'Organica Central Fulfillment Hub, Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      role: 'ROLE_ADMIN',
      createdAt: '2026-07-01T08:00:00Z',
      savedAddresses: [
        {
          id: 3,
          label: 'Work',
          recipientName: 'Vikramaditya Nair',
          phone: '+91 98201 44900',
          streetAddress: 'Organica Central Fulfillment Hub, Bandra West',
          landmark: 'Opposite Mehboob Studio',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400050',
          isDefault: true,
        },
      ],
    },
  },
};

export const INITIAL_ORDERS: OrderDto[] = [
  {
    id: 101,
    orderNumber: 'ORG-2026-1042',
    userId: 1,
    customerEmail: 'clara@organica.com',
    recipientName: 'Ananya Sharma',
    recipientPhone: '+91 98450 71234',
    shippingAddress:
      'Flat 402, Palm Grove Residency, 100 Feet Road, Indiranagar',
    shippingCity: 'Bengaluru',
    shippingState: 'Karnataka',
    shippingPostalCode: '560038',
    deliveryNotes: 'Ring bell once; leave cold bag at door.',
    subtotal: 1313,
    couponCode: 'FIRST100',
    couponDiscount: 100,
    shippingFee: 0,
    taxAmount: 61,
    totalAmount: 1274,
    status: 'SHIPPED',
    paymentMethod: 'MOCK_UPI_QR',
    paymentStatus: 'PAID_MOCK_SANDBOX',
    trackingCode: 'ORG-BLINK-560038-8849',
    estimatedDeliveryMins: 11,
    createdAt: '2026-10-10T14:22:00Z',
    updatedAt: '2026-10-10T14:26:00Z',
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Ratnagiri GI-Tagged Alphonso Mangoes',
        productSku: 'ORG-FR-001',
        unitSize: '1 kg (4–5 pcs)',
        imageUrl: IMG_FRUITS_VEG,
        unitPrice: 449,
        quantity: 1,
        subtotal: 449,
      },
      {
        id: 2,
        productId: 82,
        productName: 'A2 Gir Cow Cultured Bilona Ghee',
        productSku: 'ORG-DAEG-082',
        unitSize: '500 ml Glass Jar',
        imageUrl: IMG_DAIRY_SWEETS,
        unitPrice: 749,
        quantity: 1,
        subtotal: 749,
      },
      {
        id: 3,
        productId: 81,
        productName: 'Fresh Thermo-Formed Malai Paneer Block',
        productSku: 'ORG-DAEG-081',
        unitSize: '200 g Vacuum Pack',
        imageUrl: IMG_DAIRY_SWEETS,
        unitPrice: 115,
        quantity: 1,
        subtotal: 115,
      },
    ],
  },
  {
    id: 102,
    orderNumber: 'ORG-2026-1038',
    userId: 1,
    customerEmail: 'clara@organica.com',
    recipientName: 'Ananya Sharma',
    recipientPhone: '+91 98450 71234',
    shippingAddress:
      'Flat 402, Palm Grove Residency, 100 Feet Road, Indiranagar',
    shippingCity: 'Bengaluru',
    shippingState: 'Karnataka',
    shippingPostalCode: '560038',
    deliveryNotes: '',
    subtotal: 650,
    couponCode: null,
    couponDiscount: 0,
    shippingFee: 0,
    taxAmount: 33,
    totalAmount: 683,
    status: 'DELIVERED',
    paymentMethod: 'MOCK_CARD_4242',
    paymentStatus: 'PAID_MOCK_SANDBOX',
    trackingCode: 'ORG-BLINK-560038-7731',
    estimatedDeliveryMins: 11,
    createdAt: '2026-10-04T18:05:00Z',
    updatedAt: '2026-10-04T18:16:00Z',
    items: [
      {
        id: 4,
        productId: 71,
        productName: 'Pure Silver-Leaf Kaju Katli Diamond Box',
        productSku: 'ORG-INSW-071',
        unitSize: '400 g Gift Box',
        imageUrl: IMG_DAIRY_SWEETS,
        unitPrice: 465,
        quantity: 1,
        subtotal: 465,
      },
      {
        id: 5,
        productId: 51,
        productName: 'Fourgrain Seeded Artisan Sourdough Loaf',
        productSku: 'ORG-BIBA-051',
        unitSize: '400 g Loaf',
        imageUrl: IMG_SNACKS_BAKERY,
        unitPrice: 185,
        quantity: 1,
        subtotal: 185,
      },
    ],
  },
];
