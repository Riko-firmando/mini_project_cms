import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import useToastStore from "../../../store/toastStore";
import useLayoutStore from "../../../store/layoutStore";
import useProductStore from "../../../store/productStore";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToast } = useToastStore();
  const { setHeader } = useLayoutStore();
  const { selectedProduct, fetchProductById, updateProduct, loading } =
    useProductStore();

  useEffect(() => {
    setHeader(`EDIT PRODUK - ${id || ""}`, true);
    fetchProductById(id);
  }, [id]);

  const handleEdit = async (data) => {
    const result = await updateProduct(id, data);
    if (result.success) {
      addToast("Produk berhasil diupdate!", "success");
      navigate("/products");
      return;
    }
    addToast("Terjadi Kesalahan", "error");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
      <ProductForm
        initialData={selectedProduct}
        onSubmit={handleEdit}
        loading={loading}
        buttonText="Perbarui Produk"
      />
    </div>
  );
};

export default EditProductPage;
