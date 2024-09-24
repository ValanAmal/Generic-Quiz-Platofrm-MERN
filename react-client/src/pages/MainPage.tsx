// MainPage.tsx
import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-800">Welcome to the CTF Platform</h1>
      <p className="mt-4 text-xl text-gray-600">Explore our challenges and more!</p>

      {/* You can add additional components or content here */}
    </div>
  );
};

export default MainPage;
