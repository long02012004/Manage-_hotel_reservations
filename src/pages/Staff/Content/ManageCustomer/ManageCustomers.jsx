import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getAllCustomers,
  deleteCustomer,
  toggleCustomerActive,
} from "../../../../services/AppService";
import ModalAddCustomer from "./ModalAddCustomer";
import ModalViewCustomer from "./ModalViewCustomer";

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [search, setSearch] = useState("");

  // Modal state
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // base URL
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8088/api/v1";
  const API_HOST = apiBaseUrl.replace("/api/v1", "");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomers();
      setCustomers(res.data || []); // ✅ lấy mảng content
    } catch (err) {
      toast.error(" Lỗi khi lấy danh sách khách hàng");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      try {
        await deleteCustomer(id);
        toast.success(" Xóa khách hàng thành công!");
        fetchCustomers();
      } catch (err) {
        toast.error(" Lỗi khi xóa khách hàng");
      }
    }
  };

  const handleLockToggle = async (c) => {
    try {
      const newStatus = c.active === 1 ? 0 : 1;
      await toggleCustomerActive(c.customerId, newStatus);
      toast.success(
        newStatus === 0 ? " Đã khóa khách hàng" : " Đã mở khóa khách hàng"
      );
      fetchCustomers();
    } catch (err) {
      toast.error(" Lỗi khi cập nhật trạng thái");
    }
  };

  // Pagination + Search
  const filtered = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Quản lý khách hàng</h2>

      {/* Tìm kiếm + Thêm */}
      <div className="d-flex mb-3 justify-content-between">
        <Form.Control
          style={{ width: "300px" }}
          placeholder="🔍 Tìm kiếm khách hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="success" onClick={() => setShowAdd(true)}>
          <i className="bi bi-person-plus"></i> Thêm khách hàng
        </Button>
      </div>

      {/* Bảng */}
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(
            (c, index) => (
              console.log(c.img),
              (
                <tr key={index}>
                  <td>{c.customerId}</td>
                  <td>
                    <img
                      src={
                        c.img
                          ? `${API_HOST}${c.img}` // nối host + relative path
                          : "https://placehold.co/50x50"
                      }
                      alt={c.name}
                      style={{ width: "50px", borderRadius: "8px" }}
                    />
                  </td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    {c.active === 1 ? (
                      <span className="badge bg-success">Hoạt động</span>
                    ) : (
                      <span className="badge bg-secondary">Đã khóa</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          setSelectedCustomer(c);
                          setShowView(true);
                        }}
                      >
                        <i className="bi bi-eye"></i> Xem
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(c.customerId)}
                      >
                        <i className="bi bi-trash"></i> Xóa
                      </Button>

                      <Button
                        size="sm"
                        variant={c.active === 1 ? "secondary" : "success"}
                        onClick={() => handleLockToggle(c)}
                      >
                        {c.active === 1 ? (
                          <>
                            <i className="bi bi-lock"></i> Khóa
                          </>
                        ) : (
                          <>
                            <i className="bi bi-unlock"></i> Mở khóa
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>

      {/* Phân trang */}
      <div className="d-flex justify-content-between mt-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Trang trước
        </Button>
        <span>
          Trang {page}/{totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Trang sau ▶
        </Button>
      </div>

      {/* Modals */}
      {showAdd && (
        <ModalAddCustomer
          onClose={() => setShowAdd(false)}
          onSave={fetchCustomers}
        />
      )}
      {showView && selectedCustomer && (
        <ModalViewCustomer
          customerId={selectedCustomer.customerId}
          onClose={() => setShowView(false)}
        />
      )}
    </div>
  );
};

export default CustomerManager;
