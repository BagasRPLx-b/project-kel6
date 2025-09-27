import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaTrophy,
  FaGamepad,
  FaHeart,
  FaStar,
  FaClock,
  FaFire,
  FaUserEdit,
  FaPalette,
  FaShieldAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Components/Footer";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Naufal Maulana",
    avatar: "https://i.pravatar.cc/300?img=12",
    bio: "Gamer & Developer. Loves RPG and Indie games. Always exploring new virtual worlds!",
    favoriteGenre: "RPG",
    level: 42,
    experience: 75,
    stats: {
      gamesPlayed: 124,
      achievements: 57,
      hoursPlayed: 856,
      favoriteGame: "Elden Ring"
    },
    badges: ["Pro Gamer", "Explorer", "Completionist", "Speedrunner"]
  });

  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [nameText, setNameText] = useState(user.name);
  const [bioText, setBioText] = useState(user.bio);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const data = await res.json();
        setGenres(data.results || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
      } finally {
        setLoadingGenres(false);
      }
    };

    if (showGenreModal) {
      fetchGenres();
    }
  }, [showGenreModal]);

  const handleSaveName = () => {
    setUser({ ...user, name: nameText });
    setEditName(false);
  };

  const handleSaveBio = () => {
    setUser({ ...user, bio: bioText });
    setEditBio(false);
  };

  const handleGenreClick = (genre) => {
    setUser({ ...user, favoriteGenre: genre });
    setShowGenreModal(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    setIsEditingAvatar(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const stats = [
    { icon: FaGamepad, value: user.stats.gamesPlayed, label: "Games Played", color: "from-green-500 to-emerald-500", progress: 100 },
    { icon: FaTrophy, value: user.stats.achievements, label: "Achievements", color: "from-yellow-500 to-amber-500", progress: 75 },
    { icon: FaClock, value: user.stats.hoursPlayed, label: "Hours Played", color: "from-blue-500 to-cyan-500", progress: 60 },
    { icon: FaFire, value: user.level, label: "Player Level", color: "from-purple-500 to-pink-500", progress: user.experience }
  ];

  const recentActivities = [
    { type: "game", text: "Completed Elden Ring DLC", time: "2 hours ago", icon: "🎮", color: "green" },
    { type: "achievement", text: "Unlocked 'Dragon Slayer' achievement", time: "1 day ago", icon: "🏆", color: "yellow" },
    { type: "genre", text: "Explored new RPG games", time: "3 days ago", icon: "🔍", color: "blue" },
    { type: "milestone", text: "Reached 1000 hours total playtime", time: "1 week ago", icon: "⭐", color: "purple" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      {/* Hero Section dengan Level Progress */}
      <div className="relative bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8 rounded-b-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
          <motion.div 
            className="h-full bg-white/80"
            initial={{ width: 0 }}
            animate={{ width: `${user.experience}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar Section */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => setIsEditingAvatar(true)}
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/50 transition-all duration-300"></div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                <span className="text-white font-bold text-sm">Lvl {user.level}</span>
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              {/* Name Editing */}
              <div className="mb-4">
                {editName ? (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center lg:justify-start gap-3"
                  >
                    <input
                      type="text"
                      value={nameText}
                      onChange={(e) => setNameText(e.target.value)}
                      className="px-4 py-2 rounded-xl text-gray-900 w-64 text-xl font-bold text-center lg:text-left"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => setEditName(false)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                    >
                      <FaTimes />
                    </button>
                  </motion.div>
                ) : (
                  <motion.h1 
                    whileHover={{ scale: 1.05 }}
                    className="text-4xl font-black text-white mb-2 cursor-pointer flex items-center justify-center lg:justify-start gap-3"
                    onClick={() => setEditName(true)}
                  >
                    {user.name} 
                    <FaEdit className="text-white/80 hover:text-white transition-colors" />
                  </motion.h1>
                )}
              </div>

              {/* Bio Editing */}
              <div className="mb-6">
                {editBio ? (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center lg:justify-start gap-3"
                  >
                    <input
                      type="text"
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      className="px-4 py-2 rounded-xl text-gray-900 w-80"
                    />
                    <button
                      onClick={handleSaveBio}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => setEditBio(false)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                    >
                      <FaTimes />
                    </button>
                  </motion.div>
                ) : (
                  <motion.p 
                    whileHover={{ scale: 1.02 }}
                    className="text-white/90 text-lg cursor-pointer flex items-center justify-center lg:justify-start gap-2"
                    onClick={() => setEditBio(true)}
                  >
                    {user.bio}
                    <FaEdit className="text-white/70 hover:text-white transition-colors" />
                  </motion.p>
                )}
              </div>

              {/* Favorite Genre */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGenreModal(true)}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl text-white font-semibold backdrop-blur-md transition-all flex items-center gap-3"
              >
                <FaHeart className="text-pink-400" />
                Favorite Genre: {user.favoriteGenre}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto mt-8 px-6"
      >
        <div className="flex overflow-x-auto gap-2 pb-2">
          {["overview", "stats", "activity", "badges"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-700/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-8 px-6 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 cursor-pointer"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                      <stat.icon className="text-2xl text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 font-semibold mt-1">{stat.label}</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Recent Activity Preview */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaFire className="text-orange-500" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivities.slice(0, 3).map((activity, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-700/50"
                    >
                      <span className="text-2xl">{activity.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{activity.text}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Detailed Stats */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Gaming Statistics
                </h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <stat.icon className="text-white text-lg" />
                        </div>
                        <span className="font-semibold">{stat.label}</span>
                      </div>
                      <span className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorite Game */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaHeart className="text-red-500" />
                  Favorite Game
                </h3>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🎮</div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{user.stats.favoriteGame}</div>
                  <div className="text-gray-600 dark:text-gray-400">Most played game this month</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl bg-gradient-to-r from-${activity.color}-500 to-${activity.color}-600 rounded-2xl w-16 h-16 flex items-center justify-center`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{activity.text}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">{activity.time}</div>
                    </div>
                    <div className={`w-3 h-3 bg-${activity.color}-500 rounded-full animate-pulse`}></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "badges" && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {user.badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white text-center shadow-xl"
                >
                  <FaShieldAlt className="text-4xl mx-auto mb-3" />
                  <div className="font-bold text-lg">{badge}</div>
                  <div className="text-white/80 text-sm mt-1">Earned achievement</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar Change Modal */}
      <AnimatePresence>
        {isEditingAvatar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsEditingAvatar(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaUserEdit className="text-blue-500" />
                Change Avatar
              </h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4"
              />
              <button
                onClick={() => setIsEditingAvatar(false)}
                className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Genre Modal */}
      <AnimatePresence>
        {showGenreModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowGenreModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Choose Your Favorite Genre
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a genre to personalize your experience
                  </p>
                </div>
                <button
                  onClick={() => setShowGenreModal(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {loadingGenres ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
                  {genres.map((genre) => (
                    <motion.button
                      key={genre.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleGenreClick(genre.name)}
                      className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                        user.favoriteGenre === genre.name
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105 border-blue-400"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-transparent"
                      }`}
                    >
                      <div className="text-2xl mb-2">🎮</div>
                      <div className="font-semibold">{genre.name}</div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer/>
    </div>
  );
};

export default ProfilePage;