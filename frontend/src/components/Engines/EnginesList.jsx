
import React from "react";
import EngineCard from "./EngineCard";
import { useEngines } from "../../contexts/EnginesContext";

const EnginesList = () => {
  const { engines, selectedCategory } = useEngines();
  
  // Show engines of the selected category
  const filteredEngines = selectedCategory
    ? engines.filter(engine => engine.category === selectedCategory)
    : [];

  return (
    <div className="p-4 ">
    {selectedCategory ? (
      <>
        <h2 className="text-white text-2xl font-semibold mb-4">{selectedCategory} Engines</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEngines.map(engine => (
            <EngineCard key={engine._id} engine={engine} />
          ))}
        </div>
      </>
    ) : (
      <h2 className="text-center text-xl">Select a category to view engines</h2>
    )}
  </div>
  
  );
};

export default EnginesList;
