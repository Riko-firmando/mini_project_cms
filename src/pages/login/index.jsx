import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Package } from "lucide-react";

import api from "../../api/axiosInstance";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import useAuthStore from "../../store/authStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      // Simpan ke Zustand (Otomatis tersimpan di LocalStorage karena 'persist')
      setAuth(response.data);

      // Redirect ke Dashboard/Home
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-[#d5f7f0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D9D86] rounded-full">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Sistem Produk
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Username"
              type="username"
              name="username"
              placeholder="Masukkan username Anda"
              value={formData.username}
              onChange={handleChange}
              prefix={<User className="h-5 w-5 text-gray-400" />}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Masukkan password Anda"
              value={formData.password}
              onChange={handleChange}
              prefix={<Lock className="h-5 w-5 text-gray-400" />}
            />

            <Button type="submit" className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
