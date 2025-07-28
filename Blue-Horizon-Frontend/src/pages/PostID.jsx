import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, Trash2 } from "lucide-react";
import postServices from "../services/post.Service.js";
import UserContext from "../context/UserContext.jsx";
import { toast } from "react-toastify";

function PostID() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  async function fetchPostByUserId(id) {
    try {
      const response = await postServices.getPostBySpecificUserId(Number(id));
      setData(response || []);
      console.log(`Successfully Get Post By Specific Id: ${response?.length} posts`);
    } catch (error) {
      setData([]);
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePost(postId) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await postServices.deletePost(postId);
      setData(prev => prev.filter(post => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post");
    }
  }

  useEffect(() => {
    fetchPostByUserId(id);
  }, [id]);

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
        <h1 className="text-xl font-semibold text-gray-600">No posts available</h1>
      ) : (
        <div className="space-y-4">
          {data.map((post) => (
            <div
              key={post.id}
              className="flex items-center border-b border-gray-300 py-4 px-4 hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300"
            >
              <Link to={`/post/${post.id}/content`} className="flex-1">
                <h2 className="text-lg font-semibold text-black">{post.title || "Untitled"}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <img
                    src={post.profile_picture || "https://via.placeholder.com/40"}
                    alt="user profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                  <p className="text-sm text-gray-600">{post.username || "Unknown"}</p>
                  <p className="text-sm text-gray-600">
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">{post.category_name || "Uncategorized"}</p>
                </div>
              </Link>

              <img
                src={post.thumbnail_url}
                alt="post thumbnail"
                className="w-24 h-24 object-cover rounded-lg border border-gray-300 ml-4"
              />

              {user && user.id === post.user_id && (
               <button
  className="ml-4 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
  title="Delete Post"
  onClick={() => handleDeletePost(post.id)}
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

export default PostID;
