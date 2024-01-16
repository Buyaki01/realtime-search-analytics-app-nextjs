"use client"

import { useState } from "react"
import SearchAnalyticsPage from "./SearchAnalyticsPage"
import SearchForm from "./SearchForm"
import SearchResultsPage from "./SearchResultsPage"

const HomePage = () => {
  const [searchResultsData, setSearchResultsData] = useState(null)

  return (
    <div className="grid grid-cols-3 gap-4 mx-2">
      <div className="col-span-2 p-2">
        <SearchForm setSearchResultsData={setSearchResultsData} />
        <SearchResultsPage searchResultsData={searchResultsData} />
      </div>

      <div className="col-1 p-2 shadow-md bg-gray-500 m-2 h-48">
        <SearchAnalyticsPage />
      </div>
    </div>
  )
}

export default HomePage