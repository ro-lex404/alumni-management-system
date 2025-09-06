import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { path: "/", label: "Home" },
    { path: "/profile", label: "Profile" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/JobOpenings", label: "Job Openings" },
  ];

  return (
    <nav className="bg-blue-950 text-white px-4 py-4 w-full z-50 shadow relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">AlumniConnect</h1>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="hidden sm:flex gap-6 text-lg items-center">
          {routes.map(({ path, label }, idx) => (
            <Link
              key={idx}
              to={path}
              className="hover:text-yellow-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              {label}
            </Link>
          ))}
          <GoogleAuth />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 text-lg animate-fade-in">
          {routes.map(({ path, label }, idx) => (
            <Link
              key={idx}
              to={path}
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-300 px-4 py-2 rounded hover:bg-white/10"
            >
              {label}
            </Link>
          ))}
          <GoogleAuth />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
