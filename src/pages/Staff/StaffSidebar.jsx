// src/pages/Staff/StaffSidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./StaffSidebar.module.scss";

const StaffSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.logo}>Staff Portal</div>
      <nav className={styles.nav}>
        <NavLink
          to="rooms"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Quản lý phòng
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Phản hồi đánh giá
        </NavLink>
        <NavLink
          to="customers"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Quản lý khách hàng
        </NavLink>
        <NavLink
          to="content"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Quản lý nội dung
        </NavLink>
        <NavLink
          to="prices"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Quản lý giá & khuyến mãi
        </NavLink>
      </nav>
      <button
        className={styles.toggleBtn}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "→" : "←"}
      </button>
    </aside>
  );
};

export default StaffSidebar;
