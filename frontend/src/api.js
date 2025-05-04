import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response.data.message === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("Attempting to refresh token...");
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/refresh-token`,
          {},
          { withCredentials: true }
        );
        console.log("Refresh response:", refreshResponse.data);
        if (refreshResponse.data.success) {
          return api(originalRequest); // Retry original request
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default api;
