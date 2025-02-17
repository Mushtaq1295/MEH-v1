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
    className="relative w-full max-w-sm dark:bg-gray-900 border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105 cursor-pointer sm:w-auto"
>
    {/* Date at the top right */}
    <p className="absolute top-2 right-4 text-sm text-gray-400 sm:text-base md:text-lg lg:text-xl">
        DD/MM/YYYY
    </p>

    <div className="p-2 mt-4 text-white">
        <p className="mb-2 text-lg">Name :</p>
        <p className="mb-2 text-lg">Customer :</p>
        <p className="mb-2 text-lg">Price :</p>
    </div>
</div>

        </>
  )
}

export default HistoryEngineCard
