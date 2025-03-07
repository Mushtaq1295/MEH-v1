import React, { useState } from "react";
import { EngineHistoryCard } from "./EngineHistoryCard";
import { AccessoryHistoryCard } from "./AccessoryHistoryCard";
import { useHistoryContext } from "../../contexts/HistoryContext";

// Collapsible filters component for mobile
const HistoryFilters = ({
  totalRevenue,
  enginesRevenue,
  accessoriesRevenue,
  filterType,
  setFilterType,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
}) => {
  const [revenueCollapsed, setRevenueCollapsed] = useState(true);
  const [dateFilterCollapsed, setDateFilterCollapsed] = useState(true);

  return (
    <>
      {/* Revenue Summary Section */}
      <div className="m-4 p-4 dark:bg-gray-900 rounded-lg shadow-md border border-white">
        {/* Toggle button on mobile */}
        <div
          className="flex justify-between items-center sm:hidden cursor-pointer"
          onClick={() => setRevenueCollapsed(!revenueCollapsed)}
        >
          <h3 className="text-white text-xl">Revenue Summary</h3>
          <button className="text-white focus:outline-none">
            {revenueCollapsed ? "Show" : "Hide"}
          </button>
        </div>
        {/* Content: always visible on larger screens, collapsible on mobile */}
        <div className={`${revenueCollapsed ? "hidden" : "block"} sm:block`}>
          <div className="flex flex-col sm:flex-row justify-around items-center text-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-white text-xl">Total Revenue</h3>
              <p className="text-green-500 text-2xl font-bold">
                ₹{totalRevenue}
              </p>
            </div>
            <div className="mb-4 sm:mb-0">
              <h3 className="text-white text-xl">Engines Revenue</h3>
              <p className="text-green-500 text-2xl font-bold">
                ₹{enginesRevenue}
              </p>
            </div>
            <div>
              <h3 className="text-white text-xl">Accessories Revenue</h3>
              <p className="text-green-500 text-2xl font-bold">
                ₹{accessoriesRevenue}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Date Filter Section */}
      <div className="m-4 p-4 dark:bg-gray-900 rounded-lg shadow-md border border-white">
        {/* Toggle button on mobile */}
        <div
          className="flex justify-between items-center sm:hidden cursor-pointer"
          onClick={() => setDateFilterCollapsed(!dateFilterCollapsed)}
        >
          <h3 className="text-white text-xl">Date Filters</h3>
          <button className="text-white focus:outline-none">
            {dateFilterCollapsed ? "Show" : "Hide"}
          </button>
        </div>
        {/* Content: always visible on larger screens, collapsible on mobile */}
        <div className={`${dateFilterCollapsed ? "hidden" : "block"} sm:block`}>
          <div className="flex flex-col sm:flex-row justify-around items-center text-center space-y-2 sm:space-y-0">
            <button
              onClick={() => setFilterType("yesterday")}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Yesterday
            </button>
            <button
              onClick={() => setFilterType("today")}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Today
            </button>
            <div className="w-full sm:w-auto flex items-center justify-center">
              <div className="flex flex-row space-x-2">
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="border rounded p-1 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="border rounded p-1 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setFilterType("custom")}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
            <button
              onClick={() => setFilterType("all")}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const History = () => {
  const {
    filteredEngines,
    filteredAccessories,
    filterType,
    setFilterType,
    customStart,
    setCustomStart,
    customEnd,
    setCustomEnd,
  } = useHistoryContext();

  // Compute revenue totals
  const enginesRevenue = filteredEngines.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const accessoriesRevenue = filteredAccessories.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const totalRevenue = enginesRevenue + accessoriesRevenue;

  return (
    <div>
      <HistoryFilters
        totalRevenue={totalRevenue}
        enginesRevenue={enginesRevenue}
        accessoriesRevenue={accessoriesRevenue}
        filterType={filterType}
        setFilterType={setFilterType}
        customStart={customStart}
        setCustomStart={setCustomStart}
        customEnd={customEnd}
        setCustomEnd={setCustomEnd}
      />
      {/* Cards Row */}
      <div className="m-4">
        {/* Engines Cards */}
        <h1 className="text-3xl text-white mb-4 text-center font-bold">
          Engines
        </h1>
        {filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredEngines.length > 0 &&
              filteredEngines.map((engine) => (
                <EngineHistoryCard key={engine._id} engine={engine} />
              ))}
          </div>
        ) : (
          <p className="text-red-500 text-xl text-center">
            No engine history found for the selected criteria.
          </p>
        )}

        {/* Accessories Cards */}
        <h1 className="text-3xl text-white mt-8 mb-4 text-center font-bold">
          Accessories
        </h1>
        {filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAccessories.length > 0 &&
              filteredAccessories.map((accessory) => (
                <AccessoryHistoryCard
                  key={accessory._id}
                  accessory={accessory}
                />
              ))}
          </div>
        ) : (
          <p className="text-red-500 text-xl text-center">
            No accessories history found for the selected criteria.
          </p>
        )}
      </div>
    </div>
  );
};
