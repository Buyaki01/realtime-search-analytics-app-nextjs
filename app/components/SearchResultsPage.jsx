const SearchResultsPage = ({ searchResultsData }) => {
  return (
    <>
      {searchResultsData && searchResultsData.length === 0 
        ? '' 
        : <div>
            {searchResultsData && searchResultsData.map(result => (
              <div key={result.pageId}>
                <h2>{result.title}</h2>
                <p>{result.extract}</p>
                {result.image && <img src={result.image} alt={result.title} />}
              </div>
            ))}
          </div>
      }
    </>
  )
}

export default SearchResultsPage