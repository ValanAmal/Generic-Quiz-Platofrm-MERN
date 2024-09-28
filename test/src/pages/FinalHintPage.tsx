import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

const FinalHintPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <BackButton />
        <h1 className="text-3xl font-bold mb-4">Final Hint</h1>
        <p className="mb-4">
          You're almost there! The flag is hidden somewhere on this site. Try
          inspecting the console or network requests.
        </p>
        <Link to="/" className="text-blue-400 underline">
          Go back to the homepage
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default FinalHintPage;

// Final hint? You think this is where we’d actually hide the flag? Think again.
// Seriously, you’re still reading these comments? That’s dedication!
// Remember: Not every page holds the answer. But some do…
// Hint: The flag is not here. Or is it? Wait, no. Definitely not.
// Alright, final hint… the flag might not be here, but are you looking *hard enough*?
