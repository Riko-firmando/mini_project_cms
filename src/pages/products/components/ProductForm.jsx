import { useState, useEffect } from "react";
import {
  HiTag,
  HiCurrencyDollar,
  HiCollection,
  HiChevronDown,
} from "react-icons/hi";

import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";

const ProductForm = ({
  initialData,
  onSubmit,
  loading,
  buttonText = "Simpan Produk",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "beauty",
    stock: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        price: initialData.price || "",
        category: initialData.category || "beauty",
        stock: initialData.stock || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Input
            label="Nama Produk"
            prefix={<HiTag className="absolute left-3 top-3 text-slate-400" />}
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Contoh: iPhone 15 Pro Max"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1 font-medium">
            Kategori
          </label>
          <div className="relative">
            <HiCollection className="absolute left-3 top-3 text-slate-400" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-[#FAFAFA] text-gray-600 text-[14px] rounded-lg border border-transparent outline-none transition-all appearance-none box-border"
            >
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <HiChevronDown />
            </div>
          </div>
        </div>

        {/* Harga */}
        <Input
          label="Harga (USD)"
          prefix={
            <HiCurrencyDollar className="absolute left-3 top-3 text-slate-400" />
          }
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          required
          withSeparator
          placeholder="0.00"
        />

        {/* Stok */}
        <Input
          label="Jumlah Stok"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          type="number"
          withSeparator
          required
          placeholder="Jumlah unit"
        />

        {/* Deskripsi */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm text-gray-500 mb-1 font-medium">
            Deskripsi Produk
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Tuliskan deskripsi lengkap produk..."
            className="w-full px-4 py-2.5 bg-[#FAFAFA] text-gray-600 text-[14px] rounded-lg border border-transparent focus:border-blue-500 outline-none transition-all"
          ></textarea>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-50 flex gap-4 justify-end">
        <Button type="submit" disabled={loading} className="min-w-[140px]">
          {loading ? "Processing..." : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
