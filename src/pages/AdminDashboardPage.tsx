import React, { useEffect, useState } from 'react';
import { ShieldCheck, Search, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { adminFetchAllOrdersApi, adminFetchSalesSummaryApi } from '../services/api';
import { AdminSalesSummaryDto, OrderDto, ProductDto } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { products, categories, refreshCatalog } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [summary, setSummary] = useState<AdminSalesSummaryDto | null>(null);
  const [adminSearch, setAdminSearch] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allOrders, salesSummary] = await Promise.all([
          adminFetchAllOrdersApi(),
          adminFetchSalesSummaryApi(),
        ]);
        setOrders(allOrders);
        setSummary(salesSummary);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [products?.length]);

  const filteredProducts = (products || []).filter((p: ProductDto) =>
    (p.name || '').toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ShieldCheck className="text-emerald-700" /> Admin Dashboard
        </h1>
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border text-center">
            <p className="text-xs uppercase text-gray-500 font-bold">Revenue</p>
            <h3 className="text-xl font-bold mt-1">₹{summary.totalSales}</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border text-center">
            <p className="text-xs uppercase text-gray-500 font-bold">Orders</p>
            <h3 className="text-xl font-bold mt-1">{summary.totalOrders}</h3>
          </div>
        </div>
      )}

      <div className="flex gap-4 border-b mb-6">
        <button onClick={() => setActiveTab('products')} className={`pb-2 px-2 text-sm font-medium ${activeTab === 'products' ? 'border-b-2 border-emerald-700 text-emerald-700' : 'text-gray-500'}`}>Products</button>
        <button onClick={() => setActiveTab('orders')} className={`pb-2 px-2 text-sm font-medium ${activeTab === 'orders' ? 'border-b-2 border-emerald-700 text-emerald-700' : 'text-gray-500'}`}>Orders</button>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search products..." value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm" />
          </div>

          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3">Product</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p: ProductDto) => (
                <tr key={p.id} className="border-b">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">
                    {p.stockQuantity <= 0 ? <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs font-semibold">Out of Stock</span> : <span className="text-green-700">{p.stockQuantity} items</span>}
                  </td>
                  <td className="p-3 font-semibold">₹{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3">Order ID</th>
              <th className="p-3">Address</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: OrderDto) => (
              <tr key={o.id} className="border-b">
                <td className="p-3 font-mono text-xs">#{o.id}</td>
                <td className="p-3 text-xs">{o.shippingAddress}</td>
                <td className="p-3 font-semibold">₹{o.estimatedTotal}</td>
                <td className="p-3"><span className="text-xs px-2 py-0.5 rounded bg-yellow-50 text-yellow-700">{o.orderStatus}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
