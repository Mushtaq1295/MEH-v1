import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const HistoryContext = createContext();

export const useHistoryContext = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [enginesHistory, setEnginesHistory] = useState([]);
  const [accessoriesHistory, setAccessoriesHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch history data from both APIs
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const [enginesResponse, accessoriesResponse] = await Promise.all([
        axios.get(`${backend_url}/history/engines`),
        axios.get(`${backend_url}/history/accessories`),
      ]);

      setEnginesHistory(enginesResponse.data || []);
      setAccessoriesHistory(accessoriesResponse.data || []);
    } catch (error) {
      console.error("Error fetching history data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        enginesHistory,
        accessoriesHistory,
        loading,
        refreshHistory: fetchHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
