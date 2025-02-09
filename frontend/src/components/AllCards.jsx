import React from 'react';
import EngineCard from './Engines/EngineCard';
import AshokLeyland from './Engines/AshokLeyland';
// import Accessories from './Accessories/Accessories';
import Tata from './Engines/Tata';
import BharatBenz from './Engines/BharatBenz';
import Eicher from './Engines/Eicher';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accessories from '../components/Accessories/Accessories';
import AccessCardDetails from '../components/Accessories/AccessCardDetails';
import { AccessoriesProvider } from '../contexts/AccessoriesContext';



const AllCards = () => {
  return (
    <>
       
      <h1 className="text-3xl font-bold m-6">Engines</h1>
      
      <AshokLeyland/>
      <hr />
      <Tata/>
      <hr />
      <BharatBenz/>
      <hr />
      <Eicher/>
      <hr />
      
      <h1 className="text-3xl font-bold m-6">Accessories</h1>
      <Accessories/>
    
        {/* <Routes>
          <Route path="/" element={<Accessories />} />
          <Route path="/details" element={<AccessCardDetails />} />
        </Routes> */}


     
    </>
  );
};

export default AllCards;