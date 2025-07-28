import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Edit, Image, Loader2 } from "lucide-react";
import userServices from "../services/user.Service.js";
import UserContext from "../context/UserContext.jsx";
import { toast } from "react-toastify";

function EditProfile() {
  const navigate = useNavigate();
  const { user, setCurrentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    profilePicture:"",
    bio: "",
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    console.log("Console.log: " , user);
    setEditForm(user);
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setEditForm((prev) => ({ ...prev, profilePicture: e.target.files[0] || editForm.profilePicture}));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)

    try {
      const formData = new FormData();
      formData.append("username", editForm.username);
      formData.append("name", editForm.name);
      formData.append("bio", editForm.bio);
      formData.append("email", editForm.email);
      formData.append("password", editForm.password);
      formData.append("profilePicture", editForm.profilePicture);
      console.log(formData);
      const response = await userServices.EditProfile(user.id, formData);
      if (response) {
        setCurrentUser(response);
        navigate(`/profile/${user.id}`);
        toast.success("Profile updated successfully");
      } else {
        setCurrentUser(user);
        toast.warn("Profile not updated");
      }
    } catch (error) {
      setCurrentUser(user);
      toast.error(`Something went wrong: ${error.message}`);
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-white font-sans">
      <h2 className="text-2xl font-bold text-black mb-4">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-2">
            <User size={16} />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border-b border-gray-300 py-2 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-base hover:bg-gray-100 hover:shadow-sm disabled:opacity-50"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-2">
            <User size={16} />
            <span>Username</span>
          </label>
          <input
            type="text"
            name="username"
            value={editForm.username}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border-b border-gray-300 py-2 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-base hover:bg-gray-100 hover:shadow-sm disabled:opacity-50"
            placeholder="Your username"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-2">
            <Edit size={16} />
            <span>Bio</span>
          </label>
          <textarea
            name="bio"
            value={editForm.bio}
            onChange={handleChange}
            rows={3}  
            disabled={loading}
            className="w-full border-b border-gray-300 py-2 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-base hover:bg-gray-100 hover:shadow-sm resize-none disabled:opacity-50"
            placeholder="Tell us about yourself"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-2">
            <Image size={16} />
            <span>Profile Picture</span>
          </label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-black file:font-medium hover:file:bg-gray-200 transition-all duration-200 cursor-pointer disabled:opacity-50"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Edit size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
          <Link
            to={`/profile/${user.id}`}
            className="px-4 py-2 bg-gray-200 text-black rounded-lg font-medium hover:bg-gray-300 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Cancel</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;