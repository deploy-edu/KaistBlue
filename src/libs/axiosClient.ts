import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { token } = await useAuthStore.getState();
    if (token) {
      console.log(`Bearer ${token}`);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosClient;
