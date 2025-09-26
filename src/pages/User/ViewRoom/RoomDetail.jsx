import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getRoomById } from "../../../services/AppService";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import ModalBooking from "./ModalBooking";
import styles from "./RoomDetail.module.scss";

// Adapter BE -> FE (hỗ trợ roomId/name, beds là chuỗi, thiếu image)
const toDetail = (d, fallbackImage) =>
  d && {
    id: d.id ?? d.roomId,
    title: d.title ?? d.name,
    image: resolveImageUrl(d.image) || fallbackImage || "",
    address: d.address,
    description: d.description,
    guests: d.guests,
    size: d.size,
    beds: Array.isArray(d.beds)
      ? d.beds
      : d.beds
      ? String(d.beds).split(/\s*,\s*/)
      : [],
    view: d.view,
    price: d.price,
    oldPrice: d.oldPrice,
    discount: d.discount,
    amenities: {
      nonSmoking: !!d.nonSmoking,
      hairDryer: !!d.hairDryer,
      airConditioning: !!d.airConditioning,
      wifi: !!d.wifi,
      petsAllowed: !!d.petsAllowed,
    },
  };

const RoomDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const imageFromList = location.state?.image || ""; // fallback ảnh từ list
  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRoomById(id)
      .then((res) => {
        // API detail của bạn trả object phẳng: { roomId, name, ... }
        const raw = res.data ?? null;
        setRoom(toDetail(raw, imageFromList));
      })
      .catch((err) => {
        console.error("Lỗi API:", err?.response?.status, err?.response?.data);
        setRoom(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const bedText = useMemo(
    () => (room?.beds?.length ? room.beds.join(", ") : "—"),
    [room]
  );

  if (loading) return <p>Đang tải chi tiết phòng...</p>;
  if (!room) return <p>Không tìm thấy phòng.</p>;

  return (
    <div className={styles.roomDetail}>
      <h1 className={styles.title}>{room.title}</h1>
      <p className={styles.address}>📍 {room.address}</p>
      <p className={styles.desc}>{room.description}</p>

      {room.image && (
        <img
          className={styles.image}
          src={room.image}
          alt={room.title}
          onError={(e) => {
            console.error("Ảnh lỗi:", room.image);
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className={styles.meta}>
        <p>
          <b>Khách tối đa:</b> {room.guests}
        </p>
        <p>
          <b>Diện tích:</b> {room.size} m²
        </p>
        <p>
          <b>Giường:</b> {bedText}
        </p>
        {room.view && (
          <p>
            <b>View:</b> {room.view}
          </p>
        )}
      </div>

      <p className={styles.priceLine}>
        <b>Giá:</b> {room.price}₫{" "}
        {room.oldPrice && (
          <span className={styles.oldPrice}>{room.oldPrice}₫</span>
        )}
        {room.discount && (
          <span className={styles.discount}> -{room.discount}%</span>
        )}
      </p>

      <button className={styles.bookBtn} onClick={() => setShowModal(true)}>
        Đặt ngay
      </button>

      <ModalBooking
        show={showModal}
        onClose={() => setShowModal(false)}
        room={room}
      />
    </div>
  );
};

export default RoomDetail;
