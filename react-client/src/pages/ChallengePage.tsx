import React, { useState, useEffect, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Challenge } from "../types/types";
import { API_URL } from "../services/api/constant";

const ChallengePage: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flag, setFlag] = useState<string>('');
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`${API_URL}/challenges/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
            'token': localStorage.getItem('token') || ''
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch challenge');
        }
        const data = await response.json();
        setChallenge(data);
      } catch (err) {
        setError('Error fetching challenge data');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleFlagSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset previous status

    try {
      const response = await fetch(`${API_URL}/verify/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({ flag })
      });

      if (!response.ok) {
        throw new Error('Failed to submit flag');
      }

      const result = await response.json();
      alert('Flag submitted successfully!');
      navigate(-1)
    } catch (err) {
      setSubmissionStatus('Wrong flag');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!challenge) return <div>Challenge not found</div>;

  return (
    <div className="h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
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