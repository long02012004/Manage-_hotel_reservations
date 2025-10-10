import axios from "axios";

// Đặt baseURL lấy từ .env để dễ đổi khi deploy
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8088/api/v1",
});

// Gắn token vào mọi request nếu có
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // hoặc sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// (tuỳ chọn) xử lý lỗi tập trung
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ");
      // có thể redirect về trang login
    }
    return Promise.reject(error);
  }
);

export default instance;
