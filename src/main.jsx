import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // nếu cần JS cho collapse, dropdown

import Layout from "./Layout";

// Thêm các import dưới đây (đúng đường dẫn tới các component của bạn)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Layout></Layout>
    </BrowserRouter>
  </StrictMode>
);
