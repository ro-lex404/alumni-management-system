import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 w-full z-50 shadow relative">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">AlumniConnect</h1>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="hidden sm:flex gap-6 text-lg items-center">
          <Link to="/" className="hover:text-blue-300 px-2 py-1">Home</Link>
          <Link to="/profile" className="hover:text-blue-300 px-2 py-1">Profile</Link>
          <Link to="/dashboard" className="hover:text-blue-300 px-2 py-1">Dashboard</Link>
          <Link to="/JobOpenings" className="hover:text-blue-300 px-2 py-1">Jobs</Link>
          <GoogleAuth />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 animate-fade-in text-lg">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-300"
          >
            Home
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-300"
          >
            Profile
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-300"
          >
            Dashboard
          </Link>
          <Link
            to="/JobOpenings"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-300"
          >
            Jobs
          </Link>
          <GoogleAuth />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
