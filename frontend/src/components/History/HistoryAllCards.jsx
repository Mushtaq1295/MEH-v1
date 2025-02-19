import React from "react";
import HistoryEngines from "./HistoryEngines/HistoryEngines";
import HistoryAccessories from "./HistoryAccessories/HistoryAccessories";
import HistoryAccessCardDetails from "./HistoryAccessories/HistoryAccessCardDetails";
import HistoryEngineCardDetails from "./HistoryEngines/HistoryEngineCardDetails";




const HistoryAllCards = () => {
  return (
    <>
      <h1 className="text-3xl font-bold m-6 text-white">Engines</h1>
        {/* <HistoryEngines/> */}
        
      <h1 className="text-3xl font-bold m-6 text-white">Accessories</h1>
      {/* <HistoryAccessories/> */}
      {/* <HistoryAccessCardDetails/>
      <HistoryEngineCardDetails/> */}

    </>
  );
};

export default HistoryAllCards;