// src/services/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

// Global request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const sessionStr = localStorage.getItem("userSession");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred.";
    if (error.response) {
      // Server responded with a status other than 2xx (e.g., 400, 401, 500)
      errorMessage = error.response.data?.message || `Server Error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response was received (e.g., network failure, server down)
      errorMessage = "Network error. Please check your internet connection or try again later.";
    } else {
      errorMessage = error.message;
    }
    console.error("API Error:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;