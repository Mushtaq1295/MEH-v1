import React from "react";
import HistoryEngines from "./HistoryEngines/HistoryEngines";
import HistoryAccessories from "./HistoryAccessories/HistoryAccessories";
import { Navigate, NavLink } from "react-router-dom";
import { useHistoryAccessories } from "../../contexts/HistoryAccessoriesContext";




const HistoryAllCards = () => {
//   const context = useHistoryAccessories();

// if (!context) {
//   console.error("Error: HistoryAccessoriesContext is missing. Make sure it's wrapped in HistoryAccessoriesProvider.");
//   return null; // Prevent rendering if context is missing
// }

// const { HistoryAccessories } = context;



  
  // let totalValue = () => {
  //   if (!HistoryAccessories || HistoryAccessories.length === 0) return 0;
  
  //   return HistoryAccessories.reduce((total, item) => {
  //     return total + (item.price || 0); // Ensure `price` is valid
  //   }, 0);
  // };
  
  return (
    <>
    <h4 className="ml-6 mt-3 text-3xl font-bold  text-white">Total </h4>
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