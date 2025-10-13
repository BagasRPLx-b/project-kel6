import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaStar } from "react-icons/fa";

const GameCard = ({ game, variants }) => {
  const getRatingColor = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating >= 75) return "bg-green-500";
    if (rating >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div variants={variants} whileHover="hover">
      <Link
        to={`/game/${game.id}`}
        className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 block"
      >
        {/* Game Image */}
        <div className="relative overflow-hidden">
          <img
            src={
              game.background_image ||
              "https://via.placeholder.com/400x225/2D3748/FFFFFF?text=No+Image"
            }
            alt={game.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Rating Badge */}
          {game.metacritic && (
            <div
              className={`absolute top-4 right-4 w-12 h-12 rounded-full ${getRatingColor(
                game.metacritic
              )} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
            >
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
                <span
                  key={genre.id}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
                >
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
    </motion.div>
  );
};

export default GameCard;