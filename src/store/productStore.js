import { create } from "zustand";
import api from "@/api/axiosInstance";

const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  total: 0,

  fetchProducts: async (searchQuery = "", page = 1, limit = 30) => {
    const skip = (page - 1) * limit;
    set({ loading: true });

    try {
      const url = searchQuery
        ? `/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
        : `/products?limit=${limit}&skip=${skip}`;

      const response = await api.get(url);
      set({
        products: response.data.products,
        total: response.data.total,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/products/${id}`);
      set({ selectedProduct: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      await api.post("/products/add", productData);
      return { success: true };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },

  updateProduct: async (id, updatedData) => {
    set({ loading: true });
    try {
      await api.put(`/products/${id}`, updatedData);
      return { success: true };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },

  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.message });
      return { success: false };
    }
  },
}));

export default useProductStore;
