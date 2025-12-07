import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastProvider } from "@/contexts/ToastContext";
import UserContextProvider from "@/contexts/UserContextProvider";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </UserContextProvider>
  </StrictMode>
);
