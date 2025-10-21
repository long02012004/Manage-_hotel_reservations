import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "../../../../utils/AxiosCustomize"; // axios đã config token
import styles from "./ManageRooms.module.scss";
import { toast } from "react-toastify";

const ModalEditRoom = ({ room, onClose, onUpdated }) => {
  const [edited, setEdited] = useState({ ...room });
  const [preview, setPreview] = useState(room.image || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setEdited({ ...edited, [name]: checked });
    } else if (name === "files" && files && files[0]) {
      setEdited({ ...edited, files: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setEdited({ ...edited, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // String fields
      ["title", "description", "address", "view", "beds", "name"].forEach(
        (field) => formData.append(field, edited[field] || "")
      );

      // Number fields
      ["price", "oldPrice", "guests", "size", "discount"].forEach((field) =>
        formData.append(field, edited[field]?.toString() || "0")
      );

      // Boolean fields
      [
        "airConditioning",
        "wifi",
        "hairDryer",
        "petsAllowed",
        "nonSmoking",
      ].forEach((field) =>
        formData.append(field, edited[field] ? "true" : "false")
      );

      // File
      if (edited.files) formData.append("files", edited.files);

      console.log("🚀 FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.put(`/staff/rooms/${room.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Update response:", res.data);
      toast.success("Cập nhật phòng thành công!");
      onUpdated(); // gọi reload table
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật phòng:", err);
      toast.error("Lỗi khi cập nhật phòng! Xem console để biết chi tiết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal} centered size="xl">
      <div className={styles.modalContent}>
        <h3 className="mb-3">✏️ Sửa Phòng</h3>

        <Form onSubmit={handleSubmit}>
          {/* Các field text/number/checkbox như cũ */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Tiêu đề
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="title"
                value={edited.title || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Mô tả
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={edited.description || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Số khách
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="guests"
                value={edited.guests || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Giá hiện tại
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="price"
                value={edited.price || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Giảm giá (%)
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="discount"
                value={edited.discount || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          {/* Checkbox */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Tiện nghi
            </Form.Label>
            <Col sm={9}>
              <Form.Check
                type="checkbox"
                label="Điều hòa"
                name="airConditioning"
                checked={edited.airConditioning || false}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Wifi"
                name="wifi"
                checked={edited.wifi || false}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Máy sấy tóc"
                name="hairDryer"
                checked={edited.hairDryer || false}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Cho phép thú cưng"
                name="petsAllowed"
                checked={edited.petsAllowed || false}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Không hút thuốc"
                name="nonSmoking"
                checked={edited.nonSmoking || false}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          {/* File */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ảnh phòng
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                name="files"
                accept="image/*"
                onChange={handleChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    maxWidth: "200px",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                />
              )}
            </Col>
          </Form.Group>

          <div className={styles.actions + " mt-3"}>
            <Button type="submit" variant="primary" disabled={loading}>
              Cập nhật
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="ms-2"
            >
              Hủy
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalEditRoom;
