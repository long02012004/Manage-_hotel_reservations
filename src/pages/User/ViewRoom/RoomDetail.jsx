import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockRooms } from "../../../services/mockRooms";
import styles from "./RoomDetail.module.scss";
import ModalBooking from "./ModalBooking";

const RoomDetail = () => {
  const { id } = useParams();
  const room = mockRooms.find((r) => r.id === parseInt(id));
  const [showModal, setShowModal] = useState(false);

  if (!room) {
    return <p>Không tìm thấy phòng!</p>;
  }

  return (
    <div className={styles.roomDetail}>
      {/* Tiêu đề & địa chỉ */}
      <h1 className={styles.title}>{room.title}</h1>
      <p className={styles.address}>
        📍 {room.address} – <span className={styles.link}>Xem bản đồ</span>
      </p>

      {/* Gallery */}
      <div className={styles.gallery}>
        <div className={styles.mainImg}>
          <img src={room.image} alt={room.title} />
        </div>
        <div className={styles.thumbs}>
          {room.gallery?.map((img, idx) => (
            <img key={`gallery-${idx}`} src={img} alt={`Gallery ${idx}`} />
          ))}
        </div>
      </div>

      {/* Mô tả dài */}
      <div className={styles.desc}>
        <p>{room.descLong}</p>
      </div>

      {/* Thông tin chính */}
      <div className={styles.info}>
        <h3 className={styles.infoTitle}>Thông tin phòng</h3>
        <p>
          <b>Giá:</b> {room.price}₫ / đêm
        </p>
        <p>
          <b>Số khách:</b> {room.guests}
        </p>
        <p>
          <b>Diện tích:</b> {room.size} m²
        </p>
        <p>
          <b>Giường:</b> {room.beds.join(", ")}
        </p>
        <p>
          <b>View:</b> {room.view}
        </p>
      </div>
      <div className={styles.reviews}>
        <h3>Đánh giá khách hàng</h3>

        {/* Tổng rating */}
        <div className={styles.overallRating}>
          <span className={styles.score}>
            {room.rating ? room.rating.toFixed(1) : "4.5"}
          </span>
          <span>/ 5</span>
          <div className={styles.stars}>
            {"★".repeat(Math.round(room.rating || 0))}
            {"☆".repeat(5 - Math.round(room.rating || 0))}
          </div>
          <p>{room.reviews?.length || 0} lượt đánh giá</p>
        </div>

        {/* Tỷ lệ sao */}
        <div className={styles.ratingBreakdown}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count =
              room.reviews?.filter((r) => r.stars === star).length || 0;
            const percent =
              room.reviews?.length > 0
                ? Math.round((count / room.reviews.length) * 100)
                : 0;
            return (
              <div key={`star-${star}`} className={styles.ratingRow}>
                <span>{star} ★</span>
                <div className={styles.progress}>
                  <div style={{ width: `${percent}%` }}></div>
                </div>
                <span>{percent}%</span>
              </div>
            );
          })}
        </div>

        {/* Comment list */}
        <div className={styles.commentList}>
          {room.reviews?.map((r, idx) => (
            <div key={`review-${idx}`} className={styles.comment}>
              <p className={styles.commentAuthor}>
                <b>{r.user}</b> – {r.stars}★
              </p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>

        {/* 👉 Form thêm đánh giá */}
        <div className={styles.addReview}>
          <h4>Viết đánh giá của bạn</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newReview = {
                user: e.target.user.value,
                stars: parseInt(e.target.stars.value),
                comment: e.target.comment.value,
              };
              room.reviews.push(newReview); // hoặc gọi API lưu DB
              e.target.reset();
              alert("Cảm ơn bạn đã gửi đánh giá!");
            }}
          >
            <input type="text" name="user" placeholder="Tên của bạn" required />
            <select name="stars">
              {[5, 4, 3, 2, 1].map((s) => (
                <option key={s} value={s}>
                  {s} ★
                </option>
              ))}
            </select>
            <textarea
              name="comment"
              placeholder="Nội dung đánh giá..."
              required
            />
            <button type="submit">Gửi đánh giá</button>
          </form>
        </div>
      </div>

      {/* Nút đặt ngay */}
      <div className={styles.bookingBtn}>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đặt ngay
        </button>
        <ModalBooking
          show={showModal}
          onClose={() => setShowModal(false)}
          room={room}
        />
      </div>
    </div>
  );
};

export default RoomDetail;
