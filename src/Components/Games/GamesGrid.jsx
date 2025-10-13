import React from "react";
import { motion } from "framer-motion";
import GameCard from "./GamesCard";
const GamesGrid = ({ games, loading }) => {
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
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
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} variants={cardVariants} />
      ))}
    </motion.div>
  );
};

export default GamesGrid;