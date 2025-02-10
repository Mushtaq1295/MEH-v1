import React from "react";
import { useNavigate } from "react-router-dom";
import { useEngines } from "../../contexts/EnginesContext";
import { motion } from "framer-motion";

const categories = ["ASHOK LEYLAND", "TATA", "BHARAT BENZ", "EICHER"];

const EngineCategories = () => {
  const { setSelectedCategory } = useEngines();
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigate(`/engines/${category}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }} // Left for even, right for odd
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-6 bg-gray-300 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200 transition"
          onClick={() => handleCategorySelect(category)}
        >
          <h2 className="text-xl p-2 font-semibold">{category}</h2>
        </motion.div>
      ))}
    </div>
  );
};

export default EngineCategories;
