
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { createOrder } from "../services/api";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  const cartItems = store.cart?.items ?? [];
  const products = store.products ?? [];

  const items = cartItems.map((item: any) => {
    const id = Number(item.productId ?? item.id);
    const product = products.find((p: any) => Number(p.id) === id);

    return {
      product: product ?? {
        id,
        name: item.productName ?? item.name ?? "Product",
        price: item.unitPrice ?? item.price ?? 0,
        imageUrl: item.imageUrl ?? "",
      },
      id,
      quantity: Number(item.quantity ?? 1),
    };
  });

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.product.price ?? 0) * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  const total = subtotal + delivery;

  const removeItem = async (id: number) => {
    try {
      await store.removeFromCart(id);
    } catch (error) {
      console.error("Could not remove cart item:", error);
    }
  };

  const changeQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) {
      await removeItem(id);
      return;
    }

    try {
      await store.updateCartQuantity(id, quantity);
    } catch (error) {
      console.error("Could not update quantity:", error);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="mb-3 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-gray-500">
            Add products before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="inline-block rounded-lg bg-green-700 px-6 py-3 text-white"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={
                    item.product.imageUrl ||
                    "https://placehold.co/120x120?text=Product"
                  }
                  alt={item.product.name}
                  className="h-24 w-24 rounded-lg object-contain"
                />

                <div className="flex-1">
                  <Link
                    to={`/product/${item.id}`}
                    className="font-semibold hover:text-green-700"
                  >
                    {item.product.name}
                  </Link>

                  <p className="mt-1 text-green-700">
                    ₹{Number(item.product.price ?? 0).toLocaleString("en-IN")}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        void changeQuantity(item.id, item.quantity - 1)
                      }
                      className="h-8 w-8 rounded border"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        void changeQuantity(item.id, item.quantity + 1)
                      }
                      className="h-8 w-8 rounded border"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col">
                  <strong>
                    ₹
                    {(
                      Number(item.product.price ?? 0) * item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    type="button"
                    onClick={() => void removeItem(item.id)}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-xl border p-6">
            <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="mt-4 block text-center text-sm text-gray-600"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
};

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  const cartItems = store.cart?.items ?? [];
  const products = store.products ?? [];
  const user = store.user;

  const [fullName, setFullName] = useState(
    user?.fullName ?? user?.name ?? ""
  );
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const items = cartItems.map((item: any) => {
    const id = Number(item.productId ?? item.id);
    const product = products.find((p: any) => Number(p.id) === id);

    return {
      id,
      product: product ?? {
        id,
        name: item.productName ?? item.name ?? "Product",
        price: item.unitPrice ?? item.price ?? 0,
        imageUrl: item.imageUrl ?? "",
      },
      quantity: Number(item.quantity ?? 1),
    };
  });

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.product.price ?? 0) * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  const total = subtotal + delivery;

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !postalCode.trim()
    ) {
      setError("Please fill in all delivery details.");
      return;
    }

    setLoading(true);

    try {
      
await createOrder({
  recipientName: fullName.trim(),
  recipientEmail: email.trim(),
  recipientPhone: phone.trim(),
  shippingAddress: address.trim(),
  shippingCity: city.trim(),
  shippingState: state.trim(),
  shippingPostalCode: postalCode.trim(),
  paymentMethod,
  items: items.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  })),
  totalAmount: total,
  subtotal,
  deliveryFee: delivery,
});

           

      await store.clearCart();
      navigate("/orders", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not place the order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="mb-3 text-2xl font-bold">Your cart is empty</h1>
        <Link
          to="/products"
          className="inline-block rounded-lg bg-green-700 px-6 py-3 text-white"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Checkout</h1>
      <p className="mb-8 text-gray-500">
        Enter your delivery details to place your order.
      </p>

      <form
        onSubmit={placeOrder}
        className="grid items-start gap-8 lg:grid-cols-[1fr_350px]"
      >
        <section className="space-y-5 rounded-xl border p-6">
          <h2 className="text-xl font-bold">Delivery Information</h2>

          <label className="block text-sm font-medium">
            Full name
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
              autoComplete="name"
            />
          </label>

          <label className="block text-sm font-medium">
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
              autoComplete="email"
            />
          </label>

          <label className="block text-sm font-medium">
            Phone number
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
              autoComplete="tel"
            />
          </label>

          <label className="block text-sm font-medium">
            Street address
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
              autoComplete="street-address"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm font-medium">
              City
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full rounded-lg border p-3"
                autoComplete="address-level2"
              />
            </label>

            <label className="text-sm font-medium">
              State
              <input
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-2 w-full rounded-lg border p-3"
                autoComplete="address-level1"
              />
            </label>

            <label className="text-sm font-medium">
              PIN code
              <input
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-2 w-full rounded-lg border p-3"
                autoComplete="postal-code"
              />
            </label>
          </div>

          <h2 className="text-xl font-bold">Payment Method</h2>

          <label className="flex items-center gap-3 rounded-lg border p-4">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-3 rounded-lg border p-4">
            <input
              type="radio"
              name="payment"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment (if supported by your backend)
          </label>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-6 py-4 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <Link to="/cart" className="block text-center text-sm text-gray-600">
            Back to Cart
          </Link>
        </section>

        <aside className="h-fit rounded-xl border p-6">
          <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="mb-3 flex justify-between gap-4 text-sm"
            >
              <span>{item.product.name} × {item.quantity}</span>
              <span>
                ₹
                {(
                  Number(item.product.price ?? 0) * item.quantity
                ).toLocaleString("en-IN")}
              </span>
            </div>
          ))}

          <div className="mt-4 space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
};
