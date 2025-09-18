// src/pages/Admin/Content/Dashboard.jsx
import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Card, Row, Col, Form, Table, Button } from "react-bootstrap";
import { mockRooms } from "../../../services/mockRooms";

/* Thư viện Excel */
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // ================== Lọc dữ liệu theo tháng/năm ==================
  const filteredRooms = useMemo(() => {
    return mockRooms.filter((room) => {
      const checkInDate = new Date(room.booking.checkIn);
      return (
        checkInDate.getMonth() + 1 === month &&
        checkInDate.getFullYear() === year
      );
    });
  }, [month, year]);

  // ================== Thống kê nhanh ==================
  const totalRevenue = filteredRooms.reduce(
    (sum, room) =>
      sum + parseInt(room.price.replace(/\./g, "")) * room.booking.nights,
    0
  );

  const totalBookings = filteredRooms.reduce(
    (sum, room) => sum + room.booking.nights,
    0
  );

  const emptyRooms = mockRooms.length - filteredRooms.length;

  // ================== Biểu đồ doanh thu theo ngày ==================
  const daysInMonth = new Date(year, month, 0).getDate();
  const chartData = useMemo(() => {
    const dailyRevenue = Array(daysInMonth).fill(0);

    filteredRooms.forEach((room) => {
      const checkIn = new Date(room.booking.checkIn);
      const checkOut = new Date(room.booking.checkOut);
      for (
        let d = new Date(checkIn);
        d < checkOut;
        d.setDate(d.getDate() + 1)
      ) {
        if (d.getMonth() + 1 === month && d.getFullYear() === year) {
          dailyRevenue[d.getDate() - 1] += parseInt(
            room.price.replace(/\./g, "")
          );
        }
      }
    });

    return {
      labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data: dailyRevenue,
          backgroundColor: "#f0a500",
        },
      ],
    };
  }, [filteredRooms, daysInMonth, month, year]);

  // ================== Bảng chi tiết booking ==================
  const tableData = filteredRooms.map((room) => ({
    id: room.id,
    customer: `Khách hàng ${room.id}`,
    room: room.title,
    checkIn: room.booking.checkIn,
    checkOut: room.booking.checkOut,
    nights: room.booking.nights,
    total: parseInt(room.price.replace(/\./g, "")) * room.booking.nights,
  }));

  // ================== Xuất Excel (cả thống kê + bảng) ==================
  const exportToExcel = () => {
    // Sheet 1: Thống kê
    const summary = [
      { ChỉTiêu: "Doanh thu tháng " + month + "/" + year, GiáTrị: totalRevenue },
      { ChỉTiêu: "Số lượng booking", GiáTrị: totalBookings },
      { ChỉTiêu: "Phòng trống", GiáTrị: emptyRooms },
    ];
    const wsSummary = XLSX.utils.json_to_sheet(summary);

    // Sheet 2: Chi tiết booking
    const wsDetails = XLSX.utils.json_to_sheet(tableData);

    // Workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsSummary, "Thống kê");
    XLSX.utils.book_append_sheet(wb, wsDetails, "Chi tiết booking");

    // Xuất file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      `report_${month}_${year}.xlsx`
    );
  };

  return (
    <div className="p-4">
      <h3>Dashboard khách sạn</h3>

      {/* Filter chọn tháng/năm */}
      <Row className="my-3">
        <Col md={3}>
          <Form.Select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                Năm {y}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button variant="success" onClick={exportToExcel}>
            Xuất Excel
          </Button>
        </Col>
      </Row>

      {/* Cards thống kê nhanh */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Doanh thu tháng</h5>
            <p>{totalRevenue.toLocaleString()} VNĐ</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Số lượng booking</h5>
            <p>{totalBookings}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Phòng trống</h5>
            <p>{emptyRooms}</p>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ doanh thu */}
      <Card className="p-3 mb-4">
        <Bar
          key={`${month}-${year}`}
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </Card>

      {/* Bảng chi tiết booking */}
      <Card className="p-3">
        <h5>Chi tiết booking</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Khách hàng</th>
              <th>Phòng</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Số đêm</th>
              <th>Thành tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.customer}</td>
                <td>{row.room}</td>
                <td>{row.checkIn}</td>
                <td>{row.checkOut}</td>
                <td>{row.nights}</td>
                <td>{row.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
