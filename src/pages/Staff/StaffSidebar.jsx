import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaComments,
  FaBed,
  FaBlog,
  FaTags,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./StaffSidebar.module.scss";
import { logo } from "../../assets/images/img";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      path: "/staff/rooms",
      icon: <FaBed />, // Quản lý phòng
      label: "Quản lý phòng",
    },
    {
      path: "/staff/reviews",
      icon: <FaComments />, // Phản hồi đánh giá
      label: "Phản hồi đánh giá",
    },
    {
      path: "/staff/customers",
      icon: <FaUsers />, // Quản lý tài khoản khách hàng
      label: "Quản lý tài khoản khách hàng",
    },
    {
      path: "/staff/content",
      icon: <FaBlog />, // Quản lý Blog
      label: "Quản lý Blog",
    },
    {
      path: "/staff/prices",
      icon: <FaTags />, // Giá & khuyến mãi
      label: "Quản lý giá và khuyến mãi",
    },
    {
      path: "/staff/settings",
      icon: <FaCog />, // Cài đặt
      label: "Cài đặt",
    },
  ];

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
        </div>
        <div className={styles.logoTextContainer}>
          {!collapsed && <span className={styles.logoText}>Admin Panel</span>}
          <button
            className={styles.toggleBtn}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "▶" : "◀"}
          </button>
        </div>
      </div>

      {/* Menu */}
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`${styles.menuItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
          >
            <Link to={item.path} className={styles.menuLink}>
              <span className={styles.icon}>{item.icon}</span>
              {!collapsed && <span className={styles.label}>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className={styles.footer}>
        <Link to="/logout" className={styles.menuLink}>
          <FaSignOutAlt className={styles.icon} />
          {!collapsed && <span className={styles.label}>Đăng xuất</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
