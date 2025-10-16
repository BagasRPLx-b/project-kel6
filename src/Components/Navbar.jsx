import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  ShoppingBag,
  Users,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // ✅ Tambahkan state dark mode
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      setDarkMode(isDark);
      applyDarkMode(isDark);
    }
  }, []); // ✅ tidak perlu memantau setDarkMode

  // Fungsi untuk menerapkan tema gelap/terang ke seluruh halaman
  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Tombol untuk ganti mode
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    applyDarkMode(newDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                GameFinder
              </h1>
            </Link>
          </div>

          {/* Middle: Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link
              to="/stores"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ShoppingBag size={18} />
              <span>Store</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Users size={18} />
              <span>About Us</span>
            </Link>
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-4">
            {/* 🌙☀️ Dark Mode Toggle */}
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Profile - Desktop */}
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentUser.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <User size={18} />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Menu className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 flex transition ${
          isOpen ? "visible" : "invisible"
        }`}
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Menu
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-300"
            >
              <X />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-2 mb-8">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
            </li>

            <li>
              <Link
                to="/stores"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={20} />
                <span className="font-medium">Store</span>
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <Users size={20} />
                <span className="font-medium">About Us</span>
              </Link>
            </li>
          </ul>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 mb-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {currentUser.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      View your profile
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200 text-red-600 dark:text-red-400"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 mb-3"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Login
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sign in to your account
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
