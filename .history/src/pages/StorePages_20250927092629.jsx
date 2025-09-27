import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaStore,
  FaTimes,
} from "react-icons/fa";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";
  const pageSize = 20;
  const filteredStores = stores.filter((store) =>
  store.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  // update active filters display
  useEffect(() => {
    const filters = [];
    if (searchTerm) filters.push(`Search: "${searchTerm}"`);
    setActiveFilters(filters);
  }, [searchTerm]);

  // fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const url = new URL("https://api.rawg.io/api/stores");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("page", page);
        url.searchParams.append("page_size", pageSize);

        if (searchTerm) {
          url.searchParams.append("search", searchTerm);
        }

        const res = await axios.get(url.toString());
        setStores(res.data.results);
        setPageCount(Math.ceil(res.data.count / pageSize));
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [page, searchTerm]);

  // search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setPage(1);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      {/* hero section */}
      <section className="relative rounded-3xl overflow-hidden mx-4 my-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Stores Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-start text-white p-8 md:p-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Find the Best Stores
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
              Explore trusted game stores. Search and discover where to buy your
              favorite games.
            </p>

            {/* search bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search stores..."
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-semibold"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* active filters */}
      {activeFilters.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Active Filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm flex items-center gap-2"
                  >
                    {filter}
                    <button
                      onClick={clearAllFilters}
                      className="hover:text-green-600 dark:hover:text-green-300"
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

      {/* stores grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-11">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => {
                  if (store.domain) {
                    window.open(`https://${store.domain}`, "_blank");
                  } else {
                    alert("No official website found for this store.");
                  }
                }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      store.image_background ||
                      "https://via.placeholder.com/400x225/2D3748/FFFFFF?text=No+Image"
                    }
                    alt={store.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors duration-300 line-clamp-2">
                    {store.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaStore className="text-green-500" />
                    <span>{store.domain}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaStore className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No stores found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Try adjusting your search
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            >
              Clear Search
            </button>
          </div>
        )}
      


        {/* pagination */}
        {stores.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
            >
              <FaArrowLeft />
              Previous
            </button>

            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold">
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
    </div>
  );
};

export default StoresPage;
