"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const TodaysAnalyticsPage = () => {
  const [searchAnalyticsToday, setSearchAnalyticsToday] = useState([])

  useEffect(() => {
    const fetchSearchAnalyticsToday = async () => {
      try {
        const response = await axios.get("/api/search-analytics/analytics-today", {
          headers: {
            'Cache-Control': 'max-age=0',
          },
          next: { revalidate: 10 },
        })
        setSearchAnalyticsToday(response.data.searchAnalyticsToday)

      } catch (error) {
        console.error("Error fetching search analytics today:", error)
        toast.error("Error occured! Please refresh the page and try again")
      }
    }

    fetchSearchAnalyticsToday()
  }, [])

  return (
    <div className="mb-5 text-white">
      <h3 className="text-xl font-bold mb-3">10 Most Searched Words Today</h3>
      <table className="table-auto border border-2 border-collapse w-full">
        <thead>
          <tr className="">
            <th className="border px-4 py-2">Searched Word</th>
            <th className="border px-4 py-2">No. of times Searched</th>
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
    </div>
  )
}

export default TodaysAnalyticsPage