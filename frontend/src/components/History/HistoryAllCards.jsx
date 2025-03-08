import React from "react";
import HistoryEngines from "./HistoryEngines/HistoryEngines";
import HistoryAccessories from "./HistoryAccessories/HistoryAccessories";
import { Navigate, NavLink } from "react-router-dom";
import { useHistoryAccessories } from "../../contexts/HistoryAccessoriesContext";

const HistoryAllCards = () => {
  return (
    <>
    <div className="flex flex-row justify-between items-center m-4">
      <h4 className="mt-1 text-2xl font-bold  text-white">Total: 
        {/* {total.toLocaleString('en-IN')}  */}
        </h4>
      <NavLink
        className="cursor-pointer text-3xl text-white fa-solid fa-calendar"
        to="/history/datefilter"
        />
      </div>
      <div className="flex flex-row justify-between items-center m-5">
      <h1 className="text-3xl font-bold  text-white">Engines </h1>  
      <h4 className="text-[14px] font-bold  text-white">Total: 
        {/* {total.toLocaleString('en-IN')} */}
         </h4>
      </div>   
        <HistoryEngines/>
        <div className="flex flex-row justify-between items-center m-4">
      <h1 className="text-3xl font-bold  text-white">Accessories </h1>  
      <h4 className="text-[14px] font-bold  text-white">Total: 
        {/* {total.toLocaleString('en-IN')} */}
         </h4>
      </div>
      <div className="px-4 sm:px-1">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <HistoryAccessories/>
      </div>
      </div>
      
    </>
  );
};

export default HistoryAllCards;