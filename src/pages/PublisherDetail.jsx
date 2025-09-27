import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, MapPin, GamepadIcon } from "lucide-react";
import Navbar from "../Components/Navbar";

const PublisherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publisher, setPublisher] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gamesLoading, setGamesLoading] = useState(true);

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
        // Using the games endpoint with publisher filter
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&publishers=${id}&page_size=12`
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading publisher details...</p>
        </div>
      </div>
    );
  }

  if (!publisher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Publisher Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            The publisher you're looking for doesn't exist.
          </p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-lg"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </button>
        {/* Publisher Header Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div
            className="h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${publisher.image_background})` }}
          />

          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {publisher.image_background && (
                <div className="flex-shrink-0">
                 
                </div>
              )}

              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-semibold mb-4 text-white">
                  {publisher.name}
                </h1>
                <p
                  className="text-base text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: publisher.description }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Publisher Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg mr-4">
              <GamepadIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Games Published</p>
              <p className="text-2xl font-bold text-white">
                {publisher.games_count || "N/A"}
              </p>
            </div>
          </div>

          {publisher.founded && (
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex items-center">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Founded</p>
                <p className="text-2xl font-bold text-white">
                  {publisher.founded}
                </p>
              </div>
            </div>
          )}

          {publisher.country && (
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex items-center">
              <div className="bg-red-500 p-3 rounded-lg mr-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Country</p>
                <p className="text-2xl font-bold text-white">
                  {publisher.country}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Published Games Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Published Games</h2>
            <span className="text-gray-400">
              {games.length > 0 ? `${games.length} games` : "No games"}
            </span>
          </div>

          {gamesLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading games...</p>
              </div>
            </div>
          ) : games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <Link
                  to={`/game/${game.id}`}
                  key={game.id}
                  className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={game.background_image || "/placeholder-game.jpg"}
                      alt={game.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg truncate">
                        {game.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    {game.released && (
                      <p className="text-gray-400 text-sm mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Released:{" "}
                        {new Date(game.released).getFullYear() || game.released}
                      </p>
                    )}

                    {game.genres && game.genres.length > 0 && (
                      <div className="mb-2">
                        <p className="text-gray-400 text-sm font-medium">
                          Genres
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {game.genres.slice(0, 3).map((genre) => (
                            <span
                              key={genre.id}
                              className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300"
                            >
                              {genre.name}
                            </span>
                          ))}
                          {game.genres.length > 3 && (
                            <span className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300">
                              +{game.genres.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {game.platforms && game.platforms.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm font-medium">
                          Platforms
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {game.platforms.slice(0, 3).map((platform) => (
                            <span
                              key={platform.platform.id}
                              className="px-2 py-1 bg-blue-900 text-xs rounded text-blue-200"
                            >
                              {platform.platform.name}
                            </span>
                          ))}
                          {game.platforms.length > 3 && (
                            <span className="px-2 py-1 bg-blue-900 text-xs rounded text-blue-200">
                              +{game.platforms.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {game.rating && (
                      <div className="mt-3 flex items-center">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${(game.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-yellow-500 font-medium">
                          {game.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 rounded-xl shadow-lg">
              <GamepadIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Games Found
              </h3>
              <p className="text-gray-500">
                This publisher hasn't published any games in our database.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PublisherDetail;
