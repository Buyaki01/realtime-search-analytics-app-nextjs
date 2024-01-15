const SearchForm = () => {
  return (
    <form className="mt-5">
      <div className="flex gap-1 justify-center">
        <input 
          type="text" 
          placeholder="Search here"
          className="px-4 py-2 rounded-md border border-solid"
        />

        <button 
          type="submit"
          className="px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default SearchForm