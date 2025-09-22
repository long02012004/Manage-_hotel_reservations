import React from "react";
import styles from "./RoomSelection.module.scss";
import { FaCheck } from "react-icons/fa";
import RoomCard from "./RoomCard";


const RoomSelection = ({ roomsData }) => {

  return (
    /*     <div className={styles["room-wrapper"]}>
      <h2 className={styles["section-title"]}>Chọn phòng</h2>

      <div className={styles["promo-banner"]}>
        <div className={styles["promo-left"]}>
          <h3>ĐẶT PHÒNG Ở GIÁ TỐT NHẤT!</h3>
          <ul>
            <li>Giảm thêm 10% cho khách hàng đăng ký thành viên</li>
            <li>Đảm bảo giá tốt nhất</li>
            <li>Ở trọn 24 giờ</li>
          </ul>
        </div>
      </div>

      <div className={styles["filter-bar"]}>
        <button>
          <p>Tùy chọn giường</p> <FaCheck />
        </button>
        <button>
          <p>Hướng cửa sổ</p> <FaCheck />
        </button>
      </div>

      <div className={styles["room-list"]}>
        {roomsData.map((room, i) => (
          <RoomCard key={i} {...room} />
        ))}
      </div>
    </div> */
    <div className={styles["room-wrapper"]}>
      <h2 className={styles["section-title"]}>Chọn phòng</h2>

      <div className={styles["room-list"]}>
        {roomsData.length > 0 ? (
          roomsData.map((room) => <RoomCard key={room.id} {...room} />)
        ) : (
          <p>Không có phòng nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default RoomSelection;
