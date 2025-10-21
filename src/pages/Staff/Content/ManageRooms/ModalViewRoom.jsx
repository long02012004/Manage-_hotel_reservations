import { Modal, Button, Row, Col, Table } from "react-bootstrap";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8088/api/v1";
const API_HOST = apiBaseUrl.replace("/api/v1", "");

const ModalViewRoom = ({ show, room, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {room && (
          <>
            <Row>
              {/* Cột ảnh */}
              <Col md={5} className="d-flex align-items-center">
                {room.image ? (
                  <img
                    src={`${API_HOST}${room.image}`}
                    alt={room.title}
                    className="img-fluid rounded shadow-sm"
                  />
                ) : (
                  <div className="bg-light text-muted text-center p-3 w-100 rounded">
                    Không có ảnh
                  </div>
                )}
              </Col>

              {/* Cột thông tin cơ bản */}
              <Col md={7}>
                <h5 className="mb-3">{room.title}</h5>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td><b>ID:</b></td>
                      <td>{room.id}</td>
                    </tr>
                    <tr>
                      <td><b>Loại phòng:</b></td>
                      <td>{room.type}</td>
                    </tr>
                    <tr>
                      <td><b>Giá:</b></td>
                      <td>{room.price} VND / đêm</td>
                    </tr>
                    <tr>
                      <td><b>Diện tích:</b></td>
                      <td>{room.size} m²</td>
                    </tr>
                    <tr>
                      <td><b>Sức chứa:</b></td>
                      <td>{room.guests} người</td>
                    </tr>
                    <tr>
                      <td><b>Loại giường:</b></td>
                      <td>
                        {Array.isArray(room.beds)
                          ? room.beds.join(", ")
                          : room.beds || "Không có dữ liệu"}
                      </td>
                    </tr>
                    <tr>
                      <td><b>View:</b></td>
                      <td>{room.view}</td>
                    </tr>
                    <tr>
                      <td><b>Địa chỉ:</b></td>
                      <td>{room.address}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Tiện nghi */}
            <div className="mt-3">
              <h6>Tiện nghi</h6>
              <p>
                {room.amenities
                  ? Object.keys(room.amenities)
                      .filter((k) => room.amenities[k])
                      .join(", ")
                  : "Không có dữ liệu"}
              </p>
            </div>

            {/* Mô tả */}
            <div className="mt-3">
              <h6>Mô tả ngắn</h6>
              <p>{room.descShort || "Không có dữ liệu"}</p>

              <h6>Mô tả chi tiết</h6>
              <p>{room.descLong || "Không có dữ liệu"}</p>
            </div>
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
