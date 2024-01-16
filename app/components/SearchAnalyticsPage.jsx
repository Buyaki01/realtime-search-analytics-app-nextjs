"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const SearchAnalyticsPage = () => {
  const [searchAnalyticsToday, setSearchAnalyticsToday] = useState([])

  useEffect(() => {
    const fetchSearchAnalyticsToday = async () => {
      try {
        const response = await axios.get("/api/search-analytics/analytics-today")
        setSearchAnalyticsToday(response.data.searchAnalyticsToday)

      } catch (error) {
        console.error("Error fetching search analytics today:", error)
      }
    }

    fetchSearchAnalyticsToday()
  }, [])

  return (
    <div>
      <div>
        <h3>10 Most Searched Today</h3>
        <ul>
          {searchAnalyticsToday.map((item, index) => (
            <li key={index}>
              {item._id} searched {item.count} times
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>10 Most Searched Last 7 Days</h3>
      </div>

      <div>
        <h3>10 Most Searched Last Month</h3>
      </div>
    </div>
  )
}

export default SearchAnalyticsPage