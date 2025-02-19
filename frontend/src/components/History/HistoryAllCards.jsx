import React from "react";
import HistoryEngines from "./HistoryEngines/HistoryEngines";
import HistoryAccessories from "./HistoryAccessories/HistoryAccessories";
import HistoryAccessCardDetails from "./HistoryAccessories/HistoryAccessCardDetails";
import HistoryEngineCardDetails from "./HistoryEngines/HistoryEngineCardDetails";
import { Navigate, NavLink } from "react-router-dom";




const HistoryAllCards = () => {
  // let handleDateBtn = () =>{
  //   console.log("Date button clicked");
  //   Navigate()
  // }
  return (
    <>
      <div className="flex flex-row justify-between items-center m-6">
      <h1 className="text-3xl font-bold  text-white">Engines </h1>
      <NavLink
        className="cursor-pointer text-3xl text-white fa-solid fa-calendar"
        to="/history/datefilter"
        // onClick={handleDateBtn}
        />
      </div>
        <HistoryEngines/>
        
      <h1 className="text-3xl font-bold m-6 text-white">Accessories</h1>
      <HistoryAccessories/>
      {/* <HistoryAccessCardDetails/>
      <HistoryEngineCardDetails/> */}

    </>
  );
};

export default HistoryAllCards;