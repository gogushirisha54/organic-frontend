import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { categories } = useStore();

  return (
    <footer className="bg-[#1C241E] text-[#FAF8F5] border-t border-[#2D4A3E]/40 mt-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-16 space-y-12">
        {/* Top Row: Brand Overview + Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="font-serif-display text-3xl font-semibold tracking-tight text-white block"
            >
              Organica
            </Link>
            <p className="text-sm text-[#A3B1A6] leading-relaxed max-w-md">
              India’s premier quick-commerce supermarket & certified organic
              marketplace. Delivering farm-fresh fruits, vegetables, A2 dairy,
              artisan bakery, Indian festive sweets, staples, personal care, and
              eco-friendly home essentials in 10–15 minutes.
            </p>
            <p className="text-xs font-mono-metric text-[#6E7A70]">
              Express Dark Stores: Bengaluru · Mumbai · New Delhi · Hyderabad ·
              Pune · Chennai
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#E8EFEA]">
              Fresh & Daily Aisles
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B1A6]">
              <li>
                <Link to="/category/fruits" className="hover:text-white">
                  Fresh Fruits & Berries
                </Link>
              </li>
              <li>
                <Link to="/category/vegetables" className="hover:text-white">
                  Daily & Exotic Vegetables
                </Link>
              </li>
              <li>
                <Link
                  to="/category/dairy-and-eggs"
                  className="hover:text-white"
                >
                  A2 Dairy, Paneer & Eggs
                </Link>
              </li>
              <li>
                <Link
                  to="/category/biscuits-and-bakery"
                  className="hover:text-white"
                >
                  Biscuits & Artisan Bakery
                </Link>
              </li>
              <li>
                <Link
                  to="/category/indian-sweets-and-festive-foods"
                  className="hover:text-white"
                >
                  Indian Sweets & Festive Boxes
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#E8EFEA]">
              Pantry, Care & Home
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B1A6]">
              <li>
                <Link to="/category/staples" className="hover:text-white">
                  Atta, Rice, Dal & Millets
                </Link>
              </li>
              <li>
                <Link
                  to="/category/cooking-essentials"
                  className="hover:text-white"
                >
                  Cold-Pressed Oils, Ghee & Spices
                </Link>
              </li>
              <li>
                <Link to="/category/snacks" className="hover:text-white">
                  Snacks, Namkeen & Dry Fruits
                </Link>
              </li>
              <li>
                <Link to="/category/personal-care" className="hover:text-white">
                  Botanical Skincare & Personal Care
                </Link>
              </li>
              <li>
                <Link
                  to="/category/household-cleaning"
                  className="hover:text-white"
                >
                  Eco Household & Cleaning
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#E8EFEA]">
              Customer Account & Admin
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B1A6]">
              <li>
                <Link to="/login" className="hover:text-white">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white">
                  Saved Wishlist Items
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white">
                  Order History & 1-Click Reorder
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white">
                  Live Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white">
                  Admin Operations Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Complete 24-Department Quick Links Directory */}
        {categories.length > 0 && (
          <div className="pt-8 border-t border-white/10 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A3B1A6]">
              All 24 Supermarket & Quick-Commerce Departments
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#A3B1A6]">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E7A70]">
          <p>
            © {new Date().getFullYear()} Organica Quick-Commerce Supermarket Pvt.
            Ltd. All rights reserved.
          </p>
          <p className="font-mono-metric">
            React 19 · Vite · Java 17 · Spring Boot 3.2 · Spring Security JWT ·
            MySQL 8.0
          </p>
        </div>
      </div>
    </footer>
  );
};
