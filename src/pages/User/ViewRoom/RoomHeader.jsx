import React from "react";
import styles from "./RoomHeader.module.scss";
/* import { postSearchRooms } from "../../../services/AppService";

 */ import { toast } from "react-toastify";
import { mockRooms } from "../../../services/mockRooms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

const RoomHeader = ({ setRooms }) => {
  const [date, setDate] = useState(new Date());
  const [guests, setGuests] = useState("1");
  const [priceRange, setPriceRange] = useState("0-500000");
  /*   const handleSearch = async () => {
    const requestData = {
      checkIn: date.toISOString().split("T")[0], // "yyyy-mm-dd"
      guests,
      priceRange,
    };

    try {
      const res = await postSearchRooms(requestData);// này là gọi api  
      toast.success("Tìm kiếm thành công!");
      console.log("Kết quả từ BE:", res.data);

      // truyền dữ liệu xuống RoomSelection
      if (res.data && res.data.rooms) {
        setRooms(res.data.rooms);
      } else {
        setRooms([]);
      }
    } catch (err) {
      toast.error("Lỗi khi tìm kiếm phòng");
      console.error("API error:", err);
      setRooms([]);
    }
  }; */
  const handleSearch = async () => {
    try {
      // Dùng mock data thay vì gọi BE
      let filtered = mockRooms;

      // Lọc theo guests
      filtered = filtered.filter((r) => r.guests >= Number(guests));

      // Lọc theo priceRange
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((r) => {
        const p = Number(r.price.replace(/\./g, ""));
        if (max) return p >= min && p <= max;
        return p >= min;
      });

      setRooms(filtered);
      toast.success("Tìm kiếm thành công (mock)!");
    } catch {
      toast.error("Lỗi khi tìm kiếm phòng");
      setRooms([]);
    }
  };
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["hotel-info"]}>
        <button className={styles["hotel-btn"]}>
          Furama Hotel Danang Centre
        </button>
        <div className={styles["address"]}>
          <p>178 Tran Phu, Phuoc Ninh Ward, Hai Chau District, Da Nang City</p>
          <p>
            Email: <a>book.danangcentre@wink-hotels.com</a>
          </p>
          <p>Reservation Number: 028 2250 8531</p>
        </div>
      </div>

      <div className={styles["booking-box"]}>
        <div className={styles["input-box"]}>
          <label htmlFor="checkin">Check-in</label>
          <div className={styles["input-wrapper"]}>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="dd/MM/yyyy"
              className={styles["date-picker"]}
              id="checkin"
            />
            <span className={styles["calendar-icon"]}>📅</span>
          </div>
        </div>
        {/*tìm theo số lượng người */}
        <div className={styles["input-box"]}>
          <label htmlFor="guests">Số lượng người</label>
          <select
            id="guests"
            className={styles["select-box"]}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="1">Trống</option>
            <option value="2">1 người</option>
            <option value="3">2 người</option>
            <option value="4">3 người</option>
            <option value="5">4 người</option>
            <option value="6">5 người</option>
          </select>
        </div>

        {/* Tìm theo giá */}
        <div className={styles["input-box"]}>
          <label htmlFor="price">Tìm kiếm theo giá</label>
          <select
            id="price"
            className={styles["select-box"]}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="0-500000">Dưới 500.000 VND</option>
            <option value="500000-1000000">500.000 - 1.000.000 VND</option>
            <option value="1000000-2000000">1.000.000 - 2.000.000 VND</option>
            <option value="2000000">Trên 2.000.000 VND</option>
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
