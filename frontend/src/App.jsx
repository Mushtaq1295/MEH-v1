import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCards from "./components/AllCards";
import EngineCheckoutForm from "./components/Engines/EngineCheckoutForm";
import AccessCheckoutForm from "./components/Accessories/AccessCheckoutForm";
import Navbar from "./components/Header/Navbar";
import EngineEditForm from "./components/Engines/EngineEditForm";
import AccessEditForm from "./components/Accessories/AccessEditForm";
import EngineCardDetails from "./components/Engines/EngineCardDetails";
import AccessCardDetails from "./components/Accessories/AccessCardDetails";
import EnginesList from "./components/Engines/EnginesList";
import { EnginesProvider } from "./contexts/EnginesContext";
import { AccessoriesProvider } from "./contexts/AccessoriesContext";
import HistoryAllCards from "./components/History/HistoryAllCards";
import History from "./components/Header/History";

const App = () => {
  return (
    <EnginesProvider>
      <AccessoriesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<AllCards />} />

            <Route path="/engines/:brand" element={<EnginesList />} />
            <Route path="/engines/:brand/:id" element={<EngineCardDetails />} />
            <Route path="/engines/:brand/:id/enginecheckout" element={<EngineCheckoutForm />} />
            <Route path="/engines/:brand/:id/engineedit" element={<EngineEditForm />} />
            
            <Route path="accessories/:id" element={<AccessCardDetails />} />
            <Route path="/accessories/:id/accessedit" element={<AccessEditForm />} />
            <Route path="/accessories/:id/accesscheckout" element={<AccessCheckoutForm />} />
            
            <Route path="/history" element={<HistoryAllCards />} />
          </Routes>
        </Router>
      </AccessoriesProvider>
    </EnginesProvider>
  );
};

export default App;
