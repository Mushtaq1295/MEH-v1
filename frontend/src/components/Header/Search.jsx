import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEngines } from "../../contexts/EnginesContext";
import { useAccessories } from "../../contexts/AccessoriesContext";


const Search = () => {
  const [query, setQuery] = useState("");
  const { engines } = useEngines();
  const { accessories } = useAccessories();
  const navigate = useNavigate();

  // Combine both engines and accessories data
  const allProducts = [...engines, ...accessories];
//   console.log(allProducts);

  // Filter products based on search query
  const filteredProducts = allProducts
    .filter((product) => product.title?.toLowerCase().includes(query.toLowerCase())||
     product.category && product.category?.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5); // Limit results to 5

  const handleSelectProduct = (product) => {
    if (product.category) {
      navigate(`/engines/${product.category}/${product._id}`); // Navigate to Engine details
    } else{
      navigate(`/accessories/${product._id}`); // Navigate to Accessories details
    }
    setQuery(""); // Clear input after selection
  };

  return (
    <div className="relative w-full max-w-xs md:max-w-sm pl-3 pr-2">
      <div className="relative">
        <input
          type="text"
          className="block w-full p-3 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
      </div>

      {/* Display search results */}
      {query && (
        <ul className="absolute z-50 w-full bg-white shadow-md mt-1 rounded-lg max-h-48 overflow-y-auto">
          {filteredProducts.map((product) => (
            <li
              key={product._id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectProduct(product)}
            >
              {product.title} {product.category ? `,${product.category}` : ""}
            </li>
          ))}
          {filteredProducts.length === 0 && (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
