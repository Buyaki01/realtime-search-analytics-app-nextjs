import connectMongoDB from "@/lib/mongoose"
import SearchRecord from "@/models/searchRecord"
import moment from "moment"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()

    const today = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
    
    const searchAnalyticsToday = await SearchRecord.aggregate([
      {
        $match: { createdAt: { $gte: new Date(today) } }
      },
      {
        $group: {
          _id: "$searchQuery",
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

    return NextResponse.json({ searchAnalyticsToday })
  } catch (error) {
    console.error("Error occured while fetching search analytics today!:", error)
    return NextResponse.json({ error: "Error occured while fetching search analytics today" }, { status: 500 })
  }
}
