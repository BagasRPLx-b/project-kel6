import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaGamepad, FaExclamationTriangle } from "react-icons/fa";


const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">      
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          {/* Animated 404 */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <FaExclamationTriangle className="text-8xl text-yellow-500 mb-4" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-9xl font-black bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaHome />
              Back to Home
            </Link>
            
            <Link
              to="/stores"
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaGamepad />
              Explore Stores
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;