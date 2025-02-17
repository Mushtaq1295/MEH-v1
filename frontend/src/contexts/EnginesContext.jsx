import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EnginesContext = createContext(null);

export const EnginesProvider = ({ children }) => {
  const [engines, setEngines] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getEnginesData();
  }, []);

  const getEnginesData = async () => {
    try {
      const response = await axios.get(`${backend_url}/engines`);
      setEngines(response.data);
    } catch (error) {
      console.error("Error fetching engines:", error);
    }
  };

  return (
    <EnginesContext.Provider value={{ 
      engines,setEngines, 
      selectedEngine, setSelectedEngine, 
      selectedCategory, setSelectedCategory 
    }}>
      {children}
    </EnginesContext.Provider>
  );
};

export const useEngines = () => useContext(EnginesContext);
