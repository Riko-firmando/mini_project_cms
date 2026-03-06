import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "https://dummyjson.com",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = useAuthStore.getState();
        const res = await axios.post("https://dummyjson.com/auth/refresh", {
          refreshToken,
        });

        useAuthStore.getState().updateToken(res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  },
);

export default api;
