// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  return (
    <nav className="bg-white shadow-md p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">CTF Platform</h1>
        <div className="space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-500 text-gray-800">
            Home
          </Link>
          <Link to="/challenges" className="hover:text-blue-500 text-gray-800">
            Challenges
          </Link>
          <Link to="/leader" className="hover:text-blue-500 text-gray-800">
            Leaderboard
          </Link>
          {isAuthenticated ? (
            <Link
              to="/auth"
              className="hover:text-blue-500 text-gray-800"
              onClick={() => {
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('storage'));
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to="/auth" className="hover:text-blue-500 text-gray-800">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
