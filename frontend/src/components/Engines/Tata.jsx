import React from 'react'
import EngineCard from '../Engines/EngineCard'

const Tata = () => {
  return (
    <>
    
      <h1 id='tata' className="text-3xl font-bold m-6">Tata</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            <EngineCard image="/Engines-pics/Eicher.webp" title="Eicher" available={10}/>
            <EngineCard image="/Engines-pics/Tata.webp" title="TATA" available={10} />
            <EngineCard image="/Engines-pics/Tata.webp" title="TATA" available={10} />
            <EngineCard image="/Engines-pics/Tata.webp" title="TATA" available={10} />
      </div>
    </>
  )
}

export default Tata
