import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEngines } from "../../contexts/EnginesContext";
import { useAccessories } from "../../contexts/AccessoriesContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const { engines, loading: enginesLoading } = useEngines();
  const { accessories, loading: accessoriesLoading } = useAccessories();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Combine engines and accessories, ensuring no undefined entries
  const allProducts = [
    ...(engines || []).filter((item) => item && item._id && item.title),
    ...(accessories || []).filter((item) => item && item._id && item.title),
  ];

  // Filter products based on search query
  const filteredProducts = allProducts
    .filter(
      (product) =>
        product &&
        (product.title?.toLowerCase().includes(query.toLowerCase()) ||
          (product.category &&
            product.category.toLowerCase().includes(query.toLowerCase())))
    )
    .slice(0, 5); // Limit to 5 results

  const handleSelectProduct = (product) => {
    if (product.category) {
      navigate(`/engines/${product.category || "unknown"}/${product._id}`);
    } else {
      navigate(`/accessories/${product._id}`);
    }
    setQuery("");
    setIsOpen(false);
  };

  // Show loading spinner while data is fetching
  if (enginesLoading || accessoriesLoading) {
    return (
      <div className="flex items-center pl-3 pr-2">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-xs md:max-w-sm pl-3 pr-2"
      ref={dropdownRef}
    >
      <div className="relative">
        <input
          type="text"
          className="block w-full p-3 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search engines or accessories..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(!!e.target.value);
          }}
        />
      </div>
      {isOpen && query && (
        <ul className="absolute z-50 w-full bg-white shadow-md mt-1 rounded-lg max-h-48 overflow-y-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product._id}
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => handleSelectProduct(product)}
              >
                {product.title}
                {product.category ? `, ${product.category}` : ""}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500 dark:text-gray-400">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
