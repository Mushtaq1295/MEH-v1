import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import DateFilter from "./components/Header/DateFilter";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import HistoryAccessCardDetails from "./components/History/HistoryAccessories/HistoryAccessCardDetails";
import HistoryEngineCardDetails from "./components/History/HistoryEngines/HistoryEngineCardDetails";
import { HistoryAccessoriesProvider } from "./contexts/HistoryAccessoriesContext";

// Protected Route Component
const PrivateRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/login" />;
};

// Navbar Visibility Control
import { Outlet } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet /> {/* ✅ This ensures child routes are displayed */}
    </>
  );
};

const App = () => {
  return (
    <HistoryAccessoriesProvider>
      <EnginesProvider>
        <AccessoriesProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
            pauseOnFocusLoss={false}
            newestOnTop={true}
          />
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<AllCards />} />

                {/* Authentication Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Engines Routes */}
                <Route path="/engines">
                  <Route path=":brand" element={<EnginesList />} />
                  <Route path=":brand/:id" element={<EngineCardDetails />} />
                  <Route
                    path=":brand/:id/engineedit"
                    element={<EngineEditForm />}
                  />
                  <Route
                    path=":brand/:id/enginecheckout"
                    element={<EngineCheckoutForm />}
                  />
                </Route>

                {/* Accessories Routes */}
                <Route path="/accessories">
                  <Route path=":id" element={<AccessCardDetails />} />
                  <Route path=":id/accessedit" element={<AccessEditForm />} />
                  <Route
                    path=":id/accesscheckout"
                    element={<AccessCheckoutForm />}
                  />
                </Route>

                {/* History Routes */}
                <Route path="/history">
                  <Route path="" element={<HistoryAllCards />} />
                  <Route
                    path="engines/:id"
                    element={<HistoryEngineCardDetails />}
                  />
                  <Route
                    path="accessories/:id"
                    element={<HistoryAccessCardDetails />}
                  />
                  <Route path="datefilter" element={<DateFilter />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AccessoriesProvider>
      </EnginesProvider>
    </HistoryAccessoriesProvider>
  );
};

export default App;
