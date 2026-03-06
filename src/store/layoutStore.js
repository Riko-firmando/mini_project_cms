import { create } from "zustand";

const useLayoutStore = create((set) => ({
  title: "Dashboard",
  showBackButton: false,
  setHeader: (title, showBack = false) =>
    set({ title, showBackButton: showBack }),
}));

export default useLayoutStore;
