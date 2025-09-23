import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { FaFilter, FaTimes } from "react-icons/fa"; // Added filter and close icons

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const [showFilters, setShowFilters] = useState(false);

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";
  const pageSize = 20;

  // Fetch genres once on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        setGenres(res.data.results);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Dark mode toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Fetch games based on filters, page, and search term
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const url = new URL("https://api.rawg.io/api/games");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("page", page);
        url.searchParams.append("page_size", pageSize);

        if (searchTerm) {
          url.searchParams.append("search", searchTerm);
        }

        if (selectedGenre) {
          url.searchParams.append("genres", selectedGenre);
        }

        if (minRating > 0) {
          url.searchParams.append("metacritic", `${minRating},100`);
        }

        const response = await axios.get(url.toString());
        setGames(response.data.results);
        setPageCount(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [page, selectedGenre, minRating, searchTerm]); // Re-fetch games when these values change

  // Handlers for genre and rating filter
  const handleGenreChange = (genreSlug) => {
    setSelectedGenre(genreSlug);
    setPage(1); // Reset to the first page when filters change
    setShowFilters(false); // Close filters
  };

  const handleRatingChange = (ratingValue) => {
    setMinRating(ratingValue);
    setPage(1); // Reset to the first page
    setShowFilters(false); // Close filters
  };

  // Pagination handlers
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(1, prevPage - 1));

  // Search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior (which causes page reload)
    setPage(1); // Reset to the first page whenever a new search is made
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden my-10 shadow-xl border border-gray-200 dark:border-gray-800">
        <img
          src="https://wallpapersok.com/images/high/playstation-video-game-buttons-6x2nxdfvelu4ns64.jpg"
          alt="Gaming Banner"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-start text-white p-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 leading-tight drop-shadow-lg">
            Find Your Next Favorite Game
          </h1>
          <p className="text-lg md:text-xl max-w-2xl font-light drop-shadow">
            Explore a vast library of games, filter by genre, and discover new adventures.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-10 px-6">
        <form onSubmit={handleSearchSubmit} className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a game..."
            className="p-3 w-full md:w-3/4 rounded-lg border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-600 text-white ml-4 hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto mb-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-200">Popular Games</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-2 rounded-full bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-xl w-full mx-4 relative">
              <button
                onClick={() => setShowFilters(false)}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <FaTimes size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-6">Filter Games</h3>

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleGenreChange("")}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedGenre === ""
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    All
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => handleGenreChange(genre.slug)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedGenre === genre.slug
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Minimum Rating</h4>
                <div className="flex gap-2">
                  {[0, 50, 75].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        minRating === rating
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Loading Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
              <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
              <div className="w-2/3 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg mb-2"></div>
              <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            </div>
            {/* Repeat Skeleton */}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-5 relative z-10">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {game.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    Released: <time dateTime={game.released}>{game.released}</time>
                  </p>

                  {/* Publisher */}
                  {game.publishers && game.publishers.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Publisher:{" "}
                      <Link
                        to={`/publisher/${game.publishers[0].id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {game.publishers[0].name}
                      </Link>
                    </p>
                  )}

                  {/* Metacritic Rating */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${
                        game.metacritic >= 75
                          ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
                          : game.metacritic >= 50
                          ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200"
                          : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200"
                      }`}
                  >
                    {game.metacritic || "N/A"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={page === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
