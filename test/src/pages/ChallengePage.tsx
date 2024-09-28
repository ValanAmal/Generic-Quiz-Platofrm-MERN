import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

const ChallengePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/*Fragment 1: FLAG{hmm_y0u_re*/}

      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <BackButton />
        <h1 className="text-3xl font-bold mb-4">Challenge Page</h1>
        <p className="mb-4">
          Inspect the images or hover over elements to find the hidden flag. It
          might be hidden there!
        </p>
        <Link to="/final-hint" className="text-blue-400 underline">
          Get the final hint
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ChallengePage;

// Hmmm... looks like you're on the right track. Or maybe you're way off!
// Flag? What flag? We don’t believe in flags here. Flags are so last year.
// Nope, nothing hidden here. Just some good old React components. Keep looking!
// You've come so far, but this isn't the page you're looking for.
// Pro tip: The real challenge is ignoring these comments. They’re just distractions. ;)
