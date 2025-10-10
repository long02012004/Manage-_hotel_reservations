import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import { postLogin, getUserDetails } from "../../../services/AppService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";

const LogIn = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePhone = (phone) => /^(0|\+84)[0-9]{9,10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      toast.error("Phone Number không hợp lệ");
      return;
    }
    if (!password) {
      toast.error("Mật khẩu không hợp lệ");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔹 Sending login request with:", { phone, password });

      // 1. Login để lấy token
      const res = await postLogin({ phone_number: phone, password });
      console.log("🔹 Login response:", res);

      if (res?.data && res.status === 200) {
        const { token } = res.data;
        console.log("🔹 Received token:", token);

        // Lưu token
        localStorage.setItem("token", token);

        // 2. Gọi API lấy thông tin user hiện tại
        // 2. Gọi API lấy thông tin user hiện tại
        console.log("🔹 Fetching user details...");
        const userRes = await getUserDetails(token); // truyền token
        console.log("🔹 Full userRes:", userRes);

        if (!userRes?.data) throw new Error("Không lấy được thông tin user");

        const { fullname, roleId, phone_number } = userRes.data;
        console.log(
          "🔹 User fullname:",
          fullname,
          "RoleId:",
          roleId,
          "Phone:",
          phone_number
        );

        // 3. Lưu vào Redux
        dispatch(
          doLogin({
            token,
            fullname,
            role_id: roleId,
            phone_number, // nếu muốn lưu số điện thoại luôn
          })
        );

        toast.success("Đăng nhập thành công!");

        // 4. Redirect dựa trên roleId
        const roleNumber = Number(roleId);

        if (roleNumber === 3) {
          navigate("/admins/dashboard"); // Admin
        } else if (roleNumber === 2) {
          navigate("/staff/rooms"); // Staff
        } else {
          navigate("/home"); // User thường → home
        }
      } else {
        console.log("🔹 Login failed response:", res);
        toast.error(res?.data?.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error("🔴 Login error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
      }

      toast.error("Có lỗi xảy ra khi đăng nhập!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-box"]}>
            <input
              id="phone"
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            className={styles["login-btn"]}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Đăng nhập"}
          </button>
        </form>
        <div className={styles["forgot-password"]}>
          <Link
            to="/forgot-password"
            className={styles["forgot-password-link"]}
          >
            Quên mật khẩu
          </Link>
          <span>
            <Link to="/sign-up" className={styles["sign-up"]}>
              Đăng ký
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
