import { BrowserRouter, Route, Routes } from "react-router-dom";

// User
import App from "./App.jsx";
import Home from "./pages/User/Home/Home.jsx";
import Blog from "./pages/User/Blog/BlogPage.jsx";
import Offers from "./pages/User/Offers/OffersPage.jsx";
import Food from "./pages/User/Food/Food.jsx";
import Login from "./pages/Auth/LogIn/LogIn.jsx";
import Profile from "./pages/User/Profile/Profile.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import ViewRoom from "./pages/User/ViewRoom/ViewRoom.jsx";
import Contact from "./pages/User/Contact/Contact.jsx";

// Admin
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Content/Dashboard.jsx";
import ManageStaff from "./pages/Admin/Content/ManageStaff.jsx";

// Toast
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <Routes>
        {/* ================= User Routes ================= */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> 
          <Route path="home" element={<Home />} />
          <Route path="offers" element={<Offers />} />
          <Route path="food" element={<Food />} />
          <Route path="profile" element={<Profile />} />
          <Route path="viewroom" element={<ViewRoom />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* ================= Admin Routes ================= */}
        <Route path="/admins" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-staff" element={<ManageStaff />} />
        </Route>

        {/* ================= Auth / Other Routes ================= */}
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="blog" element={<Blog />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Layout;

