import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { createRoom } from "../../../../services/AppService";
import "./ModalAllRoom.scss";

const optionsView = [
  { value: "Sea view", label: "Sea view" },
  { value: "Garden view", label: "Garden view" },
  { value: "City view", label: "City view" },
];

const ModalAddRoom = ({ onClose, onSave }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [room, setRoom] = useState({
    name: "",
    title: "",
    address: "",
    description: "",
    guests: "",
    size: "",
    beds: "", // <-- thêm trường beds
    view: null,
    price: "",
    oldPrice: "",
    discount: "",
    airConditioning: false,
    wifi: false,
    hairDryer: false,
    petsAllowed: false, // <-- tiện ích 1
    nonSmoking: false,  // <-- tiện ích 2
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = () => {
    if (!room.name || !room.price) {
      toast.error("Tên phòng và giá không được để trống!");
      return;
    }
    setShowConfirm(true); // mở modal xác nhận
  };

  const handleConfirmSave = async () => {
    const formData = new FormData();
    // append tất cả fields (view xử lý riêng)
    formData.append("name", room.name);
    formData.append("title", room.title);
    formData.append("address", room.address);
    formData.append("description", room.description);
    formData.append("guests", room.guests);
    formData.append("size", room.size);
    formData.append("beds", room.beds);
    formData.append("view", room.view?.value || "");
    formData.append("price", room.price);
    formData.append("oldPrice", room.oldPrice);
    formData.append("discount", room.discount);

    // boolean fields -> gửi dưới dạng string hoặc boolean tùy BE (mình gửi "true"/"false")
    formData.append("airConditioning", room.airConditioning ? "true" : "false");
    formData.append("wifi", room.wifi ? "true" : "false");
    formData.append("hairDryer", room.hairDryer ? "true" : "false");
    formData.append("petsAllowed", room.petsAllowed ? "true" : "false");
    formData.append("nonSmoking", room.nonSmoking ? "true" : "false");

    if (file) formData.append("files", file);

    try {
      const res = await createRoom(formData);
      toast.success("Thêm phòng thành công!");
      if (onSave) onSave(res.data);
      onClose();
    } catch (err) {
      console.error("Lỗi thêm phòng:", err);
      toast.error("Thêm phòng thất bại!");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* Modal chính chứa form thêm phòng */}
      <Modal show onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>➕ Thêm phòng mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <fieldset className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">Thông tin phòng</legend>

            <Form.Group className="mb-3">
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control type="text" name="name" value={room.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control type="text" name="title" value={room.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type="text" name="address" value={room.address} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={room.description} onChange={handleChange} />
            </Form.Group>

            {/* Dòng chứa số lượng người, kích cỡ và beds */}
            <div className="row mb-3">
              <div className="col">
                <Form.Label>Số lượng người</Form.Label>
                <Form.Control type="number" name="guests" value={room.guests} onChange={handleChange} min={1} />
              </div>
              <div className="col">
                <Form.Label>Kích cỡ phòng (m²)</Form.Label>
                <Form.Control type="number" name="size" value={room.size} onChange={handleChange} min={1} />
              </div>
              <div className="col">
                <Form.Label>Giường (beds)</Form.Label>
                <Form.Control type="text" name="beds" value={room.beds} onChange={handleChange} placeholder="Ví dụ: 1 king, 2 twin..." />
              </div>
            </div>

            {/* Dòng chứa giá và giá cũ */}
            <div className="row mb-3">
              <div className="col">
                <Form.Label>Giá (₫)</Form.Label>
                <Form.Control type="number" name="price" value={room.price} onChange={handleChange} />
              </div>
              <div className="col">
                <Form.Label>Giá cũ (₫)</Form.Label>
                <Form.Control type="number" name="oldPrice" value={room.oldPrice} onChange={handleChange} />
              </div>
              <div className="col">
                <Form.Label>Giảm giá (%)</Form.Label>
                <Form.Control type="number" name="discount" value={room.discount} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <Select options={optionsView} placeholder="Chọn view..." value={room.view} onChange={(val) => setRoom((p) => ({ ...p, view: val }))} />
            </div>

            <div className="form-check mt-3 d-flex gap-5 flex-wrap">
              <label className="form-check-label">
                <input type="checkbox" name="wifi" checked={room.wifi} onChange={handleChange} className="form-check-input me-1" />
                Wifi
              </label>

              <label className="form-check-label">
                <input type="checkbox" name="airConditioning" checked={room.airConditioning} onChange={handleChange} className="form-check-input me-1" />
                Điều hòa
              </label>

              <label className="form-check-label">
                <input type="checkbox" name="hairDryer" checked={room.hairDryer} onChange={handleChange} className="form-check-input me-1" />
                Máy sấy tóc
              </label>

              <label className="form-check-label">
                <input type="checkbox" name="petsAllowed" checked={room.petsAllowed} onChange={handleChange} className="form-check-input me-1" />
                Cho phép thú cưng
              </label>

              <label className="form-check-label">
                <input type="checkbox" name="nonSmoking" checked={room.nonSmoking} onChange={handleChange} className="form-check-input me-1" />
                Không hút thuốc
              </label>
            </div>

            <div className="mt-3">
              <Form.Label>Upload ảnh phòng</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef} />
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

      {/* Modal xác nhận thêm phòng */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận lưu</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn <b>thêm phòng</b> này không?</Modal.Body>
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

export default ModalAddRoom;
