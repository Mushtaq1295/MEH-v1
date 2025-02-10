import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AccessCardDetails = () => {
  
  const location = useLocation();
  const { accessory } = location.state || {}; // Get the accessory data from navigation state

  if (!accessory) {
    return <div>No accessory data found.</div>;
  }

  return (
    <>
      <h3 className="text-center text-2xl font-semibold mt-5 ml-4 sm:text-xl md:text-2xl lg:text-3xl">
          Details of {accessory.title.charAt(0).toUpperCase() + accessory.title.slice(1).replace("-", " ")}
      </h3>

<div className="mt-2 w-full max-w-4xl mx-auto px-4">
  <div className="flex flex-col lg:flex-row items-start bg-white shadow-lg rounded-lg p-4">
    <img 
      src={accessory.image_url} 
      className="w-full lg:w-[60%] aspect-[4/3] object-cover rounded-lg" 
      alt={accessory.title} 
    />
    <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
      <ul className="space-y-5 text-lg sm:text-base md:text-xl">
        <li>
          <strong className="text-lg">Title: </strong> 
          {accessory.title.replace("-", " ")}
        </li>
        <li>
          <strong className="text-lg">Price: </strong>
          ₹ {accessory.price}
        </li>
        <li>
          <strong className="text-lg">Available: </strong> 
          {accessory.available}
        </li>
      </ul>
      <div className="mt-6 flex space-x-2">
        <NavLink 
          to="/details/accessedit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base"
        >
          Edit
        </NavLink>
        <NavLink
          to="/details/accesscheckout"
          className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm md:text-base"
        >
          Checkout
        </NavLink>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default AccessCardDetails;