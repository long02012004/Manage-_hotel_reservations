import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomById } from "../../../services/AppService"; // thêm API
import styles from "./RoomDetail.module.scss";
import ModalBooking from "./ModalBooking";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRoomById(id)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error("Lỗi API:", err));
  }, [id]);

  if (!room) return <p>Đang tải chi tiết phòng...</p>;

  return (
    <div className={styles.roomDetail}>
      <h1 className={styles.title}>{room.title}</h1>
      <p className={styles.address}>📍 {room.address}</p>
      <img src={room.image} alt={room.title} />
      <p>{room.desc}</p>
      <p><b>Giá:</b> {room.price}₫</p>

      <button onClick={() => setShowModal(true)}>Đặt ngay</button>
      <ModalBooking
        show={showModal}
        onClose={() => setShowModal(false)}
        room={room}
      />
    </div>
  );
};

export default RoomDetail;