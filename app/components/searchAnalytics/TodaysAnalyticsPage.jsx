"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const TodaysAnalyticsPage = ({searchQuery}) => {
  const [searchAnalyticsToday, setSearchAnalyticsToday] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchSearchAnalyticsToday = async () => {
      console.log("This is the search query in today's analytics: ", searchQuery)
      try {
        const response = await axios.get("/api/search-analytics/analytics-today", {
          headers: {
            'Cache-Control': 'no-store', // Disable caching
          },
        })
        setSearchAnalyticsToday(response.data.formattedAnalytics)
        setLoading(false)

      } catch (error) {
        console.error("Error fetching search analytics today:", error)
        toast.error("Error occured! Please refresh the page and try again")
        setLoading(false)
      }
    }

    fetchSearchAnalyticsToday()
  }, [searchQuery])

  return (
    <div className="mb-5 text-white pt-3 px-3 w-full">
      <h3 className="text-xl font-bold mb-3">10 Most Searched Words Today</h3>
      {loading 
        ? 
          ( <p className="mt-5 text-center">Loading...</p> ) 
        : searchAnalyticsToday.length === 0 
          ? (
              <p className="mt-5 text-center">No searched word today</p>
            )
          : (
              <table className="table-auto px-2">
                <thead>
                  <tr>
                    <td className="border px-2 py-1 whitespace-nowrap">User</td>
                    <th className="border px-2 py-1 whitespace-nowrap">Searched Word</th>
                    <th className="border px-2 py-1 whitespace-nowrap">No. of times Searched</th>
                  </tr>
                </thead>
                <tbody>
                  {searchAnalyticsToday.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1 whitespace-nowrap">{item.userIp}</td>
                      <td className="border px-2 py-1 whitespace-nowrap">{item.searchQuery}</td>
                      <td className="border px-2 py-1 whitespace-nowrap">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
      }
    </div>
  )
}

export default TodaysAnalyticsPage