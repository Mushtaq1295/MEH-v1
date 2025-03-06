// import React, { useState, useEffect } from "react";
// import HistoryAccessCard from "./HistoryAccessCard";

// const HistoryAccessories = () => {
//   const [accessories, setAccessories] = useState([]);
//   const backend_url = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     fetch(`${backend_url}/history/accessories`)
//       .then((res) => res.json())
//       .then((data) => setAccessories(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <div className="px-4 sm:px-1">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {accessories.map((accessory) => (
//             <HistoryAccessCard key={accessory._id} accessory={accessory} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryAccessories;
