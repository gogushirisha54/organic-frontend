
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { fetchMyOrdersApi } from "../services/api";

/* -------------------- Login Page -------------------- */

export const LoginPage: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await store.login(email.trim(), password);
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
      <p className="mb-6 text-gray-600">
        Log in to your Organica account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block font-medium">Email address</span>
          <input
            className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">Password</span>
          <input
            className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="mt-5 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link className="font-medium text-green-700 underline" to="/register">
          Create one
        </Link>
      </p>
    </section>
  );
};

/* -------------------- Register Page -------------------- */

export const RegisterPage: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await store.register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
      });

      navigate("/profile");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to register. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border p-3 outline-none focus:border-green-700";

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Create Your Account</h1>
      <p className="mb-6 text-gray-600">
        Join Organica for a better shopping experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block font-medium">Full name</span>
          <input
            className={inputClass}
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">Email address</span>
          <input
            className={inputClass}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">Phone number</span>
          <input
            className={inputClass}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">Password</span>
          <input
            className={inputClass}
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={100}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <span className="mt-1 block text-xs text-gray-500">
            Use at least 8 characters.
          </span>
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">Address</span>
          <input
            className={inputClass}
            type="text"
            autoComplete="street-address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">City</span>
          <input
            className={inputClass}
            type="text"
            autoComplete="address-level2"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">State</span>
          <input
            className={inputClass}
            type="text"
            autoComplete="address-level1"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-medium">Postal code</span>
          <input
            className={inputClass}
            type="text"
            autoComplete="postal-code"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            required
          />
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-sm text-gray-600">
        Already have an account?{" "}
        <Link className="font-medium text-green-700 underline" to="/login">
          Log in
        </Link>
      </p>
    </section>
  );
};

/* -------------------- Profile Page -------------------- */

export const ProfilePage: React.FC = () => {
  const store = useStore();
  const user = store.user;

  const handleLogout = async () => {
    await store.logout();
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      {user ? (
        <div className="rounded-xl border p-6">
          <div className="mb-5">
            <p className="text-sm text-gray-500">Full name</p>
            <p className="font-medium">
              {user.fullName ?? user.name ?? "Not provided"}
            </p>
          </div>

          <div className="mb-5">
            <p className="text-sm text-gray-500">Email address</p>
            <p className="font-medium">{user.email ?? "Not provided"}</p>
          </div>

          {user.phone && (
            <div className="mb-5">
              <p className="text-sm text-gray-500">Phone number</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              to="/orders"
              className="rounded-lg bg-green-700 px-5 py-3 font-medium text-white"
            >
              My Orders
            </Link>

            <Link
              to="/wishlist"
              className="rounded-lg border px-5 py-3 font-medium"
            >
              My Wishlist
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-red-300 px-5 py-3 font-medium text-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border p-6">
          <p className="mb-4">Please log in to view your profile.</p>
          <Link
            to="/login"
            className="inline-block rounded-lg bg-green-700 px-5 py-3 font-medium text-white"
          >
            Log In
          </Link>
        </div>
      )}
    </section>
  );
};

/* -------------------- Order History Page -------------------- */

export const OrderHistoryPage: React.FC = () => {
  const store = useStore();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await fetchMyOrdersApi();

        if (active) {
          setOrders(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your orders.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (store.user) {
      void loadOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [store.user]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

      {!store.user ? (
        <div className="rounded-xl border p-6">
          <p className="mb-4">Log in to view your order history.</p>
          <Link className="text-green-700 underline" to="/login">
            Go to Login
          </Link>
        </div>
      ) : loading ? (
        <p className="text-gray-600">Loading your orders...</p>
      ) : error ? (
        <div className="rounded-xl border border-red-200 p-5">
          <p role="alert" className="text-red-700">{error}</p>
          <button
            type="button"
            className="mt-3 rounded-lg border px-4 py-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border p-6">
          <p>You haven't placed any orders yet.</p>
          <Link
            className="mt-4 inline-block text-green-700 underline"
            to="/products"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any, index: number) => {
            const orderId = order.id ?? order.orderId ?? index + 1;
            const total = Number(
              order.totalAmount ?? order.total ?? order.grandTotal ?? 0,
            );

            return (
              <article
                className="rounded-xl border p-5"
                key={String(orderId)}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">Order #{orderId}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "Date unavailable"}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-800">
                    {order.status ?? "Processing"}
                  </span>
                </div>

                <p className="mt-4 font-medium">
                  Total: ₹{total.toFixed(2)}
                </p>

                {Array.isArray(order.items) && order.items.length > 0 && (
                  <p className="mt-1 text-sm text-gray-600">
                    {order.items.length} item(s)
                  </p>
                )}

                <button
                  type="button"
                  className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                  onClick={() => {
                    void store.reorderPastOrder(order);
                  }}
                >
                  Reorder Items
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

/* -------------------- Wishlist Page -------------------- */

export const WishlistPage: React.FC = () => {
  const store = useStore();
  const products = store.wishlistProducts;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">My Wishlist</h1>
      <p className="mb-6 text-gray-600">
        Products you've saved for later.
      </p>

      {products.length === 0 ? (
        <div className="rounded-xl border p-6">
          <p>Your wishlist is empty.</p>
          <Link
            className="mt-4 inline-block text-green-700 underline"
            to="/products"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => {
            const productId = Number(
              product.productId ?? product.id ?? product.product?.id,
            );
            const name =
              product.name ??
              product.productName ??
              product.title ??
              "Product";
            const image =
              product.imageUrl ??
              product.image ??
              product.thumbnail ??
              product.product?.imageUrl ??
              "https://placehold.co/400x300?text=Organica";
            const price = Number(
              product.price ??
                product.unitPrice ??
                product.sellingPrice ??
                product.product?.price ??
                0,
            );

            return (
              <article
                key={productId}
                className="overflow-hidden rounded-xl border"
              >
                <Link to={`/product/${productId}`}>
                  <img
                    className="h-48 w-full object-cover"
                    src={image}
                    alt={name}
                    loading="lazy"
                  />
                </Link>

                <div className="p-4">
                  <Link
                    to={`/product/${productId}`}
                    className="font-semibold hover:text-green-700"
                  >
                    {name}
                  </Link>

                  <p className="my-3 text-lg font-bold">
                    ₹{price.toFixed(2)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-sm font-medium text-white"
                      onClick={() => {
                        void store.addToCart(productId, 1);
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700"
                      onClick={() => store.toggleWishlist(productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
