import { Modal, Button, Row, Col, Table, Badge } from "react-bootstrap";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8088/api/v1";
const API_HOST = apiBaseUrl.replace("/api/v1", "");

const ModalViewRoom = ({ show, room, onClose }) => {
  if (!room) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>📘 Chi tiết phòng</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          {/* Cột ảnh */}
          <Col md={5} className="d-flex align-items-center">
            {room.image ? (
              <img
                src={`${API_HOST}${room.image}`}
                alt={room.title}
                className="img-fluid rounded shadow-sm"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            ) : (
              <div className="bg-light text-muted text-center p-3 w-100 rounded">
                Không có ảnh
              </div>
            )}
          </Col>

          {/* Cột thông tin */}
          <Col md={7}>
            <h5 className="mb-3 fw-bold">{room.title || "Không có tiêu đề"}</h5>
            <Table borderless size="sm" className="align-middle">
              <tbody>
                <tr>
                  <td><b>Tên phòng:</b></td>
                  <td>{room.name || "Không có dữ liệu"}</td>
                </tr>
                <tr>
                  <td><b>Địa chỉ:</b></td>
                  <td>{room.address || "Không có dữ liệu"}</td>
                </tr>
                <tr>
                  <td><b>Giá hiện tại:</b></td>
                  <td>{room.price ? `${room.price.toLocaleString()} ₫` : "Không có dữ liệu"}</td>
                </tr>
                <tr>
                  <td><b>Giá cũ:</b></td>
                  <td>{room.oldPrice ? `${room.oldPrice.toLocaleString()} ₫` : "Không có"}</td>
                </tr>
                <tr>
                  <td><b>Giảm giá:</b></td>
                  <td>{room.discount ? `${room.discount}%` : "Không có"}</td>
                </tr>
                <tr>
                  <td><b>Diện tích:</b></td>
                  <td>{room.size ? `${room.size} m²` : "Không có dữ liệu"}</td>
                </tr>
                <tr>
                  <td><b>Sức chứa:</b></td>
                  <td>{room.guests ? `${room.guests} người` : "Không có dữ liệu"}</td>
                </tr>
                <tr>
                  <td><b>Giường:</b></td>
                  <td>{room.beds || "Không có dữ liệu"}</td>
                </tr>
                <tr>
                  <td><b>View:</b></td>
                  <td>{room.view || "Không có dữ liệu"}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Mô tả */}
        <div className="mt-3">
          <h6 className="fw-bold">Mô tả</h6>
          <p className="text-muted">
            {room.description || "Không có mô tả cho phòng này."}
          </p>
        </div>

        {/* Tiện ích */}
        <div className="mt-3">
          <h6 className="fw-bold mb-2">Tiện ích phòng</h6>
          <div className="d-flex flex-wrap gap-2">
            {room.wifi && <Badge bg="success">Wi-Fi</Badge>}
            {room.airConditioning && <Badge bg="info">Điều hòa</Badge>}
            {room.hairDryer && <Badge bg="warning text-dark">Máy sấy tóc</Badge>}
            {room.petsAllowed && <Badge bg="secondary">Thú cưng</Badge>}
            {room.nonSmoking && <Badge bg="danger">Không hút thuốc</Badge>}
            {!room.wifi &&
              !room.airConditioning &&
              !room.hairDryer &&
              !room.petsAllowed &&
              !room.nonSmoking && (
                <span className="text-muted">Không có tiện ích nào</span>
              )}
          </div>
        </div>
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
