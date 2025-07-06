import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // setUser(null);
    navigate("/signin");
  };

  if (user) {
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white px-6 cursor-pointer hover:text-blue-200 transition-colors duration-300"
        >
          {user.username}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      <Link
        to="/signin"
        className="text-white hover:text-blue-200 transition-colors duration-300"
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="text-white hover:text-blue-200 transition-colors duration-300"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthMenu;
