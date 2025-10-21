import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaChartBar,
  FaHome,
  FaCog,
  FaSignOutAlt,
  FaComments,
  FaBed,
  FaBlog,
  FaTags,
} from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";

import styles from "./Sidebar.module.scss";
import { logo } from "../../assets/images/img";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admins/dashboard", icon: <FaHome />, label: "Dashboard" },
    {
      path: "/admins/manage-staff",
      icon: <FaUsers />,
      label: "Quản lý nhân viên",
    },
    {
      path: "/admins/rooms",
      icon: <FaBed />, // Quản lý phòng
      label: "Quản lý phòng",
    },
    {
      path: "/admins/reviews",
      icon: <FaComments />, // Phản hồi đánh giá
      label: "Phản hồi đánh giá",
    },
    {
      path: "/admins/customers",
      icon: <FaUsers />, // Quản lý tài khoản khách hàng
      label: "Quản lý tài khoản khách hàng",
    },
    {
      path: "/admins/content",
      icon: <FaBlog />, // Quản lý Blog
      label: "Quản lý Blog",
    },
    {
      path: "/admins/prices",
      icon: <FaTags />, // Giá & khuyến mãi
      label: "Quản lý giá và khuyến mãi",
    },
    {
      path: "/admins/bookings",
      icon: <TbBrandBooking />, // Quản lý đặt phòng
      label: "Quản lý đặt phòng",
    },
    { path: "/admins/settings", icon: <FaCog />, label: "Cài đặt" },
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
