import React from "react";
import styles from "./RoomSelection.module.scss";
import { FaCheck } from "react-icons/fa";
import RoomCard from "./RoomCard";
/* import {
  hotel1,
  hotel2,
  hotel3,
  hotel4,
  hotel5,
  hotel6,
  hotel7,
  hotel8,
  hotel9,
} from "../../../assets/images/img"; */

const RoomSelection = ({ roomsData }) => {
  /*   const roomsData = [
    {
      id: 1,
      image: hotel1,
      title: "Deluxe Ocean View",
      guests: 2,
      size: 35,
      beds: ["1 Giường King size"],
      view: "Quang cảnh biển",
      address: "36 Vo Nguyen Giap, Son Tra, Da Nang",
      desc: "Phòng hiện đại với view biển tuyệt đẹp, thích hợp cho kỳ nghỉ lãng mạn.",
      price: "2.000.000",
      oldPrice: "2.500.000",
      discount: 20,
      booking: {
        nights: 2,
        checkIn: "1 tháng 9",
        checkOut: "3 tháng 9",
        checkInDetail: "Thứ Hai từ 14:00",
        checkOutDetail: "Thứ Tư đến 12:00",
      },
    },
    {
      id: 2,
      image: hotel2,
      title: "Superior Garden Room",
      guests: 3,
      size: 40,
      beds: ["1 Giường Queen size", "1 Giường đơn"],
      view: "Quang cảnh vườn",
      address: "12 Le Loi, Hai Chau, Da Nang",
      desc: "Không gian yên tĩnh, thiết kế ấm cúng, nhìn ra khu vườn xanh mát.",
      price: "1.800.000",
      oldPrice: "2.200.000",
      discount: 18,
      booking: {
        nights: 3,
        checkIn: "5 tháng 9",
        checkOut: "8 tháng 9",
        checkInDetail: "Thứ Năm từ 14:00",
        checkOutDetail: "Chủ Nhật đến 12:00",
      },
    },
    {
      id: 3,
      image: hotel3,
      title: "Premium Suite City View",
      guests: 2,
      size: 55,
      beds: ["1 Giường King size"],
      view: "Quang cảnh thành phố",
      address: "88 Bach Dang, Hai Chau, Da Nang",
      desc: "Suite cao cấp với phòng khách riêng, nhìn toàn cảnh thành phố về đêm.",
      price: "3.500.000",
      oldPrice: "4.200.000",
      discount: 17,
      booking: {
        nights: 2,
        checkIn: "7 tháng 9",
        checkOut: "9 tháng 9",
        checkInDetail: "Thứ Bảy từ 14:00",
        checkOutDetail: "Thứ Hai đến 12:00",
      },
    },
    {
      id: 4,
      image: hotel4,
      title: "Wink Luxe Family Room",
      guests: 5,
      size: 50,
      beds: ["2 Giường Queen size", "1 Giường tầng"],
      view: "Quang cảnh núi và thành phố",
      address: "550000, Da Nang, Hoa Vang, 88 Nguyen Tat Thanh",
      desc: "Large family room designed for big families, with modern facilities and a big balcony view to the mountains.",
      price: "3.200.000",
      oldPrice: "3.800.000",
      discount: 15,
      booking: {
        nights: 4,
        checkIn: "10 tháng 9",
        checkOut: "14 tháng 9",
        checkInDetail: "Thứ Ba từ 14:00",
        checkOutDetail: "Thứ Bảy đến 12:00",
      },
    },
    {
      id: 5,
      image: hotel5,
      title: "Standard Twin Room",
      guests: 2,
      size: 28,
      beds: ["2 Giường đơn"],
      view: "Một phần quang cảnh biển",
      address: "15 Tran Phu, Hai Chau, Da Nang",
      desc: "Phòng nhỏ gọn, giá tốt, phù hợp với cặp đôi hoặc bạn bè đi du lịch.",
      price: "1.200.000",
      oldPrice: "1.500.000",
      discount: 20,
      booking: {
        nights: 1,
        checkIn: "12 tháng 9",
        checkOut: "13 tháng 9",
        checkInDetail: "Thứ Năm từ 14:00",
        checkOutDetail: "Thứ Sáu đến 12:00",
      },
    },
    {
      id: 6,
      image: hotel6,
      title: "Executive Suite Oceanfront",
      guests: 3,
      size: 70,
      beds: ["1 Giường King size", "1 Sofa bed"],
      view: "Hướng biển trực diện",
      address: "123 Pham Van Dong, Son Tra, Da Nang",
      desc: "Suite sang trọng với ban công lớn, tầm nhìn trực diện ra biển Đông.",
      price: "4.500.000",
      oldPrice: "5.200.000",
      discount: 14,
      booking: {
        nights: 5,
        checkIn: "15 tháng 9",
        checkOut: "20 tháng 9",
        checkInDetail: "Chủ Nhật từ 14:00",
        checkOutDetail: "Thứ Sáu đến 12:00",
      },
    },
    {
      id: 7,
      image: hotel7,
      title: "Penthouse Luxury Villa",
      guests: 6,
      size: 120,
      beds: ["3 Giường King size"],
      view: "Biển và hồ bơi riêng",
      address: "Villa Zone, Son Tra, Da Nang",
      desc: "Biệt thự cao cấp với hồ bơi riêng, nội thất hiện đại và sang trọng.",
      price: "12.000.000",
      oldPrice: "14.000.000",
      discount: 12,
      booking: {
        nights: 2,
        checkIn: "18 tháng 9",
        checkOut: "20 tháng 9",
        checkInDetail: "Thứ Tư từ 14:00",
        checkOutDetail: "Thứ Sáu đến 12:00",
      },
    },
    {
      id: 8,
      image: hotel8,
      title: "Studio Apartment",
      guests: 2,
      size: 45,
      beds: ["1 Giường Queen size"],
      view: "Một phần thành phố",
      address: "21 Hoang Sa, Son Tra, Da Nang",
      desc: "Căn hộ studio tiện nghi với bếp nhỏ và ban công view thành phố.",
      price: "1.900.000",
      oldPrice: "2.300.000",
      discount: 17,
      booking: {
        nights: 6,
        checkIn: "20 tháng 9",
        checkOut: "26 tháng 9",
        checkInDetail: "Thứ Sáu từ 14:00",
        checkOutDetail: "Thứ Năm đến 12:00",
      },
    },
    {
      id: 9,
      image: hotel9,
      title: "Junior Suite Garden View",
      guests: 2,
      size: 48,
      beds: ["1 Giường King size"],
      view: "Quang cảnh vườn",
      address: "5 Nguyen Van Linh, Hai Chau, Da Nang",
      desc: "Junior Suite rộng rãi với phong cách sang trọng, thích hợp cho các cặp đôi.",
      price: "2.800.000",
      oldPrice: "3.300.000",
      discount: 15,
      booking: {
        nights: 3,
        checkIn: "23 tháng 9",
        checkOut: "26 tháng 9",
        checkInDetail: "Thứ Hai từ 14:00",
        checkOutDetail: "Thứ Năm đến 12:00",
      },
    },
  ]; */

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
