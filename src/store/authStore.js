import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (data) =>
        set({
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
          },
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    { name: "auth-storage" },
  ),
);

export default useAuthStore;
