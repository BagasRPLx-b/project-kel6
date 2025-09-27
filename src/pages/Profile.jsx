import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaTrophy,
  FaGamepad,
} from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Naufal Maulana",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Gamer & Developer. Loves RPG and Indie games.",
    favoriteGenre: "RPG",
    stats: {
      gamesPlayed: 124,
      achievements: 57,
    },
  });

  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [nameText, setNameText] = useState(user.name);
  const [bioText, setBioText] = useState(user.bio);

  // state buat modal genre
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const API_KEY = "98453db9a240436ba5b62348d213f4a0";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-green-400 to-blue-500 p-12 rounded-b-3xl flex flex-col items-center shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg mb-4 hover:scale-105 transition-transform duration-500"
          />

          {/* Name */}
          {editName ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={nameText}
                onChange={(e) => setNameText(e.target.value)}
                className="p-2 rounded-lg text-gray-900 w-64"
              />
              <button
                onClick={handleSaveName}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all duration-300"
              >
                <FaSave />
              </button>
              <button
                onClick={() => setEditName(false)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <h1
              className="text-4xl font-extrabold text-white mb-2 cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => setEditName(true)}
            >
              {user.name} <FaEdit className="text-white" />
            </h1>
          )}

          {/* Bio */}
          {editBio ? (
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                className="p-2 rounded-lg text-gray-900 w-80"
              />
              <button
                onClick={handleSaveBio}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all duration-300"
              >
                <FaSave />
              </button>
              <button
                onClick={() => setEditBio(false)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <p
              className="text-white text-lg mb-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setEditBio(true)}
            >
              {user.bio} <FaEdit className="inline ml-1 text-white" />
            </p>
          )}

          {/* Favorite Genre Trigger */}
          <div className="mt-6">
            <button
              onClick={() => setShowGenreModal(true)}
              className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl text-white font-semibold backdrop-blur-md transition-all"
            >
              🎮 Favorite Genre: {user.favoriteGenre}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer text-center">
          <FaGamepad className="text-green-500 text-4xl mx-auto mb-2" />
          <h3 className="text-lg font-bold mb-1">Games Played</h3>
          <p className="text-3xl font-extrabold text-green-500">
            {user.stats.gamesPlayed}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer text-center">
          <FaTrophy className="text-yellow-500 text-4xl mx-auto mb-2" />
          <h3 className="text-lg font-bold mb-1">Achievements</h3>
          <p className="text-3xl font-extrabold text-yellow-500">
            {user.stats.achievements}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer text-center">
          <FaGamepad className="text-blue-500 text-4xl mx-auto mb-2" />
          <h3 className="text-lg font-bold mb-1">Favorite Genre</h3>
          <p className="text-xl font-semibold text-blue-500">
            {user.favoriteGenre}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer text-center">
          <FaTrophy className="text-purple-500 text-4xl mx-auto mb-2" />
          <h3 className="text-lg font-bold mb-1">Badges</h3>
          <div className="flex justify-center gap-2">
            <span className="bg-green-500 px-2 py-1 rounded-lg text-xs text-white">
              Pro
            </span>
            <span className="bg-purple-500 px-2 py-1 rounded-lg text-xs text-white">
              Explorer
            </span>
          </div>
        </div>
      </div>


      {/* Recent Activity */}
      <div className="max-w-5xl mx-auto mt-12 px-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-all">
            <p className="font-semibold">
              🎮 Played <span className="text-green-500">Elden Ring</span> for 3
              hours
            </p>
            <span className="text-gray-500 text-sm">2 days ago</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-all">
            <p className="font-semibold">
              🏆 Unlocked achievement{" "}
              <span className="text-yellow-500">Dragon Slayer</span>
            </p>
            <span className="text-gray-500 text-sm">5 days ago</span>
          </div>
        </div>
      </div>

      {/* Genre Modal */}
      {showGenreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setShowGenreModal(false)}
              className="absolute top-6 right-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <FaTimes size={28} />
            </button>

            <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Choose Your Favorite Genre
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Select one genre to personalize
            </p>

            {loadingGenres ? (
              <p className="text-gray-500">Loading genres...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.name)}
                    className={`p-3 rounded-xl text-center transition-all duration-300 ${
                      user.favoriteGenre === genre.name
                        ? "bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-400"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
