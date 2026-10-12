
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Minus, Heart, Zap } from 'lucide-react';
import { ProductDto } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: ProductDto;
}

const FALLBACK_IMAGE =
  'https://placehold.co/600x450/F3EFEA/2D4A3E?text=Organica';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    updateCartQuantity,
    getCartItemQuantity,
    wishlistIds,
    toggleWishlist,
    activePincode,
  } = useStore();

  const [isUpdating, setIsUpdating] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [product.id]);

  // Safely handle optional product fields
  const productId = Number(product.id);
  const stockQuantity = product.stockQuantity ?? 0;
  const originalPrice = product.originalPrice ?? 0;
  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;
  const discountPercent = product.discountPercent ?? 0;

  const cartQty = getCartItemQuantity(productId);
  const isWishlisted = wishlistIds.includes(productId);
  const isOutOfStock = stockQuantity <= 0;
  const isLowStock = stockQuantity > 0 && stockQuantity <= 18;

  const etaMins =
    product.deliveryEtaMins || activePincode.etaMinutes || 12;

  const currentImageSrc =
    imageFailed || !product.imageUrl
      ? FALLBACK_IMAGE
      : product.imageUrl;

  const handleImageError = () => {
    setImageFailed(true);
  };

  const handleInitialAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || isUpdating) return;

    setIsUpdating(true);
    try {
      await addToCart(productId, 1);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStepQuantity = async (
    e: React.MouseEvent,
    newQty: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await updateCartQuantity(productId, newQty);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(productId);
  };

  return (
    <article className="group bg-white border border-[#E4DFD7] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#2D4A3E]/50 hover:shadow-sm">
      <div>
        <div className="relative aspect-4/3 bg-[#F3EFEA] overflow-hidden border-b border-[#E4DFD7]">
          <Link to={`/product/${productId}`} className="block w-full h-full">
            <img
              src={currentImageSrc}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
            />
          </Link>

          {discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#2D4A3E] text-white font-mono-metric text-[11px] font-semibold px-2 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}

          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={
              isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'
            }
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white border border-[#E4DFD7] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isWishlisted
                  ? 'text-[#B42318] fill-[#B42318]'
                  : 'text-[#4A554C]'
              }`}
            />
          </button>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#6E7A70]">
            <span className="inline-flex items-center gap-1 font-mono-metric font-semibold text-[#2E6F40]">
              <Zap className="w-3 h-3 fill-[#2E6F40]" />
              {etaMins} MINS
            </span>

            <span className="truncate">
              {product.dietaryType} · {product.subcategory}
            </span>
          </div>

          <p className="text-xs text-[#6E7A70] truncate">
            <span className="font-semibold text-[#4A554C]">
              {product.brand}
            </span>{' '}
            · <span className="font-mono-metric">{product.unitSize}</span>
          </p>

          <h3 className="font-serif-display text-lg font-semibold text-[#1C241E] leading-snug line-clamp-2">
            <Link
              to={`/product/${productId}`}
              className="hover:text-[#2D4A3E] transition-colors"
            >
              {product.name}
            </Link>
          </h3>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <div
              className="flex items-center gap-1 text-[#1C241E]"
              title="Demo customer rating"
            >
              <Star className="w-3.5 h-3.5 text-[#B7791F] fill-[#B7791F]" />

              <span className="font-mono-metric font-medium">
                {rating.toFixed(1)}
              </span>

              <span className="text-[#6E7A70] font-mono-metric">
                ({reviewCount})
              </span>
            </div>

            {isOutOfStock ? (
              <span className="text-[#B42318] font-medium">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-[#B7791F] font-medium">
                Only {stockQuantity} left
              </span>
            ) : (
              <span className="text-[#2E6F40] font-medium">In Stock</span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-[#E4DFD7]/60 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono-metric text-base font-semibold text-[#1C241E]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {originalPrice > product.price && (
              <span className="font-mono-metric text-xs text-[#6E7A70] line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {isOutOfStock ? (
          <button
            type="button"
            disabled
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#F3EFEA] text-[#6E7A70] cursor-not-allowed whitespace-nowrap"
          >
            Unavailable
          </button>
        ) : cartQty > 0 ? (
          <div className="inline-flex items-center bg-[#2D4A3E] text-white rounded-lg overflow-hidden shadow-xs">
            <button
              type="button"
              disabled={isUpdating}
              onClick={(e) => handleStepQuantity(e, cartQty - 1)}
              className="px-2.5 py-1.5 hover:bg-[#21382E] transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="px-2.5 font-mono-metric text-xs font-semibold">
              {cartQty}
            </span>

            <button
              type="button"
              disabled={isUpdating || cartQty >= stockQuantity}
              onClick={(e) => handleStepQuantity(e, cartQty + 1)}
              className="px-2.5 py-1.5 hover:bg-[#21382E] transition-colors cursor-pointer disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={isUpdating}
            onClick={handleInitialAdd}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#E8EFEA] text-[#2D4A3E] hover:bg-[#2D4A3E] hover:text-white border border-[#2D4A3E]/30 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        )}
      </div>
    </article>
  );
};
