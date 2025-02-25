import React from "react";
import HistoryEngines from "./HistoryEngines/HistoryEngines";
import HistoryAccessories from "./HistoryAccessories/HistoryAccessories";
import { Navigate, NavLink } from "react-router-dom";




const HistoryAllCards = () => {
 
  return (
    <>
    <h4 className="ml-6 mt-3 text-3xl font-bold  text-white">Total: </h4>
      <div className="flex flex-row justify-between items-center m-6">
      <h1 className="text-3xl font-bold  text-white">Engines </h1>
      
      <NavLink
        className="cursor-pointer text-3xl text-white fa-solid fa-calendar"
        to="/history/datefilter"
        />
      </div>
        <HistoryEngines/>
        
      <h1 className="text-3xl font-bold m-6 text-white">Accessories</h1>
      <HistoryAccessories/>


    </>
  );
};

export default HistoryAllCards;