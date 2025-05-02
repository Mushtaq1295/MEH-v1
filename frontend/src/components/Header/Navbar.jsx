import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

const {logout} = useContext(AuthContext);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
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

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      logout();
      navigate("/login")

      // Clear user data on logout
      // setCurrentUser(null);
      // setToken(null);
      // localStorage.removeItem("token"); // Ensure token is removed from storage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
   // Close menu when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="top-0 z-50 shadow-md bg-white border-gray-200 dark:bg-gray-900 sticky shadow-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 md:flex-nowrap">
        {/* Logo */}
        <>
  <style>
    {`
      .highlight-text {
        position: relative;
        display: inline-block;
        color: white;
        font-weight: 800;
        font-size: clamp(2rem, 8vw, 2.5rem);
        white-space: nowrap;
        overflow: visible; /* allow full text */
        line-height: 1.2;
        padding: 0 0.25rem; /* left-right padding */
      }

      .highlight-text::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
        animation: shimmer 2.5s infinite;
      }

      @keyframes shimmer {
        0% {
          left: -100%;
        }
        100% {
          left: 100%;
        }
      }
    `}
  </style>

  <NavLink to="/" className="highlight-text">
    MEH
  </NavLink>
</>


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
  ref={menuRef}
  className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-md rounded-lg md:relative md:w-auto md:flex md:items-center md:space-x-8 ${
    isMenuOpen ? "block" : "hidden"
  }`}
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
              {/* <NavLink
                to=""
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
              >
                Exchange
              </NavLink> */}
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
                onClick={handleLogout}
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
