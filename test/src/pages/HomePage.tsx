import React from "react";
// Hey, are you really looking for the flag here? Good luck finding it in plain sight.
// You know, we could've hidden the flag in an image, but we didn’t… or did we?
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 id="#4: _sight_lol_1234}" className="text-3xl font-bold mb-4">
          Welcome to the Hidden Flag Challenge
        </h1>
        <p className="mb-4">
          You must search carefully across the site to find the hidden flag.
          Look for hints on each page.
        </p>
        <Link to="/about" className="text-blue-400 underline">
          Learn more about the flag on the About page.
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

// By the way, this page is totally safe. No flags here. Move along.
// But hey, who said flags can't be invisible? Just kidding... or am I? ;)
