import React from 'react';
import AccessCard from './AccessCard';
import AccessCardDetails from './AccessCardDetails';
import { useAccessories } from '../../contexts/AccessoriesContext';

const Accessories = () => {
  const { accessories, selectedAccessory } = useAccessories();

  return (
    <>
      <div id='accessories' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {accessories.map(accessory => (
          <AccessCard 
            key={accessory._id}
            accessory={accessory}
          />
        ))}
      </div>
      
      {selectedAccessory && <AccessCardDetails />}
    </>
  );
};

export default Accessories;