
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useStore } from "../context/StoreContext";
import type { ProductDto } from "../types";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, showToast } = useStore();

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadProduct = async () => {
      if (!id || !Number.isFinite(Number(id))) {
        setProduct(null);
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const result = await fetchProductById(id);
        const response = (result as any)?.data ?? result;
        const data = response?.data ?? response;

        if (!cancelled) {
          if (!data || typeof data !== "object" || data.id == null) {
            setProduct(null);
            setError("This product could not be found.");
          } else {
            setProduct(data as ProductDto);
            setQuantity(1);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setProduct(null);
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this product."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="mb-3 text-2xl font-bold">Product not found</h1>
        <p className="mb-6 text-gray-600">
          {error || "This product could not be found."}
        </p>
        <Link
          to="/products"
          className="inline-block rounded-lg bg-green-700 px-5 py-3 text-white hover:bg-green-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const stock = Math.max(
    0,
    Number(product.stockQuantity ?? product.stock ?? 0) || 0
  );
  const price = Number(product.price ?? 0) || 0;
  const image =
    product.imageUrl || "https://placehold.co/600x600?text=Product";

  const handleAddToCart = async () => {
    if (stock <= 0) return;

    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart(Number(product.id));
      }

      if (typeof showToast === "function") {
        showToast(`${quantity} × ${product.name} added to cart.`);
      }
    } catch (err) {
      console.error("Could not add product to cart:", err);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="mb-8 text-sm text-gray-500">
        <Link to="/" className="hover:text-green-700">Home</Link>
        {" / "}
        <Link to="/products" className="hover:text-green-700">Products</Link>
        {" / "}
        <span>{product.name}</span>
      </p>

      <div className="grid items-start gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-gray-50">
          <img
            src={image}
            alt={product.name}
            className="h-full max-h-[520px] w-full object-contain"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://placehold.co/600x600?text=Product";
            }}
          />
        </div>

        <section>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-700">
            {typeof product.category === "string"
              ? product.category
              : "Organica"}
          </p>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          {product.rating != null && (
            <p className="mb-4 text-amber-600">
              ★ {product.rating}
              {product.reviewCount != null && (
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              )}
            </p>
          )}

          <p className="mb-5 text-3xl font-bold text-green-700">
            ₹{price.toLocaleString("en-IN")}
          </p>

          <p className="mb-6 leading-7 text-gray-600">
            {product.description ||
              "No description is available for this product."}
          </p>

          <p
            className={`mb-6 font-medium ${
              stock > 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            {stock > 0
              ? `In stock (${stock} available)`
              : "Out of stock"}
          </p>

          <div className="mb-6 flex items-center gap-4">
            <span className="font-medium">Quantity:</span>

            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="h-10 w-10 rounded-lg border border-gray-300 disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-6 text-center font-semibold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity((q) => Math.min(stock, q + 1))
              }
              disabled={quantity >= stock}
              aria-label="Increase quantity"
              className="h-10 w-10 rounded-lg border border-gray-300 disabled:opacity-40"
            >
              +
            </button>
          </div>

          <p className="mb-6 text-lg">
            Total:{" "}
            <strong className="text-gray-900">
              ₹{(price * quantity).toLocaleString("en-IN")}
            </strong>
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className="w-full rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-medium text-gray-600 hover:text-green-700"
          >
            ← Continue Shopping
          </Link>
        </section>
      </div>
    </main>
  );
};
