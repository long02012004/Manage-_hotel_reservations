import React, { useMemo, useState } from "react";

/** --------- Mock data để hiển thị UI --------- */
const initPlans = [
  {
    id: "r1",
    roomType: "Deluxe City View",
    basePrice: 1200000,
    currency: "VND",
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
    currency: "VND",
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
    currency: "VND",
    weekdayMul: 1,
    weekendMul: 1.15,
    peakMul: 1.3,
    note: "",
    active: false,
  },
];

const initPromos = [
  {
    id: "p1",
    name: "Summer Splash",
    code: "SUMMER15",
    type: "percent", // percent | amount
    value: 15,
    start: "2025-06-01",
    end: "2025-08-31",
    status: "active", // active | scheduled | expired
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
    active: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    scheduled: "bg-amber-100 text-amber-700 ring-amber-200",
    expired: "bg-gray-100 text-gray-600 ring-gray-200",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${
        map[status] || ""
      }`}
    >
      {status === "active"
        ? "Đang chạy"
        : status === "scheduled"
        ? "Đã lên lịch"
        : "Hết hạn"}
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

/** --------- Modal cơ bản --------- */
const Modal = ({ title, onClose, children, footer }) => (
  <div
    className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
    onClick={onClose}
  >
    <div
      className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b px-5 py-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          title="Đóng"
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

/** ==================== PAGE ==================== */
const ManagePrices = () => {
  const [tab, setTab] = useState("price"); // price | promo
  const [plans, setPlans] = useState(initPlans);
  const [promos, setPromos] = useState(initPromos);

  // search
  const [qPrice, setQPrice] = useState("");
  const [qPromo, setQPromo] = useState("");

  // modal states
  const emptyPlan = {
    id: "",
    roomType: "",
    basePrice: 0,
    currency: "VND",
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

  /** ------- Price list filtered ------- */
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

  /** ------- Promo list filtered ------- */
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

  /** ------- Handlers ------- */
  const openCreatePlan = () => {
    setPlanForm(emptyPlan);
    setOpenPlan(true);
  };
  const openEditPlan = (p) => {
    setPlanForm({ ...p });
    setOpenPlan(true);
  };
  const savePlan = () => {
    setPlans((prev) => {
      if (planForm.id) {
        return prev.map((x) => (x.id === planForm.id ? planForm : x));
      }
      return [
        { ...planForm, id: Math.random().toString(36).slice(2) },
        ...prev,
      ];
    });
    setOpenPlan(false);
  };
  const removePlan = (id) =>
    setPlans((prev) => prev.filter((x) => x.id !== id));

  const openCreatePromo = () => {
    setPromoForm(emptyPromo);
    setOpenPromo(true);
  };
  const openEditPromo = (p) => {
    setPromoForm({ ...p });
    setOpenPromo(true);
  };
  const savePromo = () => {
    setPromos((prev) => {
      if (promoForm.id) {
        return prev.map((x) => (x.id === promoForm.id ? promoForm : x));
      }
      return [
        { ...promoForm, id: Math.random().toString(36).slice(2) },
        ...prev,
      ];
    });
    setOpenPromo(false);
  };
  const removePromo = (id) =>
    setPromos((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="p-6">
      {/* Title */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý giá & khuyến mãi
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex w-full items-center gap-2 rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200">
        <button
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold ${
            tab === "price"
              ? "bg-indigo-600 text-black"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setTab("price")}
        >
          Bảng giá
        </button>
        <button
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold ${
            tab === "promo"
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setTab("promo")}
        >
          Khuyến mãi
        </button>
      </div>

      {/* --- PRICE TAB --- */}
      {tab === "price" && (
        <>
          {/* Toolbar */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative w-full max-w-md">
                <input
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-9 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Tìm theo hạng phòng, ghi chú, giá…"
                  value={qPrice}
                  onChange={(e) => setQPrice(e.target.value)}
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  🔎
                </span>
              </div>
            </div>
            <button
              onClick={openCreatePlan}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 font-semibold text-gray-900 shadow-sm hover:brightness-105"
            >
              + Hạng phòng
            </button>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Hạng phòng</th>
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
                  {priceView.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Chưa có dữ liệu phù hợp.
                      </td>
                    </tr>
                  ) : (
                    priceView.map((p) => {
                      const daily = p.basePrice * p.weekdayMul;
                      const weekend = p.basePrice * p.weekendMul;
                      const peak = p.basePrice * p.peakMul;
                      return (
                        <tr key={p.id} className="border-t">
                          <td className="px-4 py-3 font-semibold text-gray-900">
                            {p.roomType}
                          </td>
                          <td className="px-4 py-3">{money(p.basePrice)}</td>
                          <td className="px-4 py-3">{money(daily)}</td>
                          <td className="px-4 py-3">{money(weekend)}</td>
                          <td className="px-4 py-3">{money(peak)}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {p.note || "—"}
                          </td>
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
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <button
                                className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                                onClick={() => openEditPlan(p)}
                              >
                                ✏️ Sửa
                              </button>
                              <button
                                className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                                onClick={() => removePlan(p.id)}
                              >
                                🗑️ Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* --- PROMO TAB --- */}
      {tab === "promo" && (
        <>
          {/* Toolbar */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-md">
              <input
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-9 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Tìm tên, mã, đối tượng áp dụng…"
                value={qPromo}
                onChange={(e) => setQPromo(e.target.value)}
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                🔎
              </span>
            </div>
            <button
              onClick={openCreatePromo}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 font-semibold text-gray-900 shadow-sm hover:brightness-105"
            >
              + Khuyến mãi
            </button>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Tên chương trình</th>
                    <th className="px-4 py-3">Mã</th>
                    <th className="px-4 py-3">Giảm</th>
                    <th className="px-4 py-3">Thời gian</th>
                    <th className="px-4 py-3">Áp dụng</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {promoView.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Chưa có chương trình phù hợp.
                      </td>
                    </tr>
                  ) : (
                    promoView.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {p.name}
                        </td>
                        <td className="px-4 py-3 font-mono">#{p.code}</td>
                        <td className="px-4 py-3">
                          {p.type === "percent"
                            ? `${p.value}%`
                            : `${money(p.value)}`}
                        </td>
                        <td className="px-4 py-3">
                          {p.start} → {p.end}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {p.applyTo || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                              onClick={() => openEditPromo(p)}
                            >
                              ✏️ Sửa
                            </button>
                            <button
                              className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                              onClick={() => removePromo(p.id)}
                            >
                              🗑️ Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* --------- Modal: Plan --------- */}
      {openPlan && (
        <Modal
          title={isEditPlan ? "Sửa bảng giá" : "Thêm hạng phòng"}
          onClose={() => setOpenPlan(false)}
          footer={[
            <button
              key="save"
              onClick={savePlan}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              {isEditPlan ? "Lưu thay đổi" : "Thêm"}
            </button>,
            <button
              key="close"
              onClick={() => setOpenPlan(false)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold hover:bg-gray-50"
            >
              Đóng
            </button>,
          ]}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Hạng phòng</span>
              <input
                className="rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={planForm.roomType}
                onChange={(e) =>
                  setPlanForm({ ...planForm, roomType: e.target.value })
                }
                placeholder="VD: Deluxe City View"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Giá cơ bản (VND)</span>
              <input
                type="number"
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={planForm.basePrice}
                onChange={(e) =>
                  setPlanForm({
                    ...planForm,
                    basePrice: Number(e.target.value),
                  })
                }
                min={0}
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Hệ số ngày thường</span>
              <input
                type="number"
                step="0.01"
                className="rounded-lg border border-gray-300 px-3 py-2"
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
              <span className="text-sm text-gray-600">Hệ số cuối tuần</span>
              <input
                type="number"
                step="0.01"
                className="rounded-lg border border-gray-300 px-3 py-2"
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
              <span className="text-sm text-gray-600">Hệ số cao điểm</span>
              <input
                type="number"
                step="0.01"
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={planForm.peakMul}
                onChange={(e) =>
                  setPlanForm({ ...planForm, peakMul: Number(e.target.value) })
                }
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Ghi chú</span>
              <input
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={planForm.note}
                onChange={(e) =>
                  setPlanForm({ ...planForm, note: e.target.value })
                }
                placeholder="Bao gồm ăn sáng…"
              />
            </label>

            <div className="flex items-center gap-3 md:col-span-2">
              <span className="text-sm text-gray-600">Hiển thị:</span>
              <Switch
                checked={planForm.active}
                onChange={(v) => setPlanForm({ ...planForm, active: v })}
              />
            </div>

            {/* Preview nhanh */}
            <div className="md:col-span-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
              <div className="font-semibold">Xem nhanh:</div>
              <div className="mt-1 grid grid-cols-3 gap-3">
                <div>
                  Ngày thường: {money(planForm.basePrice * planForm.weekdayMul)}
                </div>
                <div>
                  Cuối tuần: {money(planForm.basePrice * planForm.weekendMul)}
                </div>
                <div>
                  Cao điểm: {money(planForm.basePrice * planForm.peakMul)}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --------- Modal: Promo --------- */}
      {openPromo && (
        <Modal
          title={isEditPromo ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}
          onClose={() => setOpenPromo(false)}
          footer={[
            <button
              key="save"
              onClick={savePromo}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              {isEditPromo ? "Lưu thay đổi" : "Thêm"}
            </button>,
            <button
              key="close"
              onClick={() => setOpenPromo(false)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold hover:bg-gray-50"
            >
              Đóng
            </button>,
          ]}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Tên chương trình</span>
              <input
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={promoForm.name}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, name: e.target.value })
                }
                placeholder="VD: Summer Splash"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Mã</span>
              <input
                className="rounded-lg border border-gray-300 px-3 py-2 font-mono"
                value={promoForm.code}
                onChange={(e) =>
                  setPromoForm({
                    ...promoForm,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="SUMMER15"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Loại giảm</span>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2"
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
              <span className="text-sm text-gray-600">Giá trị</span>
              <input
                type="number"
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={promoForm.value}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, value: Number(e.target.value) })
                }
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Bắt đầu</span>
              <input
                type="date"
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={promoForm.start}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, start: e.target.value })
                }
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Kết thúc</span>
              <input
                type="date"
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={promoForm.end}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, end: e.target.value })
                }
              />
            </label>

            <label className="grid gap-1 md:col-span-2">
              <span className="text-sm text-gray-600">Áp dụng</span>
              <input
                className="rounded-lg border border-gray-300 px-3 py-2"
                value={promoForm.applyTo}
                onChange={(e) =>
                  setPromoForm({ ...promoForm, applyTo: e.target.value })
                }
                placeholder="Deluxe, Suite… hoặc Tất cả hạng phòng"
              />
            </label>

            <label className="grid gap-1 md:col-span-2">
              <span className="text-sm text-gray-600">Trạng thái</span>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2"
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
