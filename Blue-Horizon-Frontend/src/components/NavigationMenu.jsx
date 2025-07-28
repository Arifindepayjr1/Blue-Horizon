import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Bookmark, ArrowDownCircle, ExternalLink } from "lucide-react";
import postServices from "../services/post.Service";
import { toast } from "react-toastify";

function Dashboard() {
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

  async function handleSaveToggle(post_id, isSaved) {
    try {
      if (isSaved) {
        await postServices.unsavePost(post_id);
        setData((prev) =>
          prev.map((post) =>
            post.id === post_id ? { ...post, isSaved: false } : post
          )
        );
        toast.success("Post removed from saved");
      } else {
        await postServices.savePost(post_id);
        setData((prev) =>
          prev.map((post) =>
            post.id === post_id ? { ...post, isSaved: true } : post
          )
        );
        toast.success("Post saved");
      }
    } catch (error) {
      toast.error(`Failed to ${isSaved ? "unsave" : "save"} post: ${error.message}`);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex space-x-6 border-b border-gray-300 mb-6 overflow-x-auto">
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
        {filteredPosts.length === 0 ? (
          <h1 className="text-xl font-semibold text-gray-600">No posts available</h1>
        ) : (
          <div className="space-y-4">
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <div
                key={post.id}
                className="flex items-center border-b border-gray-300 py-4 px-4 hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex-1">
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
                </div>
                <img
                  src={post.thumbnail_url || "https://via.placeholder.com/100"}
                  alt="post thumbnail"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300 ml-4"
                />
                <div className="flex space-x-2 ml-4">
                  <Link
                    to={`/post/${post.id}/content`}
                    className="p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 hover:scale-105 transition-all duration-300"
                    title="View post"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <button
                    onClick={() => handleSaveToggle(post.id, post.isSaved)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      post.isSaved
                        ? "bg-gray-900 text-white hover:bg-gray-700"
                        : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 hover:scale-105"
                    }`}
                    title={post.isSaved ? "Unsave post" : "Save post"}
                  >
                    <Bookmark
                      size={16}
                      className={post.isSaved ? "fill-white" : "fill-none"}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visiblePosts < filteredPosts.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              <ArrowDownCircle size={16} />
              <span>Load More</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;