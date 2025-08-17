// lib/axios.ts
import axios from "axios";
import { environment } from "../env/env.local";

const axiosInstance = axios.create({
  baseURL: environment?.baseUrl, //base url
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        config.headers.Authorization = `token ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname + window.location.search;
        // Clear cookies
        document.cookie =
          "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Clear localStorage
        localStorage.removeItem("first_name");
        localStorage.removeItem("userData");

        // // Dispatch custom event for other components to listen to
        // window.dispatchEvent(new CustomEvent("sessionConflict"));

        // Store the redirect path in sessionStorage (persists during the session)
        sessionStorage.setItem("redirectAfterLogin", currentPath);

        // Redirect to login page
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

// Add response interceptor to log errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
