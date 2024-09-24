// pages/AuthPage.tsx
import React from 'react';
import AuthForm from '../components/layout/AuthForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-4/5 max-w-4xl">
        {/* Login Form */}
        <div className="flex-1 p-10 bg-white">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Login</h2>
          <AuthForm />
        </div>

        {/* Image Side (Optional) */}
        <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-500 p-8">
          <img
            src="path-to-your-image.jpg"
            alt="Login visual"
            className="object-cover h-full w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
