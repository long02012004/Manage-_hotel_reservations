import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createStaff } from "../../../../services/AppService";
import { toast } from "react-toastify";

const AddStaffModal = ({ show, onHide, onAdded }) => {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    file: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.file) formData.append("files", form.file);
      await createStaff(formData);
      toast.success("Thêm nhân viên thành công!");
      if (onAdded) onAdded();
      onHide();
      setForm({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        file: null,
      });
    } catch (err) {
      toast.error("Thêm nhân viên thất bại!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Ảnh</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStaffModal;
