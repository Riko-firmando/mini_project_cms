import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import ProductTable from "./components/ProductTable";
import useLayoutStore from "../../store/layoutStore";
import { useDebounce } from "../../hooks/useDebounce";
import useProductStore from "../../store/productStore";
import ProductCardList from "./components/ProductCardList";

const ProductPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { fetchProducts } = useProductStore();
  const { setHeader } = useLayoutStore();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setHeader("HALAMAN PRODUK");
    setPage(1);
  }, [debouncedQuery, fetchProducts]);

  useEffect(() => {
    fetchProducts(debouncedQuery, page, limit);
  }, [debouncedQuery, page, fetchProducts]);

  return (
    <div className="bg-white rounded-xl p-5">
      <h1 className="text-2xl font-bold mb-6">Manajemen Produk</h1>
      <div className="flex justify-between gap-2 mb-2">
        <Input
          placeholder="Cari produk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          prefix={<Search size={18} />}
          className="max-w-75"
        />
        <Button onClick={() => navigate("/products/add")}>Tambah Produk</Button>
      </div>
      <div className="hidden lg:block">
        <ProductTable page={page} setPage={setPage} limit={limit} />
      </div>
      <div className="lg:hidden">
        <ProductCardList page={page} setPage={setPage} limit={limit} />
      </div>
    </div>
  );
};

export default ProductPage;
