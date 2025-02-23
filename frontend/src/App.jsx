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

// Protected Route Component
const PrivateRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/login" />;
};

// Navbar Visibility Control
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <EnginesProvider>
      <AccessoriesProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<AllCards />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/engines/:brand"
                element={<PrivateRoute element={<EnginesList />} />}
              />
              <Route
                path="/engines/:brand/:id/enginecheckout"
                element={<PrivateRoute element={<EngineCheckoutForm />} />}
              />
              <Route
                path="/engines/:brand/:id/engineedit"
                element={<PrivateRoute element={<EngineEditForm />} />}
              />
              <Route
                path="/engines/:brand/:id"
                element={<PrivateRoute element={<EngineCardDetails />} />}
              />

              <Route
                path="/accessories/:id/accessedit"
                element={<PrivateRoute element={<AccessEditForm />} />}
              />
              <Route
                path="/accessories/:id/accesscheckout"
                element={<PrivateRoute element={<AccessCheckoutForm />} />}
              />
              <Route
                path="/accessories/:id"
                element={<PrivateRoute element={<AccessCardDetails />} />}
              />

              <Route
                path="/history/datefilter"
                element={<PrivateRoute element={<DateFilter />} />}
              />
              <Route
                path="/history"
                element={<PrivateRoute element={<HistoryAllCards />} />}
              />
            </Routes>
          </Layout>
        </Router>
      </AccessoriesProvider>
    </EnginesProvider>
  );
};

export default App;
