import axios from "../utils/AxiosCustomize.jsx";
const postLogin = (userEmail, userPassword) => {
  return axios.post(`/api/v1/login`, {
    email: userEmail,
    password: userPassword,
  });
};
const postSignUp = (userEmail, userPhone, userPassword) => {
  return axios.post(`/api/v1/register`, {
    email: userEmail,
    phone: userPhone,
    password: userPassword,
  });
};
export { postLogin, postSignUp };
