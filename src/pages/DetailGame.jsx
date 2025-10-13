import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import {
  ArrowLeft,
  Calendar,
  Star,
  Tags,
  Users,
  Clock,
  GamepadIcon,
  MapPin,
  ExternalLink,
  Heart,
  Bookmark,
  Play,
  Trophy,
  Target
} from "lucide-react";
import Footer from "../Components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const DetailGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userInteractions, setUserInteractions] = useState({
    isFavorite: false,
    isBookmarked: false,
    hasPlayed: false,
    rating: 0
  });
  const [showAchievement, setShowAchievement] = useState(null);

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      loadUserInteractions(userData.id, parseInt(id));
    }

    const fetchGameDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        setGame(response.data);
      } catch (error) {
        console.error("Failed to fetch game detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [id]);

  useEffect(() => {
    const fetchRelatedGames = async () => {
      if (!game) return;
      
      try {
        setRelatedLoading(true);
        let relatedRes;
        
        if (game.genres && game.genres.length > 0) {
          const genreIds = game.genres.map(genre => genre.id).join(',');
          relatedRes = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreIds}&page_size=6`
          );
        } else if (game.tags && game.tags.length > 0) {
          const tagIds = game.tags.slice(0, 3).map(tag => tag.id).join(',');
          relatedRes = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&tags=${tagIds}&page_size=6`
          );
        } else {
          relatedRes = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=6`
          );
        }
        
        const filteredRelated = relatedRes.data.results.filter(relatedGame => 
          relatedGame.id !== game.id
        );
        setRelated(filteredRelated.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch related games:", error);
      } finally {
        setRelatedLoading(false);
      }
    };

    if (game) {
      fetchRelatedGames();
    }
  }, [game]);

  // Load comments from localStorage
  useEffect(() => {
    if (game) {
      const gameComments = getUserComments(game.id);
      setComments(gameComments);
    }
  }, [game, id]);

  const loadUserInteractions = (userId, gameId) => {
    const userGames = JSON.parse(localStorage.getItem("userGames") || "[]");
    const interactions = userGames.find(ug => ug.userId === userId && ug.gameId === gameId);
    
    if (interactions) {
      setUserInteractions({
        isFavorite: interactions.isFavorite || false,
        isBookmarked: interactions.isBookmarked || false,
        hasPlayed: interactions.hasPlayed || false,
        rating: interactions.rating || 0
      });
    }
  };

  const saveUserInteraction = (interactionType, value = true) => {
    if (!currentUser) {
      alert("Please login to interact with games");
      return;
    }

    const userGames = JSON.parse(localStorage.getItem("userGames") || "[]");
    const existingIndex = userGames.findIndex(
      ug => ug.userId === currentUser.id && ug.gameId === parseInt(id)
    );

    const interactionData = {
      userId: currentUser.id,
      gameId: parseInt(id),
      gameName: game?.name,
      gameImage: game?.background_image,
      timestamp: new Date().toISOString(),
      [interactionType]: value
    };

    if (existingIndex !== -1) {
      userGames[existingIndex] = { ...userGames[existingIndex], ...interactionData };
    } else {
      userGames.push(interactionData);
    }

    localStorage.setItem("userGames", JSON.stringify(userGames));
    setUserInteractions(prev => ({ ...prev, [interactionType]: value }));

    // Update user stats and check for achievements
    updateUserStats(interactionType);
  };

  const updateUserStats = (interactionType) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    const userGames = JSON.parse(localStorage.getItem("userGames") || "[]");
    const userComments = JSON.parse(localStorage.getItem("userComments") || "[]");
    
    const userGameInteractions = userGames.filter(ug => ug.userId === user.id);
    const userCommentCount = userComments.filter(comment => 
      comment.user?.username === user.username
    ).length;

    // Calculate new stats
    const favoriteGames = userGameInteractions.filter(ug => ug.isFavorite).length;
    const playedGames = userGameInteractions.filter(ug => ug.hasPlayed).length;
    const bookmarkedGames = userGameInteractions.filter(ug => ug.isBookmarked).length;

    let newAchievements = [];

    // Check for achievements based on interactions
    if (interactionType === 'isFavorite' && favoriteGames === 1) {
      newAchievements.push("First Favorite");
      showAchievementPopup("First Favorite", "You favorited your first game! 🎮");
    }
    if (interactionType === 'hasPlayed' && playedGames === 1) {
      newAchievements.push("First Play");
      showAchievementPopup("First Play", "You marked your first game as played! 🎯");
    }
    if (interactionType === 'isBookmarked' && bookmarkedGames === 1) {
      newAchievements.push("Bookmark Collector");
      showAchievementPopup("Bookmark Collector", "You bookmarked your first game! 📚");
    }
    if (favoriteGames >= 3 && !user.achievements?.includes("Game Lover")) {
      newAchievements.push("Game Lover");
      showAchievementPopup("Game Lover", "You've favorited 3 games! ❤️");
    }
    if (playedGames >= 5 && !user.achievements?.includes("Seasoned Gamer")) {
      newAchievements.push("Seasoned Gamer");
      showAchievementPopup("Seasoned Gamer", "You've played 5 games! 🏆");
    }

    // Update user stats
    const updatedUser = {
      ...user,
      stats: {
        gamesPlayed: playedGames,
        favoriteGame: getFavoriteGame(userGameInteractions),
        hoursPlayed: playedGames * 10 + favoriteGames * 5, // Simulated hours
        favoriteCount: favoriteGames,
        bookmarkCount: bookmarkedGames
      },
      achievements: [...(user.achievements || []), ...newAchievements],
      badges: generateBadges(userGameInteractions, userCommentCount),
      level: calculateUserLevel(playedGames, favoriteGames, userCommentCount)
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  const calculateUserLevel = (playedGames, favoriteGames, commentCount) => {
    const totalXP = (playedGames * 100) + (favoriteGames * 50) + (commentCount * 25);
    return Math.floor(totalXP / 500) + 1;
  };

  const showAchievementPopup = (title, description) => {
    setShowAchievement({ title, description });
    setTimeout(() => setShowAchievement(null), 4000);
  };

  const getFavoriteGame = (userGames) => {
    const favoriteGames = userGames.filter(ug => ug.isFavorite);
    if (favoriteGames.length > 0) {
      return favoriteGames[favoriteGames.length - 1].gameName;
    }
    return "None";
  };

  const generateBadges = (userGames, commentCount) => {
    const badges = ["Beginner"];
    const favoriteCount = userGames.filter(ug => ug.isFavorite).length;
    const playedCount = userGames.filter(ug => ug.hasPlayed).length;

    if (favoriteCount >= 3) badges.push("Game Lover");
    if (playedCount >= 5) badges.push("Explorer");
    if (playedCount >= 10) badges.push("Veteran");
    if (commentCount >= 5) badges.push("Commentator");
    if (favoriteCount >= 1) badges.push("Fan");
    if (commentCount >= 10) badges.push("Community Star");

    return [...new Set(badges)]; // Remove duplicates
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  };

  const getUserComments = (gameId) => {
    const comments = localStorage.getItem("userComments");
    if (!comments) return [];
    
    const allComments = JSON.parse(comments);
    return allComments.filter(comment => comment.gameId === parseInt(gameId));
  };

  const saveUserComment = (comment) => {
    const comments = localStorage.getItem("userComments");
    const allComments = comments ? JSON.parse(comments) : [];
    
    const newComment = {
      ...comment,
      gameId: parseInt(id),
      id: Date.now()
    };
    
    allComments.push(newComment);
    localStorage.setItem("userComments", JSON.stringify(allComments));
    return newComment;
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert("Please login to comment");
      return;
    }

    const newComment = {
      text: commentInput,
      timestamp: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      user: {
        username: currentUser.username,
        name: currentUser.name,
        avatar: currentUser.avatar
      }
    };

    const savedComment = saveUserComment(newComment);
    setComments([savedComment, ...comments]);
    setCommentInput("");

    // Update stats for commenting
    updateUserStats('comment');
    
    // Check for comment achievement
    const userComments = JSON.parse(localStorage.getItem("userComments") || "[]");
    const userCommentCount = userComments.filter(comment => 
      comment.user?.username === currentUser.username
    ).length;

    if (userCommentCount === 1) {
      showAchievementPopup("First Comment", "You posted your first comment! 💬");
    } else if (userCommentCount === 5) {
      showAchievementPopup("Active Commentator", "You've made 5 comments! 🎤");
    }
  };

  const formatPlaytime = (minutes) => {
    if (!minutes) return "N/A";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const stripHtmlTags = (html) => {
    if (!html) return "No description available.";
    return html.replace(/<[^>]*>/g, '').trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Game Not Found</h2>
          <p className="text-gray-300 mb-6">The game you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 transition-colors duration-300">
      <Navbar/>
      
      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 shadow-2xl border-2 border-yellow-300 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <Trophy className="h-12 w-12 text-white mx-auto mb-2" />
              <h3 className="text-xl font-bold text-white mb-1">{showAchievement.title}</h3>
              <p className="text-white/90">{showAchievement.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-lg mb-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Library
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Left Side (2/3 width) */}
          <div className="lg:w-2/3">
            {/* Game Header with Interaction Buttons */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
              <div 
                className="h-80 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${game.background_image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-4xl font-bold text-white mb-2">{game.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-300">
                    {game.released && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(game.released).getFullYear()}</span>
                      </div>
                    )}
                    {game.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>{game.rating.toFixed(1)}/5</span>
                      </div>
                    )}
                    {game.playtime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatPlaytime(game.playtime)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interaction Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => saveUserInteraction('isFavorite', !userInteractions.isFavorite)}
                    className={`p-3 rounded-full backdrop-blur-md transition-all ${
                      userInteractions.isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${userInteractions.isFavorite ? 'fill-current' : ''}`} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => saveUserInteraction('isBookmarked', !userInteractions.isBookmarked)}
                    className={`p-3 rounded-full backdrop-blur-md transition-all ${
                      userInteractions.isBookmarked 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${userInteractions.isBookmarked ? 'fill-current' : ''}`} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => saveUserInteraction('hasPlayed', !userInteractions.hasPlayed)}
                    className={`p-3 rounded-full backdrop-blur-md transition-all ${
                      userInteractions.hasPlayed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Play className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Interaction Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className={`bg-gray-800 rounded-xl p-4 text-center transition-all ${
                userInteractions.isFavorite ? 'bg-red-500/20 border border-red-500' : ''
              }`}>
                <Heart className={`h-8 w-8 mx-auto mb-2 ${
                  userInteractions.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                }`} />
                <span className={userInteractions.isFavorite ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                  {userInteractions.isFavorite ? 'Favorited' : 'Add to Favorites'}
                </span>
              </div>

              <div className={`bg-gray-800 rounded-xl p-4 text-center transition-all ${
                userInteractions.isBookmarked ? 'bg-blue-500/20 border border-blue-500' : ''
              }`}>
                <Bookmark className={`h-8 w-8 mx-auto mb-2 ${
                  userInteractions.isBookmarked ? 'text-blue-500 fill-current' : 'text-gray-400'
                }`} />
                <span className={userInteractions.isBookmarked ? 'text-blue-400 font-semibold' : 'text-gray-400'}>
                  {userInteractions.isBookmarked ? 'Bookmarked' : 'Bookmark Game'}
                </span>
              </div>

              <div className={`bg-gray-800 rounded-xl p-4 text-center transition-all ${
                userInteractions.hasPlayed ? 'bg-green-500/20 border border-green-500' : ''
              }`}>
                <Play className={`h-8 w-8 mx-auto mb-2 ${
                  userInteractions.hasPlayed ? 'text-green-500' : 'text-gray-400'
                }`} />
                <span className={userInteractions.hasPlayed ? 'text-green-400 font-semibold' : 'text-gray-400'}>
                  {userInteractions.hasPlayed ? 'Played' : 'Mark as Played'}
                </span>
              </div>
            </div>

            {/* Game Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Genres */}
              {game.genres && game.genres.length > 0 && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Tags className="h-5 w-5 mr-2 text-blue-400" />
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <span key={genre.id} className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Platforms */}
              {game.platforms && game.platforms.length > 0 && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <GamepadIcon className="h-5 w-5 mr-2 text-green-400" />
                    Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform) => (
                      <span key={platform.platform.id} className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-sm">
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Publishers */}
              {game.publishers && game.publishers.length > 0 && (
                <div className="bg-gray-800 rounded-xl p-6 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-400" />
                    Publisher{game.publishers.length > 1 ? "s" : ""}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {game.publishers.map((pub) => (
                      <Link
                        to={`/publisher/${pub.id}`}
                        key={pub.id}
                        className="inline-flex items-center px-4 py-2 bg-purple-900 text-purple-200 rounded-lg hover:bg-purple-800 transition duration-200"
                      >
                        {pub.name}
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Game Description */}
            <div className="bg-gray-800 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Game</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {stripHtmlTags(game.description) || "No description available for this game."}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Community Comments</h2>
              
              <form onSubmit={handleAddComment} className="mb-6">
                <div className="flex-col gap-3">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder={currentUser ? "Share your thoughts about this game..." : "Please login to comment"}
                    className="flex-1 px-4 w-full py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!currentUser}
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-3 mt-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={!currentUser}
                  >
                    {currentUser ? `Post as ${currentUser.name}` : "Please Login to Comment"}
                  </button>
                </div>
              </form>

              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={comment.user?.avatar || "https://i.pravatar.cc/300?img=1"}
                          alt={comment.user?.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-white">{comment.user?.name}</p>
                          <span className="text-xs text-gray-400">{comment.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-gray-200 ml-11">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Related Games */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <GamepadIcon className="h-6 w-6 mr-2 text-red-400" />
                  Related Games
                </h2>
                
                {relatedLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                  </div>
                ) : related.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {related.map((relatedGame) => (
                      <Link
                        to={`/game/${relatedGame.id}`}
                        key={relatedGame.id}
                        className="block group"
                      >
                        <div className="flex gap-3 bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition duration-200">
                          <img
                            src={relatedGame.background_image || '/placeholder-game.jpg'}
                            alt={relatedGame.name}
                            className="w-16 h-16 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate group-hover:text-blue-300 transition">
                              {relatedGame.name}
                            </h3>
                            <div className="flex items-center mt-1 text-sm text-gray-400">
                              {relatedGame.released && (
                                <span>{new Date(relatedGame.released).getFullYear()}</span>
                              )}
                              {relatedGame.rating && (
                                <>
                                  <span className="mx-2">•</span>
                                  <Star className="h-3 w-3 mr-1 text-yellow-500" />
                                  <span>{relatedGame.rating.toFixed(1)}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <GamepadIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No related games found</p>
                  </div>
                )}
              </div>

              {/* Profile Progress */}
              {currentUser && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Target className="h-6 w-6 mr-2 text-green-400" />
                    Your Progress
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Games Played</span>
                      <span className="text-white font-semibold">{currentUser.stats?.gamesPlayed || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Favorites</span>
                      <span className="text-white font-semibold">{currentUser.stats?.favoriteCount || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Bookmarks</span>
                      <span className="text-white font-semibold">{currentUser.stats?.bookmarkCount || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Achievements</span>
                      <span className="text-white font-semibold">{currentUser.achievements?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current Level</span>
                      <span className="text-white font-semibold">Level {currentUser.level || 1}</span>
                    </div>
                    <div className="mt-4">
                      <Link 
                        to="/profile"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 text-center block"
                      >
                        View Full Profile
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default DetailGame;