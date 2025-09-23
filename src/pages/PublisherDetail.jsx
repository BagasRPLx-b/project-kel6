import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const PublisherDetail = () => {
  const { id } = useParams();  // Get the publisher ID from URL params
  const navigate = useNavigate();
  const [publisher, setPublisher] = useState(null);  // State to store publisher data
  const [loading, setLoading] = useState(true);  // State to handle loading state

  const API_KEY = "98453db9a240436ba5b62348d213f4a0";  // API key for the rawg API

  // Fetch publisher data when component is mounted or when the ID changes
  useEffect(() => {
    const fetchPublisher = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/publishers/${id}?key=${API_KEY}`
        );
        setPublisher(response.data);  // Store the publisher data in state
      } catch (err) {
        console.error("Error fetching publisher:", err);
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    };

    fetchPublisher();
  }, [id]);

  // Show a loading message if the data is being fetched
  if (loading) return <p className="text-center mt-10 text-lg">Loading publisher details...</p>;

  // Show an error message if the publisher is not found
  if (!publisher) return <p className="text-center mt-10 text-lg">Publisher not found.</p>;

  // Check if games are available
  const games = publisher.games && publisher.games.length > 0 ? publisher.games : null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}  // Navigate to the previous page
          className="mb-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
        >
          <ArrowLeft className="mr-2" /> Back to GameDetail
        </button>

        {/* Publisher Info Section */}
        <div className="flex flex-col sm:flex-row items-center mb-12">
          {publisher.image_background && (
            <img
              src={publisher.image_background}
              alt={publisher.name}
              className="w-32 h-32 rounded-full object-cover sm:mr-8 mb-4 sm:mb-0 border"  // Publisher's logo or background image
            />
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold text-white-900 mb-4">{publisher.name}</h1>
            <p className="text-lg text-gray-600">{publisher.description || "No description available."}</p>
          </div>
        </div>

        {/* Publisher Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-white-800 mr-2">Games Published:</span>
            <span>{publisher.games_count || "N/A"}</span>
          </div>
          {publisher.founded && (
            <div className="flex items-center">
              <span className="text-xl font-semibold text-white-800 mr-2">Founded:</span>
              <span>{publisher.founded}</span>
            </div>
          )}
          {publisher.country && (
            <div className="flex items-center">
              <span className="text-xl font-semibold text-white-800 mr-2">Country:</span>
              <span>{publisher.country}</span>
            </div>
          )}
        </div>

        {/* Published Games Section */}
        <h2 className="text-2xl font-semibold text-white-900 mb-4">Published Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games ? (
            games.map((game) => (
              <Link
                to={`/game/${game.id}`}  // Link to the game's detail page
                key={game.id}
                className="block p-6 bg-white hover:bg-gray-50 rounded-lg shadow-lg transition transform hover:scale-105"
              >
                {/* Game Card Content */}
                <div className="mb-4">
                  {game.background_image && (
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-white-900">{game.name}</h3>
                  {game.released && (
                    <p className="text-white-500 text-sm mt-2">{game.released}</p>
                  )}
                  {game.genres && (
                    <div className="mt-2">
                      <span className="font-medium">Genres:</span>{" "}
                      {game.genres.map((genre) => genre.name).join(", ")}
                    </div>
                  )}
                  {game.platforms && (
                    <div className="mt-2">
                      <span className="font-medium">Platforms:</span>{" "}
                      {game.platforms.map((platform) => platform.platform.name).join(", ")}
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-lg text-gray-600">No games found for this publisher.</p>  // If no games are found, display this message
          )}
        </div>
      </div>
    </div>
  );
};

export default PublisherDetail;
