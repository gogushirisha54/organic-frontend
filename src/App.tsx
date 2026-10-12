import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  OrderHistoryPage,
  WishlistPage,
} from "./pages/AuthAndAccountPages";
import {
  CartPage,
  CheckoutPage,
} from "./pages/CartAndCheckoutPages";
import { StoreProvider } from "./context/StoreContext";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route
                path="/account"
                element={<Navigate to="/profile" replace />}
              />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;