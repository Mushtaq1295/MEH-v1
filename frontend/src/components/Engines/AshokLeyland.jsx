import React from "react";
import EngineCard from "../Engines/EngineCard";

const AshokLeyland = () => {
  return (
    <>
      <h1 id="ashok-leyland" className="text-3xl font-bold m-6">Ashok Leyland</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <EngineCard image="/Engines-pics/AshokLeyland.webp" title="Ashok Leyland"  available={10} />
        <EngineCard image="/Engines-pics/BS5.webp" title="BS5"  available={10} />
        <EngineCard image="/Engines-pics/BS5.webp" title="BS5"  available={10} />
        <EngineCard image="/Engines-pics/BS5.webp" title="BS5"  available={10} />
      
      </div>
    </>
  );
};

export default AshokLeyland;
