import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getRoomById } from "../../../services/AppService";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import ModalBooking from "./ModalBooking";
import styles from "./RoomDetail.module.scss";
import {
  FaMapMarkerAlt, FaUsers, FaRulerCombined, FaBed, FaCity,
  FaWifi, FaSnowflake, FaDog, FaSmokingBan, FaWind, FaRegClock,
} from "react-icons/fa";

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
    rating: d.rating, // nếu BE có
    reviews: d.reviews, // nếu BE có
  };

const RoomDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const imageFromList = location.state?.image || ""; // fallback ảnh từ list
  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fmt = useMemo(
    () => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }),
    []
  );

  useEffect(() => {
    setLoading(true);
    getRoomById(id)
      .then((res) => setRoom(toDetail(res.data ?? null, imageFromList)))
      .catch((err) => {
        console.error("Lỗi API:", err?.response?.status, err?.response?.data);
        setRoom(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className={styles.roomDetail}>
        <div className={styles.breadcrumbSkeleton} />
        <div className={styles.titleSkeleton} />
        <div className={styles.imageSkeleton} />
        <div className={styles.metaSkeleton} />
      </div>
    );
  }

  if (!room) return <p>Không tìm thấy phòng.</p>;

  const bedText = room.beds?.length ? room.beds.join(", ") : "—";

  return (
    <div className={styles.roomDetail}>
      {/* Breadcrumb + tag nhỏ */}
     {/*  <nav className={styles.breadcrumb}>
        <Link to="/">Trang chủ</Link>
        <span>›</span>
        <Link to="/rooms">Phòng</Link>
        <span>›</span>
        <span className={styles.current}>{room.title}</span>
      </nav> */}

      <header className={styles.header}>
        <h1 className={styles.title}>{room.title}</h1>

        <div className={styles.tagRow}>
          {room.discount ? (
            <span className={styles.badgeDiscount}>Giảm {room.discount}%</span>
          ) : (
            <span className={styles.badgeSoft}>Ưu đãi</span>
          )}
          {room.amenities?.wifi && <span className={styles.pill}><FaWifi /> Wifi miễn phí</span>}
          {room.amenities?.airConditioning && <span className={styles.pill}><FaSnowflake /> Máy lạnh</span>}
          {room.amenities?.nonSmoking && <span className={styles.pill}><FaSmokingBan /> Không hút thuốc</span>}
          {room.amenities?.hairDryer && <span className={styles.pill}><FaWind /> Máy sấy tóc</span>}
          {room.amenities?.petsAllowed && <span className={styles.pill}><FaDog /> Thú cưng</span>}
        </div>

        <p className={styles.address}><FaMapMarkerAlt /> {room.address}</p>
        {room.description && <p className={styles.desc}>{room.description}</p>}
      </header>

      {/* Ảnh lớn */}
      {room.image && (
        <img
          className={styles.image}
          src={room.image}
          alt={room.title}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      {/* Meta – chuyển thành card nhỏ đẹp */}
      <div className={styles.meta}>
        <p><b><FaUsers /> Khách tối đa:</b> {room.guests}</p>
        <p><b><FaRulerCombined /> Diện tích:</b> {room.size} m²</p>
        <p><b><FaBed /> Giường:</b> {bedText}</p>
        {room.view && <p><b><FaCity /> View:</b> {room.view}</p>}
        {room.rating && (
          <p><b>Đánh giá:</b> {room.rating} ⭐ {room.reviews ? `(${room.reviews} lượt)` : ""}</p>
        )}
      </div>

      {/* Giá + CTA */}
      <div className={styles.priceLine}>
        <b>{fmt.format(room.price)}</b>
        {room.oldPrice && <span className={styles.oldPrice}>{fmt.format(room.oldPrice)}</span>}
        {room.discount && <span className={styles.discount}>-{room.discount}%</span>}
        <span className={styles.perNight}>/ đêm</span>
      </div>

      <div className={styles.ctaRow}>
        <button className={styles.bookBtn} onClick={() => setShowModal(true)}>
          Đặt ngay
        </button>
        <button className={styles.secondaryBtn}>
          <FaRegClock /> Giữ chỗ 15 phút
        </button>
      </div>

      <div className={styles.divider} />

      {/* Tiện nghi nổi bật (nhìn gọn gàng) */}
      <section className={styles.amenities}>
        <h3>Tiện nghi nổi bật</h3>
        <ul>
          {room.amenities?.wifi && <li><FaWifi /> Wifi miễn phí</li>}
          {room.amenities?.airConditioning && <li><FaSnowflake /> Máy lạnh</li>}
          {room.amenities?.nonSmoking && <li><FaSmokingBan /> Không hút thuốc</li>}
          {room.amenities?.hairDryer && <li><FaWind /> Máy sấy tóc</li>}
          {room.amenities?.petsAllowed && <li><FaDog /> Thú cưng được phép</li>}
        </ul>
      </section>

      <ModalBooking show={showModal} onClose={() => setShowModal(false)} room={room} />
    </div>
  );
};

export default RoomDetail;
