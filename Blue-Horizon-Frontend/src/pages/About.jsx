import { useContext } from "react";
import OtherUserContext from "../context/OtherUserContext";
import UserContext from "../context/UserContext";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

function About() {
  const { otherUser_obj } = useContext(OtherUserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate(`/profile/${otherUser_obj.id}/edit-profile`);
  }

  return (
    <div className="w-full min-h-[400px] bg-white font-sans">
      {otherUser_obj.id === user.id ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-base leading-relaxed">
            {otherUser_obj.bio || "No bio available"}
          </p>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>Edit Bio</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600 text-base leading-relaxed">
            {otherUser_obj.bio || "No bio available"}
          </p>
        </div>
      )}
    </div>
  );
}

export default About;