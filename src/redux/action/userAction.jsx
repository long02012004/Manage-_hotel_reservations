export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";

export const doLogin = (payload) => {
  const ROLE_MAP = {
    1: "user",
    2: "staff",
    3: "admin",
  };

  const mappedData = {
    username: payload.fullname,
    access_token: payload.token,
    refresh_token: payload.refresh_token || "",
    image: payload.image || "",
    role: ROLE_MAP[payload.role_id] || "user",
    role_id: payload.role_id,
  };

  // Lưu vào localStorage để reload page vẫn giữ role
  localStorage.setItem("token", mappedData.access_token);
  localStorage.setItem("role", mappedData.role);
  localStorage.setItem("username", mappedData.username);
  localStorage.setItem("image", mappedData.image);
  localStorage.setItem("isLoggedIn", "true");

  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: { DT: mappedData },
  };
};
