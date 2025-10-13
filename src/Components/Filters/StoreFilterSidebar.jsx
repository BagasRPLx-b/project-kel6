import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaStore, FaDesktop, FaShoppingCart } from "react-icons/fa";

const StoreFilterSidebar = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  storeType,
  onStoreTypeChange,
  sortBy,
  onSortChange,
  stores,
  isMobile = false
}) => {
  const content = (
    <>
      {/* Header */}
      {!isMobile && (
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <FaStore className="text-2xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Stores Finder</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Find your gaming destination</p>
        </div>
      )}

      {/* Search */}
      <form onSubmit={onSearchSubmit} className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search stores..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
          />
        </div>
      </form>

      {/* Quick Stats - Compact */}
      {!isMobile && (
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
      )}

      {/* Store Type Filter */}
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
              onClick={() => onStoreTypeChange(type.value)}
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

      {/* Sort Options */}
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
              onClick={() => onSortChange(option.value)}
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
    </>
  );

  if (isMobile) {
    return <div className="p-4 space-y-6">{content}</div>;
  }

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="lg:w-80"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
        {content}
      </div>
    </motion.aside>
  );
};

export default StoreFilterSidebar;