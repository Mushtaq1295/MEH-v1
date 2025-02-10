import React from "react";
import { useEngines } from "../../contexts/EnginesContext";

const AshokLeyland = () => {
  const { engines } = useEngines();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Ashok Leyland Engines</h2>
      <ul>
        {engines.ashokLeyland.map((engine) => (
          <li key={engine.id} className="p-2 border-b">
            {engine.name} - ₹{engine.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AshokLeyland;
