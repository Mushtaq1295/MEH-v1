import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { HistoryProvider } from "./contexts/HistoryContext";
import { History } from "./components/History/History";
import AccessoryHistoryDetails from "./components/History/AccessoryHistoryDetails";
import EngineHistoryDetails from "./components/History/EngineHistoryDetails";

// Protected Route Component
const PrivateRoute = ({ element, roles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/" />;
  }
  return element;
};

// Not Found Component
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">Page Not Found</p>
      <a
        href="/"
        className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2"
      >
        Go Home
      </a>
    </div>
  </div>
);

// Layout Component
const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <HistoryProvider>
        <EnginesProvider>
          <AccessoriesProvider>
            <AuthProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
                pauseOnFocusLoss={false}
                newestOnTop={true}
              />
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
                      element={
                        <PrivateRoute
                          element={<EngineEditForm />}
                          roles={["admin"]}
                        />
                      }
                    />
                    <Route
                      path=":brand/:id/enginecheckout"
                      element={
                        <PrivateRoute element={<EngineCheckoutForm />} />
                      }
                    />
                  </Route>
                  {/* Accessories Routes */}
                  <Route path="/accessories">
                    <Route path=":id" element={<AccessCardDetails />} />
                    <Route
                      path=":id/accessedit"
                      element={
                        <PrivateRoute
                          element={<AccessEditForm />}
                          roles={["admin"]}
                        />
                      }
                    />
                    <Route
                      path=":id/accesscheckout"
                      element={
                        <PrivateRoute element={<AccessCheckoutForm />} />
                      }
                    />
                  </Route>
                  {/* History Routes */}
                  <Route path="/history">
                    <Route
                      path=""
                      element={<PrivateRoute element={<History />} />}
                    />
                    <Route
                      path="accessory/:id"
                      element={
                        <PrivateRoute element={<AccessoryHistoryDetails />} />
                      }
                    />
                    <Route
                      path="engine/:id"
                      element={
                        <PrivateRoute element={<EngineHistoryDetails />} />
                      }
                    />
                  </Route>
                  {/* Fallback Route */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </AuthProvider>
          </AccessoriesProvider>
        </EnginesProvider>
      </HistoryProvider>
    </Router>
  );
};

export default App;