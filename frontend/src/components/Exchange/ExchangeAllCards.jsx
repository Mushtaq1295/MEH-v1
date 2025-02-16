import React from "react";
import ExchangeEngines from "./ExchangeEngines";
import ExchangeAccessories from "./ExchangeAccessories";


const ExchangeAllCards = () => {
  return (
    <>
      <h1 className="text-3xl font-bold m-6 text-white">Engines</h1>
        <ExchangeEngines/>

      <h1 className="text-3xl font-bold m-6 text-white">Accessories</h1>
      <ExchangeAccessories/>
    </>
  );
};

export default ExchangeAllCards;