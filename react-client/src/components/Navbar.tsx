// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  return (
    <nav className="bg-gray-900 shadow-md p-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold glow-text text-white">CTT</h1>
        <div className="space-x-6 text-lg font-medium">
          <Link
            to="/"
            className="hover:glow-text text-xl transition-all duration-300 text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/challenges"
            className="hover:glow-text text-xl transition-all duration-300 text-gray-300"
          >
            Challenges
          </Link>
          <Link
            to="/leader"
            className="hover:glow-text text-xl transition-all duration-300 text-gray-300"
          >
            Leaderboard
          </Link>
          {isAuthenticated ? (
            <Link
              to="/auth"
              className="hover:glow-text text-xl transition-all duration-300 text-gray-300"
              onClick={() => {
                localStorage.removeItem("token");
                window.dispatchEvent(new Event("storage"));
              }}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/auth"
              className="hover:text-yellow-500 text-xl text-gray-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
