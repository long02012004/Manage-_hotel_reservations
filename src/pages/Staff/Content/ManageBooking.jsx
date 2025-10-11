// src/components/Booking/ManageBooking.jsx
import { useState, useEffect } from "react";
import { Card, Table, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Dữ liệu cứng (mock data)
  const mockBookings = [
    {
      bookingId: 1,
      customerName: "Nguyễn Văn A",
      customerEmail: "vana@example.com",
      roomName: "Phòng Deluxe View Biển",
      bookingDate: "2025-10-01",
      checkInDate: "2025-10-15",
      status: "PENDING",
    },
    {
      bookingId: 2,
      customerName: "Trần Thị B",
      customerEmail: "thib@example.com",
      roomName: "Phòng Standard 2 Giường",
      bookingDate: "2025-09-28",
      checkInDate: "2025-10-10",
      status: "CONFIRMED",
    },
    {
      bookingId: 3,
      customerName: "Lê Hoàng C",
      customerEmail: "hoangc@example.com",
      roomName: "Phòng Suite Hạng Sang",
      bookingDate: "2025-10-03",
      checkInDate: "2025-10-20",
      status: "CANCELLED",
    },
    {
      bookingId: 4,
      customerName: "Phạm Thị D",
      customerEmail: "thid@example.com",
      roomName: "Phòng Gia Đình",
      bookingDate: "2025-10-02",
      checkInDate: "2025-10-12",
      status: "PENDING",
    },
  ];

  const fetchBookings = async () => {
    try {
      // ✅ Giả lập delay API (1 giây)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBookings(mockBookings);
      setFiltered(mockBookings);

      toast.success(" Lấy danh sách booking thành công!");
    } catch (err) {
      toast.error("❌ Lỗi khi lấy danh sách booking!");
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
              <th>Email</th>
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
                <td>{b.customerEmail}</td>
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
