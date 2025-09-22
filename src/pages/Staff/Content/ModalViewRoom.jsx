import { Modal, Button } from "react-bootstrap";

const ModalViewRoom = ({ show, room, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {room && (
          <>
            <p><b>ID:</b> {room.id}</p>
            <p><b>Tên phòng:</b> {room.title}</p>
            <p><b>Loại phòng:</b> {room.type}</p>
            <p><b>Giá:</b> {room.price} VND / đêm</p>
            <p><b>Diện tích:</b> {room.size} m²</p>
            <p><b>Sức chứa:</b> {room.guests} người</p>
            <p><b>Loại giường:</b> {room.beds?.join(", ")}</p>
            <p><b>View:</b> {room.view}</p>
            <p><b>Địa chỉ:</b> {room.address}</p>
            <p><b>Tiện nghi:</b> {Object.keys(room.amenities).filter(k => room.amenities[k]).join(", ")}</p>
            <p><b>Mô tả ngắn:</b> {room.descShort}</p>
            <p><b>Mô tả chi tiết:</b> {room.descLong}</p>
            {room.image && <img src={room.image} alt={room.title} width="100%" />}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewRoom;
