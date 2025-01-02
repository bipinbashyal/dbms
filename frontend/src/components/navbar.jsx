import { Link } from "react-router";
import { useAuth } from "../context/authContext";
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-400 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded transition"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/users"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Users
              </Link>
              <button
                onClick={logout}
                className="text-white hover:bg-red-600 px-3 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
