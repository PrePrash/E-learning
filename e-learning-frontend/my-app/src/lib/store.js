import { create } from "zustand";
import Cookies from "js-cookie";

const useStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    if (user?.token) {
      Cookies.set("token", user.token);
    }
  },
  logout: () => {
    set({ user: null });
    Cookies.remove("token");
  },
}));

export default useStore;
