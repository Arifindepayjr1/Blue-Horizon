import { PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";
function HeroSection() {

  const {user} = useContext(UserContext);
  return (
    <section className="w-full h-[80vh] flex items-center justify-center bg-white">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 transition-all duration-300">
          Where great ideas find their voice
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 opacity-80">
          Discover stories, thinking, and expertise from writers on any topic that matters to you.
        </p>

        <Link to="/login">
          <button className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white font-semibold hover:bg-gray-800 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <PenTool className="w-5 h-5" />
            <span>Start Writing</span>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
