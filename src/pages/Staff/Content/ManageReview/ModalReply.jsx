import React from "react";
import styles from "./ManageReviews.module.scss";

const ReplyModal = ({ review, replyText, setReplyText, onClose, onSave }) => {
  if (!review) return null; // không render nếu chưa chọn

  return (
    // overlay phủ toàn màn hình
    <div className={styles["modal-overlay"]}>
      {/* khung modal */}
      <div className={styles["modal"]}>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Trả lời đánh giá
        </h3>

        <p className="mb-2">
          <b>{review.customerName}</b> –{" "}
          <span className="text-yellow-600">{review.rating} ★</span>
        </p>

        <p className="text-gray-600 italic mb-4">“{review.comment}”</p>

        <textarea
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          rows="4"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Nhập phản hồi..."
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-black rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Lưu phản hồi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
