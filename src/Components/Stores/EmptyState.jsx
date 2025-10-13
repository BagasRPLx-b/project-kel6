import React from "react";
import { motion } from "framer-motion";

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onButtonClick,
  iconSize = "text-5xl" 
}) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-12"
    >
      {Icon && <Icon className={`${iconSize} text-gray-400 mx-auto mb-4`} />}
      <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-500 mb-6 text-sm">{description}</p>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg text-sm hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
        >
          {buttonText}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;