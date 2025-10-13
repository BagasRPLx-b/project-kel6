import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ page, pageCount, onPageChange }) => {
  const handlePrevPage = () => onPageChange(page - 1);
  const handleNextPage = () => onPageChange(page + 1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-12"
    >
      {/* Prev Button */}
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
           hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed 
           transition-all duration-300 shadow-md"
      >
        <FaArrowLeft />
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: pageCount }, (_, i) => i + 1)
        .filter(
          (p) =>
            p === 1 || // always show first
            p === pageCount || // always show last
            (p >= page - 2 && p <= page + 2) // show around current
        )
        .map((p, index, arr) => {
          // check if there's a gap between this and previous number
          const prev = arr[index - 1];
          if (prev && p - prev > 1) {
            return (
              <span key={`dots-${p}`} className="px-2 text-gray-500">
                ...
              </span>
            );
          }
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                page === p
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {p}
            </button>
          );
        })}

      {/* Next Button */}
      <button
        onClick={handleNextPage}
        disabled={page === pageCount}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
           hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed 
           transition-all duration-300 shadow-md"
      >
        Next
        <FaArrowRight />
      </button>
    </motion.div>
  );
};

export default Pagination;