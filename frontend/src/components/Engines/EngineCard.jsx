// import React from "react";
// import { Link } from "react-router-dom";

// const EngineCard = ({ image, title, price, model, available, bf, engineCat }) => {
//     const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
//     const formattedImage = encodeURIComponent(image);
//     const formattedBF = encodeURIComponent(bf);
//     const formattedModel = encodeURIComponent(model);
//     const formattedEngCat = encodeURIComponent(engineCat);
  
//     return (
//       <Link 
//         to={`/card/${formattedTitle}/${formattedModel}/${formattedImage}/${available}/${formattedBF}/${formattedEngCat}/${price}`} 
//         className="block"
//       >
      // <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-100 dark:border-gray-700 transition-transform transform hover:scale-105">
      //   <img className="rounded-t-lg" src={image} alt="error" />
      //   <div className="p-5">
      //     <h6 className="mb-2 text-xl">Name: {title}</h6>
      //     <p className="mb-3 text-xl">Available: {available}</p>

      //     {/* <p className="mb-3 text-xl">Bought From: {bf}</p> */}
      //   </div>
      // </div>
//     </Link>
//   );
// };

// export default EngineCard;




import React from "react";

const EngineCard = ({ image, title, available }) => {
  // Default values to prevent crashes
  const safeTitle = title || "Unknown Engine";
  const safeImage = image || "https://via.placeholder.com/300"; // Placeholder image
  const safeAvailable = available ?? "N/A"; // Handle undefined availability

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105">
      <img className="rounded-t-lg" src={safeImage} alt={safeTitle} />
      <div className="p-5">
        <h6 className="mb-2 text-xl font-semibold">Name: {safeTitle}</h6>
        <p className="mb-3 text-lg">Available: {safeAvailable}</p>
      </div>
    </div>
  );
};

export default EngineCard;



