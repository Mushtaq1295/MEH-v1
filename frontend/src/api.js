import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// in api.js

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    // only try once per request
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        // hit your refresh endpoint
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/refresh-token`,
          {},
          { withCredentials: true }
        );
        if (data.success) {
          // now retry the original request; the new accessToken cookie is sent automatically
          return api(original);
        }
      } catch (refreshError) {
        // if refresh failed, fall through and reject
        console.error("Refresh-token call failed:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
