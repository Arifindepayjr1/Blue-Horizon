import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postServices from "../services/post.Service";
import likeServices from "../services/like.Service";
import saveLaterServices from "../services/saveLater.Service";
import UserContext from "../context/UserContext";
import { Heart, Bookmark } from "lucide-react";
import { toast } from "react-toastify";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const postRes = await postServices.getAllPost();
      const likeRes = await likeServices.getAllLIkePostBySpecificUser(user.id);
      const saveRes = await saveLaterServices.getSaveLaterBySpecificUser(user.id);

      setAllPosts(postRes);
      setDisplayedPosts(postRes.slice(0, limit));
      setLikedPosts(likeRes.map((like) => like.id));
      setSavedPosts(saveRes.map((save) => save.post_id));
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }

  async function handleLike(postId) {
    try {
      if (likedPosts.includes(postId)) {
        await likeServices.unlikePost(user.id, postId);
        setLikedPosts((prev) => prev.filter((id) => id !== postId));
        toast.info("Unliked the post");
      } else {
        await likeServices.createLikePost(user.id, postId);
        setLikedPosts((prev) => [...prev, postId]);
        toast.success("Liked the post");
      }
    } catch (err) {
      toast.error("Failed to update like");
    }
  }

  async function handleSave(postId) {
    try {
      if (savedPosts.includes(postId)) {
        await saveLaterServices.deleteSaveLaterByPost(user.id, postId);
        setSavedPosts((prev) => prev.filter((id) => id !== postId));
        toast.info("Removed from Saved");
      } else {
        await saveLaterServices.createSaveLaterPost(user.id, postId);
        setSavedPosts((prev) => [...prev, postId]);
        toast.success("Saved for later");
      }
    } catch (err) {
      toast.error("Failed to update save");
    }
  }

  function loadMorePosts() {
    const nextPage = page + 1;
    const start = page * limit;
    const more = allPosts.slice(start, start + limit);
    setDisplayedPosts((prev) => [...prev, ...more]);
    setPage(nextPage);
  }

  // Helper function to remove HTML tags from content string
  function stripHtmlTags(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Stories</h1>

      <div className="flex flex-col gap-6">
        {displayedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 hover:scale-[1.01]"
          >
            <Link to={`/profile/${post.id}/content`}>
              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
            </Link>

            <div className="p-5">
              <Link to={`/profile/${post.id}/content`}>
                <h2 className="text-xl font-semibold text-gray-800 hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {stripHtmlTags(post.content).slice(0, 150)}...
                </p>
              </Link>

              <div className="flex items-center gap-4 mt-4">
                <img
                  src={post.profile_picture}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{post.username}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-5">
                <Heart
                  className={`cursor-pointer transition w-6 h-6 ${
                    likedPosts.includes(post.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleLike(post.id)}
                />
                <Bookmark
                  className={`cursor-pointer transition w-6 h-6 ${
                    savedPosts.includes(post.id)
                      ? "text-blue-500 fill-blue-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleSave(post.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayedPosts.length < allPosts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMorePosts}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition text-lg font-medium"
          >
            Load more stories
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
