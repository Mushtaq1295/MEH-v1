import React, { useState, useEffect } from "react";
import axios from "axios";
import HistoryEngineCard from "./HistoryEngineCard";

const HistoryEngines = () => {
  const [engines, setEngines] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${backend_url}/history/engines`)
      .then((response) => {
        setEngines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching engine history:", error);
      });
  }, [backend_url]);

  return (
    <div className="px-4 sm:px-1">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {engines.map((engine) => (
          <HistoryEngineCard key={engine._id} engine={engine} />
        ))}
      </div>
    </div>
  );
};

export default HistoryEngines;
