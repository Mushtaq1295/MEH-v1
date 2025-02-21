import React from 'react'
import { useNavigate } from 'react-router-dom';

const handleClick = () => {
    // Navigate to the details page and pass the accessory data
    // navigate(`accessories/${accessory._id}`, { state: { accessory } });
  };

const HistoryEngineCard = () => {
  return (
        <>
            <div 
    className="relative w-full max-w-sm dark:bg-gray-900 border border-gray-100 rounded-lg shadow-sm transition-transform sm:w-auto"
>
    {/* Date at the top right */}
    <p className="absolute top-2 right-4 text-[13px] text-gray-400 sm:text-base md:text-lg lg:text-xl">
        DD/MM/YYYY
    </p>

    <div className="p-2 mt-5 text-white">
        <p className="mb-2 text-lg">Name :</p>
        <p className="mb-2 text-lg">Customer :</p>
        <p className="mb-2 text-lg">Price :</p>
    </div>
    <button 
        type="button" 
        className="cursor-pointer ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-[12px] px-2 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View More</button>
</div>

        </>
  )
}

export default HistoryEngineCard
