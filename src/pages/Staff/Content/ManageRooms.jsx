import { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { mockRooms } from "../../../services/mockRooms";
import styles from "./ManageRooms.module.scss";
import ModalAddRoom from "./ModalAddRoom";
import ModalEditRoom from "./ModalEditRoom";
import ModalViewRoom from "./ModalViewRoom";

const ManageRooms = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [search, setSearch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredRooms = rooms.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.manageRooms}>
      <h3>Quản lý phòng</h3>

      <div className={styles.topBar}>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm phòng..."
          value={search}
          onChange={handleSearch}
          className={styles.searchBox}
        />
        <Button variant="success" onClick={() => setShowAdd(true)}>
          + Thêm phòng
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên phòng</th>
            <th>Số khách</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((r, idx) => (
            <tr key={r.id}>
              <td>{idx + 1}</td>
              <td>{r.title}</td>
              <td>{r.guests}</td>
              <td>{r.price.toLocaleString()} VND</td>
              <td>{r.status || "Available"}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedRoom(r);
                    setShowView(true);
                  }}
                >
                  Xem
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedRoom(r);
                    setShowEdit(true);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(r.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      {showAdd && (
        <ModalAddRoom
          onClose={() => setShowAdd(false)}
          onSave={(newRoom) => setRooms([...rooms, newRoom])}
        />
      )}
      {showEdit && selectedRoom && (
        <ModalEditRoom
          room={selectedRoom}
          onClose={() => setShowEdit(false)}
          onSave={(updated) =>
            setRooms(rooms.map((r) => (r.id === updated.id ? updated : r)))
          }
        />
      )}
      {showView && selectedRoom && (
        <ModalViewRoom
          show={showView}
          room={selectedRoom}
          onClose={() => setShowView(false)}
        />
      )}
    </div>
  );
};

export default ManageRooms;
