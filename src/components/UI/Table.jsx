const Table = ({
  data,
  columns,
  loading,
  onPageChange,
  currentPage,
  limit = 10,
}) => {
  const { products = [], total = 0 } = data || {};

  const safeLimit = limit > 0 ? limit : 10;
  const totalPages = Math.ceil(total / safeLimit) || 1;

  const renderContent = () => {
    if (loading) {
      return [...Array(5)].map((_, i) => (
        <tr key={`skeleton-${i}`} className="animate-pulse">
          <td colSpan={columns.length} className="px-6 py-4">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
          </td>
        </tr>
      ));
    }

    if (products.length > 0) {
      return products.map((item) => (
        <tr key={item.id} className="hover:bg-slate-50 transition">
          {columns.map((col) => (
            <td
              key={`${item.id}-${col.key}`}
              className="px-6 py-4 text-sm text-slate-700"
            >
              {col.render ? col.render(item) : item[col.key]}
            </td>
          ))}
        </tr>
      ));
    }

    return (
      <tr>
        <td
          colSpan={columns.length}
          className="px-6 py-12 text-center text-slate-500"
        >
          Tidak ada data ditemukan.
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-sm font-semibold text-slate-600"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{renderContent()}</tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-600">
          Menampilkan <span className="font-semibold">{products.length}</span>{" "}
          dari <span className="font-semibold">{total}</span> produk
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            className="px-3 py-1 border rounded bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition"
          >
            Prev
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages > 50 ? 50 : totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={`page-${pageNum}`}
                    type="button"
                    onClick={() => onPageChange(pageNum)}
                    className={`px-3 py-1 rounded border transition ${
                      currentPage === pageNum
                        ? "bg-[#1D9D86] text-white "
                        : "bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === currentPage - 2 || pageNum === currentPage + 2)
                return <span key={`dots-${pageNum}`}>...</span>;
              return null;
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage >= totalPages || loading}
            className="px-3 py-1 border rounded bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
