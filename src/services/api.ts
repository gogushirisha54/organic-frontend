
import type {
  AdminSalesSummaryDto,
  OrderDto,
  OrderStatus,
  ProductDto,
} from "../types";

const API_BASE_URL = "https://organic-backend-f1uh.onrender.com";

/* -------------------- Base API Request -------------------- */

async function request<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      message || `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (data && typeof data === "object") {
    const object = data as Record<string, unknown>;

    for (const key of [
      "content",
      "items",
      "products",
      "categories",
      "orders",
      "coupons",
      "data",
    ]) {
      if (Array.isArray(object[key])) {
        return object[key] as T[];
      }
    }
  }

  return [];
}

function post<T = unknown>(path: string, data: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function put<T = unknown>(path: string, data: unknown): Promise<T> {
  return request<T>(path, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

function remove<T = void>(path: string): Promise<T> {
  return request<T>(path, {
    method: "DELETE",
  });
}

/* -------------------- Catalog -------------------- */

export async function fetchCategories(): Promise<unknown[]> {
  return normalizeList(await request("/api/categories"));
}

export async function fetchProducts(): Promise<unknown[]> {
  return normalizeList(await request("/api/products"));
}

export async function fetchProductById(
  id: number | string,
): Promise<unknown> {
  return request(`/api/products/${id}`);
}

/* -------------------- Paginated Products -------------------- */

export interface PaginatedProductsParams {
  categorySlug?: string;
  search?: string;
  brand?: string;
  subcategory?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  inStock?: boolean;
  dietary?: string;
}

export interface PaginatedProductsResponse {
  content: any[];
  products?: any[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  availableBrands: string[];
  availableSubcategories: string[];
}

export async function fetchPaginatedProducts(
  params: PaginatedProductsParams = {},
): Promise<PaginatedProductsResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();

  const path = queryString
    ? `/api/products?${queryString}`
    : "/api/products";

  const result = await request<unknown>(path);

  if (Array.isArray(result)) {
    const products = result as any[];
    const size = params.size ?? 12;
    const page = params.page ?? 0;

    return {
      content: products,
      products,
      totalElements: products.length,
      totalPages: Math.max(1, Math.ceil(products.length / size)),
      page,
      size,
      availableBrands: [
        ...new Set(
          products.map((product) => product.brand).filter(Boolean) as string[],
        ),
      ],
      availableSubcategories: [
        ...new Set(
          products
            .map((product) => product.subcategory)
            .filter(Boolean) as string[],
        ),
      ],
    };
  }

  const data = (result ?? {}) as Record<string, unknown>;
  const content = normalizeList(data);

  return {
    content,
    products: content,
    totalElements: Number(data.totalElements ?? content.length),
    totalPages: Number(data.totalPages ?? 1),
    page: Number(data.number ?? data.page ?? params.page ?? 0),
    size: Number(data.size ?? params.size ?? content.length),
    availableBrands: normalizeList<string>(data.availableBrands),
    availableSubcategories: normalizeList<string>(
      data.availableSubcategories,
    ),
  };
}

/* -------------------- Pincodes, Coupons and Search -------------------- */

export async function fetchServiceablePincodes(): Promise<unknown[]> {
  return normalizeList(await request("/api/pincodes"));
}

export async function fetchCouponsApi(): Promise<unknown[]> {
  return normalizeList(await request("/api/coupons"));
}

export async function fetchSearchSuggestions(
  query: string,
): Promise<ProductDto[]> {
  return normalizeList<ProductDto>(
    await request(
      `/api/search/suggestions?q=${encodeURIComponent(query)}`,
    ),
  );
}

/* -------------------- Wishlist -------------------- */

export async function fetchWishlistApi(): Promise<unknown[]> {
  return normalizeList(await request("/api/wishlist"));
}

/* -------------------- Cart -------------------- */

export async function fetchCartApi(): Promise<any> {
  return request("/api/cart");
}

export async function addToCartApi(
  productId: number,
  quantity = 1,
): Promise<any> {
  return post("/api/cart/items", {
    productId,
    quantity,
  });
}

export async function updateCartItemApi(
  productId: number,
  quantity: number,
): Promise<any> {
  return put(`/api/cart/items/${productId}`, {
    quantity,
  });
}

export const updateCartQuantityApi = updateCartItemApi;

export async function removeCartItemApi(
  productId: number,
): Promise<any> {
  return remove(`/api/cart/items/${productId}`);
}

export async function clearCartApi(): Promise<void> {
  await remove<void>("/api/cart");
}

/* -------------------- Checkout and Customer Orders -------------------- */

export async function submitCheckoutOrderApi(
  data: Record<string, unknown>,
): Promise<any> {
  return post("/api/orders/checkout", data);
}

export async function createOrder(
  data: Record<string, unknown>,
): Promise<any> {
  return submitCheckoutOrderApi(data);
}

export async function cancelCustomerOrderApi(
  orderId: number | string,
): Promise<OrderDto | null> {
  return request<OrderDto | null>(
    `/api/orders/${orderId}/cancel`,
    {
      method: "POST",
    },
  );
}

export async function applyCouponApi(
  code: string,
): Promise<unknown> {
  return post("/api/coupons/apply", {
    code,
  });
}

/* -------------------- Admin: Categories -------------------- */

export async function adminCreateCategoryApi(
  data: Record<string, unknown>,
): Promise<unknown> {
  return post("/api/admin/categories", data);
}

export async function adminUpdateCategoryApi(
  id: number,
  data: Record<string, unknown>,
): Promise<unknown> {
  return put(`/api/admin/categories/${id}`, data);
}

export async function adminDeleteCategoryApi(
  id: number,
): Promise<void> {
  await remove<void>(`/api/admin/categories/${id}`);
}

/* -------------------- Admin: Products -------------------- */

export async function adminCreateProductApi(
  data: Record<string, unknown>,
): Promise<unknown> {
  return post("/api/admin/products", data);
}

export async function adminUpdateProductApi(
  id: number,
  data: Record<string, unknown>,
): Promise<unknown> {
  return put(`/api/admin/products/${id}`, data);
}

export async function adminDeleteProductApi(
  id: number,
): Promise<void> {
  await remove<void>(`/api/admin/products/${id}`);
}

/* -------------------- Admin: Coupons -------------------- */

export async function adminCreateCouponApi(
  data: Record<string, unknown>,
): Promise<unknown> {
  return post("/api/admin/coupons", data);
}

export async function adminUpdateCouponApi(
  id: number | string,
  data: Record<string, unknown>,
): Promise<unknown> {
  return put(`/api/admin/coupons/${id}`, data);
}

export async function adminDeleteCouponApi(
  id: number | string,
): Promise<void> {
  await remove<void>(`/api/admin/coupons/${id}`);
}

export async function adminToggleCouponApi(
  id: number,
): Promise<unknown> {
  return request(`/api/admin/coupons/${id}/toggle`, {
    method: "PATCH",
  });
}

/* -------------------- Admin: Pincodes -------------------- */

export async function adminCreatePincodeApi(
  data: Record<string, unknown>,
): Promise<unknown> {
  return post("/api/admin/pincodes", data);
}

export async function adminUpdatePincodeApi(
  id: number | string,
  data: Record<string, unknown>,
): Promise<unknown> {
  return put(`/api/admin/pincodes/${id}`, data);
}

export async function adminDeletePincodeApi(
  id: number | string,
): Promise<void> {
  await remove<void>(`/api/admin/pincodes/${id}`);
}

/* -------------------- Admin: Orders -------------------- */

export async function adminFetchAllOrdersApi(): Promise<OrderDto[]> {
  return normalizeList<OrderDto>(
    await request("/api/admin/orders"),
  );
}

export async function adminFetchSalesSummaryApi(): Promise<AdminSalesSummaryDto> {
  return request("/api/admin/sales-summary");
}

export async function adminUpdateOrderStatusApi(
  orderId: number,
  status: OrderStatus,
): Promise<OrderDto> {
  return request<OrderDto>(
    `/api/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );
}

/* -------------------- Customer Orders -------------------- */

export async function fetchMyOrdersApi(): Promise<OrderDto[]> {
  const result = await request<unknown>("/api/orders/my-orders");
  return normalizeList<OrderDto>(result);
}
