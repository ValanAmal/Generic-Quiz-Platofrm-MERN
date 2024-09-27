// MainPage.tsx
import React from "react";

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-600">
      <h1 className="text-5xl font-bold text-white glow-text">
        Welcome to the Capture The Throne
      </h1>
      <p className="mt-4 text-xl text-white glow-text">
        Explore our challenges and more!
      </p>

      {/* You can add additional components or content here */}
    </div>
  );
};

export default MainPage;
