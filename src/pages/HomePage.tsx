import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  Sprout,
  Zap,
  Sparkles,
  RotateCcw,
  Tag,
  Clock,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  CUSTOMER_REVIEWS,
  HERO_IMAGE_URL,
  IMG_DAIRY_SWEETS,
} from '../data/seedCatalog';

export const HomePage: React.FC = () => {
  const {
    categories,
    products,
    coupons,
    activePincode,
    recentlyViewed,
    isLoadingCatalog,
    applyCoupon,
    setIsCartDrawerOpen,
  } = useStore();

  const [selectedAisleGroup, setSelectedAisleGroup] = useState<string>('ALL');
  const [activeCollectionTab, setActiveCollectionTab] = useState<
    'trending' | 'underBudget' | 'bestSellers' | 'newArrivals'
  >('trending');

  const aisleGroups = [
    'ALL',
    ...Array.from(new Set(categories.map((c) => c.aisleGroup))),
  ];

  const visibleDepartments =
    selectedAisleGroup === 'ALL'
      ? categories
      : categories.filter((c) => c.aisleGroup === selectedAisleGroup);

  const displayedProducts = products
    .filter((p) => {
      if (activeCollectionTab === 'trending') return p.trending;
      if (activeCollectionTab === 'underBudget') return p.underBudget;
      if (activeCollectionTab === 'bestSellers') return p.bestSeller;
      return p.newArrival;
    })
    .slice(0, 8);

  const dailyEssentialsProducts = products
    .filter((p) => p.dailyEssential)
    .slice(0, 8);

  const buyAgainProducts = products
    .filter((p) => [1, 81, 82, 51, 71, 11, 21, 91].includes(p.id))
    .slice(0, 4);

  const festiveProducts = products
    .filter(
      (p) =>
        p.categorySlug === 'indian-sweets-and-festive-foods' ||
        p.categorySlug === 'gifting-and-seasonal-specials' ||
        p.categorySlug === 'chocolates-and-confectionery'
    )
    .slice(0, 4);

  const handleQuickApplyPromo = async (code: string) => {
    try {
      await applyCoupon(code);
      setIsCartDrawerOpen(true);
    } catch {
      setIsCartDrawerOpen(true);
    }
  };

  return (
    <div className="space-y-16">
      {/* Section 1: Quick-Commerce Supermarket Hero + Express Delivery Promise */}
      <section className="bg-[#F3EFEA] border-b border-[#E4DFD7]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Editorial & Quick-Commerce Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 py-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2E6F40] bg-[#E8EFEA] border border-[#2D4A3E]/20 px-3 py-1.5 rounded-md">
                  <Zap className="w-3.5 h-3.5 fill-[#2E6F40]" />
                  <span>
                    EXPRESS {activePincode.etaMinutes}-MINUTE DELIVERY TO{' '}
                    {activePincode.areaName.toUpperCase()} ({activePincode.pincode})
                  </span>
                </div>

                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[52px] font-semibold text-[#1C241E] leading-[1.08] tracking-tight">
                  India’s 24-aisle organic & quick-commerce supermarket.
                </h1>

                <p className="text-base text-[#4A554C] leading-relaxed max-w-xl">
                  From GI-tagged Ratnagiri Alphonso mangoes, morning-harvest
                  vegetables, and A2 Gir cow bilona ghee to artisan sourdough,
                  kaju katli gift boxes, cold-pressed skincare, baby care, and
                  daily household staples — delivered in minutes.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#2D4A3E] hover:bg-[#21382E] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore All 24 Departments</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/category/fruits"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#1C241E] bg-white hover:bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Fresh Fruits & Veg</span>
                </Link>
                <Link
                  to="/category/indian-sweets-and-festive-foods"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#1C241E] bg-white hover:bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Festive Sweets</span>
                </Link>
              </div>
            </div>

            {/* Right 16:9 Studio Photography Showcase */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden border border-[#E4DFD7] bg-[#E8EFEA]">
                <img
                  src={HERO_IMAGE_URL}
                  alt="Organica quick-commerce supermarket fresh produce, organic staples, and botanical care"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white max-w-md space-y-1">
                    <p className="text-xs font-mono-metric text-[#E8EFEA]">
                      24 Departments · 240+ Supermarket Products · Free Delivery
                      Above ₹{activePincode.freeDeliveryThreshold}
                    </p>
                    <p className="font-serif-display text-xl sm:text-2xl font-medium">
                      Cold-chain dark store dispatch with real-time inventory &
                      transparent MRP savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Bank & Store Coupon Strip */}
          {coupons.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E4DFD7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {coupons
                .filter((c) => c.active)
                .slice(0, 4)
                .map((coupon) => (
                  <div
                    key={coupon.id}
                    className="bg-white border border-[#E4DFD7] rounded-xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#8C5A3C] shrink-0" />
                        <span className="font-mono-metric text-xs font-bold text-[#1C241E]">
                          {coupon.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4A554C] truncate mt-0.5">
                        {coupon.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickApplyPromo(coupon.code)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#2D4A3E] bg-[#E8EFEA] hover:bg-[#2D4A3E] hover:text-white rounded transition-colors shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Shop by All 24 Supermarket Departments */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#8C5A3C]">
              Supermarket Directory · 24 Complete Aisles
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C241E] mt-1">
              Shop by Department
            </h2>
          </div>

          {/* Aisle Group Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {aisleGroups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedAisleGroup(group)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  selectedAisleGroup === group
                    ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                    : 'bg-white text-[#4A554C] border-[#E4DFD7] hover:text-[#1C241E]'
                }`}
              >
                {group === 'ALL' ? `All 24 Departments` : group}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleDepartments.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white border border-[#E4DFD7] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#2D4A3E] transition-all"
            >
              <div className="aspect-4/3 bg-[#F3EFEA] overflow-hidden border-b border-[#E4DFD7]">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 space-y-1">
                <h3 className="font-serif-display text-base font-semibold text-[#1C241E] group-hover:text-[#2D4A3E] leading-snug line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#6E7A70] line-clamp-1">
                  {cat.subcategories.slice(0, 3).join(' · ')}
                </p>
                <p className="font-mono-metric text-[11px] font-medium text-[#2D4A3E] pt-0.5">
                  {cat.productCount} items →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: Buy Again / Frequently Reordered Shelf */}
      {buyAgainProducts.length > 0 && (
        <section className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-end justify-between gap-4 border-b border-[#E4DFD7] pb-3">
            <div>
              <p className="text-xs font-medium text-[#2E6F40] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Quick Repeat Basket</span>
              </p>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1C241E] mt-0.5">
                Buy Again · Household Favorites
              </h2>
            </div>
            <Link
              to="/orders"
              className="text-xs font-medium text-[#2D4A3E] hover:underline flex items-center gap-1"
            >
              <span>Past Orders & 1-Click Reorder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buyAgainProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section 4: Morning & Daily Essentials in 10–15 Minutes */}
      <section className="bg-[#F3EFEA] border-y border-[#E4DFD7] py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#2D4A3E] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Fresh Morning Dispatch · Milk, Paneer, Bread, Eggs & Produce</span>
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C241E] mt-1">
                Daily Kitchen Essentials
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/category/dairy-and-eggs"
                className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E4DFD7] rounded-lg text-[#1C241E] hover:border-[#2D4A3E]"
              >
                Dairy & Eggs
              </Link>
              <Link
                to="/category/vegetables"
                className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E4DFD7] rounded-lg text-[#1C241E] hover:border-[#2D4A3E]"
              >
                Daily Vegetables
              </Link>
              <Link
                to="/category/biscuits-and-bakery"
                className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E4DFD7] rounded-lg text-[#1C241E] hover:border-[#2D4A3E]"
              >
                Fresh Bakery
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dailyEssentialsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Curated Quick-Commerce Collections (Trending / Under ₹199 / Best Sellers / New Arrivals) */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E4DFD7] pb-4">
          <div>
            <p className="text-xs font-medium text-[#8C5A3C]">
              Live Dark-Store Merchandising
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C241E] mt-1">
              Trending & Super-Saver Picks
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#F3EFEA] p-1 rounded-lg border border-[#E4DFD7]">
            <button
              type="button"
              onClick={() => setActiveCollectionTab('trending')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeCollectionTab === 'trending'
                  ? 'bg-white text-[#1C241E] shadow-xs'
                  : 'text-[#4A554C] hover:text-[#1C241E]'
              }`}
            >
              Trending Near You
            </button>
            <button
              type="button"
              onClick={() => setActiveCollectionTab('underBudget')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeCollectionTab === 'underBudget'
                  ? 'bg-white text-[#1C241E] shadow-xs'
                  : 'text-[#4A554C] hover:text-[#1C241E]'
              }`}
            >
              Under ₹199 Store
            </button>
            <button
              type="button"
              onClick={() => setActiveCollectionTab('bestSellers')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeCollectionTab === 'bestSellers'
                  ? 'bg-white text-[#1C241E] shadow-xs'
                  : 'text-[#4A554C] hover:text-[#1C241E]'
              }`}
            >
              Best Sellers
            </button>
            <button
              type="button"
              onClick={() => setActiveCollectionTab('newArrivals')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeCollectionTab === 'newArrivals'
                  ? 'bg-white text-[#1C241E] shadow-xs'
                  : 'text-[#4A554C] hover:text-[#1C241E]'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {isLoadingCatalog ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-80 bg-white border border-[#E4DFD7] rounded-xl animate-pulse p-5"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Section 6: Indian Sweets, Mithai & Festive Gifting Spotlight */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="bg-[#1C241E] text-[#FAF8F5] rounded-2xl overflow-hidden border border-[#2D4A3E]/50 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-medium text-[#E8EFEA] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B7791F]" />
                <span>Festive Mithai, Dry Fruit Hampers & Celebration Boxes</span>
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-white leading-tight">
                Pure A2 Ghee Mithai, Kaju Katli & Festive Gift Hampers.
              </h2>
              <p className="text-sm text-[#A3B1A6] leading-relaxed max-w-xl">
                Crafted fresh in small batches with pure cow ghee, Iranian
                pistachios, and Kashmiri saffron. Use code{' '}
                <strong className="font-mono-metric text-white">
                  FESTIVE250
                </strong>{' '}
                for flat ₹250 off on festive celebration orders above ₹1,499.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  to="/category/indian-sweets-and-festive-foods"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium bg-[#2D4A3E] hover:bg-[#3A5F50] text-white rounded-lg transition-colors"
                >
                  <span>Shop Indian Sweets</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/category/gifting-and-seasonal-specials"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <span>Explore Gift Hampers</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <img
                src={IMG_DAIRY_SWEETS}
                alt="Indian sweets and festive gift boxes"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover rounded-xl border border-white/15"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {festiveProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section 7: Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-end justify-between border-b border-[#E4DFD7] pb-3">
            <div>
              <p className="text-xs font-medium text-[#6E7A70]">
                Continue Your Browsing
              </p>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1C241E]">
                Recently Viewed Items
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-medium text-[#2D4A3E] hover:underline"
            >
              Browse Full Catalog →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentlyViewed.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section 8: Demo Customer Reviews & Quality Assurance */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E4DFD7] pb-4">
          <div>
            <p className="text-xs font-medium text-[#8C5A3C]">
              Customer Voices (Demo Reviews)
            </p>
            <h2 className="font-serif-display text-3xl font-semibold text-[#1C241E] mt-1">
              Loved by Households Across India
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#4A554C]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2D4A3E]" />
              100% Cold-Chain & Quality Checked
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2D4A3E]" />
              10–15 Min Express Dispatch
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-[#2D4A3E]" />
              Certified Organic Options
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-[#E4DFD7] rounded-xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 text-[#B7791F] fill-[#B7791F]"
                      />
                    ))}
                  </div>
                  <span className="font-mono-metric text-[11px] text-[#6E7A70]">
                    {review.date}
                  </span>
                </div>
                <h3 className="font-serif-display text-lg font-semibold text-[#1C241E]">
                  “{review.title}”
                </h3>
                <p className="text-xs sm:text-sm text-[#4A554C] leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E4DFD7] flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#1C241E]">
                    {review.authorName}
                  </p>
                  <p className="text-[#6E7A70]">{review.authorRole}</p>
                </div>
                <span className="text-[11px] font-medium text-[#2D4A3E]">
                  {review.verifiedPurchase}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
