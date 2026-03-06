import { useEffect } from "react";

import useAuthStore from "../../store/authStore";
import useProductStore from "../../store/productStore";
import useLayoutStore from "../../store/layoutStore";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const { products, fetchProducts, total } = useProductStore();
  const { setHeader } = useLayoutStore();

  useEffect(() => {
    fetchProducts();
    setHeader("HOME", false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-br from-blue-50 to-[#d5f7f0] rounded-2xl p-8 text-black">
        <h1 className="text-3xl font-bold">
          Halo, {user?.firstName} {user?.lastName}!
        </h1>
        <p className="mt-2 opacity-90">
          Senang melihat Anda kembali. Berikut adalah ringkasan inventaris Anda
          hari ini.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Total Produk</p>
          <h2 className="text-2xl font-bold text-slate-800">{total} Items</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Stok Menipis</p>
          <h2 className="text-2xl font-bold text-red-500">
            {products.filter((p) => p.stock < 10).length} Produk
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Email User</p>
          <h2 className="text-lg font-bold text-slate-800 truncate">
            {user?.email}
          </h2>
        </div>
      </div>
    </div>
  );
}
