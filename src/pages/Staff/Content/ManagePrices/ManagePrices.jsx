import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllPrices } from "../../../../services/AppService";
import styles from "./ManagePrices.module.scss";

// Chuyển tiền sang định dạng VND
const money = (n) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));

const StatusBadge = ({ status }) => {
  const map = {
    active: "bg-green-500/10 text-green-700 ring-green-500/30",
    scheduled: "bg-amber-500/10 text-amber-700 ring-amber-500/30",
    expired: "bg-gray-500/10 text-gray-600 ring-gray-500/30",
  };
  const text = {
    active: "Đang chạy",
    scheduled: "Đã lên lịch",
    expired: "Hết hạn",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ring-1 ${map[status]}`}
    >
      {text[status]}
    </span>
  );
};

const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 rounded-full transition-colors ${
      checked ? "bg-indigo-600" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
        checked ? "left-6" : "left-0.5"
      }`}
    />
  </button>
);

const ManagePrices = () => {
  const [plans, setPlans] = useState([]);
  const [qPrice, setQPrice] = useState("");

  // Gọi API khi mount
  useEffect(() => {
    getAllPrices({ page: 0, limit: 50 })
      .then((res) => {
        // Giả sử API trả về data theo mảng
        setPlans(res.data || []);
        toast.success("Lấy bảng giá thành công!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Lấy bảng giá thất bại!");
      });
  }, []);

  // Filter theo search
  const priceView = useMemo(() => {
    const q = qPrice.trim().toLowerCase();
    return plans.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        (p.typeName || "").toLowerCase().includes(q)
    );
  }, [plans, qPrice]);

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">
        ⚙️ Quản lý giá & khuyến mãi
      </h1>

      <input
        className="w-full max-w-sm rounded-lg border px-3 py-2 shadow-sm focus:ring-indigo-300 mb-3"
        placeholder="🔍 Tìm hạng phòng…"
        value={qPrice}
        onChange={(e) => setQPrice(e.target.value)}
      />

      <div className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 mt-3">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Hạng phòng</th>
              <th className="px-4 py-3">Giá hiện tại</th>
              <th className="px-4 py-3">Giá cũ</th>
              <th className="px-4 py-3">Giảm (%)</th>
              <th className="px-4 py-3 text-right">Hiển thị</th>
            </tr>
          </thead>
          <tbody>
            {priceView.map((p) => (
              <tr key={p.roomId} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">{p.name}</td>
                <td className="px-4 py-3">{money(p.price)}</td>
                <td className="px-4 py-3">{money(p.oldPrice)}</td>
                <td className="px-4 py-3">{p.discount || 0}%</td>
                <td className="px-4 py-3 text-right">
                  <Switch checked={true} onChange={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePrices;
