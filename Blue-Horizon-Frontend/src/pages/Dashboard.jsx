import {useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Bookmark, ArrowDownCircle, Heart } from "lucide-react";
import postServices from "../services/post.Service";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";
import likeServices from "../services/like.Service";
import saveLaterServices from "../services/saveLater.service";

function Dashboard() {
  const {user} = useContext(UserContext);
  const [data, setData] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  async function fetchPost() {
    try {
      const res = await postServices.getAllPost();
      if (res) {
        setData(res || []);
        const uniqueCategories = ["All", ...new Set(res.map((post) => post.category_name).filter(Boolean))];
        setCategories(uniqueCategories);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  function loadMore() {
    setVisiblePosts((prev) => prev + 10);
  }

  async function handleToggle(post_id, type, currentState) {
    try {
      if (type === "save") {
        if (currentState) {
          const res = await saveLaterServices.deleteSaveLaterByPost(user.id , post_id);
          console.log(res);
          toast.success("Post removed from saved");
        } else {
          await saveLaterServices.createSaveLaterPost(user.id , post_id);
          toast.success("Post saved");
        }
        setData((prevData) =>
          prevData.map((post) =>
            post.id === post_id ? { ...post, isSaved: !currentState } : post
          )
        );
      } else if (type === "like") {
        if (currentState) {
          await likeServices.unlikePost(user.id , post_id);
          toast.success("Post unliked");
        } else {
          await likeServices.createLikePost(user.id , post_id);
          toast.success("Post liked");
        }
        setData((prevData) =>
          prevData.map((post) =>
            post.id === post_id ? { ...post, isLiked: !currentState } : post
          )
        );
      }
    } catch (error) {
      toast.error(`Failed to ${type === "save" ? currentState ? "unsave" : "save" : currentState ? "unlike" : "like"} post: ${error.message}`);
    }
  }

  const filteredPosts =
    selectedCategory === "All"
      ? data
      : data.filter((post) => post.category_name === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center pt-16">
        <Loader2 size={24} className="animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex justify-start space-x-6 border-b border-gray-300 mb-10 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-gray-100 hover:scale-105 ${
                selectedCategory === category
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>

        {/* Post Cards */}
        <div className="w-full">
          {filteredPosts.length === 0 ? (
            <h1 className="text-xl font-semibold text-gray-600 text-left">No posts available</h1>
          ) : (
            <div className="space-y-16">
              {filteredPosts.slice(0, visiblePosts).map((post) => (
                <Link
                  key={post.id}
                  to={`/post/${post.id}/content`}
                  className="block w-full max-w-2xl mx-auto border border-gray-200 rounded-lg shadow-sm pb-10 hover:shadow-lg hover:scale-105 hover:bg-gray-50 transition-transform transition-shadow duration-300"
                >
                  <div className="flex flex-col space-y-4 px-6 pt-6">
                    <img
                      src={post.thumbnail_url || "https://via.placeholder.com/640x360"}
                      alt="post thumbnail"
                      className="w-full h-64 object-cover rounded-lg border border-gray-300"
                    />
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <img
                        src={post.profile_picture || "https://via.placeholder.com/40"}
                        alt="user"
                        className="w-6 h-6 rounded-full object-cover border border-gray-300"
                      />
                      <span>{post.username || "Unknown"}</span>
                      <span>&bull;</span>
                      <span>
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </span>
                      <span>&bull;</span>
                      <span>{post.category_name || "Uncategorized"}</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-black">{post.title || "Untitled"}</h2>
                    <div className="flex space-x-3 mt-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggle(post.id, "like", post.isLiked);
                        }}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          post.isLiked
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                        title={post.isLiked ? "Unlike post" : "Like post"}
                      >
                        <Heart size={16} className={post.isLiked ? "fill-white" : "fill-none"} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggle(post.id, "save", post.isSaved);
                        }}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          post.isSaved
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                        title={post.isSaved ? "Unsave post" : "Save post"}
                      >
                        <Bookmark size={16} className={post.isSaved ? "fill-white" : "fill-none"} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {visiblePosts < filteredPosts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              <ArrowDownCircle size={18} />
              <span>Load More</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
