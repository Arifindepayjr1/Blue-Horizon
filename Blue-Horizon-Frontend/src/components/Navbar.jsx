import { FiAlignJustify } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";

function Navbar() {
    return (
        <nav className="md:hidden border-b-2 border-zinc-700 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <h1 className="font-bold font-serif text-lg text-blue-800">Blue-Horizon</h1>
                <div className="flex items-center space-x-2">
                    <button aria-label="Search" className="p-2 rounded hover:bg-zinc-100 transition">
                        <IoIosSearch size={24} />
                    </button>
                    <button aria-label="Menu" className="p-2 rounded hover:bg-zinc-100 transition">
                        <FiAlignJustify size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;