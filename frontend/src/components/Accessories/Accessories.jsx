import React from 'react';
import AccessCard from './AccessCard';
import AccessCardDetails from './AccessCardDetails';
import { useAccessories } from '../../contexts/AccessoriesContext';

const Accessories = () => {
  const { accessories, selectedAccessory } = useAccessories();

  return (
    <>
      <div className="px-4 sm:px-1">
      <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
        {accessories.map((accessory) => (
          <AccessCard key={accessory._id} accessory={accessory} />
          ))}
      </div>
      </div>

      
      {selectedAccessory && <AccessCardDetails />}
    </>
  );
};

export default Accessories;