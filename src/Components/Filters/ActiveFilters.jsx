import React from "react";
import { FaTimes } from "react-icons/fa";

const ActiveFilters = ({ activeFilters, onClearAll }) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 mb-6">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Active Filters:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm flex items-center gap-2"
              >
                {filter}
                <button
                  onClick={onClearAll}
                  className="hover:text-blue-600 dark:hover:text-blue-300"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onClearAll}
          className="text-sm text-red-500 hover:text-red-600 font-semibold"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;