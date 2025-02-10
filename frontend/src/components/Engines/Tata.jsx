import React from "react";
import { useEngines } from "../../contexts/EnginesContext";

const Tata = () => {
  const { engines } = useEngines();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Tata Engines</h2>
      <ul>
        {engines.Tata.map((engine) => (
          <li key={engine.id} className="p-2 border-b">
            {engine.name} - ₹{engine.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tata;
