import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import StoreFilterSidebar from "../Components/Filters/StoreFilterSidebar";
import MobileStoreModal from "../Components/Filters/MobileStoreModal";
import StoresGrid from "../Components/Stores/StoresGrid";
import Pagination from "../Components/Pagination";
import EmptyState from "../Components/Stores/EmptyState";
import { FaFilter, FaStore } from "react-icons/fa";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
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

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
  const handleStoreTypeChange = (type) => {
    setStoreType(type);
    setPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setPage(1);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const handlePageChange = (newPage) => setPage(newPage);

  const openStoreWebsite = (store) => {
    if (store.domain) {
      window.open(`https://${store.domain}`, "_blank", "noopener,noreferrer");
    } else {
      alert("No official website found for this store.");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStoreType("all");
    setPage(1);
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
          {/* Filter Sidebar */}
          <StoreFilterSidebar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            storeType={storeType}
            onStoreTypeChange={handleStoreTypeChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            stores={stores}
          />

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
            {filteredStores.length > 0 ? (
              <StoresGrid
                stores={filteredStores}
                loading={loading}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                onStoreClick={openStoreWebsite}
              />
            ) : (
              <EmptyState
                icon={FaStore}
                title="No stores found"
                description="Try changing your filters or search terms"
                buttonText="Reset Filters"
                onButtonClick={resetFilters}
              />
            )}

            {/* Pagination */}
            {filteredStores.length > 0 && (
              <Pagination
                page={page}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                showPageNumbers={true}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileStoreModal
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        storeType={storeType}
        onStoreTypeChange={handleStoreTypeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        stores={stores}
      />

      <Footer/>
    </div>
  );
};

export default StoresPage;