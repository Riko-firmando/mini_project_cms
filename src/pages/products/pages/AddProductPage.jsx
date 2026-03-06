import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import useToastStore from "../../../store/toastStore";
import useLayoutStore from "../../../store/layoutStore";
import useProductStore from "../../../store/productStore";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { addProduct, loading } = useProductStore();
  const { setHeader } = useLayoutStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    setHeader("TAMBAH PRODUK", true);
  }, []);

  const handleAdd = async (data) => {
    const result = await addProduct(data);
    if (result.success) {
      addToast("Produk berhasil ditambahkan!", "success");
      navigate("/products");
      return;
    }
    addToast("Terjadi Kesalahan", "error");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
      <ProductForm
        onSubmit={handleAdd}
        loading={loading}
        buttonText="Simpan Produk Baru"
      />
    </div>
  );
};

export default AddProductPage;
