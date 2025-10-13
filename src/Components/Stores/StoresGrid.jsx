import React from "react";
import { motion } from "framer-motion";
import StoreCard from "./StoreCard";

const StoresGrid = ({ stores, loading, hoveredCard, setHoveredCard, onStoreClick }) => {
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
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          store={store}
          variants={cardVariants}
          isHovered={hoveredCard === store.id}
          onHoverStart={() => setHoveredCard(store.id)}
          onHoverEnd={() => setHoveredCard(null)}
          onClick={() => onStoreClick(store)}
        />
      ))}
    </motion.div>
  );
};

export default StoresGrid;