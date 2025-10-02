import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ManagePrices.module.scss";

/** --------- Mock data --------- */
const initPlans = [
  {
    id: "r1",
    roomType: "Deluxe City View",
    basePrice: 1200000,
    weekdayMul: 1,
    weekendMul: 1.2,
    peakMul: 1.35,
    note: "Bao gồm ăn sáng",
    active: true,
  },
  {
    id: "r2",
    roomType: "Suite Ocean View",
    basePrice: 2200000,
    weekdayMul: 1,
    weekendMul: 1.25,
    peakMul: 1.5,
    note: "Miễn phí minibar",
    active: true,
  },
  {
    id: "r3",
    roomType: "Superior",
    basePrice: 950000,
    weekdayMul: 1,
    weekendMul: 1.15,
    peakMul: 1.3,
    note: "Bao gồm đưa đón sân bay",
    active: false,
  },
  {
    id: "r4",
    roomType: "Deluxe City View",
    basePrice: 1200000,
    weekdayMul: 1,
    weekendMul: 1.2,
    peakMul: 1.35,
    note: "Bao gồm ăn sáng",
    active: true,
  },
  {
    id: "r5",
    roomType: "Suite Ocean View",
    basePrice: 2200000,
    weekdayMul: 1,
    weekendMul: 1.25,
    peakMul: 1.5,
    note: "Miễn phí minibar",
    active: true,
  },
  {
    id: "r6",
    roomType: "Superior",
    basePrice: 950000,
    weekdayMul: 1,
    weekendMul: 1.15,
    peakMul: 1.3,
    note: "Bao gồm đưa đón sân bay",
    active: false,
  },
  {
    id: "r7",
    roomType: "Deluxe City View",
    basePrice: 1200000,
    weekdayMul: 1,
    weekendMul: 1.2,
    peakMul: 1.35,
    note: "Bao gồm ăn sáng",
    active: true,
  },
  {
    id: "r8",
    roomType: "Suite Ocean View",
    basePrice: 2200000,
    weekdayMul: 1,
    weekendMul: 1.25,
    peakMul: 1.5,
    note: "Miễn phí minibar",
    active: true,
  },
  {
    id: "r9",
    roomType: "Superior",
    basePrice: 950000,
    weekdayMul: 1,
    weekendMul: 1.15,
    peakMul: 1.3,
    note: "Bao gồm đưa đón sân bay",
    active: false,
  },
];

const initPromos = [
  {
    id: "p1",
    name: "Summer Splash",
    code: "SUMMER15",
    type: "percent",
    value: 15,
    start: "2025-06-01",
    end: "2025-08-31",
    status: "active",
    applyTo: "Tất cả hạng phòng",
  },
  {
    id: "p2",
    name: "Weekend Deal",
    code: "WEEKEND200K",
    type: "amount",
    value: 200000,
    start: "2025-07-01",
    end: "2025-07-30",
    status: "scheduled",
    applyTo: "Deluxe, Suite",
  },
  {
    id: "p3",
    name: "Old Member",
    code: "MEMBER10",
    type: "percent",
    value: 10,
    start: "2024-01-01",
    end: "2024-12-31",
    status: "expired",
    applyTo: "Khách hàng cũ",
  },
  {
    id: "p1",
    name: "Summer Splash",
    code: "SUMMER15",
    type: "percent",
    value: 15,
    start: "2025-06-01",
    end: "2025-08-31",
    status: "active",
    applyTo: "Tất cả hạng phòng",
  },
  {
    id: "p2",
    name: "Weekend Deal",
    code: "WEEKEND200K",
    type: "amount",
    value: 200000,
    start: "2025-07-01",
    end: "2025-07-30",
    status: "scheduled",
    applyTo: "Deluxe, Suite",
  },
  {
    id: "p3",
    name: "Old Member",
    code: "MEMBER10",
    type: "percent",
    value: 10,
    start: "2024-01-01",
    end: "2024-12-31",
    status: "expired",
    applyTo: "Khách hàng cũ",
  },
  {
    id: "p1",
    name: "Summer Splash",
    code: "SUMMER15",
    type: "percent",
    value: 15,
    start: "2025-06-01",
    end: "2025-08-31",
    status: "active",
    applyTo: "Tất cả hạng phòng",
  },
  {
    id: "p2",
    name: "Weekend Deal",
    code: "WEEKEND200K",
    type: "amount",
    value: 200000,
    start: "2025-07-01",
    end: "2025-07-30",
    status: "scheduled",
    applyTo: "Deluxe, Suite",
  },
  {
    id: "p3",
    name: "Old Member",
    code: "MEMBER10",
    type: "percent",
    value: 10,
    start: "2024-01-01",
    end: "2024-12-31",
    status: "expired",
    applyTo: "Khách hàng cũ",
  },
];

