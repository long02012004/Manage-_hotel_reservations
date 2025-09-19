// src/pages/Staff/StaffLayout.jsx
import { Outlet } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";
import styles from "./StaffLayout.module.scss";

const StaffLayout = () => {
  return (
    <div className={styles.wrapper}>
      <StaffSidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;
