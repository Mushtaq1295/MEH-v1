import React from 'react'

const HistoryAccessCardDetails = () => {
  return (
    <>
      <h3 className="text-white text-center text-2xl font-semibold mt-5 ml-4 sm:text-xl md:text-2xl lg:text-3xl">
          Details of 
            {/* {accessory.title.charAt(0).toUpperCase() + accessory.title.slice(1).replace("-", " ")} */}
      </h3>
        
        <div className="mt-2 w-full max-w-4xl mx-auto px-4">            
            <div className="flex flex-col lg:flex-row items-start dark:bg-gray-900 shadow-lg rounded-lg p-4">
            <img 
            className="w-full lg:w-[60%] aspect-[4/3] object-cover rounded-lg" 
            src='https://res.cloudinary.com/dv8h7yjv2/image/upload/v1738475235/public/Accessories-pics/u7szjpuixit5remhtr9u.webp'
            // src={accessory.image_url} 
            // alt={accessory.title} 
            />
            <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
                <ul className="space-y-4 text-lg sm:text-base md:text-xl text-white">
                <li>
                <strong className='text-lg'>Date of Sold: DD/MMMM/YYYY</strong>
                    {/* {accessory.title.replace("-", " ")} */}
                    </li>
                    <li>
                    <strong className="text-lg">Title : </strong> 
                    {/* {accessory.title.replace("-", " ")} */}
                    </li>
                    <li>
                    <strong className="text-lg">Sold To (Customer Name) : </strong> 
                    {/* {accessory.available} */}
                    </li>
                    <li>
                    <strong className="text-lg">Phone Number : </strong> 
                    {/* {accessory.available} */}
                    </li>
                    <li>
                    <strong className="text-lg">Quantity : </strong>
                    {/* ₹ {accessory.price} */}
                    </li>
                    <li>
                    <strong className="text-lg">Pay Mode : </strong>
                    {/* ₹ {accessory.price} */}
                    </li>
                    <li>
                    <strong className="text-lg">Sold Price : </strong>
                    {/* ₹ {accessory.price} */}
                    </li>
                </ul>
</div>

        </div>
        </div>
    </>
  )
}

export default HistoryAccessCardDetails
