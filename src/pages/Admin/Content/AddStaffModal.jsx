import { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";

const AddStaffModal = ({ show, onHide, onAdd }) => {
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    email: "",
    username: "",
    password: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setNewStaff({ ...newStaff, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!newStaff.name || !newStaff.position || !newStaff.username) return;
    onAdd(newStaff);
    setNewStaff({ name: "", position: "", email: "", username: "", password: "", image: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Tên nhân viên</Form.Label>
            <Form.Control
              type="text"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Vị trí</Form.Label>
            <Form.Control
              type="text"
              value={newStaff.position}
              onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={newStaff.username}
              onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={newStaff.password}
              onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {newStaff.image && (
              <Image src={newStaff.image} rounded fluid className="mt-2" style={{ maxHeight: "150px" }} />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Hủy</Button>
        <Button variant="success" onClick={handleAdd}>Thêm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStaffModal;
