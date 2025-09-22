import React, { useState } from "react";
import styles from "./ModalBooking.module.scss";

const ModalBooking = ({ show, onClose, room }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  if (!show) return null;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin đặt phòng:", formData);

    alert(`Đặt phòng thành công cho ${formData.name}!`);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Đặt phòng: {room.title}</h2>
        <p>Giá: {room.price}₫ / đêm</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <label>Ngày nhận phòng:</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <label>Ngày trả phòng:</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <label>Số khách:</label>
          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            className={styles.input}
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className={styles.confirmBtn}>
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBooking;
