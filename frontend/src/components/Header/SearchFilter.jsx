import React from 'react'
import Search from './Search';
import accessoriesData from "..."
import enginesData from "./data/enginesData";

const SearchFilter = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Search Accessories</h1>
      <Search data={accessoriesData} type="accessories" />

      <h1 className="text-2xl font-bold text-center my-4">Search Engines</h1>
      <Search data={enginesData} type="engines" />
    </div>
  )
}

export default SearchFilter
