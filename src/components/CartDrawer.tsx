import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Zap,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    activePincode,
    coupons,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
  } = useStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = cart.freeShippingThreshold || 299;
  const amountRemainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - cart.subtotal
  );
  const progressPercent = Math.min(
    100,
    (cart.subtotal / freeShippingThreshold) * 100
  );

  const handleApplyCoupon = async (codeToUse: string) => {
    setCouponError(null);
    try {
      await applyCoupon(codeToUse);
      setCouponInput('');
    } catch (err) {
      setCouponError(
        err instanceof Error ? err.message : 'Unable to apply coupon'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E4DFD7] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E4DFD7] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#2D4A3E]" />
                <h2 className="font-serif-display text-2xl font-semibold text-[#1C241E]">
                  Your Express Bag
                </h2>
                <span className="font-mono-metric text-xs text-[#6E7A70]">
                  ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-2 text-[#6E7A70] hover:text-[#1C241E] rounded-lg transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Express Delivery Pod Banner */}
            <div className="mt-3 flex items-center justify-between bg-[#E8EFEA] px-3 py-2 rounded-lg text-xs">
              <span className="font-semibold text-[#2E6F40] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-[#2E6F40]" />
                Delivery in {activePincode.etaMinutes} mins
              </span>
              <span className="text-[#1C241E] truncate max-w-[200px]">
                {activePincode.areaName} ({activePincode.pincode})
              </span>
            </div>

            {/* Free Delivery Progress Bar */}
            <div className="mt-3 pt-3 border-t border-[#E4DFD7]">
              {amountRemainingForFreeShipping > 0 ? (
                <p className="text-xs text-[#4A554C]">
                  Add{' '}
                  <span className="font-mono-metric font-semibold text-[#1C241E]">
                    ₹{amountRemainingForFreeShipping.toLocaleString('en-IN')}
                  </span>{' '}
                  more for{' '}
                  <span className="font-semibold text-[#2E6F40]">
                    FREE Express Delivery
                  </span>
                </p>
              ) : (
                <p className="text-xs font-medium text-[#2E6F40]">
                  Unlocked FREE Express Delivery on this order!
                </p>
              )}
              <div className="mt-1.5 w-full h-1.5 bg-[#E4DFD7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2D4A3E] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List + Promo Coupon Section */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-10 h-10 text-[#6E7A70] mx-auto stroke-1" />
                <div className="space-y-1">
                  <p className="font-serif-display text-xl text-[#1C241E]">
                    Your express bag is empty
                  </p>
                  <p className="text-xs text-[#6E7A70] max-w-xs mx-auto">
                    Browse 24 supermarket departments — from fresh Alphonso
                    mangoes and A2 bilona ghee to kaju katli and daily staples.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#2D4A3E] hover:bg-[#21382E] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Browse 24 Departments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div
                      key={item.productId}
                      className="p-3.5 bg-white border border-[#E4DFD7] rounded-xl flex gap-3.5 items-center"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-[#F3EFEA] shrink-0 border border-[#E4DFD7]"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.productId}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-serif-display text-base font-semibold text-[#1C241E] hover:text-[#2D4A3E] line-clamp-1"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-[11px] text-[#6E7A70]">
                          {item.brand} · {item.unitSize}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#E4DFD7] rounded-lg bg-[#FAF8F5]">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 text-[#4A554C] hover:text-[#1C241E] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono-metric font-medium text-[#1C241E]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              disabled={item.quantity >= item.availableStock}
                              className="p-1.5 text-[#4A554C] hover:text-[#1C241E] disabled:opacity-40 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <span className="font-mono-metric text-sm font-semibold text-[#1C241E]">
                                ₹{item.lineTotal.toLocaleString('en-IN')}
                              </span>
                              {item.lineSavings > 0 && (
                                <p className="font-mono-metric text-[10px] text-[#2E6F40]">
                                  Saved ₹{item.lineSavings}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.productId)}
                              className="p-1 text-[#6E7A70] hover:text-[#B42318] transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Box */}
                <div className="bg-white border border-[#E4DFD7] rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1C241E] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#8C5A3C]" />
                      Apply Promo / Coupon
                    </span>
                    {cart.appliedCouponCode && (
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon('')}
                        className="text-[11px] text-[#B42318] hover:underline cursor-pointer"
                      >
                        Remove ({cart.appliedCouponCode})
                      </button>
                    )}
                  </div>

                  {cart.appliedCouponCode ? (
                    <div className="flex items-center justify-between bg-[#E8EFEA] px-3 py-2 rounded-lg text-xs text-[#2E6F40]">
                      <span className="font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Code{' '}
                        <strong className="font-mono-metric">
                          {cart.appliedCouponCode}
                        </strong>{' '}
                        applied
                      </span>
                      <span className="font-mono-metric font-semibold">
                        -₹{cart.couponDiscount}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) =>
                            setCouponInput(e.target.value.toUpperCase())
                          }
                          placeholder="Enter code (e.g. FIRST100)"
                          className="flex-1 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E4DFD7] rounded-lg font-mono-metric uppercase"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyCoupon(couponInput)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#2D4A3E] bg-[#E8EFEA] hover:bg-[#2D4A3E] hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {coupons
                          .filter((c) => c.active)
                          .slice(0, 3)
                          .map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => handleApplyCoupon(c.code)}
                              className="text-[11px] font-mono-metric px-2 py-0.5 rounded bg-[#FAF8F5] hover:bg-[#E8EFEA] text-[#1C241E] border border-dashed border-[#8C5A3C]/50 cursor-pointer"
                              title={c.description}
                            >
                              {c.code} (Min ₹{c.minOrderAmount})
                            </button>
                          ))}
                      </div>
                    </>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-[#B42318]">{couponError}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer Bill Summary */}
          {cart.items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E4DFD7] space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#4A554C]">
                  <span>MRP Total</span>
                  <span className="font-mono-metric">
                    ₹{cart.mrpTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cart.productSavings > 0 && (
                  <div className="flex justify-between text-[#2E6F40]">
                    <span>Product Discount Savings</span>
                    <span className="font-mono-metric">
                      -₹{cart.productSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                {cart.couponDiscount > 0 && (
                  <div className="flex justify-between text-[#2E6F40]">
                    <span>Coupon Discount ({cart.appliedCouponCode})</span>
                    <span className="font-mono-metric">
                      -₹{cart.couponDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-[#4A554C]">
                  <span>Express Delivery Fee</span>
                  <span className="font-mono-metric">
                    {cart.estimatedShipping === 0
                      ? 'FREE'
                      : `₹${cart.estimatedShipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#4A554C]">
                  <span>Handling & Cold-Bag Fee + GST (5%)</span>
                  <span className="font-mono-metric">
                    ₹{(cart.handlingFee + cart.estimatedTax).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E4DFD7] flex justify-between text-base font-semibold text-[#1C241E]">
                  <span>To Pay</span>
                  <span className="font-mono-metric">
                    ₹{cart.estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-2.5 px-4 text-xs font-medium text-center text-[#1C241E] bg-[#F3EFEA] hover:bg-[#E4DFD7] rounded-lg transition-colors"
                >
                  View Full Bag
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-2.5 px-4 text-xs font-medium text-center text-white bg-[#2D4A3E] hover:bg-[#21382E] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
