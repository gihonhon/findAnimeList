import React, { useState } from 'react';

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = () => {
      // Simulated search logic
      const filteredResults = [
        { id: 1, name: 'Result 1' },
        { id: 2, name: 'Result 2' },
        { id: 3, name: 'Result 3' },
        // Add more search results here
      ];
  
      setSearchResults(filteredResults);
    };
  
    const handleChange = (e) => {
      setSearchInput(e.target.value);
    };
  return (
    <div className='flex flex-col h-screen items-center'>
        <h1 className='my-2 text-3xl font-semibold'>Find Your Anime List</h1>
        <div className="flex justify-center mt-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleChange}
        className="w-64 h-10 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        className="h-10 px-4 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
    {searchResults.length > 0 && (
        <table className="mt-4 border-collapse">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* Add more table headers here */}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result,i) => (
              <tr key={result.id}>
                <td>{i+1}</td>
                <td>{result.name}</td>
                {/* Add more table cells based on your search result structure */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home