import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar } from "react-icons/fa";

const MobileFilterModal = ({
  isOpen,
  onClose,
  genres,
  selectedGenre,
  onGenreChange,
  minRating,
  onRatingChange,
  onClearAll
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={onClose} 
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={onClose}>
                  <FaTimes className="text-gray-500" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Genres</h3>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => onGenreChange("")}
                    className={`p-3 rounded-lg text-left transition-all duration-200 text-sm ${
                      selectedGenre === ""
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    All Genres
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => onGenreChange(genre.slug)}
                      className={`p-3 rounded-lg text-left transition-all duration-200 text-sm ${
                        selectedGenre === genre.slug
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Minimum Rating</h3>
                <div className="space-y-2">
                  {[0, 50, 75, 90].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => onRatingChange(rating)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center justify-between text-sm ${
                        minRating === rating
                          ? "bg-yellow-500 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <span>{rating === 0 ? "Any Rating" : `${rating}+`}</span>
                      {rating > 0 && <FaStar className="text-yellow-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={onClearAll}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold transition-all duration-300 hover:from-red-600 hover:to-orange-600"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileFilterModal;