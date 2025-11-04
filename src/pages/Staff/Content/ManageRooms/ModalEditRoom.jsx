import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { updateRoom } from "../../../../services/AppService"; // <-- API cập nhật phòng
import "./ModalAllRoom.scss";

const optionsView = [
  { value: "Sea view", label: "Sea view" },
  { value: "Garden view", label: "Garden view" },
  { value: "City view", label: "City view" },
];

const ModalEditRoom = ({ room, onClose, onUpdated }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [editedRoom, setEditedRoom] = useState({
    name: room.name || "",
    title: room.title || "",
    address: room.address || "",
    description: room.description || "",
    guests: room.guests || "",
    size: room.size || "",
    beds: room.beds || "",
    view: room.view ? { value: room.view, label: room.view } : null,
    price: room.price || "",
    oldPrice: room.oldPrice || "",
    discount: room.discount || "",
    airConditioning: room.airConditioning || false,
    wifi: room.wifi || false,
    hairDryer: room.hairDryer || false,
    petsAllowed: room.petsAllowed || false,
    nonSmoking: room.nonSmoking || false,
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedRoom((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!editedRoom.name || !editedRoom.price) {
      toast.error("Tên phòng và giá không được để trống!");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmSave = async () => {
    const formData = new FormData();
    formData.append("name", editedRoom.name);
    formData.append("title", editedRoom.title);
    formData.append("address", editedRoom.address);
    formData.append("description", editedRoom.description);
    formData.append("guests", editedRoom.guests);
    formData.append("size", editedRoom.size);
    formData.append("beds", editedRoom.beds);
    formData.append("view", editedRoom.view?.value || "");
    formData.append("price", editedRoom.price);
    formData.append("oldPrice", editedRoom.oldPrice);
    formData.append("discount", editedRoom.discount);
    formData.append("airConditioning", editedRoom.airConditioning ? "true" : "false");
    formData.append("wifi", editedRoom.wifi ? "true" : "false");
    formData.append("hairDryer", editedRoom.hairDryer ? "true" : "false");
    formData.append("petsAllowed", editedRoom.petsAllowed ? "true" : "false");
    formData.append("nonSmoking", editedRoom.nonSmoking ? "true" : "false");
    if (file) formData.append("files", file);

    try {
      await updateRoom(room.id, formData);
      toast.success("Cập nhật phòng thành công!");
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error("Lỗi cập nhật phòng:", err);
      toast.error("Cập nhật phòng thất bại!");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* Modal chính chứa form sửa phòng */}
      <Modal show onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>✏️ Chỉnh sửa thông tin phòng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <fieldset className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">Thông tin phòng</legend>

            <Form.Group className="mb-3">
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedRoom.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editedRoom.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editedRoom.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editedRoom.description}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Dòng chứa số lượng người, kích cỡ và giường */}
            <div className="row mb-3">
              <div className="col">
                <Form.Label>Số lượng người</Form.Label>
                <Form.Control
                  type="number"
                  name="guests"
                  value={editedRoom.guests}
                  onChange={handleChange}
                  min={1}
                />
              </div>
              <div className="col">
                <Form.Label>Kích cỡ phòng (m²)</Form.Label>
                <Form.Control
                  type="number"
                  name="size"
                  value={editedRoom.size}
                  onChange={handleChange}
                  min={1}
                />
              </div>
              <div className="col">
                <Form.Label>Giường (beds)</Form.Label>
                <Form.Control
                  type="text"
                  name="beds"
                  value={editedRoom.beds}
                  onChange={handleChange}
                  placeholder="Ví dụ: 1 king, 2 twin..."
                />
              </div>
            </div>

            {/* Dòng giá, giá cũ, giảm giá */}
            <div className="row mb-3">
              <div className="col">
                <Form.Label>Giá (₫)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={editedRoom.price}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <Form.Label>Giá cũ (₫)</Form.Label>
                <Form.Control
                  type="number"
                  name="oldPrice"
                  value={editedRoom.oldPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <Form.Label>Giảm giá (%)</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  value={editedRoom.discount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <Select
                options={optionsView}
                placeholder="Chọn view..."
                value={editedRoom.view}
                onChange={(val) => setEditedRoom((p) => ({ ...p, view: val }))}
              />
            </div>

            {/* Tiện ích */}
            <div className="form-check mt-3 d-flex gap-5 flex-wrap">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={editedRoom.wifi}
                  onChange={handleChange}
                  className="form-check-input me-1"
                />
                Wifi
              </label>

              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="airConditioning"
                  checked={editedRoom.airConditioning}
                  onChange={handleChange}
                  className="form-check-input me-1"
                />
                Điều hòa
              </label>

              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="hairDryer"
                  checked={editedRoom.hairDryer}
                  onChange={handleChange}
                  className="form-check-input me-1"
                />
                Máy sấy tóc
              </label>

              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={editedRoom.petsAllowed}
                  onChange={handleChange}
                  className="form-check-input me-1"
                />
                Cho phép thú cưng
              </label>

              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="nonSmoking"
                  checked={editedRoom.nonSmoking}
                  onChange={handleChange}
                  className="form-check-input me-1"
                />
                Không hút thuốc
              </label>
            </div>

            {/* Upload ảnh */}
            <div className="mt-3">
              <Form.Label>Upload ảnh phòng</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileInputRef}
              />
            </div>
          </fieldset>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="warning" onClick={handleSubmit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận cập nhật */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận cập nhật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn <b>cập nhật</b> thông tin phòng này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmSave}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditRoom;
