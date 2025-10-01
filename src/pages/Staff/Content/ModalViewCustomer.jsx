import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getCustomerById } from "../../../services/AppService";

const ModalViewCustomer = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState(null);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8088/api/v1";
  const API_HOST = apiBaseUrl.replace("/api/v1", "");

  useEffect(() => {
    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      const res = await getCustomerById(customerId);
      setCustomer(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi load khách hàng:", err);
    }
  };

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>📌 Chi tiết khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customer ? (
          <div>
            <p><b>ID:</b> {customer.customerId}</p>
            <p><b>Tên:</b> {customer.name}</p>
            <p><b>Email:</b> {customer.email}</p>
            <p><b>SĐT:</b> {customer.phone}</p>
            <p><b>Địa chỉ:</b> {customer.address}</p>
            <p><b>Ghi chú:</b> {customer.note}</p>
            <p>
              <b>Trạng thái:</b>{" "}
              {customer.active === 1 ? "Hoạt động" : "Đã khóa"}
            </p>
            <div className="text-center">
              <img
                src={
                  customer.img
                    ? `${API_HOST}${customer.img}`
                    : "https://placehold.co/200x200"
                }
                alt={customer.name}
                style={{ maxHeight: "250px", borderRadius: "8px" }}
              />
            </div>
          </div>
        ) : (
          <p>⏳ Đang tải...</p>
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

export default ModalViewCustomer;
