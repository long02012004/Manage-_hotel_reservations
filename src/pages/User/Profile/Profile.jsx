import React, { useState } from "react";
import styles from "./Profile.module.scss";
import { avatar_blog } from "../../../assets/images/img";
import { toast } from "react-toastify";


const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Đinh Văn Phước Lóng",
    email: "phuoclong@example.com",
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
    toast.success("Cập nhật thông tin thành công!");
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
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Avatar + tên */}
            <div className={styles.modalHeader}>
              <img
                src={form.avatar || avatar_blog}
                alt="Avatar"
                className={styles.modalAvatar}
              />
              <h2>{form.name}</h2>
              <p>{form.email}</p>
            </div>

            <form className={styles.form}>
              <label>
                Họ và tên
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Số điện thoại
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Link ảnh đại diện
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setForm({ ...form, avatar: imageUrl });
                    }
                  }}
                  className={styles.fileInput}
                />
              </label>
            </form>

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
