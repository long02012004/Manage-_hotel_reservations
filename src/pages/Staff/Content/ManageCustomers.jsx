import React, { useState } from "react";

const CustomerManager = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      phone: "0901234567",
      address: "Hà Nội",
      image: "https://via.placeholder.com/50",
      comment: "Khách hàng VIP",
      isActive: true,
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      phone: "0907654321",
      address: "Đà Nẵng",
      image: "https://via.placeholder.com/50",
      comment: "Thường xuyên đặt phòng",
      isActive: false,
    },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    comment: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAdd = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Vui lòng nhập đủ tên và email");
      return;
    }
    setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
    setNewCustomer({
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
      comment: "",
      isActive: true,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (id) => {
    const updated = prompt("Nhập tên mới:");
    if (updated) {
      setCustomers(
        customers.map((c) =>
          c.id === id ? { ...c, name: updated } : c
        )
      );
    }
  };

  const handleLock = (id) => {
    setCustomers(
      customers.map((c) =>
        c.id === id ? { ...c, isActive: false } : c
      )
    );
  };

  const handleUnlock = (id) => {
    setCustomers(
      customers.map((c) =>
        c.id === id ? { ...c, isActive: true } : c
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Quản lý khách hàng</h2>

      {/* Form thêm khách hàng */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Thêm khách hàng mới</h5>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              placeholder="Tên"
              className="form-control"
              value={newCustomer.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={newCustomer.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              className="form-control"
              value={newCustomer.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              className="form-control"
              value={newCustomer.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="image"
              placeholder="Link ảnh"
              className="form-control"
              value={newCustomer.image}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <textarea
              name="comment"
              placeholder="Ghi chú"
              className="form-control"
              value={newCustomer.comment}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAdd}>
          Thêm khách hàng
        </button>
      </div>

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
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                <img
                  src={c.image}
                  alt={c.name}
                  style={{ width: "50px", borderRadius: "8px" }}
                />
              </td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>{c.comment}</td>
              <td>
                {c.isActive ? (
                  <span className="badge bg-success">Hoạt động</span>
                ) : (
                  <span className="badge bg-secondary">Đã khóa</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-1"
                  onClick={() => handleEdit(c.id)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm me-1"
                  onClick={() => handleDelete(c.id)}
                >
                  Xóa
                </button>
                {c.isActive ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleLock(c.id)}
                  >
                    Khóa
                  </button>
                ) : (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUnlock(c.id)}
                  >
                    Mở khóa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManager;
