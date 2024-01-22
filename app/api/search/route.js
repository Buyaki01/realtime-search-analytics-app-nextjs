import connectMongoDB from "@/lib/mongoose"
import SearchRecord from "@/models/searchRecord"
import { NextResponse } from "next/server"
import { headers } from 'next/headers'

export const POST = async (request) => {
  const { searchQuery } = await request.json()

  const userIp = headers().get('x-real-ip') || headers().get('x-forwarded-for')

  if (!userIp) {
    return NextResponse.json({ error: "User IP address not available" }, { status: 400 })
  }

  try {
    await connectMongoDB()
    await SearchRecord.create({ searchQuery, userIp })
  } catch (error) {
    console.error("Error occured while saving to the SearchRecord model!:", error)
    return NextResponse.json({ error: "Error occurred while saving to the SearchRecord model" }, {
      status: 500,
    })
  }

  const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchQuery}&gsrlimit=20&prop=pageimages|extracts&exchars=200&exintro&explaintext&exlimit=max&format=json&origin=*`

  try {
    const response = await fetch(wikipediaUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()

    if (!data.query || !data.query.pages || Object.keys(data.query.pages).length === 0) {
      return NextResponse.json({ message: "Search query not found" }, {
        status: 404,
      })
    }

    const searchResults = Object.values(data.query.pages).map((result) => ({
      pageId: result.pageid,
      title: result.title,
      extract: result.extract,
      image: result.thumbnail?.source || null,
    }))

    return NextResponse.json({ searchResults }, {
      headers: {
        "Cache-Control": "no-store", // Disable caching
      },
    })
  } catch (error) {
    console.error("Error occurred during Wikipedia API request:", error)
    return NextResponse.json({ error: "Error occurred during Wikipedia API request" }, { status: 500 })
  }
}
