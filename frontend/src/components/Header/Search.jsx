import React from 'react'

const Search = () => {
  return (
    <>
     {/* Search Bar (Visible in both Desktop & Mobile) */}
    <div className="flex-1 flex justify-center md:justify-end ml-5">
        <div className="relative w-full max-w-sm"> {/* Reduced max width */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
            <input
            type="text"
            id="search-navbar"
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            />
        </div>
    </div> 
    </>
  )
}

export default Search
