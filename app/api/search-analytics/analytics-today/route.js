import connectMongoDB from "@/lib/mongoose"
import SearchRecord from "@/models/searchRecord"
import moment from "moment"
import { NextResponse } from "next/server"
import { headers } from 'next/headers'

export const GET = async () => {
  const userIp = headers().get('x-real-ip') || headers().get('x-forwarded-for')

  if (!userIp) {
    return NextResponse.json({ error: "User IP address not available" }, { status: 400 })
  }

  try {
    await connectMongoDB()

    const today = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
    
    const searchAnalyticsToday = await SearchRecord.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(today) },
          userIp: userIp
        }
      },
      {
        $group: {
          _id: { userIp: "$userIp", searchQuery: "$searchQuery" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1, //descending order
        },
      },
      {
        $limit: 10,
      },
    ])

    const formattedAnalytics = searchAnalyticsToday.map(({ _id, count }) => ({
      userIp: _id.userIp,
      searchQuery: _id.searchQuery,
      count
    }))

    return NextResponse.json({ formattedAnalytics }, {
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error("Error occured while fetching search analytics today!:", error)
    return NextResponse.json({ error: "Error occured while fetching search analytics today" }, { status: 500 })
  }
}
