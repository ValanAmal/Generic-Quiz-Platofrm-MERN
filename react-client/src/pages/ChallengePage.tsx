import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const ChallengePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve challenge object from location state
  const { challenge } = location.state || {};

  useEffect(() => {
    // If there's no challenge data, navigate back or display a message
    if (!challenge) {
      navigate(1); // Redirect back if no challenge data is present
    }
  }, [challenge, navigate]);

  const handleFlagSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle flag submission logic here
  };

  // Handling local and remote file downloads
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  // Sample files
  const localFileUrl = "/sample.pdf";
  const remoteFileUrl = "https://example.com/sample.pdf";
  // Toggle between local and remote files
  const toggleFileSource = () => {
    setFileUrl((prevUrl) =>
      prevUrl === localFileUrl ? remoteFileUrl : localFileUrl,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div
          className="flex items-center text-white font-bold cursor-pointer"
          onClick={() => navigate(-1)} // Go back one page on click
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          <span className="hover:glow-text">Back</span>
        </div>
        <br></br>
        {challenge ? (
          <>
            <h1 className="text-2xl font-bold text-white mb-2">
              {challenge.title}
            </h1>
            {challenge.imageUrl && (
              <img
                src={challenge.imageUrl}
                alt="Challenge"
                className="my-4 rounded-lg shadow-md"
              />
            )}
            <p className="text-white mb-4">{challenge.description}</p>
          </>
        ) : (
          <p className="text-white">Challenge not found. Please try again.</p>
        )}

        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Download File</h2>
          <button
            onClick={toggleFileSource}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            {fileUrl === localFileUrl
              ? "Switch to Remote File"
              : "Switch to Local File"}
          </button>

          {fileUrl && (
            <a
              href={fileUrl}
              download
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Download File
            </a>
          )}
        </div>
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
