import axios from "../utils/AxiosCustomize.jsx";

// API đăng nhập
export const postLogin = (data) => axios.post("/users/login", data);

// API đăng ký
export const postSignUp = (data) => axios.post("/users/register", data);

// API lấy danh sách phòng
export const getRooms = (params = { page: 0, limit: 20 }) =>
  axios.get("/rooms", { params });

// API lấy chi tiết phòng
export const getRoomById = (id) => axios.get(`/rooms/${id}`);

//api lấy danh sách nhân viên
export const getAllStaff = (params = { page: 0, limit: 20 }) =>
  axios.get("/users/admin/manage-staff", { params });

// API tạo nhân viên
export const createStaff = (formData) =>
  axios.post("/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// API tạo phòng
export const createRoom = (formData) =>
  axios.post("/rooms", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// API lấy danh sách đặt phòng chưa có
export const getAllBookings = (params = { page: 0, limit: 10 }) =>
  axios.get("/bookings", { params });
// API xóa phòng chưa có
export const deleteRoom = (id) => axios.delete(`/rooms/${id}`);
