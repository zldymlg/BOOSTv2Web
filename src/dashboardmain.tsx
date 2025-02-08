import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Dashboard.tsx";
import "bootstrap/dist/css/bootstrap.css";

createRoot(document.getElementById("dashboard")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
