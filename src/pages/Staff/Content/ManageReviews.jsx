import { useState } from "react";
import { FaStar, FaReply } from "react-icons/fa";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: "Nguyen Van A",
      rating: 4,
      comment: "Phòng sạch sẽ, view đẹp.",
      reply: "",
      date: "2025-09-20",
    },
    {
      id: 2,
      customerName: "Tran Thi B",
      rating: 5,
      comment: "Dịch vụ rất tốt, nhân viên thân thiện.",
      reply: "Cảm ơn chị đã tin tưởng!",
      date: "2025-09-21",
    },
  ]);

  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState("");

  const openReplyModal = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply || "");
  };

  const saveReply = () => {
    setReviews(
      reviews.map((r) =>
        r.id === selectedReview.id ? { ...r, reply: replyText } : r
      )
    );
    setSelectedReview(null);
    setReplyText("");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        📊 Quản lý đánh giá khách hàng
      </h2>

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
              <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">
                  {r.customerName}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      r.rating >= 4
                        ? "bg-green-100 text-green-700"
                        : r.rating === 3
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`inline mr-1 ${
                          i < r.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                    {r.rating}/5
                  </span>
                </td>
                <td className="p-4 text-gray-600 italic">{r.comment}</td>
                <td className="p-4">
                  {r.reply ? (
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
                <td className="p-4 text-center">
                  <button
                    onClick={() => openReplyModal(r)}
                    className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg shadow"
                  >
                    <FaReply /> Trả lời
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedReview && (
        <div className=" w-full fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Trả lời đánh giá
            </h3>
            <p className="mb-2">
              <b>{selectedReview.customerName}</b> –{" "}
              <span className="text-yellow-600">{selectedReview.rating} ★</span>
            </p>
            <p className="text-gray-600 italic mb-4">
              “{selectedReview.comment}”
            </p>
            <textarea
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              rows="4"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Nhập phản hồi..."
            />
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-black rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={saveReply}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-black rounded-lg"
              >
                Lưu phản hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
