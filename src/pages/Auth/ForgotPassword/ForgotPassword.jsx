import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Vui lòng nhập email!");
      return;
    }

    // 🚀 Gọi API reset password ở đây
    console.log("Email gửi đi:", email);

    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Đặt lại mật khẩu</h2>
        {!submitted ? (
          <>
            <p>Nhập email của bạn để nhận link đặt lại mật khẩu.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Gửi liên kết</button>
            </form>
          </>
        ) : (
          <p className={styles.success}>
            Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu trong vài phút.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
