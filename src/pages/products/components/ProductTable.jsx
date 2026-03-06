import { useNavigate } from "react-router-dom";
import { HiDotsVertical, HiEye, HiPencil, HiTrash } from "react-icons/hi";

import Table from "../../../components/UI/Table";
import useToastStore from "../../../store/toastStore";
import Dropdown from "../../../components/UI/Dropdown";
import useProductStore from "../../../store/productStore";

const ProductTable = ({ page, setPage, limit }) => {
  const navigate = useNavigate();
  const { products, total, loading, deleteProduct } = useProductStore();
  const { addToast } = useToastStore();

  const handleDelete = async (id) => {
    const result = await deleteProduct(id);

    if (result.success) {
      addToast("Produk berhasil dihapus", "success");
      return;
    }
    addToast("Terjadi Kesalahan", "error");
  };

  const columns = [
    {
      label: "Thumbnail",
      key: "thumbnail",
      render: (item) => (
        <img
          src={item.thumbnail}
          className="w-12 h-12 object-cover rounded"
          alt={item.title}
        />
      ),
    },
    { label: "Nama Produk", key: "title" },
    { label: "Kategori", key: "category" },
    { label: "Harga", key: "price", render: (item) => `$${item.price}` },
    { label: "Stok", key: "stock" },
    {
      label: "Aksi",
      key: "actions",
      render: (item) => (
        <Dropdown
          align="right"
          trigger={
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <HiDotsVertical />
            </button>
          }
          items={[
            {
              label: "Lihat Detail",
              icon: <HiEye />,
              onClick: () => navigate(`/products/${item.id}`),
            },
            {
              label: "Edit",
              icon: <HiPencil />,
              onClick: () => navigate(`/products/edit/${item.id}`),
            },
            { divider: true }, // Garis pemisah
            {
              label: "Hapus",
              variant: "danger",
              icon: <HiTrash />,
              onClick: () => handleDelete(item?.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        data={{ products, total }}
        columns={columns}
        loading={loading}
        currentPage={page}
        limit={limit}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default ProductTable;
