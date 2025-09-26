import styles from "./RoomSelection.module.scss";
import RoomCard from "./RoomCard";

const RoomSelection = ({ roomsData }) => {
  return (
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
