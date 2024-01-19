"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const TodaysAnalyticsPage = () => {
  const [searchAnalyticsToday, setSearchAnalyticsToday] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSearchAnalyticsToday = async () => {
      try {
        const response = await axios.get("/api/search-analytics/analytics-today", {
          headers: {
            'Cache-Control': 'no-store', // Disable caching
          },
        })
        setSearchAnalyticsToday(response.data.searchAnalyticsToday)
        setLoading(false)

      } catch (error) {
        console.error("Error fetching search analytics today:", error)
        toast.error("Error occured! Please refresh the page and try again")
        setLoading(false)
      }
    }

    fetchSearchAnalyticsToday()
  }, [])

  return (
    <div className="mb-5 text-white pt-3 px-3">
      <h3 className="text-xl font-bold mb-3">10 Most Searched Words Today</h3>
      {loading 
        ? 
          ( <p className="mt-5 text-center">Loading...</p> ) 
        : searchAnalyticsToday.length === 0 
          ? (
              <p className="mt-5 text-center">No searched word today</p>
            )
          : (
              <table className="table-auto border border-2 border-collapse w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 whitespace-nowrap">Searched Word</th>
                    <th className="border px-4 py-2 whitespace-nowrap">No. of times Searched</th>
                  </tr>
                </thead>
                <tbody>
                  {searchAnalyticsToday.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item._id}</td>
                      <td className="border px-4 py-2">{item.count}</td>
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