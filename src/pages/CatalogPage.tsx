
import React, { useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';

import { useStore } from '../context/StoreContext';
import { fetchPaginatedProducts } from '../services/api';
import type { ProductDto } from '../types';
import { ProductCard } from '../components/ProductCard';

export const CatalogPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { categories } = useStore();

  const [selectedCategory, setSelectedCategory] = useState(slug || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get('sub') || 'all',
  );
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(0);

  const pageSize = 16;

  const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    setSelectedCategory(slug || 'all');
    setSelectedSubcategory(searchParams.get('sub') || 'all');
    setSelectedBrand('all');
    setPage(0);
  }, [slug, searchParams]);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    async function loadCatalog() {
      setIsLoading(true);
      setLoadError('');

      try {
        const res = await fetchPaginatedProducts({
          categorySlug:
            selectedCategory === 'all' ? undefined : selectedCategory,
          subcategory:
            selectedSubcategory === 'all'
              ? undefined
              : selectedSubcategory,
          brand: selectedBrand === 'all' ? undefined : selectedBrand,
          search: searchQuery,
          sortBy:
            sortBy === 'price-asc'
              ? 'price'
              : sortBy === 'price-desc'
                ? 'price'
                : sortBy === 'discount'
                  ? 'discountPercent'
                  : sortBy === 'rating'
                    ? 'rating'
                    : sortBy === 'newest'
                      ? 'id'
                      : 'name',
          sortDirection:
            sortBy === 'price-desc' ||
            sortBy === 'discount' ||
            sortBy === 'rating' ||
            sortBy === 'newest'
              ? 'desc'
              : 'asc',
          maxPrice: maxPrice > 0 ? maxPrice : undefined,
          page,
          size: pageSize,
        });

        if (!active) return;

        let items = res.content;

        // Filters that are not part of the API helper's parameters.
        if (selectedDietary !== 'all') {
          items = items.filter(
            (product) =>
              String(product.dietaryType ?? '').toLowerCase() ===
              selectedDietary.toLowerCase(),
          );
        }

        if (inStockOnly) {
          items = items.filter(
            (product) => Number(product.stockQuantity ?? 0) > 0,
          );
        }

        // Apply these client-side filters to the fetched page.
        // Resetting pagination happens whenever a filter changes.
        setFilteredProducts(items);
        setTotalElements(res.totalElements);
        setTotalPages(Math.max(1, res.totalPages));
        setAvailableBrands(res.availableBrands ?? []);
        setAvailableSubcategories(res.availableSubcategories ?? []);
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof Error
              ? error.message
              : 'Unable to load products. Please try again.',
          );
          setFilteredProducts([]);
          setTotalElements(0);
          setTotalPages(1);
          setAvailableBrands([]);
          setAvailableSubcategories([]);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadCatalog();

    return () => {
      active = false;
    };
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedDietary,
    searchQuery,
    sortBy,
    inStockOnly,
    maxPrice,
    page,
  ]);

  const activeCategoryObj = categories.find(
    (category: any) => category.slug === selectedCategory,
  );

  const handleCategoryChange = (newSlug: string) => {
    setSelectedCategory(newSlug);
    setSelectedSubcategory('all');
    setSelectedBrand('all');
    setPage(0);

    if (newSlug === 'all') {
      navigate('/shop');
    } else {
      navigate(`/category/${newSlug}`);
    }
  };

  const handleResetFilters = () => {
    setSelectedSubcategory('all');
    setSelectedBrand('all');
    setSelectedDietary('all');
    setMaxPrice(0);
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setPage(0);
    setSearchParams({});
  };

  const subcategoriesToDisplay = activeCategoryObj
    ? activeCategoryObj.subcategories
    : availableSubcategories;

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-8 space-y-6">
      <div className="bg-[#F3EFEA] border border-[#E4DFD7] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-[#2D4A3E]">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>
              {activeCategoryObj?.aisleGroup || 'Supermarket Catalog'}
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C241E]">
            {activeCategoryObj?.name || 'All 24 Quick-Commerce Departments'}
          </h1>

          <p className="text-xs sm:text-sm text-[#4A554C] leading-relaxed">
            {activeCategoryObj?.description ||
              'Browse supermarket essentials across departments with product details, MRP savings, and delivery options.'}
          </p>
        </div>

        <div className="px-4 py-2 bg-white border border-[#E4DFD7] rounded-lg text-xs text-[#4A554C]">
          Showing{' '}
          <span className="font-mono-metric font-semibold text-[#1C241E]">
            {totalElements}
          </span>{' '}
          products
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
            selectedCategory === 'all'
              ? 'bg-[#2D4A3E] text-white'
              : 'bg-white border border-[#E4DFD7] text-[#4A554C]'
          }`}
        >
          All Departments
        </button>

        {categories.map((category: any) => (
          <button
            key={category.id ?? category.slug}
            type="button"
            onClick={() => handleCategoryChange(category.slug)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
              selectedCategory === category.slug
                ? 'bg-[#2D4A3E] text-white'
                : 'bg-white border border-[#E4DFD7] text-[#4A554C]'
            }`}
          >
            {category.name}
            {category.productCount != null
              ? ` (${category.productCount})`
              : ''}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E4DFD7] rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-[#6E7A70] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Search products, brands, or attributes..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg text-[#1C241E] placeholder-[#6E7A70] focus:outline-none focus:border-[#2D4A3E]"
            />
          </div>

          <select
            value={selectedBrand}
            onChange={(event) => {
              setSelectedBrand(event.target.value);
              setPage(0);
            }}
            aria-label="Filter by brand"
            className="px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg text-[#1C241E]"
          >
            <option value="all">All Brands ({availableBrands.length})</option>
            {availableBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            value={selectedDietary}
            onChange={(event) => {
              setSelectedDietary(event.target.value);
              setPage(0);
            }}
            aria-label="Filter by dietary preference"
            className="px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg text-[#1C241E]"
          >
            <option value="all">All Dietary Types</option>
            <option value="Organic">Certified Organic</option>
            <option value="Veg">100% Vegetarian</option>
            <option value="Vegan">Plant-Based / Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Non-Veg">Fresh Meat, Fish & Eggs</option>
          </select>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#6E7A70] shrink-0" />
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setPage(0);
              }}
              aria-label="Sort products"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg text-[#1C241E]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E4DFD7]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#6E7A70] font-medium">Price Cap:</span>
            {[
              { label: 'All Prices', val: 0 },
              { label: 'Under ₹99', val: 99 },
              { label: 'Under ₹199', val: 199 },
              { label: 'Under ₹499', val: 499 },
            ].map((tier) => (
              <button
                key={tier.val}
                type="button"
                onClick={() => {
                  setMaxPrice(tier.val);
                  setPage(0);
                }}
                className={`px-2.5 py-1 rounded border font-mono-metric ${
                  maxPrice === tier.val
                    ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                    : 'bg-[#FAF8F5] text-[#4A554C] border-[#E4DFD7]'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-[#4A554C] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => {
                  setInStockOnly(event.target.checked);
                  setPage(0);
                }}
                className="rounded border-[#E4DFD7] text-[#2D4A3E]"
              />
              In-Stock Only
            </label>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8C5A3C] hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-3 bg-white border border-[#E4DFD7] rounded-xl p-4 space-y-3 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C241E] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2D4A3E]" />
              {activeCategoryObj ? 'Subcategories' : 'Filter by Subcategory'}
            </span>

            {selectedSubcategory !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedSubcategory('all');
                  setPage(0);
                }}
                className="text-[11px] text-[#2D4A3E] hover:underline"
              >
                All
              </button>
            )}
          </div>

          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto pb-1 max-h-[480px]">
            <button
              type="button"
              onClick={() => {
                setSelectedSubcategory('all');
                setPage(0);
              }}
              className={`text-left px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap lg:whitespace-normal ${
                selectedSubcategory === 'all'
                  ? 'bg-[#E8EFEA] text-[#2D4A3E] border-l-4 border-[#2D4A3E]'
                  : 'text-[#4A554C] hover:bg-[#FAF8F5]'
              }`}
            >
              All {activeCategoryObj?.name || 'Subcategories'}
            </button>

            {(subcategoriesToDisplay ?? []).map((sub: string) => (
              <button
                key={sub}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(sub);
                  setPage(0);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap lg:whitespace-normal ${
                  selectedSubcategory.toLowerCase() === sub.toLowerCase()
                    ? 'bg-[#E8EFEA] text-[#2D4A3E] border-l-4 border-[#2D4A3E]'
                    : 'text-[#4A554C] hover:bg-[#FAF8F5]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-80 bg-white border border-[#E4DFD7] rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : loadError ? (
            <div className="bg-white border border-[#E4DFD7] rounded-xl p-8 text-center space-y-3">
              <p className="text-sm text-red-700">{loadError}</p>
              <button
                type="button"
                onClick={() => setPage((current) => current)}
                className="px-4 py-2 text-sm text-white bg-[#2D4A3E] rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E4DFD7] rounded-2xl p-12 text-center space-y-4">
              <p className="font-serif-display text-2xl text-[#1C241E]">
                No products matched your current filters
              </p>
              <p className="text-sm text-[#6E7A70]">
                Try changing your search or clearing some filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2D4A3E] rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="bg-white border border-[#E4DFD7] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#6E7A70]">
                    Page {page + 1} of {totalPages} ({totalElements} total items)
                  </p>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={page === 0}
                      onClick={() => setPage((current) => Math.max(0, current - 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg disabled:opacity-40"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index)
                      .filter((index) =>
                        index === 0 ||
                        index === totalPages - 1 ||
                        Math.abs(index - page) <= 2,
                      )
                      .map((index, position, visiblePages) => (
                        <React.Fragment key={index}>
                          {position > 0 &&
                            index - visiblePages[position - 1] > 1 && (
                              <span className="px-1 text-xs text-[#6E7A70]">
                                …
                              </span>
                            )}
                          <button
                            type="button"
                            onClick={() => setPage(index)}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold ${
                              page === index
                                ? 'bg-[#2D4A3E] text-white'
                                : 'bg-[#FAF8F5] text-[#4A554C] border border-[#E4DFD7]'
                            }`}
                          >
                            {index + 1}
                          </button>
                        </React.Fragment>
                      ))}

                    <button
                      type="button"
                      disabled={page + 1 >= totalPages}
                      onClick={() =>
                        setPage((current) =>
                          Math.min(totalPages - 1, current + 1),
                        )
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg disabled:opacity-40"
                    >
                      Next
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
