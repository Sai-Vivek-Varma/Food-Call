import axios from "axios";
import { toast } from "sonner";
import { navigateTo } from "@/lib/navigation";

// Use localhost if available, else fallback to Render
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://food-call.onrender.com/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("foodcalltoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      const token = localStorage.getItem("foodcalltoken");
      localStorage.removeItem("foodcalltoken");
      localStorage.removeItem("foodcalluser");
      // Only show toast if user was logged in (token existed)
      if (token) {
        toast.error("Session expired. Please log in again.");
      }
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/auth"
      ) {
        navigateTo("/auth");
      }
    } else if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (!error.response) {
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default apiClient;
