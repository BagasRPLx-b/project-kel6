import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Star,
  Tags,
  Users,
  Clock,
  GamepadIcon,
  MapPin,
  ExternalLink
} from "lucide-react";

const DetailGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";

  useEffect(() => {
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
        // Multiple strategies to get related games
        let relatedRes;
        
        // Try by genres first
        if (game.genres && game.genres.length > 0) {
          const genreIds = game.genres.map(genre => genre.id).join(',');
          relatedRes = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreIds}&page_size=6`
          );
        } 
        // Fallback to tags
        else if (game.tags && game.tags.length > 0) {
          const tagIds = game.tags.slice(0, 3).map(tag => tag.id).join(',');
          relatedRes = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&tags=${tagIds}&page_size=6`
          );
        }
        // Final fallback - popular games
        else {
          relatedRes = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=6`
          );
        }
        
        // Filter out the current game from related results
        const filteredRelated = relatedRes.data.results.filter(relatedGame => 
          relatedGame.id !== game.id
        );
        setRelated(filteredRelated.slice(0, 5)); // Show max 5 related games
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
            {/* Game Header */}
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
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Share your thoughts about this game..."
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Post
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
                      <p className="text-gray-200 mb-2">{comment.text}</p>
                      <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Games - Right Side (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <GamepadIcon className="h-6 w-6 mr-2 text-red-400" />
                Related Games
              </h2>
              
              {relatedLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                </div>
              ) : related.length > 0 ? (
                <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGame;