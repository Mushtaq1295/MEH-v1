import React from "react";
import { useNavigate } from "react-router-dom";
import { useEngines } from "../../contexts/EnginesContext";

const categories = ["ASHOK LEYLAND", "TATA", "BHARAT BENZ", "EICHER"];

const EngineCategories = () => {
  const { setSelectedCategory } = useEngines();
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigate(`/engines/${category}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-white">
      {categories.map((category, index) => (
        <div
          key={category}
          className="p-6 dark:bg-gray-900 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200 transition"
          onClick={() => handleCategorySelect(category)}
        >
          <h2 className="text-xl p-2 font-semibold">{category}</h2>
        </div>
      ))}
    </div>
  );
};

export default EngineCategories;
