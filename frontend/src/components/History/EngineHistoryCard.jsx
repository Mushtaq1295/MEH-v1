import React from "react";
import { useNavigate } from "react-router-dom";

export const EngineHistoryCard = ({ engine }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/history/engines/${engine._id}`, { state: { engine } });
  };

  return (
    <div className="border border-white rounded-lg" onClick={handleClick}>
      <p className="absolute top-2 right-4 text-[13px] text-gray-400 sm:text-base md:text-lg lg:text-xl">
        {engine.createdAt
          ? new Date(engine.createdAt).toLocaleDateString()
          : "DD/MM/YYYY"}
      </p>
      <div className="p-2 mt-5 text-white">
        <p className="mb-2 text-lg">
          <strong>Title:</strong> {engine.title}
        </p>
        <p className="mb-2 text-lg">
          <strong>Customer:</strong> {engine.customer_name}
        </p>
        <p className="mb-2 text-lg">
          <strong>Price:</strong> ₹{engine.price}
        </p>
        <div className="flex justify-center p-1">
          {engine.exchange ? (
            <img
              src={engine.image_url}
              alt={engine.title}
              className="rounded-t-lg w-full h-60 object-cover"
            />
          ) : (
            <img
              src={engine.image_url_main}
              alt={engine.title}
              className="rounded-t-lg w-full h-60 object-cover"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="cursor-pointer ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-[12px] px-2 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        View More
      </button>
    </div>
  );
};
