import React from 'react'

const HistoryEngineCardDetails = ({ engine, exchangeData }) => {
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
            src='https://res.cloudinary.com/dv8h7yjv2/image/upload/v1738475227/public/Engines-pics/AshokLeyland/mbcxrmt5qty3zgv6rbeu.webp'
            // src={accessory.image_url} 
            // alt={accessory.title} 
            />
           <div className="mt-4 lg:mt-0 lg:ml-7 flex-1">
      <ul className="space-y-4 text-lg sm:text-base md:text-xl text-white">
        <li>
          <strong className="text-lg">Date of Sold: DD/MMMM/YYYY</strong>
        </li>
        <li>
          <strong className="text-lg">Title: </strong> 
          {/* {engine.title.replace("-", " ")} */}
        </li>
        <li>
          <strong className="text-lg">Sold To (Customer Name) : </strong> 
          {/* {engine.available} */}
        </li>
        <li>
          <strong className="text-lg">Phone Number : </strong> 
          {/* {engine.available} */}
        </li>
        <li>
          <strong className="text-lg">Quantity : </strong>
          {/* ₹ {engine.price} */}
        </li>
        <li>
          <strong className="text-lg">Pay Mode : </strong>
          {/* ₹ {engine.price} */}
        </li>
        <li>
          <strong className="text-lg">Sold Price : </strong>
          {/* ₹ {engine.price} */}
        </li>

        {/* Exchange Option (Conditional Rendering) */}
        {exchangeData?.exchange === "yes" && (
          <>
            <li>
              <strong className="text-lg">Exchange Category : </strong> 
              {/* {exchangeData.category} */}
            </li>

            {exchangeData.category === "Accessories" ? (
              <li>
                <strong className="text-lg">Accessory Name : </strong> 
                {/* {exchangeData.name} */}
              </li>
            ) : (
              exchangeData.category === "Engines" && (
                <>
                  <li>
                    <strong className="text-lg">Engine Name : </strong> 
                    {/* {exchangeData.name} */}
                  </li>
                  <li>
                    <strong className="text-lg">Engine Brand : </strong> 
                    {/* {exchangeData.brand} */}
                  </li>
                  <li>
                    <strong className="text-lg">Model : </strong> 
                    {/* {exchangeData.model} */}
                  </li>
                  <li>
                    <strong className="text-lg">Image : </strong> 
                    <img 
                        // src={exchangeData.image_url} 
                        // alt={exchangeData.name} 
                        className="w-32 h-32 object-cover" />
                  </li>
                </>
              )
            )}
          </>
        )}
      </ul>
    </div>
        </div>
        </div>
    </>
  )
}

export default HistoryEngineCardDetails;
