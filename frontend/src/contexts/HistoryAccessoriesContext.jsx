import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HistoryAccessoriesContext = createContext({
  HistoryAccessories: [],
  setHistoryAccessories: () => {},
  selectedHistoryAccessory: null,
  setSelectedHistoryAccessory: () => {},
});

export const HistoryAccessoriesProvider = ({ children }) => {
  const [HistoryAccessories, setHistoryAccessories] = useState([]);
  const [selectedHistoryAccessory, setSelectedHistoryAccessory] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getHistoryAccessoriesData();
  }, []);

  const getHistoryAccessoriesData = async () => {
    try {
      const response = await axios.get(`${backend_url}/history/accessories`);
      setHistoryAccessories(response.data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  return (
    <HistoryAccessoriesContext.Provider
      value={{
        HistoryAccessories,
        setHistoryAccessories,
        selectedHistoryAccessory,
        setSelectedHistoryAccessory,
      }}
    >
      {children}
    </HistoryAccessoriesContext.Provider>
  );
};

export const useHistoryAccessories = () => {
  const context = useContext(HistoryAccessoriesContext);
  if (!context) {
    throw new Error("useHistoryAccessories must be used within a HistoryAccessoriesProvider");
  }
  return context;
};
