import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role_id = parseInt(localStorage.getItem("role_id") || "1");
    setIsLoggedIn(loggedIn);
    setRole(role_id);

    // Optional: redirect nếu user đã login nhưng đang ở /login
    if (loggedIn && window.location.pathname === "/login") {
      if (role_id === 3) navigate("/admins/dashboard");
      else if (role_id === 2) navigate("/staff/rooms");
      else navigate("/home");
    }
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} role={role} />
      <ScrollToTop /> {/* 👈 thêm dòng này ở đây */}
      <Outlet />
    </>
  );
}

export default App;
