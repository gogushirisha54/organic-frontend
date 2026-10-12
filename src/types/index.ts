
export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  unitSize?: string;
  rating?: number;
  reviewCount?: number;
  stockQuantity: number;
  deliveryEtaMins?: number;
  discountPercent?: number;
  dietaryType?: string;
  stock?: number;
  active?: boolean;
}

export interface AdminSalesSummaryDto {
  totalSales: number;
  totalOrders: number;
  totalItemsSold: number;
  averageOrderValue: number;
}

export interface OrderDto {
  id: number;
  shippingAddress: string;
  shippingPincode: string;
  estimatedTotal: number;
  orderStatus: OrderStatus;
}

export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';
