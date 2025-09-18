import { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import styles from "./EditStaffModal.module.scss";

const EditStaffModal = ({ show, onHide, staff, onUpdate }) => {
  const [updatedStaff, setUpdatedStaff] = useState({
    id: null,
    name: "",
    position: "",
    email: "",
    username: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    if (staff) setUpdatedStaff(staff);
    else
      setUpdatedStaff({
        id: null,
        name: "",
        position: "",
        email: "",
        username: "",
        password: "",
        image: "",
      });
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStaff({ ...updatedStaff, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file)
      setUpdatedStaff({ ...updatedStaff, image: URL.createObjectURL(file) });
  };

  const handleSubmit = () => {
    if (!updatedStaff.id) return;
    onUpdate(updatedStaff);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>Sửa nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={8}>
            <Form className={styles.modalBody}>
              <Form.Group className="mb-2">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  name="name"
                  value={updatedStaff.name || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Vị trí</Form.Label>
                <Form.Control
                  name="position"
                  value={updatedStaff.position || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={updatedStaff.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={updatedStaff.username || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={updatedStaff.password || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            {updatedStaff.image && (
              <Image
                src={updatedStaff.image}
                rounded
                style={{ maxHeight: "250px", border: "1px solid #ddd" }}
              />
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          className={styles.modalFooterButton}
        >
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          className={styles.modalSaveButton}
        >
          💾 Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStaffModal;
