import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import Search from "./Search";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (!result.success) {
      toast.error(result.message);
    }
  };

  return (
    <nav className="top-0 z-50 shadow-md bg-white border-gray-200 dark:bg-gray-900 sticky shadow-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 md:flex-nowrap">
        <NavLink to="/" className="meh-shimmer">
          MEH
        </NavLink>
        <div className="flex justify-center md:justify-start">
          <Search />
        </div>
        <div className="flex md:order-2">
          <button
            type="button"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
        <div
          ref={menuRef}
          className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-md rounded-lg md:relative md:w-auto md:flex md:items-center md:space-x-8 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
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
                to="/history"
                className="block py-2 px-3 text-blue-700 dark:text-blue-500"
              >
                History
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 text-blue-700 dark:text-blue-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 text-blue-700 dark:text-blue-500"
                  >
                    Login
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 text-blue-700 dark:text-blue-500"
                  >
                    Register
                  </NavLink>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
