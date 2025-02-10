import React, { useEffect } from "react";
import { useEngines } from "../../contexts/EnginesContext";
import { useParams } from "react-router-dom";
import { NavLink, useLocation } from 'react-router-dom';

const EngineCardDetails = () => {
  const { engines, selectedEngine, setSelectedEngine } = useEngines();
  const { brand } = useParams(); // Get the category from URL

  useEffect(() => {
    if (!selectedEngine) {
      const engineData = engines.find(engine => engine.category === brand);
      setSelectedEngine(engineData);
    }
  }, [brand, engines, selectedEngine, setSelectedEngine]);

  if (!selectedEngine) {
    return <div className="text-center text-xl">No engine selected.</div>;
  }

  return (
    <div>
      <h3 className="text-center text-2xl font-semibold mt-5 text-white">
        Details of {selectedEngine.title}
      </h3>
      <div className="mt-2 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start dark:bg-zinc-900 shadow-lg rounded-lg p-4">
          <img 
            src={selectedEngine.image_url} 
            className="w-full lg:w-[60%] aspect-[4/3] object-cover rounded-lg" 
            alt={selectedEngine.title} 
          />
          <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
            <ul className="space-y-5 text-lg  text-white">
              <li><strong>Title:</strong> {selectedEngine.title}</li>
              <li><strong>Category:</strong> {selectedEngine.category}</li>
              <li><strong>Model:</strong> {selectedEngine.model}</li>
              <li><strong>Price:</strong> ₹{selectedEngine.price}</li>
              <li><strong>Available:</strong> {selectedEngine.available}</li>
              <li><strong>From:</strong> {selectedEngine.from}</li>
            </ul>
            <div className="mt-6 flex space-x-2">
        <NavLink 
          to="/details/engineedit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base"
        >
          Edit
        </NavLink>
        <NavLink
          to="/details/enginecheckout"
          className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm md:text-base"
        >
          Checkout
        </NavLink>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineCardDetails;
