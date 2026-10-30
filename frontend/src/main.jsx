// ============================================================
// main.jsx — React application entry point
// Renders the root App component into the #root DOM element.
// BrowserRouter is set up here so all child components
// can access React Router hooks (useNavigate, useLocation etc.)
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter provides routing context to the entire app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
