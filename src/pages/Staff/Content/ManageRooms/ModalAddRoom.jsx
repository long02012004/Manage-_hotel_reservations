import { useState } from "react";
import { createRoom } from "../../../../services/AppService";
import styles from "./ManageRooms.module.scss";
import { toast } from "react-toastify";

const ModalAddRoom = ({ onClose, onSave }) => {
  const [room, setRoom] = useState({
    name: "",
    address: "",
    description: "",
    title: "",
    guests: "",
    size: "",
    beds: "",
    view: "",
    price: "",
    oldPrice: "",
    discount: "",
    airConditioning: false,
    wifi: false,
    hairDryer: false,
    petsAllowed: false,
    nonSmoking: false,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom({
      ...room,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setRoom({ ...room, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", room.name);
    formData.append("address", room.address);
    formData.append("description", room.description);
    formData.append("title", room.title);
    formData.append("guests", room.guests);
    formData.append("size", room.size);
    formData.append("beds", room.beds);
    formData.append("view", room.view);
    formData.append("price", room.price);
    formData.append("oldPrice", room.oldPrice);
    formData.append("discount", room.discount);

    // boolean fields => convert true/false thành string
    formData.append("airConditioning", room.airConditioning ? "true" : "false");
    formData.append("wifi", room.wifi ? "true" : "false");
    formData.append("hairDryer", room.hairDryer ? "true" : "false");
    formData.append("petsAllowed", room.petsAllowed ? "true" : "false");
    formData.append("nonSmoking", room.nonSmoking ? "true" : "false");

    if (room.file) {
      formData.append("files", room.file);
    }

    try {
      const res = await createRoom(formData);
      toast.success(" Thêm phòng thành công!");
      if (onSave) onSave(res.data.roomDTO);
      onClose();
    } catch (err) {
      console.error(" Lỗi khi thêm phòng:", err.response?.data || err);
      toast.error(" Thêm phòng thất bại!");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Thêm Phòng</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="name"
            placeholder="Tên phòng"
            onChange={handleChange}
            required
          />
          <input name="title" placeholder="Tiêu đề" onChange={handleChange} />
          <input name="address" placeholder="Địa chỉ" onChange={handleChange} />
          <textarea
            name="description"
            placeholder="Mô tả"
            onChange={handleChange}
          ></textarea>
          <input
            type="number"
            name="guests"
            placeholder="Sức chứa"
            onChange={handleChange}
          />
          <input
            type="number"
            name="size"
            placeholder="Diện tích (m²)"
            onChange={handleChange}
          />
          <input
            name="beds"
            placeholder="Loại giường"
            onChange={handleChange}
          />
          <input name="view" placeholder="View" onChange={handleChange} />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="oldPrice"
            placeholder="Giá cũ"
            onChange={handleChange}
          />
          <input
            type="number"
            name="discount"
            placeholder="Giảm giá (%)"
            onChange={handleChange}
          />

          {/* Checkbox boolean */}
          <label>
            <input
              type="checkbox"
              name="airConditioning"
              checked={room.airConditioning}
              onChange={handleChange}
            />
            Điều hòa
          </label>
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={room.wifi}
              onChange={handleChange}
            />
            Wifi
          </label>
          <label>
            <input
              type="checkbox"
              name="hairDryer"
              checked={room.hairDryer}
              onChange={handleChange}
            />
            Máy sấy tóc
          </label>
          <label>
            <input
              type="checkbox"
              name="petsAllowed"
              checked={room.petsAllowed}
              onChange={handleChange}
            />
            Thú cưng
          </label>
          <label>
            <input
              type="checkbox"
              name="nonSmoking"
              checked={room.nonSmoking}
              onChange={handleChange}
            />
            Không hút thuốc
          </label>

          <input
            type="file"
            name="files"
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className={styles.actions}>
            <button type="submit">Lưu</button>
            <button type="button" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddRoom;
