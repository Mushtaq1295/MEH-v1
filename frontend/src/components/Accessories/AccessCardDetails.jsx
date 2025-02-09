import React from 'react';
import { useLocation } from 'react-router-dom';

const AccessCardDetails = () => {
  const location = useLocation();
  const { accessory } = location.state || {}; // Get the accessory data from navigation state

  if (!accessory) {
    return <div>No accessory data found.</div>;
  }

  return (
    <>
      <h3 className="text-center text-2xl font-semibold mt-3 ml-4 sm:text-xl md:text-2xl lg:text-3xl">
        Details of {accessory.title.charAt(0).toUpperCase() + accessory.title.slice(1).replace("-", " ")}
      </h3>

      <div className="mt-3 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start bg-white shadow-lg rounded-lg p-4">
          <img 
            src={accessory.image_url} 
            className="w-full lg:w-[60%] h-auto rounded-lg" 
            alt={accessory.title} 
          />
          <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
            <ul className="space-y-5 text-lg sm:text-base md:text-xl">
              <li><strong className="text-lg">Title: </strong> 
                {accessory.title.replace("-", " ")}
              </li>
              <li><strong className="text-lg">Price: </strong>
                ${accessory.price}
              </li>
              {/* <li><strong className="text-lg">Category: </strong>
                {accessory.category}
              </li> */}
              <li><strong className="text-lg">Available: </strong> 
                {accessory.available}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessCardDetails;