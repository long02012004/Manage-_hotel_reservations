import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import { postLogin } from "../../../services/AppService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";

const LogIn = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePhone = (phone) => {
    return /^(0|\+84)[0-9]{9,10}$/.test(phone); // Regex cho số điện thoại VN
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ chặn reload mặc định

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      toast.error("Phone Number không hợp lệ");
      return;
    }

    if (!password) {
      toast.error("Mật khẩu không hợp lệ");
      return;
    }

    try {
      let res = await postLogin({
        phone_number: phone,
        password,
      });
      console.log("res:", res);
      const token = res?.data?.token;
      if (res && res.status === 200) {
        console.log("token:", token); // giờ sẽ log ra
        localStorage.setItem("token", token);
        dispatch(doLogin(res.data));
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error("Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error("Login error:", err);
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
              type="phone"
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
          <span>Quên mật khẩu</span>
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

//
