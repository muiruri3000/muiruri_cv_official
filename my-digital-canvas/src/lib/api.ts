import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/`;
/* ---------------- API INSTANCE ---------------- */
const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */




export const getToken = async () => {
  const res = await axios.post(`${API_URL}token/`, {
    username: "Joseph",
    password: "joseph12345!",
  })

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
}

let isRefreshing = false;
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access");

    if (token) {
      // Axios v1+ uses AxiosHeaders
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
console.log("API URL:", import.meta.env.VITE_API_URL);
api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Check your connection.",
      });
    }

    const status = error.response.status;
    const originalRequest: any = error.config;

    switch (status) {
      case 401:
        // prevent infinite loop
        if (originalRequest._retry) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          if (!isRefreshing) {
            isRefreshing = true;

            const refresh = localStorage.getItem("refresh");

            if (!refresh) {
              throw new Error("No refresh token");
            }

            const res = await axios.post(
              `${API_URL}token/refresh/`,
              { refresh }
            );

            const newAccess = res.data.access;
            localStorage.setItem("access", newAccess);

            isRefreshing = false;

            // attach new token
            originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

            // retry original request
            return api(originalRequest);
          }

        } catch (refreshError) {
          isRefreshing = false;

          // logout scenario
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");

          return Promise.reject({
            status: 401,
            message: "Session expired. Please log in again.",
          });
        }

        return Promise.reject(error);

      case 400:
        return Promise.reject({
          status,
          message: "Bad request. Check your input",
          data: error.response.data,
        });

      case 403:
        return Promise.reject({
          status,
          message: "Forbidden. Access denied",
          data: error.response.data,
        });

      case 404:
        return Promise.reject({
          status,
          message: "Resource not found.",
          data: error.response.data,
        });

      case 429:
        return Promise.reject({
          status,
          message: "Too many requests. Wait a moment",
          data: error.response.data,
        });

      case 500:
        return Promise.reject({
          status,
          message: "Server error. Try again later.",
          data: error.response.data,
        });

      default:
        return Promise.reject({
          status,
          message: "Something went wrong",
          data: error.response.data,
        });
    }
  }
);

export default api;