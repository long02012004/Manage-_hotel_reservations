import React, { useState } from "react";
import styles from "./ModalBooking.module.scss";
import { createBooking } from "../../../services/AppService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalBooking = ({ show, onClose, room }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [showConfirm, setShowConfirm] = useState(false); // hiển thị modal confirm

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟩 Nhấn "Xác nhận" lần đầu — chỉ mở modal confirm
  const handleOpenConfirm = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setShowConfirm(true);
  };

  // 🟥 Đóng modal confirm
  const handleCloseConfirm = () => setShowConfirm(false);

  // ✅ Xác nhận đặt phòng thật sự
  const handleSubmitBooking = async () => {
    setShowConfirm(false);

    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      checkinDate: formData.checkIn,
      checkoutDate: formData.checkOut,
      guests: parseInt(formData.guests),
    };

    try {
      const res = await createBooking(room.id, bookingData);
      console.log("Kết quả từ BE:", res.data);
      toast.success(res.data.message || "Đặt phòng thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi API:", error);
      toast.error("Đặt phòng thất bại!");
    }
  };

  return (
    <>
      {/* 🧾 Modal đặt phòng chính */}
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>Đặt phòng: {room.title}</h2>
          <p>Giá: {room.price}₫ / đêm</p>

          <form onSubmit={handleOpenConfirm} className={styles.form}>
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

            <label>Số người:</label>
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

      {/* 💬 Modal Confirm — giống hệt mẫu bạn gửi */}
      <Modal show={showConfirm} onHide={handleCloseConfirm} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt phòng?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn đặt phòng <b>{room.title}</b> không?
          </p>
          <p>
            <b>Người đặt:</b> {formData.name} <br />
            <b>Email:</b> {formData.email} <br />
            <b>Số điện thoại:</b> {formData.phone} <br />
            <b>Nhận phòng:</b> {formData.checkIn} <br />
            <b>Trả phòng:</b> {formData.checkOut} <br />
            <b>Số người:</b> {formData.guests}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitBooking}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBooking;
