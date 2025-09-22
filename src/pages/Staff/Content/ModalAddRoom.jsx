import { useState } from "react";
import styles from "./ManageRooms.module.scss";

const ModalAddRoom = ({ onClose, onSave }) => {
  const [room, setRoom] = useState({
    id: Date.now(),
    title: "",
    type: "",
    price: "",
    area: "",
    guests: "",
    beds: "",
    amenities: "",
    descShort: "",
    descLong: "",
    status: "Available",
    image: "",
  });

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(room);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Thêm Phòng</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="title" placeholder="Tên phòng" onChange={handleChange} required />
          <input name="type" placeholder="Loại phòng" onChange={handleChange} />
          <input name="price" placeholder="Giá / đêm" type="number" onChange={handleChange} required />
          <input name="area" placeholder="Diện tích (m²)" onChange={handleChange} />
          <input name="guests" placeholder="Sức chứa" type="number" onChange={handleChange} />
          <input name="beds" placeholder="Loại giường" onChange={handleChange} />
          <textarea name="amenities" placeholder="Tiện nghi" onChange={handleChange}></textarea>
          <textarea name="descShort" placeholder="Mô tả ngắn" onChange={handleChange}></textarea>
          <textarea name="descLong" placeholder="Mô tả chi tiết" onChange={handleChange}></textarea>
          <select name="status" onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <input name="image" placeholder="Link hình ảnh" onChange={handleChange} />
          <div className={styles.actions}>
            <button type="submit">Lưu</button>
            <button type="button" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddRoom;
