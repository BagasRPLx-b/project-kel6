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

        // Fetch related games
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
    return <div className="text-center mt-10 text-lg font-semibold">Loading Game Details...</div>;
  }

  if (!game) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg font-semibold">
        Game Not Found
        <br />
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          <ArrowLeft className="inline mr-2" size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="p-6 max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
          <ArrowLeft className="mr-2" size={18} />
          Back to Library
        </button>

        <div className="mb-6">
          <img src={game.background_image} alt={game.name} className="rounded-xl w-full h-96 object-cover" />
          <h1 className="text-4xl font-bold mt-4">{game.name}</h1>
          <p className="text-gray-600 mt-2">{game.released}</p>
        </div>

        {/* Publisher section with links */}
        {game.publishers && game.publishers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Publisher{game.publishers.length > 1 ? "s" : ""}:</h2>
            <div className="flex flex-wrap gap-3">
              {game.publishers.map((pub) => (
                <Link
                  to={`/publisher/${pub.id}`}
                  key={pub.id}
                  className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm hover:bg-indigo-200 transition"
                >
                  {pub.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* About Game */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <div dangerouslySetInnerHTML={{ __html: game.description }} />
        </div>

        {/* Comments */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Leave a comment"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
              Post
            </button>
          </form>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mb-2 p-3 bg-gray-100 rounded">
                <p className="text-sm text-gray-700">{comment.text}</p>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailGame;
