import React from 'react'
import EngineCard from '../Engines/EngineCard'

const Eicher = () => {
  return (
    <>
      <h1 id='eicher' className="text-3xl font-bold m-6">Eicher</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            <EngineCard image="/Engines-pics/BS5.webp" title="BS5" available={10} bf="Delhi"/>
            <EngineCard image="/Engines-pics/BS6.webp" title="BS6" available={10} bf="Delhi"/>
            <EngineCard image="/Engines-pics/Cummins.webp" title="Cummins" available={10} bf="Delhi"/>
            <EngineCard image="/Engines-pics/Eicher.webp" title="Eicher" available={10} bf="Delhi"/>

      </div>
    </>
  )
}

export default Eicher
