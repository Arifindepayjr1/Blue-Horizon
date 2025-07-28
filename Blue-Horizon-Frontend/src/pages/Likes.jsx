import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Trash2, Loader2 } from "lucide-react";
import likeServices from "../services/like.Service";
import UserContext from "../context/UserContext";

function Likes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetchLikeById(id);
  }, [id]);

  async function fetchLikeById(userId) {
    setLoading(true);
    try {
      const res = await likeServices.getAllLIkePostBySpecificUser(userId);
      setData(res || []);
      console.log(`Fetched ${res?.length || 0} liked posts for user ${userId}`);
    } catch (error) {
      setData([]);
      console.error(`Error fetching liked posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(user_id, post_id) {
    try {
         console.log("Attempting to delete post with ID:", id);
      const res = await likeServices.unlikePost(user_id, post_id);
      if (res) {
        console.log("Unlike Successfully");
        fetchLikeById(id); 
      } else {
        console.log("Failed to unlike post");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  if (loading) {
    return (
      <div className="w-full bg-white font-sans flex items-center justify-center h-[400px]">
        <Loader2 size={24} className="animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-sans">
      {data.length === 0 ? (
        <h1 className="text-xl font-semibold text-gray-600">No liked posts available</h1>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-300 py-4 px-4 hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300"
            >
              <Link to={`/post/${item.id}/content`} className="flex-1 flex items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-black">{item.title || "Untitled"}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <img
                      src={item.profile_picture || "https://via.placeholder.com/40"}
                      alt="author profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                    <p className="text-sm text-gray-600">{item.username || "Unknown"}</p>
                    <p className="text-sm text-gray-600">
                      Liked{" "}
                      {item.liked_at
                        ? new Date(item.liked_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <img
                  src={item.thumbnail_url}
                  alt="post thumbnail"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300 ml-4"
                />
              </Link>

              {user?.id === Number(id) && (
                <button
                  className="ml-4 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                  title="Remove Like"
                  onClick={() => handleDelete(user.id, item.id)}
                >
                  <Trash2 size={16} className="text-gray-600" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Likes;
