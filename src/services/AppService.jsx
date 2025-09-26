import axios from "../utils/AxiosCustomize.jsx";

// API đăng nhập
const postLogin = (data) => {
  return axios.post(`/api/v1/login`, data);
};

// API đăng ký
const postSignUp = (data) => {
  return axios.post(`/api/v1/register`, data);
};

// API tìm phòng
const postSearchRooms = (data) => {
  return axios.post(`/api/v1/search`, data);
};


export { postLogin, postSignUp, postSearchRooms };
