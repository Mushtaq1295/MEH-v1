import React, { useEffect, useState } from "react";
import { useEngines } from "../../contexts/EnginesContext";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const EngineCardDetails = () => {
  const { id } = useParams(); // Get engine ID from URL
  const { engines } = useEngines(); // Get all engine products from context
  const [engine, setEngine] = useState(null);
  const navigate = useNavigate();

  // Fetch the engine data when ID changes
  useEffect(() => {
    if (engines && engines.length > 0) {
      const selectedEngine = engines.find((item) => item._id === id);
      setEngine(selectedEngine || null);
    }
  }, [id, engines]); // Re-run effect when ID or engines data changes

  if (!engine) {
    return (
      <div className="text-white text-center mt-5">No engine data found.</div>
    );
  }

  const handleCheckout = () => {
    navigate(`/engines/${engine.category}/${engine._id}/enginecheckout`);
  };

  return (
    <div>
      <h3 className="text-center text-2xl font-semibold mt-5 text-white">
        Details of {engine.title}
      </h3>
      <div className="mt-2 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start dark:bg-gray-900 shadow-lg rounded-lg p-4 shadow-gray-600">
          <img
            src={engine.image_url}
            className="w-full lg:w-[60%] aspect-[4/3] object-cover rounded-lg"
            alt={engine.title}
          />
          <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
            <ul className="space-y-5 text-lg text-white">
              <li>
                <strong>Title:</strong> {engine.title}
              </li>
              <li>
                <strong>Category:</strong> {engine.category}
              </li>
              <li>
                <strong>Model:</strong> {engine.model}
              </li>
              <li>
                <strong>Price:</strong> ₹{engine.price}
              </li>
              <li>
                <strong>Available:</strong> {engine.available}
              </li>
              <li>
                <strong>From:</strong> {engine.from}
              </li>
            </ul>
            <div className="mt-6 flex space-x-2">
              <NavLink
                to={`/engines/${engine.category}/${engine._id}/engineedit`}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base"
              >
                Edit
              </NavLink>
              <button
                className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm md:text-base"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineCardDetails;
