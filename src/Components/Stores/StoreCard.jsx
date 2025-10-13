import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGlobe } from "react-icons/fa";

const StoreCard = ({ store, variants, isHovered, onHoverStart, onHoverEnd, onClick }) => {
  const getRandomGradient = (id) => {
    const gradients = [
      "from-cyan-500 to-blue-500",
      "from-purple-500 to-pink-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-red-500"
    ];
    return gradients[id % gradients.length];
  };

  const getStoreType = (storeName) => {
    const name = storeName.toLowerCase();
    if (name.includes("steam") || name.includes("epic") || name.includes("digital") || 
        name.includes("xbox") || name.includes("playstation") || name.includes("nintendo")) {
      return "Digital";
    }
    return "Physical";
  };

  return (
    <motion.div
      variants={variants}
      whileHover="hover"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="cursor-pointer"
      onClick={onClick}
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
              {getStoreType(store.name)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoreCard;