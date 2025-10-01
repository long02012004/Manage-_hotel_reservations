import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import styles from "./ManageRooms.module.scss";

const ModalEditRoom = ({ room, onClose, onSave }) => {
  const [edited, setEdited] = useState({ ...room });
  const [preview, setPreview] = useState(room.image ? room.image : null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "files" && files && files[0]) {
      const file = files[0];
      setEdited({ ...edited, files: file });
      setPreview(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setEdited({ ...edited, [name]: checked });
    } else {
      setEdited({ ...edited, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(edited).forEach((key) => {
      if (edited[key] !== undefined && edited[key] !== null) {
        formData.append(key, edited[key]);
      }
    });

    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.modal} centered size="xl">
      <div className={styles.modalContent}>
        <h3 className="mb-3">✏️ Sửa Phòng</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Tên phòng
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="name"
                value={edited.name || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

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
              Diện tích (m²)
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="size"
                value={edited.size || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Giường
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="beds"
                value={edited.beds || ""}
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
              Giá cũ
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="oldPrice"
                value={edited.oldPrice || ""}
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

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              View
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="view"
                value={edited.view || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Địa chỉ
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="address"
                value={edited.address || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          {/* Upload ảnh */}
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
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="preview"
                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                  />
                </div>
              )}
            </Col>
          </Form.Group>

          {/* Boolean fields */}
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

          <div className={styles.actions + " mt-3"}>
            <Button type="submit" variant="primary" className="me-2">
              Cập nhật
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalEditRoom;
