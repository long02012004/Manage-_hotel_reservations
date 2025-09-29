import React, { useState, useEffect } from "react";
import { getAllCustomers } from "../../../services/AppService"; // API lấy khách hàng

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5; // số khách hàng trên mỗi trang

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomers();
      setCustomers(res.data); // BE trả array
    } catch (err) {
      console.error("Lỗi khi lấy danh sách khách hàng:", err);
    }
  };

  // Tính toán danh sách khách hàng theo trang
  const totalPages = Math.ceil(customers.length / pageSize);
  const paginatedCustomers = customers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Quản lý khách hàng</h2>

      {/* Bảng danh sách khách hàng */}
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((c) => (
            <tr key={c.customerId}>
              <td>{c.customerId}</td>
              <td>
                <img
                  src={c.img || "https://via.placeholder.com/50"}
                  alt={c.name}
                  style={{ width: "50px", borderRadius: "8px" }}
                />
              </td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>{c.note}</td>
              <td>
                {c.active === 1 ? (
                  <span className="badge bg-success">Hoạt động</span>
                ) : (
                  <span className="badge bg-secondary">Đã khóa</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ◀ Trang trước
        </button>

        <span>
          Trang {page} / {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Trang sau ▶
        </button>
      </div>
    </div>
  );
};

export default CustomerManager;
