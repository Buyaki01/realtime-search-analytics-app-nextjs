'use client'

import axios from "axios"
import { useState } from "react"
import SearchResultsPage from "./SearchResultsPage"
import toast from "react-hot-toast"

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResultsData, setSearchResultsData] = useState(null)

  const handleSearchQuery = async (e) => {
    e.preventDefault()

    const cleanedInput = searchQuery.replace(/\s+/g, ' ').trim();

    if (cleanedInput === "") {
      toast.error('Please enter a search query')
      return
    }

    const response = await axios.post('/api/search', { searchQuery: cleanedInput })
    setSearchResultsData(response.data.searchResults)
  }

  return (
    <>
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

      <SearchResultsPage searchResultsData={searchResultsData} />
    </>
  )
}

export default SearchForm