import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.scss";

const AdminLayout = () => {
  return (
    <div className={`d-flex ${styles.adminLayout}`}>
      <Sidebar />
      <div className={`flex-grow-1 p-4 ${styles.content}`}>
        <Outlet /> {/* Trang con sẽ hiển thị ở đây */}
      </div>
    </div>
  );
};

export default AdminLayout;
