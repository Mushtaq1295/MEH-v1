import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AccessoriesContext = createContext(null);

export const AccessoriesProvider = ({ children }) => {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getAccessoriesData();
  }, []); // ✅ Runs only once when component mounts

  const getAccessoriesData = async () => {
    try {
      const response = await axios.get(`${backend_url}/accessories`);
      setAccessories(response.data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  return (
    <AccessoriesContext.Provider
      value={{
        accessories,
        getAccessoriesData,
        setAccessories,
        selectedAccessory,
        setSelectedAccessory,
      }}
    >
      {children}
    </AccessoriesContext.Provider>
  );
};

export const useAccessories = () => useContext(AccessoriesContext);