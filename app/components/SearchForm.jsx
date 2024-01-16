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

  const handleReset = () => {
    setSearchQuery("")
    setSearchResultsData(null)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setSearchQuery(inputValue)

    // Clear search results when the input field is empty
    if (inputValue.trim() === "") {
      setSearchResultsData(null)
    }
  }

  return (
    <>
      <div className="mt-5 text-center">
        <h1 className="font-bold text-2xl">Wikipedia Search</h1>
        <h5 className="mt-3 text-gray-600 text-sm">Search for anything here</h5>
      </div>
      <form className="mt-5" onSubmit={handleSearchQuery}>
        <div className="flex gap-1 justify-center">
          <input 
            type="text" 
            placeholder="Search here"
            className="px-4 py-2 rounded-md border border-solid"
            value={searchQuery}
            onChange={handleInputChange}
          />

          <button 
            type="submit"
            className="px-4 py-2 rounded-md text-white"
          >
            Submit
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded-md text-white"
            onClick={handleReset}
          >
            Clear Search
          </button>
        </div>
      </form>

      <SearchResultsPage searchResultsData={searchResultsData} />
    </>
  )
}

export default SearchForm