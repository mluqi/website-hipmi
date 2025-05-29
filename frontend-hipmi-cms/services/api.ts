import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://dev3-p3.palindo.id/api",
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("admin_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
