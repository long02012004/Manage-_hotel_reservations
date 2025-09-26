import axios from "../utils/AxiosCustomize.jsx";

// API đăng nhập
export const postLogin = (data) => axios.post("/users/login", data);

// API đăng ký
export const postSignUp = (data) => axios.post("/users/register", data);

// API lấy danh sách phòng
export const getRooms = (params = { page: 0, limit: 10 }) =>
  axios.get("/rooms", { params });

// API lấy chi tiết phòng
export const getRoomById = (id) => axios.get(`/rooms/${id}`);
