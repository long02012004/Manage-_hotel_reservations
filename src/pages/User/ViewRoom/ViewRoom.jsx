import { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import { getRooms } from "../../../services/AppService";
import RoomHeader from "./RoomHeader";
import RoomSelection from "./RoomSelection";
import { toRoomCardProps } from "./toRoomCardProps";
import styles from "./ViewRoom.module.scss";

const ViewRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms({ page: 0, limit: 10 })
      .then((res) => {
        // BE có thể trả về {content: [...]}, hoặc mảng thẳng
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.content || [];

        // Chuẩn hóa từng phòng trước khi render
        setRooms(data.map(toRoomCardProps));
      })
      .catch((err) => console.error("Lỗi API:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải danh sách phòng...</p>;

  return (
    <>
      <div className={styles["view-room"]}>
        <RoomHeader setRooms={(list) => setRooms(list.map(toRoomCardProps))} />
        <RoomSelection roomsData={rooms} />
      </div>
      <Footer />
    </>
  );
};

export default ViewRoom;
