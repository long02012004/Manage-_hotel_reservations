
import React, { useState } from "react";
import { backgroundSignUp, flag, rocket } from "../../../assets/images/img";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.scss";
import { postSignUp } from "../../../services/AppService";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [retype_password, setConfirmPassword] = useState("");
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

  // Xử lý submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !phone_number || !password || !fullname) {
      toast.error("Vui lòng nhập đầy đủ Họ tên, Email, Số điện thoại và Mật khẩu!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ");
      return;
    }
    if (!validatePhone(phone_number)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
    if (password !== retype_password) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    if (!isPolicyChecked) {
      toast.error("Vui lòng đồng ý với Điều khoản & Chính sách");
      return;
    }

    try {
      // Gửi đúng body BE yêu cầu
      let res = await postSignUp({
        fullname: fullname,
        phone_number,
        email: email,
        password,
        retype_password,
        role_id: 1,
      });

//       {
//   "fullname": "pham thang",
//   "phone_number": "0702389151",
//   "email": "admin@gmail.com",
//   "password": "123456",
//   "retype_password": "123456",
//   "date_of_birth": "1990-01-01",
//   "facebook_account_id": 0,
//   "google_account_id": 0,
//   "role_id": 2
// }


      if (res && res.status === 200) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      } else {
        toast.error("Đăng ký thất bại!");
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
          </div>

          <h2 className={styles["sign-up__title"]}>
            Đăng ký
            <img
              className={styles["sign-up__image-rocket"]}
              src={rocket}
              alt="Rocket"
            />
          </h2>

          <form className={styles["sign-up__form"]} onSubmit={handleSignUp}>
            <label className={styles["sign-up__label"]}>Họ và tên</label>
            <input
              className={styles["sign-up__input"]}
              type="text"
              placeholder="Nhập họ tên"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

            <label className={styles["sign-up__label"]}>Email</label>
            <input
              className={styles["sign-up__input"]}
              type="text"
              placeholder="Nhập Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className={styles["sign-up__label"]}>Số điện thoại</label>
            <input
              className={styles["sign-up__input"]}
              type="text"
              placeholder="Nhập số điện thoại"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className={styles["sign-up__label"]}>Mật khẩu</label>
            <div className={styles["sign-up__password-wrapper"]}>
              <input
                className={styles["sign-up__input"]}
                type={isShowPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={styles["sign-up__password-icon"]}
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <VscEye className={styles["icons-eye"]} />
                ) : (
                  <VscEyeClosed className={styles["icons-eye"]} />
                )}
              </span>
            </div>

            <label className={styles["sign-up__label"]}>Xác nhận mật khẩu</label>
            <div className={styles["sign-up__password-wrapper"]}>
              <input
                className={styles["sign-up__input"]}
                type={isShowConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={retype_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className={styles["sign-up__password-icon"]}
                onClick={() =>
                  setIsShowConfirmPassword(!isShowConfirmPassword)
                }
              >
                {isShowConfirmPassword ? (
                  <VscEye className={styles["icons-eye"]} />
                ) : (
                  <VscEyeClosed className={styles["icons-eye"]} />
                )}
              </span>
            </div>

            <div className={styles["sign-up__checkbox"]}>
              <label className={styles["sign-up__checkbox-label"]}>
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

            <button className={styles["sign-up__submit"]} type="submit">
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
