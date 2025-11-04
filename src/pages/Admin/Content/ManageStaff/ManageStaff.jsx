import { useState, useEffect } from "react";
import { Card, Table, Button, Row, Col, Form } from "react-bootstrap";
import AddStaffModal from "./AddStaffModal";
import EditStaffModal from "./EditStaffModal";
import ViewStaffModal from "./ViewStaffModal";
import { getAllStaff, deleteStaff } from "../../../../services/AppService";
import { toast } from "react-toastify";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // State điều khiển modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      let res = await getAllStaff({ page: 0, limit: 10 });
      setStaffList(res.data);
      setSearchResult(res.data);
      toast.success("Lấy danh sách nhân viên thành công")
    } catch (err) {
      if (err.response && err.response.data) {
        const message =
          err.response.data.message || "Lỗi server không xác định!";
        toast.error(message); // ✅ Hiển thị message từ BE
      } else {
        toast.error("Không thể kết nối đến server!");
      }
      console.error("API Error:", err.response?.data || err);
    }
  };

  const handleSearch = () => {
    const filtered = staffList.filter(
      (s) =>
        s.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id); // gọi BE xóa
      // load lại danh sách từ server để chắc chắn
      toast.success("Xóa staff thành công!");
      fetchStaff();
    } catch (err) {
      toast.error("Lỗi khi xóa staff:", err);
    }
  };

  return (
    <div className="p-4">
      <h3>Quản lý nhân viên</h3>

      {/* Thanh tìm kiếm + nút thêm */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Tìm kiếm nhân viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handleSearch}>🔍 Tìm</Button>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            ➕ Thêm nhân viên
          </Button>
        </Col>
      </Row>

      {/* Bảng danh sách nhân viên */}
      <Card>
        <Table
          striped
          bordered
          hover
          responsive
          className="align-middle text-center"
        >
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((s, idx) => (
              <tr key={s.staffId}>
                <td>{idx + 1}</td>
                <td>{s.fullName}</td>
                <td>{s.email}</td>
                <td>{s.phoneNumber}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentStaff(s);
                      setShowViewModal(true);
                    }}
                  >
                    👁️ Xem
                  </Button>

                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentStaff(s);
                      setShowEditModal(true);
                    }}
                  >
                    ✏️ Sửa
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(s.staffId)}
                  >
                    🗑️ Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Các modal */}
      <AddStaffModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdded={fetchStaff}
      />

      <EditStaffModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        staff={currentStaff}
        onUpdated={fetchStaff}
      />

      <ViewStaffModal
        show={showViewModal}
        handleClose={() => setShowViewModal(false)}
        staff={currentStaff}
      />
    </div>
  );
};

export default ManageStaff;
