import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// Here's a hint: it's not here. Or maybe it is. Nah, it’s not.
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Why would anyone hide a flag in the About page? It’s just about us… or is it?
       */}
      <Header />
      <div
        className="flex-grow flex flex-col items-center justify-center text-center"
        id="You’re wasting your time reading these comments. There’s no flag here. Trust me!
"
      >
        <BackButton />
        <h1 className="text-3xl font-bold mb-4">About the Hidden Flag</h1>
        <p
          className="mb-4"
          id="Maybe the flag is here… maybe it’s not. Who knows? ¯\_(ツ)_/¯"
        >
          The flag might be hidden inside an image or at the footer of the page.
          Check carefully!
        </p>
        <Link to="/challenge" className="text-blue-400 underline">
          Proceed to the Challenge page
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;

// The real question is, how well do you read between the lines? :)
