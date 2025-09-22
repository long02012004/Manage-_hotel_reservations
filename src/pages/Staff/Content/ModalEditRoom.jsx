import { useState } from "react";
import styles from "./ManageRooms.module.scss";

const ModalEditRoom = ({ room, onClose, onSave }) => {
  const [edited, setEdited] = useState({ ...room });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(edited);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Sửa Phòng</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="title" defaultValue={edited.title} onChange={handleChange} />
          <input name="type" defaultValue={edited.type} onChange={handleChange} />
          <input name="price" type="number" defaultValue={edited.price} onChange={handleChange} />
          <input name="area" defaultValue={edited.area} onChange={handleChange} />
          <input name="guests" type="number" defaultValue={edited.guests} onChange={handleChange} />
          <input name="beds" defaultValue={edited.beds} onChange={handleChange} />
          <textarea name="amenities" defaultValue={edited.amenities} onChange={handleChange}></textarea>
          <textarea name="descShort" defaultValue={edited.descShort} onChange={handleChange}></textarea>
          <textarea name="descLong" defaultValue={edited.descLong} onChange={handleChange}></textarea>
          <select name="status" defaultValue={edited.status} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <input name="image" defaultValue={edited.image} onChange={handleChange} />
          <div className={styles.actions}>
            <button type="submit">Cập nhật</button>
            <button type="button" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditRoom;
