import React from "react";
import { useNavigate } from "react-router-dom";

export const AccessoryHistoryCard = ({ accessory }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/history/accessory/${accessory._id}`);
  };

  return (
    <div className="border border-white rounded-lg ">
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
          <strong>Price:</strong> ₹{accessory.price.toLocaleString("en-IN")}
        </p>
        {/* <div className="flex justify-center">
          <img
            src={accessory.image_url}
            alt={accessory.title}
            className="rounded-lg w-full h-60 object-cover"
          />
        </div> */}
        <div className="flex justify-start">
  <button
    type="button"
    className="w-auto px-4 py-2 my-4 rounded-lg bg-blue-600 hover:bg-blue-500 cursor-pointer text-white"
    onClick={() => {
      handleClick();
    }}
  >
    View More
  </button>
</div>

      </div>
    </div>
  );
};
