import RoomHeader from "./RoomHeader";
import { mockRooms } from "../../../services/mockRooms";

import styles from "./ViewRoom.module.scss";
import { useState } from "react";
import RoomSelection from "./RoomSelection";
import Footer from "../../../components/Footer/Footer";
const ViewRoom = () => {
  const [rooms, setRooms] = useState(mockRooms); // dữ liệu phòng từ BE

  return (
    <>
      <div className={styles["view-room"]}>
        <RoomHeader setRooms={setRooms} />
        <RoomSelection roomsData={rooms} />
      </div>
      <Footer />
    </>
  );
};

export default ViewRoom;
// // src/pages/ViewRoom/ViewRoom.jsx
