// src/pages/Staff/Rooms/ManageRooms.jsx
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { mockRooms } from "../../../services/mockRooms";
import styles from "./ManageRooms.module.scss";

const ManageRooms = () => {
  const [rooms, setRooms] = useState(mockRooms);

  const handleDelete = (id) => setRooms(rooms.filter(r => r.id !== id));

  return (
    <div className={styles.manageRooms}>
      <h3>Quản lý phòng</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên phòng</th>
            <th>Số khách</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r, idx) => (
            <tr key={r.id}>
              <td>{idx+1}</td>
              <td>{r.title}</td>
              <td>{r.guests}</td>
              <td>{r.price.toLocaleString()} VND</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Sửa</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageRooms;
