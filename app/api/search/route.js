import connectMongoDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const POST = async (request) => {
  const { searchQuery } = await request.json()

  try {
    await connectMongoDB()
   
    
  } catch (error) {
    console.error("An error occured!:", error)
    return NextResponse.json({ error: "Failed to POST to search record" }, { status: 500 })
  }
}