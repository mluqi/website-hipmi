import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;