import React from "react";
import { useAccessories } from "../contexts/AccessoriesContext";
import { Link } from "react-router-dom";

const AccessoriesPage = () => {
  const { accessories } = useAccessories();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Accessories</h1>
      <ul>
        {accessories.map((accessory) => (
          <li key={accessory.id} className="p-2 border-b">
            <Link to={`/accessories/${accessory.id}`} className="text-blue-500">
              {accessory.title} - ₹{accessory.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessoriesPage;
