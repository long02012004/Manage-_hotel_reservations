import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

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
    NProgress.start();
    return config;
  },
  (error) => Promise.reject(error)
);

// (tuỳ chọn) xử lý lỗi tập trung
instance.interceptors.response.use(
  (response) => {
    NProgress.done(); // ✅ Dừng thanh tiến trình khi request thành công
    return response;
  },

  (error) => {
    NProgress.done();
    if (error.response?.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ");
      // có thể redirect về trang login
    }
    return Promise.reject(error);
  }
);

export default instance;
