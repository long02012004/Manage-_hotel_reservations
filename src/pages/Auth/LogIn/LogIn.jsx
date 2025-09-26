import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import { postLogin } from "../../../services/AppService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ chặn reload mặc định

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email không hợp lệ");
      return;
    }

    if (!password) {
      toast.error("Mật khẩu không hợp lệ");
      return;
    }

    try {
      let data = await postLogin({ email, password });
      if (data.data && data.data.EC === 0) {
        dispatch(doLogin(data.data));

        toast.success(data.data.EM);
        navigate("/");
      } else {
        toast.error(data.data?.EM || "Login failed");
      }
    } catch (err) {
      toast.error("Server error, please try again later");
      console.error(err);
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
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
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
