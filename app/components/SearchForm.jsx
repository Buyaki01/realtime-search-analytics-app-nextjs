'use client'

import axios from "axios"
import toast from "react-hot-toast"

const SearchForm = ({ searchQuery, setSearchQuery, setSearchResultsData, setLoading }) => {

  const handleSearchQuery = async (e) => {
    e.preventDefault()

    setLoading(true)

    const cleanedInput = searchQuery.replace(/\s+/g, ' ').trim()

    if (cleanedInput === "") {
      toast.error('Please enter a search query')
      return
    }

    try {
      const response = await axios.post(`/api/search`, { searchQuery: cleanedInput })

      if (response.data.message === "Search query not found") {
        toast.error("Word not found!")
        setSearchQuery('')
        setSearchResultsData(null)
        return
      } else {
        setSearchQuery('')
        setSearchResultsData(response.data.searchResults)
      }
    } catch (error) {
      console.error("Error occurred during search:", error)
      toast.error("An error occurred during search. Please try again later.")
    }

    setLoading(false)
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
        <h1 className="font-bold text-2xl text-white">Wikipedia Search</h1>
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
    </>
  )
}

export default SearchForm