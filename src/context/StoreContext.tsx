
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  fetchCategories,
  fetchProducts,
  fetchServiceablePincodes,
  fetchCouponsApi,
} from "../services/api";

const API_BASE_URL = "http://localhost:8080";

export interface CartItem {
  productId: number;
  quantity: number;
  productName?: string;
  name?: string;
  unitPrice?: number;
  price?: number;
  [key: string]: any;
}

export interface CartDto {
  items: CartItem[];
  subtotal: number;
  estimatedTotal: number;
  minOrderAmount: number;
  appliedCouponCode: string | null;
  itemCount?: number;
}

interface StoreContextValue {
  cart: CartDto;
  categories: any[];
  products: any[];
  serviceablePincodes: any[];
  availablePincodes: any[];
  coupons: any[];
  wishlist: any[];
  wishlistIds: number[];
  wishlistProducts: any[];
  user: any;
  activePincode: any;
  recentlyViewed: any[];
  isLoadingCatalog: boolean;
  isCartDrawerOpen: boolean;
  isDepartmentDrawerOpen: boolean;

  setIsCartDrawerOpen: (open: boolean) => void;
  setIsDepartmentDrawerOpen: (open: boolean) => void;
  setActivePincode: (pincode: any) => void;
  setRecentlyViewed: (products: any[]) => void;

  changePincode: (pincode: any) => void;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateCartQuantity: (productId: number, quantity: number) => Promise<void>;
  getCartItemQuantity: (productId: number) => number;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  refreshCatalog: () => Promise<void>;
  refreshRecentlyViewed: () => void;
  toggleWishlist: (productId: number) => void;
  showToast: (message: string) => void;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<void>;
  addAddress: (address: any) => Promise<void>;
  reorderPastOrder: (order: any) => Promise<void>;
}

const emptyCart: CartDto = {
  items: [],
  subtotal: 0,
  estimatedTotal: 0,
  minOrderAmount: 199,
  appliedCouponCode: null,
  itemCount: 0,
};

