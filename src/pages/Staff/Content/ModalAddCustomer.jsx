import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { createCustomer } from "../../../services/AppService";
import { toast } from "react-toastify";

const ModalAddCustomer = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
    address: "",
    files: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, files: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      console.log("📤 Dữ liệu gửi lên BE:", [...formData.entries()]);

      const res = await createCustomer(formData);

      console.log(" Kết quả từ BE:", res.data);

      toast.success(" Thêm khách hàng thành công!");
      onSave();
      onClose();
    } catch (err) {
      console.error(" Lỗi khi gọi API thêm khách hàng:", err);
      if (err.response) {
        console.error(" BE trả lỗi:", err.response.data);
        toast.error(` Lỗi BE: ${err.response.data.message || "Lỗi server"}`);
      } else {
        toast.error(" Không kết nối được tới server");
      }
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>➕ Thêm khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            name="name"
            placeholder="Tên khách hàng"
            className="mb-2"
            onChange={handleChange}
          />
          <Form.Control
            name="email"
            placeholder="Email"
            type="email"
            className="mb-2"
            onChange={handleChange}
          />
          <Form.Control
            name="phone"
            placeholder="Số điện thoại"
            className="mb-2"
            onChange={handleChange}
          />
          <Form.Control
            name="address"
            placeholder="Địa chỉ"
            className="mb-2"
            onChange={handleChange}
          />
          <Form.Control
            name="note"
            placeholder="Ghi chú"
            className="mb-2"
            onChange={handleChange}
          />
          <Form.Control
            type="file"
            name="files"
            accept="image/*"
            className="mb-2"
            onChange={handleFileChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          💾 Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddCustomer;
