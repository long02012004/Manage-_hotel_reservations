import React, { useEffect, useState } from "react";
import styles from "./RoomReviews.module.scss";
import { getReviewsByRoomId, createReview } from "../../../services/AppService";
import { FaStar } from "react-icons/fa";

const RoomReviews = ({ room }) => {
  const [reviews, setReviews] = useState([]);

  // 1️⃣ Fetch reviews từ BE khi component mount
  useEffect(() => {
    if (!room?.id) return;

    const fetchReviews = async () => {
      try {
        const res = await getReviewsByRoomId(room.id);
        setReviews(res.data || []);
      } catch (err) {
        console.error("Lỗi fetch reviews:", err);
      }
    };

    fetchReviews();
  }, [room?.id]);

  // 2️⃣ Submit review mới
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room?.id) {
      alert("Không tìm thấy ID phòng!");
      return;
    }

    const newReview = {
      name: e.target.user.value,
      rating: parseInt(e.target.stars.value),
      comment: e.target.comment.value,
    };

    try {
      const res = await createReview(room.id, newReview); // POST /reviews/:roomId
      setReviews((prev) => [...prev, res.data]); // Cập nhật với dữ liệu từ BE
      alert(res.data.message || "Gửi đánh giá thành công!");
      e.target.reset();
    } catch (err) {
      console.error("Lỗi gửi review:", err);
      alert("Gửi đánh giá thất bại!");
    }
  };

  // 3️⃣ Tính rating trung bình
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className={styles.reviews}>
      <h3>Đánh giá khách hàng</h3>

      {/* Tổng rating */}
      <div className={styles.overallRating}>
        <div className={styles.totalRate}>
          <span className={styles.score}>{avgRating.toFixed(1)}</span>
          <span>/ 5</span>
          <div className={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                color={i < Math.round(avgRating) ? "#FFD700" : "#DDD"}
              />
            ))}
          </div>
        </div>
        <p>{reviews.length} lượt đánh giá</p>
      </div>

      {/* Danh sách bình luận */}
      <div className={styles.commentList}>
        {reviews.map((r, idx) => (
          <div key={idx} className={styles.comment}>
            <p className={styles.commentAuthor}>
              <b>{r.name}</b> –{" "}
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  color={i < r.rating ? "#FFD700" : "#DDD"}
                  size={14}
                />
              ))}
            </p>
            <p>{r.comment}</p>
            {r.createdAt && (
              <small>{new Date(r.createdAt).toLocaleDateString("vi-VN")}</small>
            )}
          </div>
        ))}
      </div>

      {/* Form thêm đánh giá */}
      <div className={styles.addReview}>
        <h4>Viết đánh giá của bạn</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" name="user" placeholder="Tên của bạn" required />
          <select name="stars" required>
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
  );
};

export default RoomReviews;
