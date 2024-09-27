import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

const ChallengePage: React.FC = () => {
  const location = useLocation();
  const { challenge } = location.state || {};
  const navigate = useNavigate();
  
  const handleFlagSubmission = (e: React.FormEvent) => {
    
  };

  // Handeling local and remote file downloads
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  // sample files
  const localFileUrl = "/sample.pdf";
  const remoteFileUrl = "https://example.com/sample.pdf";
  // Toggle between local and remote files
  const toggleFileSource = () => {
    setFileUrl((prevUrl) =>
      prevUrl === localFileUrl ? remoteFileUrl : localFileUrl,
    );
  };

  return (
    <div className="p-6">
        <button
          onClick={()=>{navigate(-1)}}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          BACK
        </button>
      <h1 className="text-xl font-bold">{challenge.title}</h1>
      {challenge.imageUrl && (
        <img src={challenge.imageUrl} alt="Challenge" className="my-4" />
      )}
      <p>{challenge.description}</p> {/* Fetching from the json */}
      {/*
      TODO:
      1) Including a downloadable link
      2) Handeling the links in a json file
      3) Image loading api calls
      */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Download File</h1>
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
      {/* Flag submission interface 
      Remember to add the API logic ->
      server returns boolean value - point updates */}
      <form onSubmit={handleFlagSubmission} className="mt-4">
        <input
          type="text"
          placeholder="Enter your flag"
          className="border p-2 w-full"
          required
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2" 
        >
          Submit Flag
        </button>
      </form>
    </div>
  );
};

export default ChallengePage;
