const SearchResultsPage = ({ searchResultsData }) => {
  return (
    <>
      {searchResultsData && searchResultsData.length === 0 
        ? '' 
        : <div className="flex flex-col items-center justify-center mt-10">
            {searchResultsData && searchResultsData.map(result => (
              <div key={result.pageId} className="flex gap-2 p-4 shadow-md mb-4">
                {result.image ? (
                  <>
                    <div className="flex w-48 items-center p-2">
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold mb-2">{result.title}</h2>
                      <p>{result.extract}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2">{result.title}</h2>
                    <p>{result.extract}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
      }
    </>
  )
}

export default SearchResultsPage