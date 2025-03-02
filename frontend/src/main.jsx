import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AccessoriesProvider } from "./contexts/AccessoriesContext";
import { EnginesProvider } from "./contexts/EnginesContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { HistoryAccessoriesProvider } from "./contexts/HistoryAccessoriesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider>  */}
      <HistoryAccessoriesProvider>
      <EnginesProvider> 
        <AccessoriesProvider>
          <App />
        </AccessoriesProvider>
      </EnginesProvider>
      </HistoryAccessoriesProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
