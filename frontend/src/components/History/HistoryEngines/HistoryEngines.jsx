import React from 'react'
import HistoryEngineCard from './HistoryEngineCard'

const HistoryEngines = () => {
  return (
    <>
     
      <div className="px-4 sm:px-1">
      <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
      <HistoryEngineCard/>
      <HistoryEngineCard/>
      <HistoryEngineCard/>
      <HistoryEngineCard/>
      <HistoryEngineCard/>
      <HistoryEngineCard/>
      <HistoryEngineCard/>
      </div>
      </div>
    </>
  )
}

export default HistoryEngines
