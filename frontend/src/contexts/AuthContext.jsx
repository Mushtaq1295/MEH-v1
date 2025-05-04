import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { _id, email, role }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user on mount or token refresh
  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get("/profile");
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      setUser(null);
      setIsAuthenticated(false);
      if (
        error.response?.status === 401 &&
        error.response.data.message === "Token expired"
      ) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Run fetchUser on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Periodically refresh token before it expires (every 10 minutes)
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      try {
        const response = await api.post("/api/refresh-token");
        if (response.data.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Token refresh error:", error);
        setUser(null);
        setIsAuthenticated(false);
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    }, 10 * 60 * 1000); // Every 10 minutes

    return () => clearInterval(refreshInterval);
  }, [navigate]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/login", { email, password });
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        navigate(response.data.user.role === "admin" ? "/history" : "/");
        return { success: true };
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      const response = await api.post("/register", { email, password });
      if (response.data.success) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/api/logout");
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
      navigate("/login");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};