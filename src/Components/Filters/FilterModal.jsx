import React from "react";
import { motion } from "framer-motion";
import { FaTimes, FaGamepad, FaStar } from "react-icons/fa";

const FilterModal = ({ 
  isOpen, 
  onClose, 
  genres, 
  selectedGenre, 
  onGenreChange, 
  minRating, 
  onRatingChange,
  onClearAll 
}) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <FaTimes size={28} />
        </button>

        <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Filter & Sort Games
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Refine your game discovery
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaGamepad className="text-blue-500" />
              Genres
            </h4>
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
              <button
                onClick={() => onGenreChange("")}
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
                  onClick={() => onGenreChange(genre.slug)}
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
                  onClick={() => onRatingChange(rating)}
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

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClearAll}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold transition-all duration-300 hover:from-red-600 hover:to-orange-600"
          >
            Clear All Filters
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilterModal;