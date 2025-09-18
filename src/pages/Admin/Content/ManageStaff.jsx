import { useState } from "react";
import { Card, Table, Button, Row, Col, Form } from "react-bootstrap";
import AddStaffModal from "./AddStaffModal";
import EditStaffModal from "./EditStaffModal";
import ViewStaffModal from "./ViewStaffModal";
import { mockStaff } from "../../../services/mockStaff";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState(mockStaff);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [search, setSearch] = useState("");

  const handleAddStaff = (staff) => {
    const newStaff = { ...staff, id: staffList.length + 1 };
    setStaffList([...staffList, newStaff]);
  };

  const handleDelete = (id) => {
    setStaffList(staffList.filter((s) => s.id !== id));
  };

  const handleUpdateStaff = (updated) => {
    setStaffList(
      staffList.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h3>Quản lý nhân viên</h3>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Tìm kiếm nhân viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button variant="success" onClick={() => setShowAddModal(true)}>➕ Thêm</Button>
        </Col>
      </Row>

      <Card>
        <Table striped bordered hover responsive className="align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Vị trí</th>
              <th>Email</th>
              <th>Username</th>
              <th>Password</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s, idx) => (
              <tr key={s.id}>
                <td>{idx + 1}</td>
                <td>
                  {s.image ? (
                    <img src={s.image} alt={s.name} style={{ height: "50px", borderRadius: "5px" }} />
                  ) : "-"}
                </td>
                <td>{s.name}</td>
                <td>{s.position}</td>
                <td>{s.email}</td>
                <td>{s.username}</td>
                <td>{"*".repeat(s.password.length)}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentStaff(s);
                      setShowViewModal(true);
                    }}
                  >👁️ Xem</Button>

                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentStaff(s);
                      setShowEditModal(true);
                    }}
                  >✏️ Sửa</Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(s.id)}
                  >🗑️ Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <AddStaffModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAddStaff}
      />

      <EditStaffModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        staff={currentStaff}
        onUpdate={handleUpdateStaff}
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
