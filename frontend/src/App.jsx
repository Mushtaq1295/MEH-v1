import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCards from "./components/AllCards";
import EngineCheckoutForm from "./components/Engines/EngineCheckoutForm";
import AccessCheckoutForm from "./components/Accessories/AccessCheckoutForm";
import Navbar from "./components/Header/Navbar";
import History from "./components/Header/History";
import EngineEditForm from "./components/Engines/EngineEditForm";
import AccessEditForm from "./components/Accessories/AccessEditForm";
import EngineCardDetails from "./components/Engines/EngineCardDetails";
import AccessCardDetails from "./components/Accessories/AccessCardDetails";
import { EnginesProvider } from "./contexts/EnginesContext";
import { AccessoriesProvider } from "./contexts/AccessoriesContext";

const App = () => {
  return (
    <EnginesProvider>
      <AccessoriesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<AllCards />} />
            <Route path="/engines/:brand" element={<EngineCardDetails />} />
            <Route path="/details/enginecheckout" element={<EngineCheckoutForm />} />
            <Route path="/details/accesscheckout" element={<AccessCheckoutForm />} />
            <Route path="/details/engineedit" element={<EngineEditForm />} />
            <Route path="/details/accessedit" element={<AccessEditForm />} />
            <Route path="/history" element={<History />} />
            <Route path="/details" element={<AccessCardDetails />} />
          </Routes>
        </Router>
      </AccessoriesProvider>
    </EnginesProvider>
  );
};

export default App;
