"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BiArrowBack } from "react-icons/bi"

const page = ({searchQuery}) => {
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
    <div className="text-white pt-3 px-3 w-full">
      <div className="my-3">
        <Link href={'/'}>
          <BiArrowBack className="text-primary text-2xl"/>
        </Link>
        <h3 className="text-xl font-bold text-center">Your Statistics</h3>
      </div>
      {loading 
        ? 
          ( <p className="mt-5 text-center">Loading...</p> ) 
        : searchAnalyticsToday.length === 0 
          ? (
              <p className="mt-5 text-center">No searched word today</p>
            )
          : (
              <div className="mx-5">
                <h4 className="text-xl mt-5 mb-3">10 Most Searched Words Today</h4>
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
              </div>
            )
      }
    </div>
  )
}

export default page