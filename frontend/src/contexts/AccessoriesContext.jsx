import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AccessoriesContext = createContext(null);

export const AccessoriesProvider = ({ children }) => {
  const [accessories, setAccessories] = useState([]); // Initialize as empty array
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getAccessoriesData();
  }, []);

  const getAccessoriesData = async () => {
    try {
      const response = await axios.get(`${backend_url}/accessories`);
      setAccessories(response.data); // Assuming response.data is the array
    } catch (error) {
      console.error("Error fetching accessories:", error);
      setAccessories([]);
    }
  };

  const selectAccessory = (accessory) => {
    setSelectedAccessory(accessory);
  };

  return (
    <AccessoriesContext.Provider 
      value={{ accessories, selectedAccessory, selectAccessory }}>
      {children}
    </AccessoriesContext.Provider>
  );
};

export const useAccessories = () => useContext(AccessoriesContext);