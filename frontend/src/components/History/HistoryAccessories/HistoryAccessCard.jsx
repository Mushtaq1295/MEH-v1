import React from 'react'
import { useNavigate } from 'react-router-dom';

const HistoryAccessCard = () => {
    const navigate = useNavigate();


  const handleClick = () => {
    // Navigate to the details page and pass the accessory data
    // navigate(`accessories/${accessory._id}`, { state: { accessory } });
  };
  return (
    <div>
      <div 
      className="max-w-sm dark:bg-gray-900 border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105 cursor-pointer"
    //   onClick={handleClick}
    >

   
      <img 
        className="rounded-t-lg w-full h-60 object-cover"  
        src='https://res.cloudinary.com/dv8h7yjv2/image/upload/v1738475235/public/Accessories-pics/u7szjpuixit5remhtr9u.webp' 
        // src={accessory.image_url} 
        // alt={accessory.title} 
      />
      
        
 
      <div className="p-5 text-white">
        <h6 className="mb-2 text-xl font-semibold">  
          {/* {accessory.title.replace("-", " ")} */} 
          Customer: 
        </h6>
        <p className="mb-3 text-lg">
         Price :
        </p>
        <p className="mt-4 text-sm text-right pr-4 sm:text-base md:text-lg lg:text-xl">
            DD/MM/YYYY
        </p>
      </div>
    </div>
    </div>
  )
}

export default HistoryAccessCard
