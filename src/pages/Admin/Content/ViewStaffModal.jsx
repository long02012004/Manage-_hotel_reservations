// src/components/Staff/ViewStaffModal.jsx
import React from "react";
import { Modal, Button, Row, Col, Image, Form } from "react-bootstrap";
import styles from './ViewStaffModal.module.scss';

const ViewStaffModal = ({ show, handleClose, staff }) => {
  if (!staff) return null; // Trường hợp chưa chọn nhân viên

  return (
    <Modal show={show} onHide={handleClose} centered size="xl"> 
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>Thông tin nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={4} className="text-center">
            <Image
              className={styles.staffImage}
              src={staff.image || "/default-avatar.png"}
              fluid
            />
          </Col>
          <Col md={8}>
            <Form.Group className="mb-2">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" value={staff.name} readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={staff.username} readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={staff.email} readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Vị trí</Form.Label>
              <Form.Control type="text" value={staff.position} readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={staff.password}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewStaffModal;
