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
  let total = 100000;
  
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center m-4 gap-2">
        <h4 className="text-xl sm:text-3xl font-bold text-white">
          Total: {total.toLocaleString('en-IN')}
        </h4>
        <NavLink
          className="cursor-pointer text-2xl sm:text-3xl mt-3 text-white fa-solid fa-calendar"
          to="/history/datefilter"
        />
      </div>

      {/* Engines Section */}
      <div className="flex flex-col md:flex-row justify-between items-center m-4 gap-2">
        <h1 className="text-lg sm:text-2xl font-bold text-white">Engines</h1>
        <h4 className="text-sm sm:text-lg font-bold text-white">
          Total: {total.toLocaleString('en-IN')}
        </h4>
      </div>
      <HistoryEngines />

      {/* Accessories Section */}
      <div className="flex flex-col md:flex-row justify-between items-center m-4 gap-2">
        <h1 className="text-lg sm:text-2xl font-bold text-white">Accessories</h1>
        <h4 className="text-sm sm:text-lg font-bold text-white">
          Total: {total.toLocaleString('en-IN')}
        </h4>
      </div>
      <HistoryAccessories />
    </div>
  );
};


export default HistoryAllCards;