import connectMongoDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const POST = async (request) => {
  const { searchQuery } = await request.json()

  const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchQuery}&gsrlimit=20&prop=pageimages|extracts&exchars=200&exintro&explaintext&exlimit=max&format=json&origin=*`

  const response = await fetch(wikipediaUrl)
  const data = await response.json()
  
  const searchResults = Object.values(data.query.pages).map((result) => ({
    pageId: result.pageid,
    title: result.title,
    extract: result.extract,
    image: result.thumbnail?.source || null,
  }))
  
  return NextResponse.json({ searchResults })

  // try {
  //   await connectMongoDB()
   
    
  // } catch (error) {
  //   console.error("An error occured!:", error)
  //   return NextResponse.json({ error: "Failed to POST to search record" }, { status: 500 })
  // }
}
