import React, { useState } from "react";
import styles from "./Profile.module.scss";
import { avatar_blog } from "../../../assets/images/img";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0123456789",
    avatar: "./163235629_912992962795594_4479437655339829675_n.jpg",
  });

  const [form, setForm] = useState(user);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    setUser(form);
    setShowModal(false);
  };

  return (
    <div className={`${styles.wrapper} `}>
      {/* Navbar */}
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>
          Port<span>folio</span>
        </a>
      </nav>

      <div className={styles.container}>
        {/* Text giới thiệu */}
        <div className={styles.text}>
          <h1>
            Chào mừng đến với <span>Khách Sạn Furama</span>
          </h1>
          <p>
            Tọa lạc tại trung tâm thành phố, Khách Sạn Furama mang đến không
            gian sang trọng, dịch vụ chuyên nghiệp và trải nghiệm nghỉ dưỡng
            tuyệt vời cho mọi du khách. Chúng tôi cam kết mang đến cho bạn những
            khoảnh khắc thoải mái và đáng nhớ nhất.
          </p>
          <button onClick={() => setShowModal(true)} className={styles.btn}>
            Thông tin cá nhân
          </button>
        </div>

        {/* Avatar tròn xoay + info */}
        <div className={styles.Img}>
          <div className={styles.cercle}>
            <span></span>
            <span></span>
            <div className={styles.image}>
              <img src={avatar_blog} alt="avatar" />
            </div>
          </div>

          {/*  <div className={styles.card}>
            <div className={styles.info}>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Điện thoại: {user.phone}</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Modal chỉnh sửa */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()} // chặn click trong modal
          >
            <h2>Chỉnh sửa thông tin</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Họ và tên"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
            />
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="Link ảnh đại diện"
            />

            <div className={styles.btnGroup}>
              <button onClick={handleSave}>Lưu</button>
              <button onClick={() => setShowModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
