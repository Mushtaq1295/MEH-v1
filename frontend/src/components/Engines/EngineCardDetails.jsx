import React from "react";
import { useEngines } from "../../contexts/EnginesContext";
import { useNavigate } from "react-router-dom";

const EngineCardDetails = () => {
  const { selectedEngine } = useEngines();
  const navigate = useNavigate();

  if (!selectedEngine) {
    return <div className="text-center text-xl">No engine selected.</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <img src={selectedEngine.image} alt={selectedEngine.title} className="rounded-lg w-full" />
      <h2 className="text-2xl font-bold mt-4">{selectedEngine.title}</h2>
      <p className="text-lg">Available: {selectedEngine.available}</p>
      <p className="text-lg">Price: ₹{selectedEngine.price}</p>
      <p className="text-lg">Model: {selectedEngine.model}</p>
      <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back
      </button>
    </div>
  );
};

export default EngineCardDetails;
