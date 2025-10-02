import React, { useMemo, useState } from "react";
import styles from "./ManageContent.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ===== Mock dữ liệu ===== */
const initialPosts = [
  {
    id: "p1",
    title: "Giới thiệu khách sạn Lumière",
    slug: "gioi-thieu-khach-san-lumiere",
    status: "published",
    publishAt: "2025-06-01T10:00:00.000Z",
  },
  {
    id: "p2",
    title: "Ưu đãi cuối tuần",
    slug: "uu-dai-cuoi-tuan",
    status: "scheduled",
    publishAt: "2025-07-20T09:00:00.000Z",
  },
  {
    id: "p3",
    title: "Trải nghiệm Spa mới",
    slug: "trai-nghiem-spa-moi",
    status: "draft",
    publishAt: "2025-07-20T09:00:00.000Z",
  },{
    id: "p4",
    title: "Giới thiệu khách sạn Lumière",
    slug: "gioi-thieu-khach-san-lumiere",
    status: "published",
    publishAt: "2025-06-01T10:00:00.000Z",
  },
  {
    id: "p5",
    title: "Ưu đãi cuối tuần",
    slug: "uu-dai-cuoi-tuan",
    status: "scheduled",
    publishAt: "2025-07-20T09:00:00.000Z",
  },
  {
    id: "p6",
    title: "Trải nghiệm Spa mới",
    slug: "trai-nghiem-spa-moi",
    status: "draft",
    publishAt: "2025-07-20T09:00:00.000Z",
  },{
    id: "p7",
    title: "Giới thiệu khách sạn Lumière",
    slug: "gioi-thieu-khach-san-lumiere",
    status: "published",
    publishAt: "2025-06-01T10:00:00.000Z",
  },
  {
    id: "p8",
    title: "Ưu đãi cuối tuần",
    slug: "uu-dai-cuoi-tuan",
    status: "scheduled",
    publishAt: "2025-07-20T09:00:00.000Z",
  },
  {
    id: "p9",
    title: "Trải nghiệm Spa mới",
    slug: "trai-nghiem-spa-moi",
    status: "draft",
    publishAt: "2025-07-20T09:00:00.000Z",
  },
];

/* Badge trạng thái */
const StatusPill = ({ value }) => (
  <span
    className={`${styles.pill} ${
      value === "published"
        ? styles.published
        : value === "scheduled"
        ? styles.scheduled
        : styles.draft
    }`}
  >
    {value === "published"
      ? "Đã xuất bản"
      : value === "scheduled"
      ? "Đã lên lịch"
      : "Bản nháp"}
  </span>
);

const ManageContent = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const emptyForm = {
    id: "",
    title: "",
    slug: "",
    status: "draft",
    publishAt: "",
  };
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const isEdit = Boolean(form.id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q);
      const matchS = status === "all" || p.status === status;
      return matchQ && matchS;
    });
  }, [posts, query, status]);

  /* ===== Handlers ===== */
  const openCreate = () => {
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (row) => {
    setForm({
      ...row,
      publishAt: row.publishAt ? row.publishAt.slice(0, 16) : "",
    });
    setOpen(true);
  };

  const save = () => {
    const payload = {
      ...form,
      id: form.id || Math.random().toString(36).slice(2),
      publishAt: form.publishAt ? new Date(form.publishAt).toISOString() : "",
    };

    setPosts((prev) => {
      const exists = prev.some((x) => x.id === payload.id);
      if (exists) {
        toast.success("✅ Cập nhật bài viết thành công!");
        return prev.map((x) => (x.id === payload.id ? payload : x));
      } else {
        toast.success("✅ Thêm bài viết mới thành công!");
        return [payload, ...prev];
      }
    });
    setOpen(false);
  };

  const remove = (id) => {
    setPosts((prev) => prev.filter((x) => x.id !== id));
    toast.info("🗑️ Đã xóa bài viết");
  };

  const toggleStatus = (id) => {
    setPosts((prev) =>
      prev.map((x) =>
        x.id === id
          ? {
              ...x,
              status:
                x.status === "draft"
                  ? "scheduled"
                  : x.status === "scheduled"
                  ? "published"
                  : "draft",
            }
          : x
      )
    );
    toast.success("🔁 Đã thay đổi trạng thái");
  };

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>📝 Quản lý nội dung</h1>
        <button className={styles.primary} onClick={openCreate}>
          + Bài viết mới
        </button>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <input
          className={styles.input}
          placeholder="🔍 Tìm tiêu đề hoặc slug…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="draft">Bản nháp</option>
          <option value="scheduled">Đã lên lịch</option>
          <option value="published">Đã xuất bản</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Tiêu đề</th>
              <th>Slug</th>
              <th>Trạng thái</th>
              <th>Ngày xuất bản</th>
              <th className={styles.textRight}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  Chưa có bài viết phù hợp.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className={styles.titleCell}>{p.title}</td>
                  <td className={styles.slugCell}>/{p.slug}</td>
                  <td>
                    <StatusPill value={p.status} />
                  </td>
                  <td>
                    {p.publishAt ? new Date(p.publishAt).toLocaleString() : "—"}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.btn} ${styles.btnGhost}`}
                        onClick={() => openEdit(p)}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnOutline}`}
                        onClick={() => toggleStatus(p.id)}
                      >
                        🔁 Trạng thái
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnDanger}`}
                        onClick={() => remove(p.id)}
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

      {/* Modal */}
      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{isEdit ? "✏️ Sửa bài viết" : "➕ Bài viết mới"}</h2>
            <div className={styles.formGrid}>
              <label>
                Tiêu đề
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </label>
              <label>
                Slug
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </label>
              <label>
                Trạng thái
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="draft">Bản nháp</option>
                  <option value="scheduled">Đã lên lịch</option>
                  <option value="published">Đã xuất bản</option>
                </select>
              </label>
              <label>
                Ngày xuất bản
                <input
                  type="datetime-local"
                  value={form.publishAt}
                  onChange={(e) =>
                    setForm({ ...form, publishAt: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.primary} onClick={save}>
                {isEdit ? "Lưu thay đổi" : "Tạo bài viết"}
              </button>
              <button onClick={() => setOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContent;
