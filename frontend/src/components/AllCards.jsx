import React from "react";
import { useEngines } from "../contexts/EnginesContext";
import EngineCard from "./Engines/EngineCard";
import Accessories from "./Accessories/Accessories";

const AllCards = () => {
  const { engines } = useEngines();

  return (
    <>
      <h1 className="text-3xl font-bold m-6">Engines</h1>
      
      {Object.entries(engines).map(([brand, brandEngines]) => (
        <div key={brand}>
          <h2 className="text-2xl font-semibold m-4">{brand}</h2>
          <div className="grid grid-cols-2 gap-4">
            {brandEngines.map((engine) => (
              <EngineCard key={engine.id} engine={engine} />
            ))}
          </div>
          <hr />
        </div>
      ))}

      <h1 className="text-3xl font-bold m-6">Accessories</h1>
      <Accessories />
    </>
  );
};

export default AllCards;
