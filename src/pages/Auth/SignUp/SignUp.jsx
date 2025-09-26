import React, { useState } from "react";
import { backgroundSignUp, flag, rocket } from "../../../assets/images/img";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.scss";
import { postSignUp } from "../../../services/AppService";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    return /^(0|\+84)[0-9]{9,10}$/.test(phone); // Regex cho số điện thoại VN
  };

  // 🟢 Hàm xử lý submit form
  const handleSignUp = async (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);
    const isValidPhone = validatePhone(phone);

    // Validation
    if (!username || username.length < 3) {
      toast.error("Tên người dùng phải có ít nhất 3 ký tự!");
      return;
    }
    if (!email || !phone || !password) {
      toast.error("Vui lòng nhập đầy đủ Email, Số điện thoại và Mật khẩu!");
      return;
    }
    if (!isValidEmail) {
      toast.error("Email không hợp lệ");
      return;
    }
    if (!isValidPhone) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    if (!isPolicyChecked) {
      toast.error("Vui lòng đồng ý với Điều khoản & Chính sách");
      return;
    }

    try {
      let data = await postSignUp({ email, password, username });

      if (data.data && data.data.EC === 0) {
        toast.success(data.data.EM);
        navigate("/login");
      } else {
        toast.error(data.data.EM);
      }
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("Có lỗi xảy ra khi đăng ký!");
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["sign-up"]}>
        {/* Hình ảnh bên trái */}
        <div className={styles["sign-up__image"]}>
          <img
            className={styles["sign-up__image-main"]}
            src={backgroundSignUp}
            alt="Main"
          />
        </div>

        {/* Nội dung bên phải */}
        <div className={styles["sign-up__content"]}>
          <div className={styles["sign-up__header"]}>
            <img
              className={styles["sign-up__header-flag"]}
              src={flag}
              alt="Flag"
            />
            <i className="bx bx-chevron-down"></i>
          </div>

          <h2 className={styles["sign-up__title"]}>
            Đăng ký
            <img
              className={styles["sign-up__image-rocket"]}
              src={rocket}
              alt="Rocket"
            />
          </h2>

          {/* Nút login với Google */}
          <Link to="/home" className={styles["sign-up__google-link"]}>
            <button className={styles["sign-up__google-login"]}>
              <i className="fa-brands fa-google"></i> Đăng nhập với Google
            </button>
          </Link>

          {/* Separator */}
          <div className={styles["sign-up__separator"]}>
            <div className={styles["sign-up__separator-line"]}></div>
            <span className={styles["sign-up__or"]}>Hoặc</span>
            <div className={styles["sign-up__separator-line"]}></div>
          </div>

          <form className={styles["sign-up__form"]} onSubmit={handleSignUp}>
            {/* 🆕 Ô nhập Username */}
            <label htmlFor="username" className={styles["sign-up__label"]}>
              Tên người dùng
            </label>
            <input
              id="username"
              className={styles["sign-up__input"]}
              type="text"
              name="username"
              placeholder="Nhập tên người dùng"
              title="Vui lòng nhập tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email" className={styles["sign-up__label"]}>
              Email
            </label>
            <input
              id="email"
              className={styles["sign-up__input"]}
              type="text"
              name="email"
              placeholder="Nhập Email "
              title="Vui lòng nhập email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="phone" className={styles["sign-up__label"]}>
              Số Điện Thoại
            </label>
            <input
              id="phone"
              className={styles["sign-up__input"]}
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              title="Vui lòng nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="password" className={styles["sign-up__label"]}>
              Mật khẩu
            </label>
            <div className={styles["sign-up__password-wrapper"]}>
              <input
                id="password"
                className={`${styles["sign-up__input"]} ${styles["sign-up__input--password"]}`}
                type={isShowPassword ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu"
                title="Vui lòng nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isShowPassword ? (
                <span
                  className={styles["sign-up__password-icon"]}
                  onClick={() => setIsShowPassword(false)}
                >
                  <VscEye className={styles["icons-eye"]} />
                </span>
              ) : (
                <span
                  className={styles["sign-up__password-icon"]}
                  onClick={() => setIsShowPassword(true)}
                >
                  <VscEyeClosed className={styles["icons-eye"]} />
                </span>
              )}
            </div>

            <label
              htmlFor="confirm-password"
              className={styles["sign-up__label"]}
            >
              Xác nhận lại mật khẩu
            </label>
            <div className={styles["sign-up__password-wrapper"]}>
              <input
                id="confirm-password"
                className={`${styles["sign-up__input"]} ${styles["sign-up__input--password"]}`}
                type={isShowConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                title="Xác nhận lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {isShowConfirmPassword ? (
                <span
                  className={styles["sign-up__password-icon"]}
                  onClick={() => setIsShowConfirmPassword(false)}
                >
                  <VscEye className={styles["icons-eye"]} />
                </span>
              ) : (
                <span
                  className={styles["sign-up__password-icon"]}
                  onClick={() => setIsShowConfirmPassword(true)}
                >
                  <VscEyeClosed className={styles["icons-eye"]} />
                </span>
              )}
            </div>

            <div className={styles["sign-up__checkbox"]}>
              <label
                htmlFor="terms"
                className={styles["sign-up__checkbox-label"]}
              >
                <input
                  type="checkbox"
                  checked={isPolicyChecked}
                  onChange={(e) => setIsPolicyChecked(e.target.checked)}
                />
              </label>
              <span className={styles["sign-up__checkbox-text"]}>
                Tôi đồng ý với <strong>Điều khoản & Chính sách</strong>
              </span>
            </div>

            <button
              className={styles["sign-up__submit"]}
              type="submit"
              title="Đăng ký tài khoản"
            >
              Đăng ký
            </button>
          </form>

          <p className={styles["sign-up__login-link"]}>
            Đã có tài khoản?{" "}
            <Link to="/login" className={styles["sign-up__login-link-anchor"]}>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
