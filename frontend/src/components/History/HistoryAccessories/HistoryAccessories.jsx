import React, { useState, useEffect } from "react";
import HistoryAccessCard from "./HistoryAccessCard";

const HistoryAccessories = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/history/accessories")
      .then((res) => res.json())
      .then((data) => setAccessories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="px-4 sm:px-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {accessories.map((accessory) => (
            <HistoryAccessCard key={accessory._id} accessory={accessory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryAccessories;
