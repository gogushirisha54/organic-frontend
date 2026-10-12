import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  UserRound,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-green-800"
        >
          Organica<span className="text-green-500">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/" className="text-sm text-gray-700 hover:text-green-700">
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm text-gray-700 hover:text-green-700"
          >
            Shop
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo("/wishlist")}
            aria-label="Wishlist"
            className="rounded-full p-2 text-gray-700 hover:bg-green-50"
          >
            <Heart size={20} />
          </button>

          <button
            type="button"
            onClick={() => goTo("/account")}
            aria-label="Account"
            className="rounded-full p-2 text-gray-700 hover:bg-green-50"
          >
            <UserRound size={20} />
          </button>

          <button
            type="button"
            onClick={() => goTo("/cart")}
            aria-label="Open shopping bag"
            className="rounded-full p-2 text-gray-700 hover:bg-green-50"
          >
            <ShoppingBag size={22} />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="rounded-full p-2 text-gray-700 hover:bg-green-50 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-green-100 bg-white p-4 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)} className="rounded p-3 hover:bg-green-50">
            Home
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="rounded p-3 hover:bg-green-50">
            Shop
          </Link>
          <button type="button" onClick={() => goTo("/wishlist")} className="rounded p-3 text-left hover:bg-green-50">
            Wishlist
          </button>
          <button type="button" onClick={() => goTo("/account")} className="rounded p-3 text-left hover:bg-green-50">
            My Account
          </button>
          <button type="button" onClick={() => goTo("/cart")} className="rounded p-3 text-left hover:bg-green-50">
            My Bag
          </button>
        </nav>
      )}
    </header>
  );
}