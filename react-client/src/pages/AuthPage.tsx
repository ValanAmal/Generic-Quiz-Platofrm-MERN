// src/pages/AuthPage.tsx
import React from "react";
import AuthForm from "../components/layout/AuthForm";
import throneImage from "../assets/AuthPage/throne_img.png"; // Import the image

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Login Form */}
        <div className="flex-1 p-8 bg-gray-800 md:p-10">
          <h1 className="text-2xl font-semibold text-white text-center mb-6 glow-text">
            Xplore 2k24
          </h1>
          <h2 className="text-4xl font-semibold text-white text-center mb-6 glow-text">
            Capture The Throne
          </h2>
          <AuthForm />
        </div>

        {/* Image Side */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-gray-800 to-gray-600 p-8">
          <img
            src={throneImage}
            alt="Login visual"
            className="object-cover h-full w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
