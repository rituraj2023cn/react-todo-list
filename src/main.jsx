import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop={true}
      closeOnClick
      draggable
      theme="light"
    />
  </React.StrictMode>
);
