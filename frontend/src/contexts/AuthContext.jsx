import { createContext, useState, useEffect } from "react";
import React from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");  
  if (!token) {
    console.warn("⚠️ No token found. User might be logged out.");
    setCurrentUser(null);
    return; // Prevents unnecessary errors
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  } catch (error) {
    console.error("⚠️ Error parsing user data:", error);
    setCurrentUser(null);
  }
}, []);

  
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setCurrentUser({ email: userData.email, name: userData.name });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
