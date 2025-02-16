import React from 'react'
import HistoryAccessCard from './HistoryAccessCard'

const HistoryAccessories = () => {
  return (
    <div>
     

      <div className="px-4 sm:px-1">
      <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      <HistoryAccessCard/>
      </div>
      </div>

    </div>
  )
}

export default HistoryAccessories
