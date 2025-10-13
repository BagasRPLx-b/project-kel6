import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ActiveFilters from "../Components/Filters/ActiveFilters";
import FilterModal from "../Components/Filters/FilterModal";
import MobileFilterModal from "../Components/Filters/MobileFilterModal";
import GamesGrid from "../Components/Games/GamesGrid";
import Pagination from "../Components/Pagination";
import {
  FaFilter,
  FaSearch,
  FaGamepad,
} from "react-icons/fa";
import { motion } from "framer-motion";

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
      const genre = genres.find((g) => g.slug === selectedGenre);
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
        url.searchParams.append("ordering", "-added");

        if (searchTerm) url.searchParams.append("search", searchTerm);
        if (selectedGenre) url.searchParams.append("genres", selectedGenre);
        if (minRating > 0) url.searchParams.append("metacritic", `${minRating},100`);

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
    setMobileFiltersOpen(false);
  };

  const handleRatingChange = (ratingValue) => {
    setMinRating(ratingValue);
    setPage(1);
    setShowFilters(false);
    setMobileFiltersOpen(false);
  };

  const clearAllFilters = () => {
    setSelectedGenre("");
    setMinRating(0);
    setSearchTerm("");
    setPage(1);
  };

  const handlePageChange = (newPage) => setPage(newPage);

  // Search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mx-4 my-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
        <img
          src="https://rogcommunity.id/wp-content/uploads/2023/09/wallpaperflare.com_wallpaper-scaled.jpg"
          alt="Gaming Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-start text-white p-8 md:p-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
              Explore thousands of games across all genres. Find your perfect
              match with advanced filters and recommendations.
            </p>

            {/* Search Bar in Hero */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
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
      <ActiveFilters activeFilters={activeFilters} onClearAll={clearAllFilters} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Stats and Filter Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              Featured Games
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {games.length > 0
                ? `Showing ${games.length} games`
                : "Discover amazing games"}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <FaFilter />
              Filters
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <FaFilter />
              Filters & Sort
            </button>
          </div>
        </div>

        {/* Filter Modals */}
        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          minRating={minRating}
          onRatingChange={handleRatingChange}
          onClearAll={clearAllFilters}
        />

        <MobileFilterModal
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          minRating={minRating}
          onRatingChange={handleRatingChange}
          onClearAll={clearAllFilters}
        />

        {/* Games Grid */}
        <GamesGrid games={games} loading={loading} />

        {/* Pagination */}
        {games.length > 0 && (
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}

        {/* Empty State */}
        {!loading && games.length === 0 && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <FaGamepad className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No games found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;