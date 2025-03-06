import React from "react";
import { useNavigate } from "react-router-dom";

export const AccessoryHistoryCard = ({ accessory }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/history/accessorys/${engine._id}`, { state: { engine } });
  };

  return (
    <div className="border border-white rounded-lg" onClick={handleClick}>
      <p className="flex justify-end mt-2 mr-4 text-[13px] text-gray-400 sm:text-base md:text-lg lg:text-xl">
        {accessory.createdAt
          ? new Date(accessory.createdAt).toLocaleDateString()
          : "DD/MM/YYYY"}
      </p>
      <div className="p-2 mt-4 text-white">
        <p className="mb-2 text-lg">
          <strong>Title:</strong> {accessory.title}
        </p>
        <p className="mb-2 text-lg">
          <strong>Name:</strong> {accessory.customer_name}
        </p>
        <p className="mb-2 text-lg">
          <strong>Price:</strong> ₹{accessory.price}
        </p>
        <div className="flex justify-center">
          <img
            src={accessory.image_url}
            alt=""
            className="rounded-t-lg w-full h-60 object-cover"
          />
        </div>
      </div>
      <button
        type="button"
        className="cursor-pointer ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-[12px] px-2 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/history/accessories/${accessory._id}`, {
            state: { accessory },
          });
        }}
      >
        View More
      </button>
    </div>
  );
};
