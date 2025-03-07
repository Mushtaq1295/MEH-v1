import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AccessoriesProvider } from "./contexts/AccessoriesContext";
import { EnginesProvider } from "./contexts/EnginesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <EnginesProvider>
    <AccessoriesProvider>
      <App />
    </AccessoriesProvider>
  </EnginesProvider>
);
