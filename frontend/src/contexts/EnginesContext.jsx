import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EnginesContext = createContext(null);

export const EnginesProvider = ({ children }) => {
  const [engines, setEngines] = useState({
    AshokLeyland: [],
    Tata: [],
    Eicher: [],
    BharatBenz: [],
  });

  const [selectedEngine, setSelectedEngine] = useState(null); // Store selected engine

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const getEnginesData = async () => {
    try {
      const response = await axios.get(`${backend_url}/engines`);
      const engineData = response.data;

      const groupedEngines = {
        AshokLeyland: engineData.filter((engine) => engine.brand === "AshokLeyland"),
        Tata: engineData.filter((engine) => engine.brand === "Tata"),
        Eicher: engineData.filter((engine) => engine.brand === "Eicher"),
        BharatBenz: engineData.filter((engine) => engine.brand === "BharatBenz"),
      };

      setEngines(groupedEngines);
    } catch (error) {
      console.error("Error fetching engines:", error);
      setEngines({ AshokLeyland: [], Tata: [], Eicher: [], BharatBenz: [] });
    }
  };

  useEffect(() => {
    getEnginesData();
  }, []);

  return (
    <EnginesContext.Provider value={{ engines, getEnginesData, selectedEngine, setSelectedEngine }}>
      {children}
    </EnginesContext.Provider>
  );
};

export const useEngines = () => {
  const context = useContext(EnginesContext);
  if (!context) {
    throw new Error("useEngines must be used within an EnginesProvider");
  }
  return context;
};
