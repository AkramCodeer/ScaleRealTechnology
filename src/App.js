import React, { useState, useEffect } from "react";
import "./StarWarsMovies.css"; 

const StarWarsMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("episode");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://swapi.dev/api/films/?format=json"
        );
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
      } catch (error) {
        console.error("Error fetching Star Wars movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = () => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleSort = () => {
    const sortedMovies = [...filteredMovies];
    if (sortType === "episode") {
      sortedMovies.sort((a, b) => a.episode_id - b.episode_id);
    } else if (sortType === "year") {
      sortedMovies.sort(
        (a, b) => parseInt(a.release_date) - parseInt(b.release_date)
      );
    }
    setFilteredMovies(sortedMovies);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="star-wars-container">
      <div className="star-wars-movies">
        <div className="search-and-sort">
          <div className="sort-section">
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="episode">EPISODE</option>
              <option value="year">YEAR</option>
            </select>
            <button onClick={handleSort} className="highlight-on-hover">
              Sort
            </button>
          </div>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="highlight-on-hover">
            Search
          </button>
        </div>
        {filteredMovies.length === 0 ? (
          <p>Loading Movies.....</p>
        ) : (
          <ul>
            {filteredMovies.map((movie) => (
              <li
                key={movie.episode_id}
                onClick={() => handleMovieClick(movie)}
                className="movie-title"
              >
                <div className="movie-info">
                  <p>{`EPISODE ${movie.episode_id}`}</p>
                  <p>{movie.title}</p>
                 <p> {`Year ${movie.release_date.substring(
                    0,
                    4
                  )}`}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="movie-details">
        {selectedMovie ? (
          <>
            <h2>{selectedMovie.title}</h2>
            <p>{`EPISODE ${selectedMovie.episode_id}`}</p>
            <p>{selectedMovie.opening_crawl}</p>
          </>
        ) : (
          <div className="movie-slected">
            <p>No Movie selected</p>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default StarWarsMovies;
