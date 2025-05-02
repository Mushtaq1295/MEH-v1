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
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { HistoryProvider } from "./contexts/HistoryContext";

// Protected Route Component
const PrivateRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/login" />;
};

// Navbar Visibility Control
import { Outlet } from "react-router-dom";
import { History } from "./components/History/History";
import AccessoryHistoryDetails from "./components/History/AccessoryHistoryDetails";
import EngineHistoryDetails from "./components/History/EngineHistoryDetails";

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
    <HistoryProvider>
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
                  <Route path=":brand" 
                      element={<PrivateRoute element={<EnginesList />} />}
                      // element={<EnginesList />} 
                   />
                  <Route path=":brand/:id" 
                    element={<PrivateRoute element={<EngineCardDetails />} />}
                    // element={<EngineCardDetails />} 
                    />
                  <Route
                    path=":brand/:id/engineedit"
                    element={<PrivateRoute element={<EngineEditForm />} />}
                    // element={<EngineEditForm />}
                  />
                  <Route
                    path=":brand/:id/enginecheckout"
                    element={<PrivateRoute element={<EngineCheckoutForm />} />}
                    // element={<EngineCheckoutForm />}
                  />
                </Route>

                {/* Accessories Routes */}
                <Route path="/accessories">
                  <Route path=":id" 
                    element={<PrivateRoute element={<AccessCardDetails />} />}
                    // element={<AccessCardDetails />} 
                    />
                  <Route path=":id/accessedit" 
                    element={<PrivateRoute element={<AccessEditForm />} />}
                    // element={<AccessEditForm />} 
                    />
                  <Route
                    path=":id/accesscheckout"
                    element={<PrivateRoute element={<AccessCheckoutForm />} />}
                    // element={<AccessCheckoutForm />}
                  />
                </Route>

                {/* History Routes */}
                <Route path="/history">
                  <Route path="" 
                    element={<PrivateRoute element={<History />} />}
                    // element={<History />} 
                    />
                  <Route
                    path="accessory/:id"
                    element={<PrivateRoute element={<AccessoryHistoryDetails />} />}
                    // element={<AccessoryHistoryDetails />}
                  />
                  <Route
                    path="engine/:id"
                    element={<PrivateRoute element={<EngineHistoryDetails />} />}
                    // element={<EngineHistoryDetails />}
                  />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AccessoriesProvider>
      </EnginesProvider>
    </HistoryProvider>
  );
};

export default App;
