import React from "react";
import EngineCard from "./EngineCard";
import { useEngines } from "../../contexts/EnginesContext";
import { useParams } from "react-router-dom";

const EnginesList = () => {
  // Destructure the brand parameter from the URL.
  const { brand } = useParams();
  const { engines } = useEngines();

  // Filter engines by the brand if it exists.
  const filteredEngines = brand
    ? engines.filter((engine) => engine.category === brand)
    : [];

  return (
    <div className="p-4">
      {brand ? (
        <>
          <h2 className="text-white text-2xl font-semibold mb-4">
            {brand} Engines
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEngines.map((engine) => (
              <EngineCard key={engine._id} engine={engine} />
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-center text-xl">
          Select a category to view engines
        </h2>
      )}
    </div>
  );
};

export default EnginesList;
