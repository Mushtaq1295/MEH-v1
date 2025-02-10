import React from "react";
import { useEngines } from "../contexts/EnginesContext";
// import EngineCard from "./Engines/EngineCard";
import Accessories from "./Accessories/Accessories";
import Engines from "./Engines/EnginesList";

const AllCards = () => {
  const { engines } = useEngines();

  return (
    <>
      
      <h1 className="text-3xl font-bold m-6">Engines</h1>
      <Engines />

      <h1 className="text-3xl font-bold m-6">Accessories</h1>
      <Accessories />
    </>
  );
};

export default AllCards;
