import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCards from "./components/AllCards";
import EngineCardDetails from "./components/Engines/EngineCardDetails";
import AccessCardDetails from "./components/Accessories/AccessCardDetails";
import Navbar from "./components/Header/Navbar";
import EngineCard from "./components/Engines/EngineCard";
// import AddForm from "./components/AddForm";
import EngineCheckoutForm from "./components/Engines/EngineCheckoutForm"
import AccessCheckoutForm from "./components/Accessories/AccessCheckoutForm"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import History from "./components/Header/History";
import EngineEditForm from "./components/Engines/EngineEditForm";
import AccessEditForm from "./components/Accessories/AccessEditForm";


const App = () => {
  const ScrollToSection = () => {
    const { hash } = useLocation();
  
    useEffect(() => {
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [hash]);
  
    return null; // No UI, just handling scroll
  };

  return (
    <>
      {/* <Navbar/> */}
      <Router> {/* ✅ Wrap everything inside Router */}
      <Navbar />  {/* ✅ Navbar is now inside Router */}
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<AllCards />}/>
        <Route path="/enginecheckout" element={ <EngineCheckoutForm/>}/>
        <Route path="/accesscheckout" element={ <AccessCheckoutForm/>}/>
        <Route path="/engineedit" element={<EngineEditForm />} />
        <Route path="/accessedit" element={<AccessEditForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/details" element={<AccessCardDetails />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
