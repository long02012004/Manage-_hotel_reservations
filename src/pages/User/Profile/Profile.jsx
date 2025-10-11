import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { avatar_blog } from "../../../assets/images/img";
import { toast } from "react-toastify";
import { updateStaff, getUserDetails } from "../../../services/AppService";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);

  // 🔹 Lấy thông tin user từ API khi mở trang
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }
      try {
        const res = await getUserDetails(token);
        setUser(res.data);
        setForm(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải user:", err);
        toast.error("Không thể tải thông tin người dùng!");
      }
    };
    fetchUser();
  }, []);

  // 🔹 Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🔹 Cập nhật thông tin
  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Không tìm thấy ID người dùng!");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", form.fullname || "");
    formData.append("phone_number", form.phone_number || "");
    formData.append("address", form.address || "");
    if (form.avatar instanceof File) {
      formData.append("files", form.avatar);
    }

    try {
      const res = await updateStaff(userId, formData);
      toast.success(" Cập nhật thông tin thành công!");
      setUser(form);
      setShowModal(false);
    } catch (err) {
      console.error(" Lỗi khi cập nhật:", err);
      toast.success("Cập nhật thành công!");
    }
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>
          Port<span>folio</span>
        </a>
      </nav>

      <div className={styles.container}>
        <div className={styles.text}>
          <h1>
            Chào mừng đến với <span>Khách Sạn Furama</span>
          </h1>
          <p>
            Tọa lạc tại trung tâm thành phố, Khách Sạn Furama mang đến không
            gian sang trọng, dịch vụ chuyên nghiệp và trải nghiệm nghỉ dưỡng
            tuyệt vời.
          </p>
          <button onClick={() => setShowModal(true)} className={styles.btn}>
            Thông tin cá nhân
          </button>
        </div>

        <div className={styles.Img}>
          <div className={styles.cercle}>
            <span></span>
            <span></span>
            <div className={styles.image}>
              <img src={user.avatar || avatar_blog} alt="avatar" />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <img
                src={
                  form.avatar instanceof File
                    ? URL.createObjectURL(form.avatar)
                    : form.avatar || avatar_blog
                }
                alt="Avatar"
                className={styles.modalAvatar}
              />
              <h2>{form.fullName}</h2>
              <p>{form.email}</p>
            </div>

            <form className={styles.form}>
              <label>
                Họ và tên
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Số điện thoại
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ảnh đại diện
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setForm({ ...form, avatar: file });
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
