// import axios from "../utils/AxiosCustomize.jsx";
// const postLogin = (email, password) => {
//   return axios.post(`/api/v1/users/login`, {
//     email: email,
//     password: password,
//   });
// };
// const postSignUp = (email, phone_number, password) => {
//   return axios.post(`/api/v1/users/register`, {
//     email: email,
//     phone: phone_number,
//     password: password,
//   });
// };
// export { postLogin, postSignUp };


import axios from "../utils/AxiosCustomize.jsx";

// API đăng nhập
const postLogin = (data) => {
  return axios.post(`/api/v1/users/login`, data);
};

// API đăng ký
const postSignUp = (data) => {
  return axios.post(`/api/v1/users/register`, data);
};

// API tìm phòng
// const postSearchRooms = (data) => {
//   return axios.post(`/api/v1/search`, data);
// };

// API lấy danh sách phòng
const getRooms = () => {
  return axios.get(`/api/v1/rooms`);
};

// API lấy chi tiết phòng
const getRoomById = (id) => {
  return axios.get(`/api/v1/rooms/${id}`);
};

export { postLogin, postSignUp, getRooms , getRoomById };