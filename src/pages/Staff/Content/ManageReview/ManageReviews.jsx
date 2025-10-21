import { useEffect, useState } from "react";
import {
  FaStar,
  FaEye,
  FaReply,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { GrHide } from "react-icons/gr";
import ModalReply from "./ModalReply";
import { getAllReviews } from "../../../../services/AppService";
import styles from "./ManageReviews.module.scss";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // số review / trang

  // Mở modal phản hồi
  const openReplyModal = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply || "");
  };

  // Lưu phản hồi
  const saveReply = () => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id ? { ...r, reply: replyText } : r
      )
    );
    setSelectedReview(null);
    setReplyText("");
    alert("lưu thành công");
  };

  // Ẩn/hiện đánh giá
  const toggleVisibility = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, hidden: !r.hidden } : r))
    );
  };

  // Fetch review từ BE khi mount hoặc đổi trang
  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const fetchReviews = async (page) => {
    try {
      const res = await getAllReviews({ page, limit });
      const mapped = res.data.content.map((r, idx) => ({
        id: r.id || idx + 1,
        customerName: r.name,
        rating: r.rating,
        comment: r.comment,
        reply: r.content,
        date: new Date(r.createdAt).toLocaleDateString("vi-VN"),
        hidden: false,
      }));
      setReviews(mapped);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Lỗi khi fetch review:", err);
    }
  };

  // Đổi trang
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        📊 Quản lý đánh giá khách hàng
      </h2>

      {/* Bảng review */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Đánh giá</th>
              <th className="p-4">Bình luận</th>
              <th className="p-4">Phản hồi</th>
              <th className="p-4">Ngày</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr
                key={r.id}
                className={`border-t transition ${
                  r.hidden ? "bg-gray-100 opacity-60" : "hover:bg-gray-50"
                }`}
              >
                <td className="p-4 font-medium text-gray-800">
                  {r.customerName}
                </td>

                <td className="p-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`inline mr-1 ${
                        i < r.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {r.rating}/5
                  </span>
                </td>

                <td className="p-4 text-gray-600 italic">{r.comment}</td>

                <td className="p-4">
                  {r.reply && r.reply !== "(Chưa phản hồi)" ? (
                    <span className="text-sm bg-blue-50 px-2 py-1 rounded-lg text-blue-600">
                      {r.reply}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 italic">
                      (Chưa phản hồi)
                    </span>
                  )}
                </td>

                <td className="p-4 text-gray-500">{r.date}</td>

                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => openReplyModal(r)}
                    className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow transition"
                  >
                    <FaReply size={18} />
                    Phản hồi
                  </button>

                  <button
                    onClick={() => toggleVisibility(r.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
                      r.hidden
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    {r.hidden ? <FaEye size={18} /> : <GrHide size={18} />}
                    {r.hidden ? "Hiện" : "Ẩn"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang căn giữa */}
      <div className={styles["pagination"]}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          <FaChevronLeft /> Trước
        </button>

        <span className="mx-4 text-gray-700 font-medium">
          Trang {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Sau <FaChevronRight />
        </button>
      </div>

      {/* Modal phản hồi */}
      <ModalReply
        review={selectedReview}
        replyText={replyText}
        setReplyText={setReplyText}
        onClose={() => setSelectedReview(null)}
        onSave={saveReply}
      />
    </div>
  );
};

export default ManageReviews;
