import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaGamepad, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white dark:text-gray-300 rounded-t-3xl shadow-2xl overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-500"></div>
      <div className="absolute -top-10 right-10 text-6xl opacity-20">
        <FaGamepad />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        
        {/* Brand / Logo */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl text-orange-400">
              <FaGamepad />
            </div>
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 animate-pulse">
              GameVerse
            </h2>
          </div>
          <p className="text-lg text-gray-200 dark:text-gray-400 mb-4">
            Discover games, explore stores, and connect with publishers in one place.
          </p>
          <div className="flex items-center text-sm text-yellow-300">
            <span>Made with</span>
            <FaHeart className="mx-2 text-red-500 animate-pulse" />
            <span>for gamers worldwide</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-yellow-300 border-l-4 border-yellow-400 pl-2">Navigation</h3>
          <div className="flex flex-col gap-3">
            <Link to="/" className="hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2 group">
              <span className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Home
            </Link>
            <Link to="/store" className="hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2 group">
              <span className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Stores
            </Link>
            <Link to="/profile" className="hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2 group">
              <span className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Profile
            </Link>
            <Link to="/about" className="hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2 group">
              <span className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              About Us
            </Link>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-yellow-300 border-l-4 border-yellow-400 pl-2">Connect With Us</h3>
          <div className="flex gap-4 text-2xl mb-6">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:text-gray-800 dark:hover:text-gray-100">
              <FaGithub />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:text-pink-400">
              <FaInstagram />
            </a>
          </div>
          
          {/* Mini Newsletter CTA */}
          <div className="bg-black/20 p-4 rounded-lg">
            <p className="text-sm mb-2">Stay updated with new games!</p>
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 dark:border-gray-700 text-center py-6 text-sm relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()} GameVerse. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-yellow-300 transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;