import React, { useState } from "react";
import styles from "./RoomHeader.module.scss";
import { getSearchRooms } from "../../../services/AppService";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomHeader = ({ setRooms }) => {
  const [date, setDate] = useState(new Date());
  const [guests, setGuests] = useState("1");
  const [priceRange, setPriceRange] = useState("0-500000");

  const handleSearch = async () => {
    try {
      const [min, max] = priceRange.split("-").map(Number);

      const params = {
        page: 0,
        limit: 10,
        guests: Number(guests),
        minPrice: min,
        maxPrice: max || null,
      };

      const res = await getSearchRooms(params);

      if (res?.data && Array.isArray(res.data)) {
        setRooms(res.data);
        toast.success("Tìm kiếm thành công!");
      } else {
        setRooms([]);
        toast.error("Không tìm thấy phòng nào phù hợp!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm phòng:", error);
      toast.error("Đã xảy ra lỗi khi tìm kiếm phòng!");
    }
  };

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["hotel-info"]}>
        <button className={styles["hotel-btn"]}>
          Furama Hotel Danang Centre
        </button>
        <div className={styles["address"]}>
          <p>178 Trần Phú, Hải Châu, Đà Nẵng</p>
          <p>
            Email: <a>book.danangcentre@wink-hotels.com</a>
          </p>
          <p>Reservation Number: 028 2250 8531</p>
        </div>
      </div>

      <div className={styles["booking-box"]}>
        {/* Ngày */}
        <div className={styles["input-box"]}>
          <label htmlFor="checkin">Check-in</label>
          <div className={styles["input-wrapper"]}>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="dd/MM/yyyy"
              className={styles["date-picker"]}
            />
            <span className={styles["calendar-icon"]}>📅</span>
          </div>
        </div>

        {/* Số lượng người */}
        <div className={styles["input-box"]}>
          <label>Số lượng người</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={styles["select-box"]}
          >
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4">4 người</option>
          </select>
        </div>

        {/* Giá */}
        <div className={styles["input-box"]}>
          <label>Tìm kiếm theo giá</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={styles["select-box"]}
          >
            <option value="0-500000">Dưới 500.000 VND</option>
            <option value="500000-1000000">500.000 - 1.000.000 VND</option>
            <option value="1000000-2000000">1.000.000 - 2.000.000 VND</option>
            <option value="2000000-3500000">2.000.000 - 3.500.000 VND</option>
            <option value="3500000">Trên 3.500.000 VND</option>
          </select>
        </div>

        <button className={styles["search-btn"]} onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default RoomHeader;
