
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
    <HistoryAccessoriesProvider>
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
              {/* <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} /> */}

              {/* Protected Routes */}
              //Engines
              <Route
                path="/engines/:brand"
                // element={<PrivateRoute element={<EnginesList />} />}
                element={<EnginesList />}
              />
               <Route
                path="/engines/:brand/:id"
                // element={<PrivateRoute element={<EngineCardDetails />} />}
                element={<EngineCardDetails />}
              />
              <Route
                path="/engines/:brand/:id/engineedit"
                // element={<PrivateRoute element={<EngineEditForm />} />}
                element={<EngineEditForm />}
              />
              <Route
                path="/engines/:brand/:id/enginecheckout"
                // element={<PrivateRoute element={<EngineCheckoutForm />} />}
                element={<EngineCheckoutForm />}
              />
              <Route
                path="/history/engines/:id"
                // element={<PrivateRoute element={<EngineHistory />} />}
                element={<HistoryEngineCardDetails/>}
              />
              
             


              //Accessories
              <Route
                path="/accessories/:id"
                // element={<PrivateRoute element={<AccessCardDetails />} />}
                element={<AccessCardDetails />}
              />
              <Route
                path="/accessories/:id/accessedit"
                // element={<PrivateRoute element={<AccessEditForm />} />}
                element={<AccessEditForm />}
              />
              <Route
                path="/accessories/:id/accesscheckout"
                // element={<PrivateRoute element={<AccessCheckoutForm />} />}
                element={<AccessCheckoutForm />} 
              />
               <Route
                path="/history"
                // element={<PrivateRoute element={<HistoryAllCards />} />}
                element={<HistoryAllCards />}
              />
              <Route
                 path="/history/accessories/:id"
                 // element={<PrivateRoute element={<HistoryAccessCardDetails />} />}
                 element={<HistoryAccessCardDetails/>}
              />


              <Route
                path="/history/datefilter"
                // element={<PrivateRoute element={<DateFilter />} />}
                element={<DateFilter />}
              />
             
            </Routes>
          </Layout>
        </Router>
      </AccessoriesProvider>
    </EnginesProvider>
    </HistoryAccessoriesProvider>
  );
};

export default App;
