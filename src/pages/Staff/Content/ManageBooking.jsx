// src/components/Booking/ManageBooking.jsx
import { useState, useEffect } from "react";
import { Card, Table, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { getAllBookings } from "../../../services/AppService"; // API bạn cần viết
import { toast } from "react-toastify";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getAllBookings({ page: 0, limit: 20 });
      setBookings(res.data);
      setFiltered(res.data);
      toast.success(" Lấy danh sách booking thành công");
    } catch (err) {
      toast.error(" Lỗi khi lấy danh sách booking:", err);
    }
  };

  const handleSearch = () => {
    const result = bookings.filter(
      (b) =>
        b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.customerEmail.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return <Badge bg="warning">Chờ xử lý</Badge>;
      case "CONFIRMED":
        return <Badge bg="success">Đã xác nhận</Badge>;
      case "CANCELLED":
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-4">
      <h3>📅 Quản lý đặt phòng</h3>

      {/* Thanh tìm kiếm */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Tìm theo tên/email khách..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handleSearch}>🔍 Tìm</Button>
        </Col>
      </Row>

      {/* Bảng danh sách booking */}
      <Card>
        <Table
          striped
          bordered
          hover
          responsive
          className="text-center align-middle"
        >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Khách hàng</th>
              <th>Phòng</th>
              <th>Ngày đặt</th>
              <th>Ngày nhận</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, idx) => (
              <tr key={b.bookingId}>
                <td>{idx + 1}</td>
                <td>{b.customerName}</td>
                <td>{b.roomName}</td>
                <td>{b.bookingDate}</td>
                <td>{b.checkInDate}</td>
                <td>{renderStatus(b.status)}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2">
                    👁️ Xem
                  </Button>
                  <Button variant="success" size="sm" className="me-2">
                    ✅ Xác nhận
                  </Button>
                  <Button variant="danger" size="sm">
                    ❌ Hủy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default ManageBooking;
