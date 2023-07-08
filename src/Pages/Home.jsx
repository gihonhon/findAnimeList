import React, { useState } from 'react';

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchDetail, setSearchDetail] = useState([]);
  
    const handleSearch = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recommend/${searchInput}`);
        const data = await response.json();
        console.log(data.recommendations);
  
        const searchResults = data.recommendations;
  
        const animeDetails = await Promise.all(
          searchResults.map(async (result) => {
            const animeResponse = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(result)}`);
            const animeData = await animeResponse.json();
            const animeDetail = animeData.data
            return animeDetail;
          })
        );
  
        console.log(animeDetails);
        setSearchResults(animeDetails);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleChange = (e) => {
      setSearchInput(e.target.value);
    };

    {/* Combine all anime objects into a single array */}
    const allAnime = searchResults.flat();
    
    {/* Create a Set to store unique IDs */}
    const uniqueIds = new Set();

    {/* Filter out duplicates based on ID */}
    const uniqueAnimeList = allAnime.filter((anime) => {
      if (!uniqueIds.has(anime.id)) {
        uniqueIds.add(anime.id);
        return true;
      }
      return false;
    });

    return (
      <div className='flex flex-col h-auto items-center'>
        <h1 className='my-2 text-3xl font-semibold'>Find Your Anime List</h1>
        <div className='flex justify-center mt-4'>
          <input
            type='text'
            placeholder='Search...'
            value={searchInput}
            onChange={handleChange}
            className='w-64 h-10 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300'
          />
          <button
            className='h-10 px-4 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className='mx-4 my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0'>
    
            {/* Render the unique anime entries as cards */}
            {uniqueAnimeList.map((anime, index) => (
              <div key={index} className='bg-white p-6 mx-2 my-2 border shadow-md rounded-md flex flex-col justify-between'>
                <div>
                  <img src={anime.attributes.posterImage.medium} alt={anime.attributes.canonicalTitle} className='w-full h-60 object-cover rounded-md mb-4' />
                  <h2 className='text-xl font-semibold mb-2'>{anime.attributes.canonicalTitle}</h2>
                  <p className='text-gray-500'>ID: {anime.id}</p>
                </div>
                {/* Render additional details or actions as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    );
    
    
}

export default Home