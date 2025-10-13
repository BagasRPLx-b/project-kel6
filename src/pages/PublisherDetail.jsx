import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  GamepadIcon, 
  Star, 
  Users,
  ExternalLink,
  TrendingUp,
  Globe
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PublisherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publisher, setPublisher] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("games");

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";

  // Fetch publisher data
  useEffect(() => {
    const fetchPublisher = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/publishers/${id}?key=${API_KEY}`
        );
        setPublisher(response.data);
      } catch (err) {
        console.error("Error fetching publisher:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublisher();
  }, [id]);

  // Fetch games by publisher
  useEffect(() => {
    const fetchGamesByPublisher = async () => {
      if (!publisher) return;

      try {
        setGamesLoading(true);
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&publishers=${id}&page_size=12&ordering=-rating`
        );
        setGames(response.data.results);
      } catch (err) {
        console.error("Error fetching games by publisher:", err);
      } finally {
        setGamesLoading(false);
      }
    };

    fetchGamesByPublisher();
  }, [publisher, id]);

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  // Get rating color based on score
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "from-green-500 to-emerald-400";
    if (rating >= 4.0) return "from-blue-500 to-cyan-400";
    if (rating >= 3.5) return "from-yellow-500 to-amber-400";
    if (rating >= 3.0) return "from-orange-500 to-amber-400";
    return "from-red-500 to-pink-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading publisher details...</p>
          <p className="text-gray-400 text-sm mt-2">Getting everything ready</p>
        </div>
      </div>
    );
  }

  if (!publisher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GamepadIcon className="h-10 w-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Publisher Not Found
          </h2>
          <p className="text-gray-300 mb-6 max-w-md">
            The publisher you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 transition-colors duration-300">
              <Navbar/>

      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900/50 to-gray-900/80 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center px-5 py-2.5 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-700/50 hover:border-gray-600/50 group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" /> 
          Back
        </button>

        {/* Publisher Header Section */}
        <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden mb-8 border border-gray-700/30">
          <div className="relative h-80 md:h-96 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${publisher.image_background})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />
            
            {/* Floating Publisher Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/10">
                    {publisher.image ? (
                      <img 
                        src={publisher.image} 
                        alt={publisher.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <GamepadIcon className="h-12 w-12 text-white/80" />
                    )}
                  </div>
                </div>

                <div className="flex-1 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-2xl">
                    {publisher.name}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    {publisher.games_count && (
                      <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        <GamepadIcon className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="text-sm font-medium">
                          {formatNumber(publisher.games_count)} Games
                        </span>
                      </div>
                    )}
                    
                    {publisher.founded && (
                      <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        <Calendar className="h-4 w-4 mr-2 text-green-400" />
                        <span className="text-sm font-medium">
                          Founded {publisher.founded}
                        </span>
                      </div>
                    )}
                    
                    {publisher.country && (
                      <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        <Globe className="h-4 w-4 mr-2 text-red-400" />
                        <span className="text-sm font-medium">
                          {publisher.country}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {publisher.description && (
            <div className="p-6 md:p-8">
              <div className="max-w-4xl">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                  About {publisher.name}
                </h3>
                <div 
                  className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: publisher.description }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-blue-500/20 hover:border-blue-400/30 transition-all duration-300 group hover:transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <GamepadIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Games</p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(publisher.games_count)}
                </p>
              </div>
            </div>
          </div>

          {publisher.founded && (
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-green-500/20 hover:border-green-400/30 transition-all duration-300 group hover:transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-green-300 text-sm font-medium">Founded Year</p>
                  <p className="text-2xl font-bold text-white">
                    {publisher.founded}
                  </p>
                </div>
              </div>
            </div>
          )}

          {publisher.country && (
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-red-500/20 hover:border-red-400/30 transition-all duration-300 group hover:transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-red-300 text-sm font-medium">Country</p>
                  <p className="text-2xl font-bold text-white">
                    {publisher.country}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Published Games Section */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Published Games</h2>
              <p className="text-gray-400">Discover amazing games from {publisher.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl text-gray-300 border border-gray-700/50">
                {games.length > 0 ? `${formatNumber(games.length)} games` : "No games found"}
              </span>
            </div>
          </div>

          {gamesLoading ? (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400 font-medium">Loading amazing games...</p>
                <p className="text-gray-500 text-sm mt-2">Discovering the best titles</p>
              </div>
            </div>
          ) : games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <Link
                  to={`/game/${game.id}`}
                  key={game.id}
                  className="block bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-700/30 hover:border-gray-600/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={game.background_image || "/placeholder-game.jpg"}
                      alt={game.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90"></div>
                    
                    {/* Rating Badge */}
                    {game.rating && (
                      <div className={`absolute top-3 right-3 bg-gradient-to-r ${getRatingColor(game.rating)} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center`}>
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {game.rating.toFixed(1)}
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg leading-tight drop-shadow-2xl">
                        {game.name}
                      </h3>
                      {game.released && (
                        <p className="text-gray-300 text-sm mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(game.released).getFullYear() || game.released}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Genres */}
                    {game.genres && game.genres.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {game.genres.slice(0, 2).map((genre) => (
                            <span
                              key={genre.id}
                              className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 text-xs rounded-lg border border-purple-500/30"
                            >
                              {genre.name}
                            </span>
                          ))}
                          {game.genres.length > 2 && (
                            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg border border-gray-600/50">
                              +{game.genres.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Platforms */}
                    {game.platforms && game.platforms.length > 0 && (
                      <div className="mb-3">
                        <p className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">Platforms</p>
                        <div className="flex flex-wrap gap-1">
                          {game.platforms.slice(0, 3).map((platform) => (
                            <span
                              key={platform.platform.id}
                              className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 text-xs rounded-lg border border-blue-500/30"
                            >
                              {platform.platform.name}
                            </span>
                          ))}
                          {game.platforms.length > 3 && (
                            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg border border-gray-600/50">
                              +{game.platforms.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View Game CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                      <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                        View Details
                      </span>
                      <ExternalLink className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/30">
              <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600/50">
                <GamepadIcon className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Games Published Yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This publisher hasn't published any games in our database. They might be working on something amazing!
              </p>
            </div>
          )}
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default PublisherDetail;