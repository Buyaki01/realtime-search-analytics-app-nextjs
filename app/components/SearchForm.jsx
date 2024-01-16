'use client'

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("")

  // const searchParams = useSearchParams()
  // const urlSearchQuery = searchParams.get('query')

  const handleSearchQuery = async (e) => {
    e.preventDefault()
    
    const response = await axios.post('/api/search', { searchQuery })
    console.log("This is the response coming from the backend: ", response.data.searchResults)
    // await axios.post(`/api/search?query=${urlSearchQuery}`, { urlSearchQuery })
  }

  return (
    <form className="mt-5" onSubmit={handleSearchQuery}>
      <div className="flex gap-1 justify-center">
        <input 
          type="text" 
          placeholder="Search here"
          className="px-4 py-2 rounded-md border border-solid"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value)}}
        />

        <button 
          type="submit"
          className="px-4 py-2 rounded-md text-white"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default SearchForm