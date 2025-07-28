import { PenTool , User } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from "react";

function NavigationMenu() {
    const {user} = useContext(UserContext);
    const id = user.id? user.id : undefined;
    return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white shadow-sm">
      <Link to={!user? "/" : "/dashboard"}>
        <h1 className="text-2xl font-semibold tracking-tight hover:text-blue-600 transition-colors duration-200">
          Blue-Horizon
        </h1>
      </Link>


      <div className="flex items-center gap-4">
        <Link to={user? "/write" : "/login"}>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 hover:shadow-md transition-all duration-200">
            <PenTool size={18} />
            <span className="text-sm font-medium">Write</span>
          </button>
        </Link>

        <Link to={`/profile/${id}`} className="hover:text-blue-600 transition duration-200">
          <User size={22} />
        </Link>
      </div>
    </nav>
  );
}

export default NavigationMenu;
