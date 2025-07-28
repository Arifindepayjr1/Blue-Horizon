import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Trash2, Loader2 } from "lucide-react";
import saveLaterServices from "../services/saveLater.service.js";
import UserContext from "../context/UserContext.jsx";

function SaveLater() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchSavedLaterById(id);
  }, [id]);

  async function fetchSavedLaterById(userId) {
    setLoading(true);
    try {
      const res = await saveLaterServices.getSaveLaterBySpecificUser(Number(userId));
      setData(res || []);
      console.log(`Fetched ${res?.length || 0} saved items for user ${userId}`);
    } catch (error) {
      setData([]);
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(e, saveId) {
    e.stopPropagation();
    try {
      const res = await saveLaterServices.deleteSaveLater(saveId);
      if (res?.status === "SUCCESS") {
        console.log("Deleted successfully");
        fetchSavedLaterById(id);
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
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
        <h1 className="text-xl font-semibold text-gray-600">No saved posts available</h1>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.save_id}
              className="flex items-center border-b border-gray-300 py-4 px-4 hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300"
            >
              <Link to={`/post/${item.post_id}/content`} className="flex-1 flex items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-black">{item.post_title || "Untitled"}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <img
                      src={item.author_profile_picture}
                      alt="author profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                    <p className="text-sm text-gray-600">{item.author_username || "Unknown"}</p>
                    <p className="text-sm text-gray-600">
                      Saved{" "}
                      {item.saved_at
                        ? new Date(item.saved_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <img
                  src={item.post_thumbnail_url}
                  alt="post thumbnail"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300 ml-4"
                />
              </Link>
              {user?.id === Number(id) && (
                <button
                  className="ml-4 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                  title="Remove from saved posts"
                  onClick={(e) => handleDelete(e, item.save_id)}
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

export default SaveLater;