/** --------- Helpers --------- */
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

/** --------- Modal --------- */
const Modal = ({ title, onClose, children, footer }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-lg ring-1 ring-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/** ==================== MAIN ==================== */
const ManagePrices = () => {
  const [tab, setTab] = useState("price");
  const [plans, setPlans] = useState(initPlans);
  const [promos, setPromos] = useState(initPromos);

  const [qPrice, setQPrice] = useState("");
  const [qPromo, setQPromo] = useState("");

  const emptyPlan = {
    id: "",
    roomType: "",
    basePrice: 0,
    weekdayMul: 1,
    weekendMul: 1.2,
    peakMul: 1.35,
    note: "",
    active: true,
  };
  const emptyPromo = {
    id: "",
    name: "",
    code: "",
    type: "percent",
    value: 10,
    start: "",
    end: "",
    status: "scheduled",
    applyTo: "",
  };

  const [openPlan, setOpenPlan] = useState(false);
  const [openPromo, setOpenPromo] = useState(false);
  const [planForm, setPlanForm] = useState(emptyPlan);
  const [promoForm, setPromoForm] = useState(emptyPromo);

  const isEditPlan = Boolean(planForm.id);
  const isEditPromo = Boolean(promoForm.id);

  /** filter view */
  const priceView = useMemo(() => {
    const q = qPrice.trim().toLowerCase();
    return plans.filter(
      (p) =>
        !q ||
        p.roomType.toLowerCase().includes(q) ||
        String(p.basePrice).includes(q) ||
        (p.note || "").toLowerCase().includes(q)
    );
  }, [plans, qPrice]);

  const promoView = useMemo(() => {
    const q = qPromo.trim().toLowerCase();
    return promos.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        (p.applyTo || "").toLowerCase().includes(q)
    );
  }, [promos, qPromo]);

  /** handlers */
  const savePlan = () => {
    setPlans((prev) => {
      if (planForm.id) {
        toast.success("Cập nhật bảng giá thành công!");
        return prev.map((x) => (x.id === planForm.id ? planForm : x));
      }
      toast.success("Thêm hạng phòng mới thành công!");
      return [
        { ...planForm, id: Math.random().toString(36).slice(2) },
        ...prev,
      ];
    });
    setOpenPlan(false);
  };

  const removePlan = (id) => {
    setPlans((prev) => prev.filter((x) => x.id !== id));
    toast.info("Đã xóa hạng phòng.");
  };

  const savePromo = () => {
    setPromos((prev) => {
      if (promoForm.id) {
        toast.success("Cập nhật khuyến mãi thành công!");
        return prev.map((x) => (x.id === promoForm.id ? promoForm : x));
      }
      toast.success("Thêm khuyến mãi mới thành công!");
      return [
        { ...promoForm, id: Math.random().toString(36).slice(2) },
        ...prev,
      ];
    });
    setOpenPromo(false);
  };

  const removePromo = (id) => {
    setPromos((prev) => prev.filter((x) => x.id !== id));
    toast.info("Đã xóa chương trình khuyến mãi.");
  };

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">
        ⚙️ Quản lý giá & khuyến mãi
      </h1>

      {/* Tabs */}
      <div className="flex w-fit overflow-hidden rounded-lg border text-sm font-medium">
        <button
          className={`px-4 py-2 ${
            tab === "price" ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setTab("price")}
        >
          Bảng giá
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "promo" ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setTab("promo")}
        >
          Khuyến mãi
        </button>
      </div>

      {/* --- PRICE TAB --- */}
      {tab === "price" && (
        <>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-800">Bảng giá</h2>
            <button
              onClick={() => {
                setPlanForm(emptyPlan);
                setOpenPlan(true);
              }}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700"
            >
              + Hạng phòng
            </button>
          </div>
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
                  <th className="px-4 py-3">Giá cơ bản</th>
                  <th className="px-4 py-3">Ngày thường</th>
                  <th className="px-4 py-3">Cuối tuần</th>
                  <th className="px-4 py-3">Cao điểm</th>
                  <th className="px-4 py-3">Ghi chú</th>
                  <th className="px-4 py-3">Hiển thị</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {priceView.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{p.roomType}</td>
                    <td className="px-4 py-3">{money(p.basePrice)}</td>
                    <td className="px-4 py-3">
                      {money(p.basePrice * p.weekdayMul)}
                    </td>
                    <td className="px-4 py-3">
                      {money(p.basePrice * p.weekendMul)}
                    </td>
                    <td className="px-4 py-3">
                      {money(p.basePrice * p.peakMul)}
                    </td>
                    <td className="px-4 py-3">{p.note || "—"}</td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={p.active}
                        onChange={(v) =>
                          setPlans((prev) =>
                            prev.map((x) =>
                              x.id === p.id ? { ...x, active: v } : x
                            )
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setPlanForm(p);
                          setOpenPlan(true);
                        }}
                        className="rounded-lg bg-emerald-500 px-3 py-1.5 text-white text-sm shadow hover:bg-emerald-600"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => removePlan(p.id)}
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-white text-sm shadow hover:bg-red-600"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* --- PROMO TAB --- */}
      {tab === "promo" && (
        <>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-800">Khuyến mãi</h2>
            <button
              onClick={() => {
                setPromoForm(emptyPromo);
                setOpenPromo(true);
              }}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700"
            >
              + Khuyến mãi
            </button>
          </div>
          <input
            className="w-full max-w-sm rounded-lg border px-3 py-2 shadow-sm focus:ring-indigo-300 mb-3"
            placeholder="🔍 Tìm khuyến mãi…"
            value={qPromo}
            onChange={(e) => setQPromo(e.target.value)}
          />

          <div className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Tên</th>
                  <th className="px-4 py-3">Mã</th>
                  <th className="px-4 py-3">Giảm</th>
                  <th className="px-4 py-3">Thời gian</th>
                  <th className="px-4 py-3">Áp dụng</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {promoView.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-indigo-600">
                      #{p.code}
                    </td>
                    <td className="px-4 py-3">
                      {p.type === "percent" ? `${p.value}%` : money(p.value)}
                    </td>
                    <td className="px-4 py-3">
                      {p.start} → {p.end}
                    </td>
                    <td className="px-4 py-3">{p.applyTo}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setPromoForm(p);
                          setOpenPromo(true);
                        }}
                        className="rounded-lg bg-emerald-500 px-3 py-1.5 text-white text-sm shadow hover:bg-emerald-600"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => removePromo(p.id)}
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-white text-sm shadow hover:bg-red-600"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* --- MODAL PLAN --- */}
      {openPlan && (
        <Modal
          title={isEditPlan ? "Sửa bảng giá" : "Thêm hạng phòng"}
          onClose={() => setOpenPlan(false)}
          footer={[
            <button
              key="save"
              onClick={savePlan}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700"
            >
              {isEditPlan ? "Lưu thay đổi" : "Thêm"}
            </button>,
            <button
              key="close"
              onClick={() => setOpenPlan(false)}
              className="rounded-lg border border-gray-300 bg-black px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Đóng
            </button>,
          ]}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="grid gap-1">
              <span>Hạng phòng</span>
              <input
                className="rounded-lg border px-3 py-2"
                value={planForm.roomType}
                onChange={(e) =>
                  setPlanForm({ ...planForm, roomType: e.target.value })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Giá cơ bản</span>
              <input
                type="number"
                className="rounded-lg border px-3 py-2"
                value={planForm.basePrice}
                onChange={(e) =>
                  setPlanForm({
                    ...planForm,
                    basePrice: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Ngày thường</span>
              <input
                type="number"
                step="0.01"
                className="rounded-lg border px-3 py-2"
                value={planForm.weekdayMul}
                onChange={(e) =>
                  setPlanForm({
                    ...planForm,
                    weekdayMul: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Cuối tuần</span>
              <input
                type="number"
                step="0.01"
                className="rounded-lg border px-3 py-2"
                value={planForm.weekendMul}
                onChange={(e) =>
                  setPlanForm({
                    ...planForm,
                    weekendMul: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Cao điểm</span>
              <input
                type="number"
                step="0.01"
                className="rounded-lg border px-3 py-2"
                value={planForm.peakMul}
                onChange={(e) =>
                  setPlanForm({ ...planForm, peakMul: Number(e.target.value) })
                }
              />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span>Ghi chú</span>
              <input
                className="rounded-lg border px-3 py-2"
                value={planForm.note}
                onChange={(e) =>
                  setPlanForm({ ...planForm, note: e.target.value })
                }
              />
            </label>
            <div className="flex items-center gap-3 md:col-span-2">
              <span>Hiển thị</span>
              <Switch
                checked={planForm.active}
                onChange={(v) => setPlanForm({ ...planForm, active: v })}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* --- MODAL PROMO --- */}
      {openPromo && (
        <Modal
          title={isEditPromo ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}
          onClose={() => setOpenPromo(false)}
          footer={[
            <button
              key="save"
              onClick={savePromo}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700"
            >
              {isEditPromo ? "Lưu thay đổi" : "Thêm"}
            </button>,
            <button
              key="close"
              onClick={() => setOpenPromo(false)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Đóng
            </button>,
          ]}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="grid gap-1">
              <span>Tên chương trình</span>
              <input
                className="rounded-lg border px-3 py-2"
                value={promoForm.name}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, name: e.target.value })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Mã</span>
              <input
                className="rounded-lg border px-3 py-2 font-mono"
                value={promoForm.code}
                onChange={(e) =>
                  setPromoForm({
                    ...promoForm,
                    code: e.target.value.toUpperCase(),
                  })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Loại giảm</span>
              <select
                className="rounded-lg border px-3 py-2"
                value={promoForm.type}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, type: e.target.value })
                }
              >
                <option value="percent">Phần trăm (%)</option>
                <option value="amount">Số tiền (VND)</option>
              </select>
            </label>
            <label className="grid gap-1">
              <span>Giá trị</span>
              <input
                type="number"
                className="rounded-lg border px-3 py-2"
                value={promoForm.value}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, value: Number(e.target.value) })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Bắt đầu</span>
              <input
                type="date"
                className="rounded-lg border px-3 py-2"
                value={promoForm.start}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, start: e.target.value })
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Kết thúc</span>
              <input
                type="date"
                className="rounded-lg border px-3 py-2"
                value={promoForm.end}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, end: e.target.value })
                }
              />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span>Áp dụng</span>
              <input
                className="rounded-lg border px-3 py-2"
                value={promoForm.applyTo}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, applyTo: e.target.value })
                }
              />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span>Trạng thái</span>
              <select
                className="rounded-lg border px-3 py-2"
                value={promoForm.status}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, status: e.target.value })
                }
              >
                <option value="scheduled">Đã lên lịch</option>
                <option value="active">Đang chạy</option>
                <option value="expired">Hết hạn</option>
              </select>
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagePrices;
