import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EngineCardDetails = () => {
  // Extract parameters from URL and provide fallbacks
  const { image, title, model, available, bf, engineCat, price } = useParams();
  
  // Debugging
  useEffect(() => {
    console.log("Params:", { image, title, model, available, bf, engineCat, price });
  }, [image, title, model, available, bf, engineCat, price]);

  // Ensure numbers are correctly parsed
  const availableCountInit = isNaN(Number(available)) ? 0 : Number(available);
  const priceValue = isNaN(Number(price)) ? "N/A" : `₹${Number(price)}`;
  
  const [availableCount, setAvailableCount] = useState(availableCountInit);

  const formattedTitle = title ? title.charAt(0).toUpperCase() + title.slice(1).replace("-", " ") : "Unknown Engine";
  const displayImage = image || "https://via.placeholder.com/300"; // Fallback image

  const handleDecrease = () => {
    if (availableCount > 0) {
      setAvailableCount(prev => prev - 1);
    }
  };

  const handleIncrease = () => {
    setAvailableCount(prev => prev + 1);
  };

  return (
    <>
      <h3 className="text-center text-2xl font-semibold mt-3 ml-4 sm:text-xl md:text-2xl lg:text-3xl">
        Details of {formattedTitle}
      </h3>

      <div className="mt-3 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start bg-white shadow-lg rounded-lg p-4">
          <img src={displayImage} className="w-full lg:w-[60%] h-auto rounded-lg" alt={title || "Unknown"} />
          
          {/* Content Section */}
          <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
            <ul className="space-y-5 text-lg sm:text-base md:text-xl">
              <li><strong className="text-lg">Title : </strong> {formattedTitle}</li>
              <li><strong className="text-lg">Price : </strong> {priceValue}</li>
              <li><strong className="text-lg">Model (year) : </strong> {model || "Unknown"}</li>
              
              <li><strong className="text-lg">Available : </strong> 
                <button
                  className="mr-3 px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400"
                  onClick={handleDecrease}
                  disabled={availableCount === 0}
                >
                  ➖
                </button>
                {availableCount}
                <button
                  className="ml-3 px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={handleIncrease}
                >
                  ➕
                </button>
              </li>

              <li><strong className="text-lg">Bought From: </strong> {bf || "Unknown"}</li>
              <li><strong className="text-lg">Category: </strong> {engineCat || "General"}</li>
            </ul>

            {/* Edit Button */}
            <div className="mt-6 flex space-x-2">
              <a href="#" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base">
                Edit
              </a>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              className="cursor-pointer w-full sm:w-[250px] lg:w-[300px] mt-8 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default EngineCardDetails;
