import React, { createContext, useContext, useState, useEffect, Children } from "react";
import axios from "axios";

const HistoryAccessoriesContext = createContext(null);

export const HistoryAccessoriesProvider = ({ children }) =>{
    const [HistoryAccessories, setHistoryAccessories] = useState([]);
    const [selectedHistoryAccessory, setSelectedHistoryAccessory] = useState(null);
    const backend_url = import.meta.env.VITE_BACKEND_URL;
  
    useEffect(() => {
      getHistoryAccessoriesData();
    }, []); // ✅ Runs only once when component mounts
  
    const getHistoryAccessoriesData = async () => {
      try {
        const response = await axios.get(`${backend_url}/accessories`);
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
}

export const useHistoryAccessories = () => useContext(HistoryAccessoriesContext);