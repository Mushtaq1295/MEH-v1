import React from "react";
import { useNavigate } from "react-router-dom";
import { useEngines } from "../../contexts/EnginesContext";


const EngineCard = ({ engine }) => {
  const { selectedCategory,setSelectedEngine } = useEngines();
  const navigate = useNavigate();

  // Default values to prevent crashes
  const safeTitle = engine.title || "Unknown Engine";
  const safeImage = engine.image_url || "https://via.placeholder.com/300";
  const safeAvailable = engine.available ?? "N/A";

  const handleSelect = () => {
    setSelectedEngine(engine);
    navigate(`/engines/${selectedCategory}/${engine._id}`);
  };
  
  

  return (
    <div onClick={handleSelect} className="max-w-sm dark:bg-gray-900 border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105 cursor-pointer">
      <img className="rounded-t-lg w-full h-60 object-cover" src={safeImage} alt={safeTitle} />
      <div className="p-5 text-white">
        <h6 className="mb-2 text-xl font-semibold"> {safeTitle}</h6>
        <p className="mb-3 text-lg">Available: {safeAvailable}</p>
      </div>
    </div>
  );
};

export default EngineCard;
