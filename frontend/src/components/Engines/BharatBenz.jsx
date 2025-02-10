import React from "react";
import { useEngines } from "../../contexts/EnginesContext";

const BharatBenz = () => {
  const { engines } = useEngines();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Bharat Benz Engines</h2>
      <ul>
        {engines.BharatBenz.map((engine) => (
          <li key={engine.id} className="p-2 border-b">
            {engine.name} - ₹{engine.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BharatBenz;
