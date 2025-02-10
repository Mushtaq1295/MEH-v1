import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AllCards from "./components/AllCards";
import EngineCheckoutForm from "./components/Engines/EngineCheckoutForm";
import AccessCheckoutForm from "./components/Accessories/AccessCheckoutForm";
import Navbar from "./components/Header/Navbar";
import History from "./components/Header/History";
import EngineEditForm from "./components/Engines/EngineEditForm";
import AccessEditForm from "./components/Accessories/AccessEditForm";
import EngineCardDetails from "./components/Engines/EngineCardDetails";
import AccessCardDetails from "./components/Accessories/AccessCardDetails";
import { EnginesProvider, useEngines } from "./contexts/EnginesContext";
import { AccessoriesProvider, useAccessories } from "./contexts/AccessoriesContext";
import EngineList from "./components/Engines/EnginesList";

const DataFetcher = () => {
  const location = useLocation();
  const { getAccessoriesData } = useAccessories();
  const { getEnginesData } = useEngines();

  useEffect(() => {
    getAccessoriesData();
    getEnginesData();
  }, [location.pathname]); // Runs when the route changes

  return null; // No UI, just fetching data
};

const App = () => {
  return (
    <EnginesProvider>
      <AccessoriesProvider>
        <Router>
          <Navbar />
          {/* <DataFetcher /> ✅ Ensures data fetch on route change */}
          <Routes>
            {/* Home */}
            <Route path="/" element={<AllCards />} />

            {/* Engines */}
            <Route path="/engines" element={<EngineList/>} />
            <Route path="/engines/details" element={<EngineCardDetails />} />
            <Route path="/engines/checkout" element={<EngineCheckoutForm />} />
            <Route path="/engines/edit" element={<EngineEditForm />} />

            {/* Accessories */}
            <Route path="/accessories/details" element={<AccessCardDetails />} />
            <Route path="/accessories/checkout" element={<AccessCheckoutForm />} />
            <Route path="/accessories/edit" element={<AccessEditForm />} />

            {/* History */}
            <Route path="/history" element={<History />} />

            {/* 404 - Catch All */}
            <Route path="*" element={<h1 className="text-center text-3xl mt-10">404 - Page Not Found</h1>} />
          </Routes>
        </Router>
      </AccessoriesProvider>
    </EnginesProvider>
  );
};

export default App;
