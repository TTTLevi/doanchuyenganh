import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      accessToken: null,
      me:null,
      setAccessToken: (token) => set({ accessToken: token }),
      setMe: (info) => set({ me: info }),
      logout: () => set({ accessToken: null, me: null }),
    }),
    {
      name: "shophoa/user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
