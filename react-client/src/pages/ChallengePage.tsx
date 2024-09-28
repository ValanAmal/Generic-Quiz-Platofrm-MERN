import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChallengePage: React.FC = () => {
  const location = useLocation();
  const { challenge } = location.state || {};
  const navigate = useNavigate();

  const handleFlagSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle flag submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6 max-w-lg w-full">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          BACK
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">
          {challenge.title}
        </h1>
        <p className="text-white mb-4">{challenge.description}</p>
        <form onSubmit={handleFlagSubmission} className="mt-4">
          <input
            type="text"
            placeholder="Enter your flag"
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:glow-button text-white p-2 mt-2 w-full rounded"
          >
            Submit Flag
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChallengePage;