const CART_STORAGE_KEY = "organica_guest_cart";
const WISHLIST_STORAGE_KEY = "organica_guest_wishlist";
const USER_STORAGE_KEY = "organica_user";

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function readStoredArray(key: string): any[] {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getProductId(product: any): number {
  return Number(product?.productId ?? product?.id ?? product?.product?.id);
}

function getProductPrice(product: any): number {
  return Number(
    product?.unitPrice ??
      product?.price ??
      product?.sellingPrice ??
      product?.salePrice ??
      product?.product?.price ??
      0,
  );
}

function calculateCart(
  items: CartItem[],
  couponCode: string | null = null,
): CartDto {
  const subtotal = items.reduce(
    (total, item) =>
      total +
      getProductPrice(item) * Math.max(0, Number(item.quantity) || 0),
    0,
  );

  return {
    items,
    subtotal,
    estimatedTotal: subtotal,
    minOrderAmount: 199,
    appliedCouponCode: couponCode,
    itemCount: items.reduce(
      (total, item) => total + (Number(item.quantity) || 0),
      0,
    ),
  };
}

function readStoredUser(): any {
  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

/**
 * Authentication request.
 * Expected login response: { token, user } or { accessToken, user }.
 * Adjust the endpoint or payload if your backend uses different names.
 */
async function authRequest(
  path: string,
  data: Record<string, unknown>,
): Promise<any> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  let result: any = {};

  if (text) {
    try {
      result = JSON.parse(text);
    } catch {
      result = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        text ||
        `Request failed (${response.status})`,
    );
  }

  return result;
}

function extractToken(result: any): string | null {
  const token =
    result?.token ??
    result?.accessToken ??
    result?.jwt ??
    result?.data?.token ??
    result?.data?.accessToken;

  return typeof token === "string" && token.length > 0 ? token : null;
}

function extractUser(result: any, fallbackEmail?: string): any {
  const candidate =
    result?.user ??
    result?.customer ??
    result?.data?.user ??
    result?.data?.customer ??
    result?.data;

  if (candidate && typeof candidate === "object") {
    return {
      ...candidate,
      email: candidate.email ?? fallbackEmail,
    };
  }

  return {
    email: fallbackEmail ?? "",
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartDto>(() => {
    return calculateCart(readStoredArray(CART_STORAGE_KEY) as CartItem[]);
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [serviceablePincodes, setServiceablePincodes] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>(() =>
    readStoredArray(WISHLIST_STORAGE_KEY),
  );
  const [user, setUser] = useState<any>(() => readStoredUser());

  const [activePincode, setActivePincode] = useState<any>({
    pincode: "",
    pinCode: "",
    postalCode: "",
    areaName: "Select your location",
    city: "",
    etaMinutes: 15,
    freeDeliveryThreshold: 499,
    deliveryFee: 30,
    minOrderAmount: 199,
  });

  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isDepartmentDrawerOpen, setIsDepartmentDrawerOpen] = useState(false);

  const showToast = useCallback((message: string) => {
    window.alert(message);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cart.items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Unable to save wishlist:", error);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Unable to save user:", error);
    }
  }, [user]);

  const refreshCatalog = useCallback(async () => {
    setIsLoadingCatalog(true);

    try {
      const results = await Promise.allSettled([
        fetchCategories(),
        fetchProducts(),
        fetchServiceablePincodes(),
        fetchCouponsApi(),
      ]);

      if (results[0].status === "fulfilled") {
        setCategories(Array.isArray(results[0].value) ? results[0].value : []);
      }

      if (results[1].status === "fulfilled") {
        setProducts(Array.isArray(results[1].value) ? results[1].value : []);
      }

      if (results[2].status === "fulfilled") {
        setServiceablePincodes(
          Array.isArray(results[2].value) ? results[2].value : [],
        );
      }

      if (results[3].status === "fulfilled") {
        setCoupons(Array.isArray(results[3].value) ? results[3].value : []);
      }
    } catch (error) {
      console.error("Unable to refresh catalog:", error);
    } finally {
      setIsLoadingCatalog(false);
    }
  }, []);

  useEffect(() => {
    void refreshCatalog();
  }, [refreshCatalog]);

  const changePincode = useCallback((pincode: any) => {
    setActivePincode(pincode);
  }, []);

  const addToCart = useCallback(
    async (productId: number, quantity = 1) => {
      if (
        !Number.isFinite(productId) ||
        productId <= 0 ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        showToast("Please select a valid product and quantity.");
        return;
      }

      const product = products.find(
        (item: any) => getProductId(item) === productId,
      );

      setCart((current) => {
        const existing = current.items.find(
          (item) => Number(item.productId) === productId,
        );

        const items = existing
          ? current.items.map((item) =>
              Number(item.productId) === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [
              ...current.items,
              {
                ...(product ?? {}),
                productId,
                quantity,
                productName:
                  product?.name ??
                  product?.productName ??
                  product?.title ??
                  `Product ${productId}`,
                name:
                  product?.name ??
                  product?.productName ??
                  product?.title ??
                  `Product ${productId}`,
                unitPrice: getProductPrice(product ?? {}),
                price: getProductPrice(product ?? {}),
              },
            ];

        return calculateCart(items, current.appliedCouponCode);
      });

      setIsCartDrawerOpen(true);
    },
    [products, showToast],
  );

  const removeFromCart = useCallback(async (productId: number) => {
    setCart((current) =>
      calculateCart(
        current.items.filter(
          (item) => Number(item.productId) !== productId,
        ),
        current.appliedCouponCode,
      ),
    );
  }, []);

  const updateCartQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (!Number.isInteger(quantity) || quantity < 1) {
        await removeFromCart(productId);
        return;
      }

      setCart((current) =>
        calculateCart(
          current.items.map((item) =>
            Number(item.productId) === productId
              ? { ...item, quantity }
              : item,
          ),
          current.appliedCouponCode,
        ),
      );
    },
    [removeFromCart],
  );

  const getCartItemQuantity = useCallback(
    (productId: number) =>
      cart.items.find(
        (item) => Number(item.productId) === productId,
      )?.quantity ?? 0,
    [cart.items],
  );

  const clearCart = useCallback(async () => {
    setCart(emptyCart);

    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // The in-memory cart is already cleared.
    }
  }, []);

  const applyCoupon = useCallback(
    async (code: string) => {
      const coupon = coupons.find(
        (item: any) =>
          String(item.code ?? item.couponCode ?? "").toLowerCase() ===
          code.trim().toLowerCase(),
      );

      if (!coupon) {
        showToast("Coupon not found. Please check the code.");
        return;
      }

      setCart((current) => ({
        ...current,
        appliedCouponCode: code.trim(),
      }));

      showToast("Coupon applied.");
    },
    [coupons, showToast],
  );

  const wishlistIds = useMemo(
    () =>
      wishlist
        .map((item: any) =>
          typeof item === "number"
            ? item
            : Number(item?.productId ?? item?.product?.id ?? item?.id),
        )
        .filter((id: number) => Number.isFinite(id) && id > 0),
    [wishlist],
  );

  const wishlistProducts = useMemo(
    () =>
      wishlistIds
        .map((id) => {
          const savedItem = wishlist.find((item: any) => {
            const savedId =
              typeof item === "number"
                ? item
                : Number(item?.productId ?? item?.product?.id ?? item?.id);

            return savedId === id;
          });

          const catalogProduct = products.find(
            (product: any) => getProductId(product) === id,
          );

          if (catalogProduct) return catalogProduct;
          if (savedItem?.product) return savedItem.product;

          // Supports wishlist entries that already contain product details.
          if (
            savedItem &&
            typeof savedItem === "object" &&
            (savedItem.name || savedItem.productName || savedItem.imageUrl)
          ) {
            return savedItem;
          }

          return null;
        })
        .filter(Boolean),
    [wishlist, wishlistIds, products],
  );

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist((current) => {
      const exists = current.some((item: any) => {
        const id =
          typeof item === "number"
            ? item
            : Number(item?.productId ?? item?.product?.id ?? item?.id);

        return id === productId;
      });

      if (exists) {
        return current.filter((item: any) => {
          const id =
            typeof item === "number"
              ? item
              : Number(item?.productId ?? item?.product?.id ?? item?.id);

          return id !== productId;
        });
      }

      return [...current, { productId }];
    });
  }, []);

  const refreshRecentlyViewed = useCallback(() => {
    setRecentlyViewed((current) => [...current]);
  }, []);

  /* -------------------- Authentication -------------------- */

  const login = useCallback(async (email: string, password: string) => {
    const result = await authRequest("/api/auth/login", {
      email: email.trim(),
      password,
    });

    const token = extractToken(result);

    if (token) {
      localStorage.setItem("token", token);
    }

    const loggedInUser = extractUser(result, email.trim());
    setUser(loggedInUser);
  }, []);

  const register = useCallback(
    async (data: {
      fullName: string;
      email: string;
      password: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
    }) => {
      const result = await authRequest("/api/auth/register", {
        fullName: data.fullName,
        name: data.fullName,
        email: data.email.trim(),
        password: data.password,
        phone: data.phone ?? "",
        address: data.address ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        postalCode: data.postalCode ?? "",
      });

      const token = extractToken(result);

      if (token) {
        localStorage.setItem("token", token);
      }

      const registeredUser = extractUser(result, data.email.trim());
      setUser(registeredUser);
    },
    [],
  );

  const logout = useCallback(async () => {
    localStorage.removeItem("token");
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (data: Record<string, any>) => {
      setUser((current: any) => {
        if (!current) return current;
        return { ...current, ...data };
      });

      showToast("Profile updated locally.");
    },
    [showToast],
  );

  const addAddress = useCallback(
    async (address: any) => {
      setUser((current: any) => {
        if (!current) return current;

        const addresses = Array.isArray(current.addresses)
          ? current.addresses
          : [];

        return {
          ...current,
          addresses: [...addresses, address],
        };
      });

      showToast("Address saved.");
    },
    [showToast],
  );

  const reorderPastOrder = useCallback(
    async (order: any) => {
      const orderItems = Array.isArray(order?.items) ? order.items : [];

      if (orderItems.length === 0) {
        showToast("No items were found in this order.");
        return;
      }

      for (const item of orderItems) {
        const id = Number(
          item?.productId ?? item?.product?.id ?? item?.id,
        );
        const quantity = Math.max(1, Number(item?.quantity) || 1);

        if (Number.isFinite(id) && id > 0) {
          await addToCart(id, quantity);
        }
      }

      showToast("Order items added to your cart.");
    },
    [addToCart, showToast],
  );

  const value: StoreContextValue = {
    cart,
    categories,
    products,
    serviceablePincodes,
    availablePincodes: serviceablePincodes,
    coupons,
    wishlist,
    wishlistIds,
    wishlistProducts,
    user,
    activePincode,
    recentlyViewed,
    isLoadingCatalog,
    isCartDrawerOpen,
    isDepartmentDrawerOpen,

    setIsCartDrawerOpen,
    setIsDepartmentDrawerOpen,
    setActivePincode,
    setRecentlyViewed,

    changePincode,
    addToCart,
    updateCartQuantity,
    getCartItemQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    refreshCatalog,
    refreshRecentlyViewed,
    toggleWishlist,
    showToast,

    login,
    register,
    logout,
    updateProfile,
    addAddress,
    reorderPastOrder,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
}
