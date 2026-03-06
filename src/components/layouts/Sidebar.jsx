import clsx from "clsx";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Menu,
  X,
  LogOut,
  Package,
} from "lucide-react";
import useAuthStore from "../../store/authStore";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: "/home", icon: LayoutDashboard, label: "Home" },
    { path: "/products", icon: Calendar, label: "Products" },
  ];
  const { logout } = useAuthStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col ">
        <div className="flex flex-col grow bg-white border-r border-gray-200">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-center w-10 h-10 bg-[#1D9D86] rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-gray-900">
                Sistem Produk
              </h3>
              <p className="text-xs text-gray-500">Management System</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 text-[14px] px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#EEFBF8] text-[#1D9D86]"
                      : "text-black hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    className={clsx(
                      "w-5 h-5",
                      isActive ? "text-[#1D9D86]" : "",
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="px-4 py-6 space-y-1">
            <button
              onClick={logout}
              className="flex items-center gap-3 text-[14px] px-4 py-3 rounded-lg transition-colors bg-red-50 w-full"
            >
              <LogOut color="red" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-[#1D9D86] rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Sistem Produk</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="px-4 py-3 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#EEFBF8] text-[#1D9D86]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={logout}
                className="flex items-center gap-3 text-[14px] px-4 py-3 rounded-lg transition-colors bg-red-50 w-full"
              >
                <LogOut color="red" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
