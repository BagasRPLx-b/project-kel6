import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { 
  FaFilter, 
  FaTimes, 
  FaStar, 
  FaCalendarAlt,
  FaGamepad,
  FaSearch,
  FaFire,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

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

  // Update active filters display
  useEffect(() => {
    const filters = [];
    if (selectedGenre) {
      const genre = genres.find(g => g.slug === selectedGenre);
      if (genre) filters.push(`Genre: ${genre.name}`);
    }
    if (minRating > 0) filters.push(`Rating: ${minRating}+`);
    if (searchTerm) filters.push(`Search: "${searchTerm}"`);
    setActiveFilters(filters);
  }, [selectedGenre, minRating, searchTerm, genres]);

  // Fetch games based on filters, page, and search term
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const url = new URL("https://api.rawg.io/api/games");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("page", page);
        url.searchParams.append("page_size", pageSize);
        url.searchParams.append("ordering", "-added"); // Sort by newest first

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
  }, [page, selectedGenre, minRating, searchTerm]);

  // Handlers for genre and rating filter
  const handleGenreChange = (genreSlug) => {
    setSelectedGenre(genreSlug);
    setPage(1);
    setShowFilters(false);
  };

  const handleRatingChange = (ratingValue) => {
    setMinRating(ratingValue);
    setPage(1);
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setSelectedGenre("");
    setMinRating(0);
    setSearchTerm("");
    setPage(1);
  };

  // Pagination handlers
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(1, prevPage - 1));

  // Search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const getRatingColor = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating >= 75) return "bg-green-500";
    if (rating >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mx-4 my-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Gaming Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-start text-white p-8 md:p-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
              Explore thousands of games across all genres. Find your perfect match with advanced filters and recommendations.
            </p>
            
            {/* Search Bar in Hero */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search games"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Active Filters:</span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm flex items-center gap-2">
                    {filter}
                    <button 
                      onClick={clearAllFilters}
                      className="hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-500 hover:text-red-600 font-semibold"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Stats and Filter Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              Featured Games
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {games.length > 0 ? `Showing ${games.length} games` : 'Discover amazing games'}
            </p>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg mt-4 md:mt-0"
          >
            <FaFilter />
            Filters & Sort
          </button>
        </div>

        {/* Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative">
              <button
                onClick={() => setShowFilters(false)}
                className="absolute top-6 right-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <FaTimes size={28} />
              </button>

              <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Filter & Sort Games
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Refine your game discovery</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaGamepad className="text-blue-500" />
                    Genres
                  </h4>
                  <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                    <button
                      onClick={() => handleGenreChange("")}
                      className={`p-3 rounded-xl text-left transition-all duration-300 ${
                        selectedGenre === ""
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      All Genres
                    </button>
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreChange(genre.slug)}
                        className={`p-3 rounded-xl text-left transition-all duration-300 ${
                          selectedGenre === genre.slug
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    Minimum Rating
                  </h4>
                  <div className="space-y-3">
                    {[0, 50, 75, 90].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(rating)}
                        className={`w-full p-3 rounded-xl text-left transition-all duration-300 flex items-center justify-between ${
                          minRating === rating
                            ? "bg-yellow-500 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span>{rating === 0 ? "Any Rating" : `${rating}+`}</span>
                        {rating > 0 && <FaStar className="text-yellow-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Games Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {games.map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Game Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={game.background_image || "https://via.placeholder.com/400x225/2D3748/FFFFFF?text=No+Image"}
                    alt={game.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Rating Badge */}
                  {game.metacritic && (
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-full ${getRatingColor(game.metacritic)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {game.metacritic}
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
                    {game.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {game.released && (
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-blue-500" />
                        <span>{new Date(game.released).getFullYear()}</span>
                      </div>
                    )}
                    {game.rating && (
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{game.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  {/* Genres */}
                  {game.genres && game.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {game.genres.slice(0, 2).map((genre) => (
                        <span key={genre.id} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                          {genre.name}
                        </span>
                      ))}
                      {game.genres.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                          +{game.genres.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Publisher */}
                  {game.publishers && game.publishers.length > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-3 mt-3">
                      <span className="font-semibold">Publisher: </span>
                      <Link 
                        to={`/publisher/${game.publishers[0].id}`}
                        className="text-blue-500 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {game.publishers[0].name}
                      </Link>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {games.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
            >
              <FaArrowLeft />
              Previous
            </button>
            
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold">
              Page {page} of {pageCount}
            </span>
            
            <button
              onClick={handleNextPage}
              disabled={page === pageCount}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
            >
              Next
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {!loading && games.length === 0 && (
        <div className="text-center py-16">
          <FaGamepad className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No games found</h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6">Try adjusting your filters or search terms</p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;