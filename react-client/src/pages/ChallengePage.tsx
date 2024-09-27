import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        BACK
      </button>
      <h1 className="text-xl font-bold">{challenge.title}</h1>
      {challenge.image && (
        <img src={challenge.image} alt="Challenge" className="my-4" />
      )}
      <p>{challenge.description}</p>
      <p>Points: {challenge.points}</p>
      <form onSubmit={handleFlagSubmission} className="mt-4">
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
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
      {submissionStatus && <div className="mt-4">{submissionStatus}</div>}
    </div>
  );
};

export default ChallengePage;
