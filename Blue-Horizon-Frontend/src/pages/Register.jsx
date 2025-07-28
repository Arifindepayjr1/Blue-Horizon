import { useState, useContext } from "react";
import userServices from "../services/user.Service.js";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";

function Register() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    profilePicture: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setForm((prev) => ({ ...prev, profilePicture: e.target.files[0] || null }));
  }

  function handleStep1Submit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Please enter email and password");
      if(password !== confirmPassword){
         toast.warn(`Password Does Not Match`);
          return;
     }
     return;
    }
    setStep(2);
  }

  async function handleStep2Submit(e) {
    e.preventDefault();
    if (!form.name || !form.username || !form.bio || !form.profilePicture) {
      toast.warn("Please complete all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", form.name);
      formData.append("username", form.username);
      formData.append("bio", form.bio);
      formData.append("profilePicture", form.profilePicture);

      const response = await userServices.register(formData);
      if (response) {
        setCurrentUser(response);
                navigate("/dashboard");
      } else {
        toast.error("Failed to register");
      }
    } catch(error) {
      toast.error("Something went wrong ",error.message);
    }
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white rounded-2xl shadow-sm">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-black tracking-tight">
            {step === 1 ? 'Join Our Community' : 'Complete Your Profile'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 ? 'Start sharing your stories today.' : 'Tell us who you are.'}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-lg"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-lg"
              />
            </div>

             <div>
              <input
                type="password"
                placeholder="Confirm a password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
            >
              Continue
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-black font-medium hover:text-gray-800 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleStep2Submit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-lg"
              />
            </div>

            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none transition-all duration-300 text-lg"
              />
            </div>

            <div>
              <textarea
                name="bio"
                placeholder="Tell us about yourself"
                value={form.bio}
                onChange={handleChange}
                rows={4}
                required
                className="w-full border-b border-gray-300 py-3 px-1 text-black placeholder-gray-400 focus:border-black outline-none resize-none transition-all duration-300 text-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Profile Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-black file:font-medium hover:file:bg-gray-200 transition-all duration-200 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
            >
              Finish Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
