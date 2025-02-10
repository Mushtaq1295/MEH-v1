// import React from "react";
// import { Link } from "react-router-dom";
// import { useEngines } from "../../contexts/EnginesContext";

// const EngineList = () => {
//   const { engines } = useEngines();

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Engines</h1>

//       {/* Navigation Buttons for Different Engine Brands */}
//       <div className="flex justify-center space-x-4 mb-6">
//         <Link to="/engines/ashok-leyland" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Ashok Leyland</Link>
//         <Link to="/engines/tata" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Tata</Link>
//         <Link to="/engines/eicher" className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Eicher</Link>
//         <Link to="/engines/bharatbenz" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">BharatBenz</Link>
//       </div>

//       {/* Engine Overview List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//         {/* Ashok Leyland */}
//         <div className="border p-4 rounded-lg shadow-lg bg-white">
//           <h2 className="text-xl font-semibold">Ashok Leyland</h2>
//           <ul className="mt-2">
//             {engines.AshokLeyland.slice(0, 3).map((engine) => (
//             <li key={engine.id} className="border-b py-2">
//               {engine.name} - ₹{engine.price}
//             </li>
//              ))}
//           </ul>

//           <Link to="/engines/ashok-leyland" className="text-blue-600 hover:underline mt-2 block">View More</Link>
//         </div>

//         {/* Tata */}
//         <div className="border p-4 rounded-lg shadow-lg bg-white">
//           <h2 className="text-xl font-semibold">Tata</h2>
//           <ul className="mt-2">
//             {engines.Tata.slice(0, 3).map((engine) => (
//               <li key={engine.id} className="border-b py-2">
//                 {engine.name} - ₹{engine.price}
//               </li>
//             ))}
//           </ul>
//           <Link to="/engines/tata" className="text-green-600 hover:underline mt-2 block">View More</Link>
//         </div>

//         {/* Eicher */}
//         <div className="border p-4 rounded-lg shadow-lg bg-white">
//           <h2 className="text-xl font-semibold">Eicher</h2>
//           <ul className="mt-2">
//             {engines.Eicher.slice(0, 3).map((engine) => (
//               <li key={engine.id} className="border-b py-2">
//                 {engine.name} - ₹{engine.price}
//               </li>
//             ))}
//           </ul>
//           <Link to="/engines/eicher" className="text-yellow-600 hover:underline mt-2 block">View More</Link>
//         </div>

//         {/* BharatBenz */}
//         <div className="border p-4 rounded-lg shadow-lg bg-white">
//           <h2 className="text-xl font-semibold">BharatBenz</h2>
//           <ul className="mt-2">
//             {engines.BharatBenz.slice(0, 3).map((engine) => (
//               <li key={engine.id} className="border-b py-2">
//                 {engine.name} - ₹{engine.price}
//               </li>
//             ))}
//           </ul>
//           <Link to="/engines/bharatbenz" className="text-red-600 hover:underline mt-2 block">View More</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EngineList;




import React from "react";
import EngineCard from "./EngineCard";
import { useEngines } from "../../contexts/EnginesContext";

const EnginesList = () => {
  const { engines, selectedCategory } = useEngines();
  
  // Show engines of the selected category
  const filteredEngines = selectedCategory
    ? engines.filter(engine => engine.category === selectedCategory)
    : [];

  return (
    <div className="p-4">
    {selectedCategory ? (
      <>
        <h2 className="text-2xl font-semibold mb-4">{selectedCategory} Engines</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEngines.map(engine => (
            <EngineCard key={engine._id} engine={engine} />
          ))}
        </div>
      </>
    ) : (
      <h2 className="text-center text-xl">Select a category to view engines</h2>
    )}
  </div>
  
  );
};

export default EnginesList;
