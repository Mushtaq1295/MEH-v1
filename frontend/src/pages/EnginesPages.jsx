import React, { useState } from "react";
import AshokLeyland from "../components/Engines/AshokLeyland";
import Tata from "../components/Engines/Tata";
import Eicher from "../components/Engines/Eicher";
import BharatBenz from "../components/Engines/BharatBenz";

const EnginesPage = () => {
  const [selectedEngine, setSelectedEngine] = useState("ashokLeyland");

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Engines</h1>
      <div className="flex space-x-4 mt-4">
        <button onClick={() => setSelectedEngine("ashokLeyland")}>Ashok Leyland</button>jk
        <button onClick={() => setSelectedEngine("ashokLeyland")}>Ashok Leyland Hino</button>
        <button onClick={() => setSelectedEngine("tata")}>Tata</button>
        <button onClick={() => setSelectedEngine("eicher")}>Eicher</button>
        <button onClick={() => setSelectedEngine("bharatBenz")}>BharatBenz</button>
      </div>

      <div className="mt-4">
        {selectedEngine === "ashokLeyland" && <AshokLeyland />}
        {selectedEngine === "tata" && <Tata />}
        {selectedEngine === "eicher" && <Eicher />}
        {selectedEngine === "bharatBenz" && <BharatBenz />}
      </div>
    </div>
  );
};

export default EnginesPage;
