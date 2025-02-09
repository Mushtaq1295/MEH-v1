import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EnginesContext = createContext(null);

export const EnginesProvider = ({ children }) => {
  const [engines, setEngines] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getEnginesData;
  }, []);

  const getEnginesData = async () => {
    try {
      const response = await axios.get(`${backend_url}/engines`, {
      });
      setEngines(response.data.user);
    } catch (error) {
      setEngines(null);
    }
  };

  return (
    <EnginesContext.Provider value={{ engines }}>
      {children}
    </EnginesContext.Provider>
  );
};

export const useEngines = () => useContext(EnginesContext);