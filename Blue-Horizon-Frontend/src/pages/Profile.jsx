import { useEffect, useState , useContext} from "react";
import { useParams, useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { User, FileText, Bookmark, Heart, Edit } from "lucide-react";
import userServices from "../services/user.Service.js";
import postService from "../services/post.Service.js";
import UserContext from "../context/UserContext.jsx";
import OtherUserContext from "../context/OtherUserContext.jsx";

function Profile() {
  const { user } = useContext(UserContext);
  const { otherUser_obj, setOtherUser } = useContext(OtherUserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("about");
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    async function fetchDatabyId() {
      try {
        const res = await userServices.findUserWithId(Number(id));
        if (!res) {
          navigate("/login");
        } else {
          setOtherUser(res);
          console.log(res);
        }
      } catch (error) {
        navigate("/");
        console.log(`Error: ${error.message}`);
      }
    }

    async function fetchPostCount() {
      try {
        const res = await postService.getPostCountbySpecificUserId(Number(id));
        if (res) {
          console.log(`Successfully Get Post Count ${res.postCount}`);
          setPostCount(res.postCount);
        } else {
          console.log(`User Not found Or Not have any post`);
          setPostCount(0);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchDatabyId();
    fetchPostCount();
  }, [id, navigate, setOtherUser]);

  useEffect(() => {
    const path = location.pathname.split("/").pop() || "about";
    setActiveTab(path);
  }, [location]);

  return (
    <div className="min-h-screen bg-white font-sans pt-16"> {/* Added pt-16 for fixed nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex">
        <div className="w-1/3 pr-8">
          <div className="sticky top-16"> {/* Adjusted from top-8 to top-16 */}
            <div className="flex flex-col items-center">
              <img
                src={otherUser_obj.profilePicture_url}
                alt="user profile"
                className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
              />
              <h2 className="mt-4 text-xl font-bold text-black">{otherUser_obj.username || "Username"}</h2>
              <p className="mt-1 text-sm text-gray-600">
                Joined{" "}
                {otherUser_obj.createdAt
                  ? new Date(otherUser_obj.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
              <p className="mt-1 text-sm text-gray-600">Posts: {postCount}</p>
              {otherUser_obj.id === user.id && (
                <Link
                  to="edit-profile"
                  className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 flex items-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="w-2/3 pl-8 border-l border-gray-300">
          <div className="flex space-x-6 border-b border-gray-300 mb-6">
            <Link
              to="about"
              onClick={() => setActiveTab("about")}
              className={`py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-gray-100 hover:scale-105 ${
                activeTab === "about"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <User size={16} />
              <span>About</span>
            </Link>
            <Link
              to="post"
              onClick={() => setActiveTab("post")}
              className={`py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-gray-100 hover:scale-105 ${
                activeTab === "post"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <FileText size={16} />
              <span>Posts</span>
            </Link>
            <Link
              to="save-later"
              onClick={() => setActiveTab("save-later")}
              className={`py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-gray-100 hover:scale-105 ${
                activeTab === "save-later"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <Bookmark size={16} />
              <span>Save Later</span>
            </Link>
            <Link
              to="likes"
              onClick={() => setActiveTab("likes")}
              className={`py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-gray-100 hover:scale-105 ${
                activeTab === "likes"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <Heart size={16} />
              <span>Likes</span>
            </Link>
          </div>

          <div className="mt-6 transition-opacity duration-300 ease-in-out" key={activeTab}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;