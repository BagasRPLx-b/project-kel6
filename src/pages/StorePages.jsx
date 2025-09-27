import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { 
  FaSearch, 
  FaArrowLeft, 
  FaArrowRight, 
  FaStore, 
  FaSort, 
  FaExternalLinkAlt,
  FaGlobe,
  FaGamepad,
  FaUsers,
  FaStar,
  FaShoppingCart,
  FaDesktop,
  FaFilter,
  FaTimes
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Components/Footer";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [storeType, setStoreType] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";
  const pageSize = 12;

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

        if (sortBy) {
          url.searchParams.append("ordering", sortBy);
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
  }, [page, searchTerm, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

  const openStoreWebsite = (store) => {
    if (store.domain) {
      window.open(`https://${store.domain}`, "_blank", "noopener,noreferrer");
    } else {
      alert("No official website found for this store.");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  const getRandomGradient = (id) => {
    const gradients = [
      "from-cyan-500 to-blue-500",
      "from-purple-500 to-pink-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-red-500"
    ];
    return gradients[id % gradients.length];
  };

  // Filter stores based on type
  const filteredStores = stores.filter(store => {
    if (storeType === "all") return true;
    if (storeType === "digital") {
      return store.name.toLowerCase().includes("steam") || 
             store.name.toLowerCase().includes("epic") ||
             store.name.toLowerCase().includes("digital") ||
             store.name.toLowerCase().includes("xbox") ||
             store.name.toLowerCase().includes("playstation") ||
             store.name.toLowerCase().includes("nintendo");
    }
    if (storeType === "physical") {
      return !store.name.toLowerCase().includes("steam") && 
             !store.name.toLowerCase().includes("epic") &&
             !store.name.toLowerCase().includes("digital") &&
             !store.name.toLowerCase().includes("xbox") &&
             !store.name.toLowerCase().includes("playstation") &&
             !store.name.toLowerCase().includes("nintendo");
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Game Stores
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {filteredStores.length} stores found
            </p>
          </div>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl flex items-center gap-2"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Compact Sidebar */}
          <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:w-80"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaStore className="text-2xl text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Stores Finder</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Find your gaming destination</p>
              </div>

              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search stores..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  />
                </div>
              </form>

              {/* Quick Stats - Compact */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <div className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">{stores.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                    {stores.filter(store => store.name.toLowerCase().includes("steam") || store.name.toLowerCase().includes("epic")).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Digital</div>
                </div>
                <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-purple-600 dark:text-purple-400 font-bold text-lg">
                    {stores.filter(store => !store.name.toLowerCase().includes("steam") && !store.name.toLowerCase().includes("epic")).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Physical</div>
                </div>
              </div>

              {/* Store Type Filter - Compact */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">Store Type</h3>
                <div className="flex gap-2">
                  {[
                    { label: "All", value: "all", icon: <FaStore className="text-xs" /> },
                    { label: "Digital", value: "digital", icon: <FaDesktop className="text-xs" /> },
                    { label: "Physical", value: "physical", icon: <FaShoppingCart className="text-xs" /> }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setStoreType(type.value)}
                      className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 rounded-lg transition-all duration-200 text-xs ${
                        storeType === type.value
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {type.icon}
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options - Compact */}
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { label: "Name A-Z", value: "name" },
                    { label: "Most Popular", value: "-games_count" },
                    { label: "Newest", value: "-id" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        sortBy === option.value
                          ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Desktop Header */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-black text-gray-800 dark:text-white">
                  {storeType === "all" ? "All Game Stores" : 
                   storeType === "digital" ? "Digital Stores" : "Physical Stores"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredStores.length} of {stores.length} stores
                </p>
              </div>
            </div>

            {/* Stores Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="w-full h-36 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredStores.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredStores.map((store) => (
                  <motion.div
                    key={store.id}
                    variants={cardVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredCard(store.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="cursor-pointer"
                    onClick={() => openStoreWebsite(store)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full border border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-300">
                      {/* Store Image */}
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={store.image_background || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {store.games_count || 0} games
                        </div>
                      </div>

                      {/* Store Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-800 dark:text-white line-clamp-2 flex-1 text-sm">
                            {store.name}
                          </h3>
                          <FaExternalLinkAlt className="text-cyan-500 mt-1 ml-2 flex-shrink-0 text-xs" />
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                          <FaGlobe className="text-cyan-500 flex-shrink-0" />
                          <span className="truncate">{store.domain || "No website"}</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-cyan-600 dark:text-cyan-400 font-medium">Click to visit →</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getRandomGradient(store.id).replace('from-', 'bg-').replace('to-', '')} text-white`}>
                            {store.name.toLowerCase().includes("steam") || store.name.toLowerCase().includes("epic") ? "Digital" : "Physical"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <FaStore className="text-5xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No stores found</h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6 text-sm">Try changing your filters or search terms</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStoreType("all");
                    setPage(1);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg text-sm hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {filteredStores.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center gap-4 mt-8"
              >
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-300 text-sm"
                >
                  <FaArrowLeft />
                  Previous
                </button>
                
                <span className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold text-sm">
                  Page {page} of {pageCount}
                </span>
                
                <button
                  onClick={handleNextPage}
                  disabled={page === pageCount}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-300 text-sm"
                >
                  Next
                  <FaArrowRight />
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-6">
                {/* Mobile filter content sama dengan sidebar */}
                <div>
                  <h3 className="font-semibold mb-3">Store Type</h3>
                  <div className="flex gap-2">
                    {[
                      { label: "All", value: "all", icon: <FaStore /> },
                      { label: "Digital", value: "digital", icon: <FaDesktop /> },
                      { label: "Physical", value: "physical", icon: <FaShoppingCart /> }
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setStoreType(type.value)}
                        className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 rounded-lg transition-all duration-200 text-sm ${
                          storeType === type.value
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {type.icon}
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Name A-Z", value: "name" },
                      { label: "Most Popular", value: "-games_count" },
                      { label: "Newest", value: "-id" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setPage(1);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                          sortBy === option.value
                            ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer/>
    </div>
  );
};

export default StoresPage;