import { createBrowserRouter, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import MainLayout from "../components/layouts/mainLayout";
import ProductPage from "../pages/products";
import ProductDetailPage from "../pages/products/pages/ProductDetailPage";
import AddProductPage from "../pages/products/pages/AddProductPage";
import EditProductPage from "../pages/products/pages/EditProductPage";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.accessToken);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "products",
        children: [
          { index: true, element: <ProductPage /> },
          { path: ":id", element: <ProductDetailPage /> },
          { path: "add", element: <AddProductPage /> },
          { path: "edit/:id", element: <EditProductPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div className="p-10 text-center">404 - Page Not Found</div>,
  },
]);

export default router;
