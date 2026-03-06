import { useEffect } from "react";
import { HiStar, HiTag, HiCube } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";

import useLayoutStore from "../../../store/layoutStore";
import useProductStore from "../../../store/productStore";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, fetchProductById, loading, error } =
    useProductStore();
  const { setHeader } = useLayoutStore();

  useEffect(() => {
    setHeader(`DETAIL PRODUK - ${id}`, true);
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (loading)
    return (
      <div className="p-8 flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl">
        {error}
        <button
          onClick={() => navigate(-1)}
          className="block mx-auto mt-4 text-blue-600 font-medium underline"
        >
          Kembali
        </button>
      </div>
    );

  if (!selectedProduct) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
              <img
                src={selectedProduct.images[0] || selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-20 h-20 object-cover rounded-lg border border-slate-200 cursor-pointer hover:border-blue-500 transition"
                  alt="Gallery"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <HiStar /> {selectedProduct.rating}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              {selectedProduct.title}
            </h1>
            <p className="text-slate-500 text-lg mb-6 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8 flex flex-wrap gap-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Harga Sekarang</p>
                <h2 className="text-3xl font-black text-blue-600">
                  ${selectedProduct.price}
                </h2>
              </div>
              <div className="h-12 w-px bg-slate-200 hidden sm:block"></div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Stok Tersedia</p>
                <div className="flex items-center gap-2">
                  <HiCube
                    className={
                      selectedProduct.stock < 10
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  />
                  <span className="text-xl font-bold text-slate-800">
                    {selectedProduct.stock} unit
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <HiTag className="text-blue-500" />
                <span>
                  Brand:{" "}
                  <span className="font-bold">{selectedProduct.brand}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <HiCube className="text-blue-500" />
                <span>
                  SKU: <span className="font-bold">{selectedProduct.sku}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
