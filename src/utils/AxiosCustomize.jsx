import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8088/",
});

// thêm interceptor để tự động gắn token vào mọi request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // hoặc sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
