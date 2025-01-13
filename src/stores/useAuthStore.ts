import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStoreState = {
  isLoggedIn: boolean;
  token?: string;
};
type AuthStoreActions = {
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStoreState & AuthStoreActions>(
    (set) => ({
      isLoggedIn: false,
      token: undefined,
      login: (token) => {
        set({ isLoggedIn: true, token });
      },
      logout: () => {
        set({ isLoggedIn: false, token: undefined });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
