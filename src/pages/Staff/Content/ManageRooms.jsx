import { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import styles from "./ManageRooms.module.scss";
import ModalAddRoom from "./ModalAddRoom";
import ModalEditRoom from "./ModalEditRoom";
import ModalViewRoom from "./ModalViewRoom";
import { getRooms, deleteRoom } from "../../../services/AppService";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  // 📌 Lấy danh sách phòng từ API
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await getRooms({ page: 0, limit: 20 });
      setRooms(res.data || []);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách phòng:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      try {
        await deleteRoom(id);
        fetchRooms(); // load lại danh sách sau khi xóa
      } catch (err) {
        console.error("❌ Lỗi khi xóa phòng:", err);
      }
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredRooms = rooms.filter((r) =>
    r.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.manageRooms}>
      <h3>Quản lý phòng</h3>

      {/* Thanh tìm kiếm + nút thêm */}
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

      {/* Bảng danh sách phòng */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên phòng</th>
            <th>Số khách</th>
            <th>Giá</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((r, idx) => (
            <tr key={r.id}>
              <td>{idx + 1}</td>
              <td>{r.title}</td>
              <td>{r.guests}</td>
              <td>{r.price?.toLocaleString()} VND</td>
              <td>{r.address}</td>
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
          onSave={fetchRooms} // gọi lại API sau khi thêm
        />
      )}
      {showEdit && selectedRoom && (
        <ModalEditRoom
          room={selectedRoom}
          onClose={() => setShowEdit(false)}
          onSave={fetchRooms} // gọi lại API sau khi sửa
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
