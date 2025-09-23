import React, { useState } from "react";
import { Moon, Sun, Search, Menu, X, Home, Star, Clock, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode, search, handleSearchChange, handleSearchSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-950 border-b border-gray-300 dark:border-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 space-x-4">
          {/* Left: Logo */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            GameFinder
          </h1>

          {/* Middle: Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-grow max-w-lg hidden md:block"
          >
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10 rounded-full border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </form>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="flex items-center px-3 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow hover:scale-105 transition"
            >
              {darkMode ? <Sun className="mr-1" /> : <Moon className="mr-1" />}
              {darkMode ? "Light" : "Dark"}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 flex transition ${isOpen ? "visible" : "invisible"}`}
      >
        {/* Overlay */}
        <div
          className={`flex-1 bg-black/50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Sidebar content */}
        <div
          className={`w-72 bg-white dark:bg-gray-900 shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4">
            <Link className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer" to="/">
            <li className="flex items-center space-x-2">
              <Home /> <span>Home</span>
            </li>
            </Link>

            <Link className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer" to="/popular">
            <li className="flex items-center space-x-2">
              <Star /> <span>Popular</span>
            </li>
            </Link>

            <Link className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer" to="upcoming">
            <li className="flex items-center space-x-2">
              <Clock /> <span>Upcoming</span>
            </li>
            </Link>

            <Link className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer">
            <li className="flex items-center space-x-2">
              <Heart /> <span>Favorites</span>
            </li>
            </Link>

            <Link className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer">
            <li className="flex items-center space-x-2 ">
              <User /> <span>Profile</span>
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
