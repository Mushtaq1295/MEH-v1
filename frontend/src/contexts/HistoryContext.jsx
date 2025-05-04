import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import axios from "axios";

const HistoryContext = createContext();

export const useHistoryContext = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [enginesHistory, setEnginesHistory] = useState([]);
  const [accessoriesHistory, setAccessoriesHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [filterType, setFilterType] = useState("all"); // "all", "today", "yesterday", "custom"
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // Fetch history data from both APIs
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const [enginesResponse, accessoriesResponse] = await Promise.all([
        axios.get(`${backend_url}/engines/history/all`),
        axios.get(`${backend_url}/accessories/history/all`),
      ]);

      setEnginesHistory(enginesResponse.data || []);
      setAccessoriesHistory(accessoriesResponse.data || []);
    } catch (error) {
      console.error("Error fetching history data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering function common to both histories
  const filterData = (data) => {
    if (filterType === "all") return data;

    let startDate, endDate;
    const today = new Date();

    if (filterType === "today") {
      startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
    } else if (filterType === "yesterday") {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      startDate = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate()
      );
      endDate = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate() + 1
      );
    } else if (filterType === "custom") {
      if (!customStart || !customEnd) return data;
      startDate = new Date(customStart);
      endDate = new Date(customEnd);
      // Include the entire customEnd day
      endDate.setDate(endDate.getDate() + 1);
    }

    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= startDate && itemDate < endDate;
    });
  };

  // Memoized filtered data for engines and accessories
  const filteredEngines = useMemo(
    () => filterData(enginesHistory),
    [enginesHistory, filterType, customStart, customEnd]
  );
  const filteredAccessories = useMemo(
    () => filterData(accessoriesHistory),
    [accessoriesHistory, filterType, customStart, customEnd]
  );

  // Fetch data on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        enginesHistory,
        accessoriesHistory,
        filteredEngines,
        filteredAccessories,
        loading,
        refreshHistory: fetchHistory,
        filterType,
        setFilterType,
        customStart,
        setCustomStart,
        customEnd,
        setCustomEnd,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};