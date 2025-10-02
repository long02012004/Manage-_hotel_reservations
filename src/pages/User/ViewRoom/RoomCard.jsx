import styles from "./RoomSelection.module.scss";
import {
  FaUsers,
  FaRulerCombined,
  FaBed,
  FaCity,
  FaSmokingBan,
  FaWind,
  FaDog,
} from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { CiWifiOn, CiGift } from "react-icons/ci";
import { MdFoodBank, MdOutlineCancel, MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalBooking from "./ModalBooking";
import { useState } from "react";

const RoomCard = ({
  id,
  image,
  title,
  guests,
  size,
  beds = [],
  view,
  address,
  desc,
  price,
  oldPrice,
  discount,
  amenities = {},
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles["room-card"]}>
      <div className={styles["room-image"]}>
        {/* Truyền image & title sang trang chi tiết */}
        <Link to={`/viewroom/${id}`} state={{ image, title }}>
          <img
            src={image}
            alt={title}
            onError={() => console.warn("Ảnh lỗi:", image)}
          />
        </Link>
      </div>

      <div className={styles["room-info"]}>
        <h3>
          <Link to={`/viewroom/${id}`} state={{ image, title }}>
            {title}
          </Link>
        </h3>
        <div className={styles["sub-info"]}>
          <div>
            <FaUsers /> tối đa {guests} khách
          </div>
          <div>
            <FaRulerCombined /> {size} m²
          </div>
        </div>

        <div className={styles["features"]}>
          {beds.map((bed, i) => (
            <span key={i}>
              <FaBed /> {bed}
            </span>
          ))}
          {view && (
            <span>
              <FaCity /> {view}
            </span>
          )}
          {amenities.nonSmoking && (
            <span>
              <FaSmokingBan /> Không hút thuốc
            </span>
          )}
          {amenities.hairDryer && (
            <span>
              <FaWind /> Máy sấy tóc
            </span>
          )}
          {amenities.airConditioning && (
            <span>
              <TbAirConditioning /> Máy lạnh
            </span>
          )}
          {amenities.wifi && (
            <span>
              <CiWifiOn /> Wifi miễn phí
            </span>
          )}
          {amenities.petsAllowed && (
            <span>
              <FaDog /> Thú cưng
            </span>
          )}
        </div>

        <p className={styles["address"]}>{address}</p>
        <p className={styles["desc"]}>{desc}</p>

        <div className={styles["room-package"]}>
          <h4>Room and Breakfast</h4>
          <ul>
            <li>
              <MdFoodBank /> Bao gồm ăn sáng
            </li>
            <li>
              <MdOutlineCancel /> Chính sách huỷ
            </li>
            <li>
              <MdPayment /> Thanh toán: Thẻ ngân hàng
            </li>
            <li>
              <CiGift /> Ưu đãi 24/7
            </li>
          </ul>

          <div className={styles["price-box"]}>
            <div className={styles["top-row"]}>
              {oldPrice && (
                <span className={styles["old-price"]}>
                  {Number(oldPrice).toLocaleString("vi-VN")}₫
                </span>
              )}
              {discount && (
                <span className={styles["discount"]}>-{discount}%</span>
              )}
            </div>

            <span className={styles["final-price"]}>
              {Number(price).toLocaleString("vi-VN")}₫
            </span>

            <button
              className={styles["choose-btn"]}
              onClick={() => setShowModal(true)}
            >
              Đặt ngay
            </button>
            <ModalBooking
              show={showModal}
              onClose={() => setShowModal(false)}
              room={{ id, image, title, price, oldPrice, discount }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
