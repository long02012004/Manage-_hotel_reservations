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
import RoomDetail from "./pages/User/ViewRoom/RoomDetail.jsx";
import Contact from "./pages/User/Contact/Contact.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword.jsx";

// Admin
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Content/Dashboard.jsx";
import ManageStaff from "./pages/Admin/Content/ManageStaff.jsx";

// Staff
import StaffLayout from "./pages/Staff/StaffLayout.jsx";
import ManageRooms from "./pages/Staff/Content/ManageRooms/ManageRooms.jsx";
import ManageReviews from "./pages/Staff/Content/ManageReview/ManageReviews.jsx";
import ManageCustomers from "./pages/Staff/Content/ManageCustomer/ManageCustomers.jsx";
import ManageContent from "./pages/Staff/Content/ManageContent/ManageContent.jsx";
import ManagePrices from "./pages/Staff/Content/ManagePrices/ManagePrices.jsx";
import ManageBooking from "./pages/Staff/Content/ManageBooking/ManageBooking.jsx";

// Toast
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotFound = () => {
  return (
    <div className="alert alert-danger">
      404.Not found data with your current URL
    </div>
  );
};
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
          <Route path="viewroom/:id" element={<RoomDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* ================= Admin Routes ================= */}
        <Route path="/admins" element={<AdminLayout />}>
          {/* Route riêng của admin */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-staff" element={<ManageStaff />} />

          {/* ✅ Gộp thêm các route staff vào đây */}
          <Route path="rooms" element={<ManageRooms />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="customers" element={<ManageCustomers />} />
          <Route path="content" element={<ManageContent />} />
          <Route path="prices" element={<ManagePrices />} />
          <Route path="bookings" element={<ManageBooking />} />
        </Route>

        {/* ================= Staff Routes ================= */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<ManageRooms />} />
          <Route path="rooms" element={<ManageRooms />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="customers" element={<ManageCustomers />} />
          <Route path="content" element={<ManageContent />} />
          <Route path="prices" element={<ManagePrices />} />
          <Route path="bookings" element={<ManageBooking />} />
        </Route>

        {/* ================= Auth / Other Routes ================= */}
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="blog" element={<Blog />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
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
