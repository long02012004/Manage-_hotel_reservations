import axios from "../utils/AxiosCustomize.jsx";
import instance from "../utils/AxiosCustomize.jsx"; // đường dẫn file instance

// API đăng ký đã xong
export const postSignUp = (
  userName,
  userPhone,
  userEmail,
  userPassword,
  userRetypePassword,
  userRole
) => {
  return axios.post("/users/register", {
    fullname: userName,
    phone_number: userPhone,
    email: userEmail,
    password: userPassword,
    retype_password: userRetypePassword,
    role_id: userRole,
  });
};
// API đăng nhập đã xong
export const postLogin = (userPhone, userPassword) => {
  return axios.post("/users/login", {
    phone_number: userPhone,
    password: userPassword,
  });
};

//api lấy danh sách nhân viên
export const getAllStaff = (params = { page: 0, limit: 60 }) =>
  axios.get("/admins/users/all-staff", { params });
// API tạo nhân viên
export const createStaff = (formData) =>
  axios.post("/admins/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// API cập nhật nhân viên
export const updateStaff = (id, formData) =>
  axios.put(`/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// API xóa nhân viên
export const deleteStaff = (id) => axios.delete(`/staff/users/${id}`);

// API lấy danh sách phòng
export const getRooms = (params = { page: 0, limit: 10 }) =>
  axios.get("/rooms", { params });
// API xem chi tiết phòng lỗi ảnh
export const getRoomById = (id) => axios.get(`/rooms/${id}`);
// API tạo phòng
export const createRoom = (formData) =>
  axios.post("/staff/rooms", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// API xóa phòng
export const deleteRoom = (id) => axios.delete(`/staff/rooms/${id}`);
// Api sửa phòng
export const updateRoom = (id, formData) =>
  instance.put(`/staff/rooms/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// Lấy danh sách tất cả khách hàng (dành cho nhân viên)
export const getAllCustomers = (params = { page: 0, limit: 200 }) =>
  axios.get("/staff/customers", { params });
// API lấy chi tiết khách hàng theo id
export const getCustomerById = (id) => axios.get(`/staff/customers/${id}`);
// Thêm mới khách hàng
export const createCustomer = (data) => axios.post("/customers", data);
// Xóa khách hàng chưa có
export const deleteCustomer = (id) => axios.delete(`/staff/customers/${id}`);
// API khóa/mở khách hàng
export const toggleCustomerActive = (id, active) =>
  axios.put(`/staff/customers/active/${id}?active=${active}`);

// API lấy danh sách đặt phòng chưa có
export const getAllBookings = (params = { page: 0, limit: 10 }) =>
  axios.get("/bookings", { params });
// API tạo đặt phòng
export const createBooking = (roomId, data) =>
  axios.post(`/bookings/${roomId}`, data);
// API tìm kiếm phòng (GET với query params)
export const getSearchRooms = (params) =>
  axios.get("/rooms/search", { params });

// Gửi đánh giá
export const createReview = (roomId, data) =>
  axios.post(`/reviews/${roomId}`, data);

// Lấy tất cả đánh giá
export const getAllReviews = (params = { page: 0, limit: 10 }) =>
  axios.get("/staff/reviews/all-reviews", { params });
// Lấy tất cả đánh giá của một phòng theo roomId
export const getReviewsByRoomId = (roomId) => axios.get(`/reviews/${roomId}`);
// Lấy danh sách giá phòng
export const getAllPrices = (params = { page: 0, limit: 20 }) =>
  axios.get("/staff/price", { params });
// API lấy chi tiết thông tin user hiện tại

export const getUserDetails = (token) => {
  return axios.post(`/users/details`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
