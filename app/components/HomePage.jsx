"use client"

import { useState } from "react"
import SearchForm from "./SearchForm"
import SearchResultsPage from "./SearchResultsPage"
import TodaysAnalyticsPage from "./searchAnalytics/TodaysAnalyticsPage"

const HomePage = () => {
  const [searchResultsData, setSearchResultsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="grid grid-cols-3 gap-4 mx-2">
      <div className="col-span-2 p-2">
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchResultsData={setSearchResultsData} setLoading={setLoading}/>
        <SearchResultsPage searchResultsData={searchResultsData} loading={loading}/>
      </div>

      <div className="col-1 shadow-md bg-primary mt-3">
        <TodaysAnalyticsPage searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default HomePage