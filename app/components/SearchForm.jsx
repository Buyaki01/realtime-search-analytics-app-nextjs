'use client'

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("")

  // const searchParams = useSearchParams()
  // const searchQuery = searchParams.get('query')

  const handleSearchQuery = async (e) => {
    e.preventDefault()
    
    await axios.post('/api/search', { searchQuery })
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