import RoomHeader from "./RoomHeader";
import styles from "./ViewRoom.module.scss";
import { useEffect, useState } from "react";
import RoomSelection from "./RoomSelection";
import Footer from "../../../components/Footer/Footer";
import { getRooms } from "../../../services/AppService"; // thêm API

const ViewRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải danh sách phòng...</p>;

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