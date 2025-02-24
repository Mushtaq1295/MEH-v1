import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="top-0 z-50 shadow-md bg-white border-gray-200 dark:bg-gray-900 sticky shadow-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 md:flex-nowrap">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-semibold dark:text-white">
          MEH
        </NavLink>

        <div className="flex justify-center md:justify-start">
          <Search />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:order-2">
          <button
            type="button"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Hamburger Icon */}
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>   
        </div>
        {/* Navbar Links */}
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            {/* Home Link */}
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 text-blue-700 dark:text-blue-500"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
              >
                Exchange
              </NavLink>
            </li>

            {/* History Link */}
            <li>
              <NavLink
                to="/history"
                className="block py-2 px-3 text-blue-700 dark:text-blue-500"
              >
                History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className="block py-2 px-3 text-blue-700 dark:text-blue-500"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
