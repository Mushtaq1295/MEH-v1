import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AccessoriesProvider } from "./contexts/AccessoriesContext";
import { EnginesProvider } from "./contexts/EnginesContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Authentication context */}
      <EnginesProvider> 
        <AccessoriesProvider>
          <App />
        </AccessoriesProvider>
      </EnginesProvider>
    </AuthProvider>
  </React.StrictMode>
);
