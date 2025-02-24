import React from "react";
import { useLocation } from "react-router-dom";

const HistoryAccessCardDetails = () => {
  const location = useLocation();
  const { accessory } = location.state || {};

  if (!accessory) {
    return <div>No accessory details available</div>;
  }

  return (
    <>
      <h3 className="text-white text-center text-2xl font-semibold mt-5 ml-4 sm:text-xl md:text-2xl lg:text-3xl">
        Details of {accessory.customer_name}
      </h3>

      <div className="mt-2 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start dark:bg-gray-900 shadow-lg rounded-lg p-4 shadow-gray-600">
          <img
            className="w-full lg:w-[60%] aspect-[4/3] object-cover rounded-lg"
            src="https://res.cloudinary.com/dv8h7yjv2/image/upload/v1738475235/public/Accessories-pics/u7szjpuixit5remhtr9u.webp"
            alt="Accessory"
          />
          <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
            <ul className="space-y-4 text-lg sm:text-base md:text-xl text-white">
              <li>
                <strong className="text-lg">Date of Sold: </strong>
                {accessory.date
                  ? new Date(accessory.date).toLocaleDateString()
                  : "DD/MMMM/YYYY"}
              </li>
              <li>
                <strong className="text-lg">Customer Name: </strong>
                {accessory.customer_name}
              </li>
              <li>
                <strong className="text-lg">Phone Number: </strong>
                {accessory.phone_number}
              </li>
              <li>
                <strong className="text-lg">Quantity: </strong>
                {accessory.available}
              </li>
              <li>
                <strong className="text-lg">Pay Mode: </strong>
                {accessory.pay_mode}
              </li>
              <li>
                <strong className="text-lg">Sold Price: </strong>$
                {accessory.price}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryAccessCardDetails;
