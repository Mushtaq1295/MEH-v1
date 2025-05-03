import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api"; // Adjust the path as needed
import { useHistoryContext } from "../../contexts/HistoryContext"; // Adjust the path as needed

const EngineHistoryDetails = () => {
  const { id } = useParams(); // get the engine id from the URL
  const navigate = useNavigate();
  const { enginesHistory, refreshHistory } = useHistoryContext();

  // Find the engine in the history using its id
  const engine = enginesHistory.find((item) => item._id === id);

  if (!engine) {
    return (
      <div className="text-white text-center mt-10">
        No engine details available.
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_BACKEND_URL}/history/engines/${engine._id}`
      );
      if (response.data.success) {
        alert("Engine deleted successfully!");
        refreshHistory();
        navigate("/history");
      }
    } catch (error) {
      console.error("Error deleting engine:", error);
      alert(error.response?.data?.message || "Failed to delete engine.");
    }
  };

  return (
    <>
      <h3 className="text-white text-center text-2xl font-semibold mt-5 ml-4 sm:text-xl md:text-2xl lg:text-3xl">
        Details of {engine.customer_name}
      </h3>

      <div className="mt-2 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start dark:bg-gray-900 shadow-lg rounded-lg p-4 shadow-gray-600">
          <img
            className="w-full lg:w-[60%] aspect-[4/3] object-cover rounded-lg"
            src={engine.image_url_main}
            alt="Engine"
          />
          <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
            <ul className="space-y-4 text-lg sm:text-base md:text-xl text-white">
              <li>
                <strong className="text-lg">Date Sold: </strong>
                {engine.createdAt
                  ? new Date(engine.createdAt).toLocaleDateString()
                  : "DD/MM/YYYY"}
              </li>
              <li>
                <strong className="text-lg">Title: </strong>
                {engine.title}
              </li>
              {engine.category && (
                <li>
                  <strong className="text-lg">Category: </strong>
                  {engine.category}
                </li>
              )}
              {engine.model && (
                <li>
                  <strong className="text-lg">Model: </strong>
                  {engine.model}
                </li>
              )}
              <li>
                <strong className="text-lg">Customer Name: </strong>
                {engine.customer_name}
              </li>
              <li>
                <strong className="text-lg">Phone Number: </strong>
                {engine.phone_number}
              </li>
              <li>
                <strong className="text-lg">Quantity: </strong>
                {engine.available}
              </li>
              <li>
                <strong className="text-lg">Pay Mode: </strong>
                {engine.pay_mode}
              </li>
              <li>
                <strong className="text-lg">Sold Price: </strong>₹{engine.price}
              </li>
              <li>
                <strong className="text-lg">Exchange: </strong>
                {engine.exchange ? "Yes" : "No"}
              </li>
              {engine.exchange && (
                <>
                  {engine.category && (
                    <li>
                      <strong className="text-lg">Exchange Category: </strong>
                      {engine.category}
                    </li>
                  )}
                  {engine.category === "Accessories" && engine.item_name && (
                    <li>
                      <strong className="text-lg">Accessory Name: </strong>
                      {engine.item_name}
                    </li>
                  )}
                  {engine.category === "Engines" && (
                    <>
                      {engine.engine_brand && (
                        <li>
                          <strong className="text-lg">Engine Brand: </strong>
                          {engine.engine_brand}
                        </li>
                      )}
                      {engine.model && (
                        <li>
                          <strong className="text-lg">Model: </strong>
                          {engine.model}
                        </li>
                      )}
                    </>
                  )}
                </>
              )}
            </ul>
            <div className="mt-6 flex space-x-2">
              <button
                onClick={handleDelete}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EngineHistoryDetails;
