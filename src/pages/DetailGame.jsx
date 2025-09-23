import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Star,
  Tags,
  MessageCircle,
  Play,
  Users,
  Clock,
} from "lucide-react";

const DetailGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";

  useEffect(() => {
    const fetchGameDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        setGame(response.data);

        // fetch related games (by first genre)
        if (response.data.genres && response.data.genres.length > 0) {
          const genreSlug = response.data.genres[0].slug;
          const relatedRes = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreSlug}&page_size=6`
          );
          setRelated(relatedRes.data.results);
        }
      } catch (error) {
        console.error("Failed to fetch game detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      text: commentInput,
      timestamp: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  const formatPlaytime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          {/* Animated Spinner */}
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500 mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading Text */}
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2 animate-pulse">
            Loading Game Details
          </h3>
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">
            Preparing an amazing gaming experience...
          </p>
          
          {/* Dots Animation */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 text-center">
          <div className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Game Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The game you're looking for doesn't exist or may have been removed.</p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:opacity-90 transition shadow-lg font-medium"
            >
              <ArrowLeft className="mr-2" size={20} /> Back to Previous
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-6 py-3 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl"
        >
          <ArrowLeft className="mr-2" size={20} /> Back
        </button>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group">
          <img
            src={game.background_image}
            alt={`Cover art for ${game.name}`}
            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres.slice(0, 3).map((g) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 bg-purple-500/90 text-white rounded-full text-sm font-medium backdrop-blur-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
                {game.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <Calendar className="mr-2" size={20} />
                  <span className="font-medium">{game.released}</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 text-yellow-400" size={20} />
                  <span className="font-medium">{game.rating} / {game.rating_top}</span>
                </div>
                {game.playtime && (
                  <div className="flex items-center">
                    <Clock className="mr-2" size={20} />
                    <span className="font-medium">{formatPlaytime(game.playtime)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Additional Info Cards */}
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <Star className="mb-3" size={32} />
                <p className="text-blue-100 text-sm">Metacritic Score</p>
                <p className="text-2xl font-bold">
                  {game.metacritic || "N/A"}
                </p>
              </div>

              <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                <Play className="mb-3" size={32} />
                <p className="text-green-100 text-sm">Playtime</p>
                <p className="text-2xl font-bold">
                  {game.playtime ? formatPlaytime(game.playtime) : "N/A"}
                </p>
              </div>

              <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <Users className="mb-3" size={32} />
                <p className="text-purple-100 text-sm">Suggestions</p>
                <p className="text-2xl font-bold">
                  {game.suggestions_count?.toLocaleString() || "N/A"}
                </p>
              </div>
            </section>

            {/* Tab Navigation */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-1 p-4">
                  {[
                    { id: "about", label: "About Game" },
                    { id: "platforms", label: "Platforms" },
                    { id: "comments", label: "Comments" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "about" && (
                  <div className="prose prose-lg max-w-none dark:prose-invert text-gray-800 dark:text-gray-200">
                    <div dangerouslySetInnerHTML={{ __html: game.description }} className="leading-relaxed"></div>
                  </div>
                )}

                {activeTab === "platforms" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {game.platforms?.map((platform) => (
                      <div key={platform.platform.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {platform.platform.name}
                        </span>
                        {platform.requirements_en && (
                          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                            {platform.requirements_en}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "comments" && (
                  <div className="space-y-6">
                    <form onSubmit={handleAddComment} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Share your thoughts about this game..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className="flex-grow rounded-xl border border-gray-300 dark:border-gray-600 p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-6 hover:opacity-90 transition-all shadow-lg font-medium whitespace-nowrap"
                      >
                        Post Comment
                      </button>
                    </form>
                    
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-100 dark:border-blue-800/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">Anonymous User</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                        </div>
                      ))}
                      
                      {comments.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                          <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right: Related Games */}
          <aside className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Games</h2>
              <div className="space-y-4">
                {related.map((rel) => (
                  <Link
                    to={`/game/${rel.id}`}
                    key={rel.id}
                    className="block group rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 shadow hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex">
                      <img
                        src={rel.background_image}
                        alt={rel.name}
                        className="w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="flex-1 p-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {rel.name}
                        </h3>
                        <div className="flex items-center text-sm mb-2">
                          <Star className="text-yellow-500 mr-1" size={14} />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {rel.rating?.toFixed(1) || "N/A"} / 5
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {rel.genres?.slice(0, 2).map((g) => (
                            <span
                              key={g.id}
                              className="px-2 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-600 dark:text-purple-100 rounded-full text-xs font-medium"
                            >
                              {g.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {related.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Tags size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No related games found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {game.developers && game.developers.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg text-white">
                <h3 className="font-bold mb-3">Developers</h3>
                <div className="space-y-2">
                  {game.developers.map((dev) => (
                    <div key={dev.id} className="flex items-center">
                      <span className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                        {dev.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DetailGame;