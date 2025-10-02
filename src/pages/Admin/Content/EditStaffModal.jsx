import { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import styles from "./EditStaffModal.module.scss";
import { updateStaff } from "../../../services/AppService"; // API PUT /users/{id}
import { toast } from "react-toastify";

const EditStaffModal = ({ show, onHide, staff, onUpdated }) => {
  const [updatedStaff, setUpdatedStaff] = useState({
    id: null,
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    image: "",
    imageFile: null,
    facebookAccountId: 0,
    googleAccountId: 0,
  });

  useEffect(() => {
    if (staff) {
      setUpdatedStaff({
        id: staff.staffId,
        fullName: staff.fullName || "",
        email: staff.email || "",
        phoneNumber: staff.phoneNumber || "",
        password: "",
        image: staff.image || "",
        imageFile: null,
        facebookAccountId: staff.facebookAccountId || 0,
        googleAccountId: staff.googleAccountId || 0,
      });
    } else {
      setUpdatedStaff({
        id: null,
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        image: "",
        imageFile: null,
        facebookAccountId: 0,
        googleAccountId: 0,
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStaff({ ...updatedStaff, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedStaff({
        ...updatedStaff,
        image: URL.createObjectURL(file), // preview
        imageFile: file, // file thực gửi lên BE
      });
    }
  };

  const handleSubmit = async () => {
    if (!updatedStaff.id) return;

    try {
      const formData = new FormData();
      formData.append("fullName", updatedStaff.fullName || "");
      formData.append("email", updatedStaff.email || "");
      formData.append("phoneNumber", updatedStaff.phoneNumber || "");
      formData.append("password", updatedStaff.password || "");
      formData.append("facebookAccountId", updatedStaff.facebookAccountId || 0);
      formData.append("googleAccountId", updatedStaff.googleAccountId || 0);

      if (updatedStaff.imageFile) {
        formData.append("files", updatedStaff.imageFile);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await updateStaff(updatedStaff.id, formData);

      if (onUpdated) onUpdated(); // reload danh sách
      toast.success("Cập nhật nhân viên thành công!");
      onHide();

    } catch (err) {
      toast.error("Cập nhật nhân viên thất bại!");
    }
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
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  name="fullName"
                  value={updatedStaff.fullName || ""}
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
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  name="phoneNumber"
                  value={updatedStaff.phoneNumber || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={updatedStaff.password || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Ảnh đại diện</Form.Label>
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
