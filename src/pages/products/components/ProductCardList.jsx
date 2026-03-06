import { useNavigate } from "react-router-dom";

import Button from "../../../components/UI/Button";
import useToastStore from "../../../store/toastStore";
import useProductStore from "../../../store/productStore";

const ProductCardList = ({ page, setPage, limit }) => {
  const navigate = useNavigate();
  const { products, total, loading, deleteProduct } = useProductStore();
  const { addToast } = useToastStore();

  const totalPages = Math.ceil(total / limit);
  const onPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteProduct(id);

    if (result.success) {
      addToast("Produk berhasil dihapus", "success");
      return;
    }
    addToast("Terjadi Kesalahan", "error");
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm animate-pulse border border-slate-200"
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-slate-200 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg border border-slate-100"
              />
              <div className="flex-1">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  {item.category}
                </span>
                <h3 className="font-bold text-slate-800 mt-1 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  ${item.price}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-50">
              <div className="text-sm text-slate-500">
                Stok:{" "}
                <span
                  className={
                    item.stock < 10
                      ? "text-red-500 font-bold"
                      : "text-slate-800"
                  }
                >
                  {item.stock}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => navigate(`/products/${item?.id}`)}
                  className="text-sm font-semibold  px-2 py-1"
                >
                  Detail
                </button>
                <button
                  onClick={() => navigate(`/products/edit/${item?.id}`)}
                  className="text-sm font-semibold  px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item?.id)}
                  className="text-sm font-semibold text-red-600 px-2 py-1"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 py-4">
        <span className="text-sm text-slate-500">
          Halaman <span className="font-bold text-slate-800">{page}</span> dari{" "}
          {totalPages}
        </span>

        <div className="flex gap-3 w-full max-w-xs">
          <Button
            onClick={() => page > 1 && onPageChange(page - 1)}
            disabled={page === 1}
            className="w-full"
            secondary
          >
            Previous
          </Button>
          <Button
            onClick={() => page < totalPages && onPageChange(page + 1)}
            disabled={page === totalPages}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
