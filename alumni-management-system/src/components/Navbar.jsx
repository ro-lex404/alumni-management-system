import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

function Navbar(){
    return(
        <>
        <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/profile" className="hover:text-blue-300">Profile</Link>
          <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/JobOpenings" className="hover:text-blue-300">Jobs</Link>
        </div>
        <GoogleAuth />
        </nav>
        </>
    );
}

export default Navbar;