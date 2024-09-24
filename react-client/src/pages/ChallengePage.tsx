import React from 'react';
import { useParams } from 'react-router-dom';

interface Challenge {
  id: number;
  title: string;
  description: string;
  imageUrl?: string; // If image (optional)
}

const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Simulate fetching challenge data (replace with actual API call)
  const challenge: Challenge = {
    id: Number(id),
    title: `Challenge ${id}`,
    description: 'This is a challenge description.',
    imageUrl: 'path/to/image.jpg', // Add image path (from db)
  };

  const handleFlagSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle flag submission
    alert('Flag submitted!');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{challenge.title}</h1>
      {challenge.imageUrl && <img src={challenge.imageUrl} alt="Challenge" className="my-4" />}
      <p>{challenge.description}</p> {/* Fetching from the json */}

      {/*
      -- Todo:
      1) Including a downloadable link
      2) Handeling the links in a json file
      3) Image loading api calls
      */}

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
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Submit Flag</button>
      </form>
    </div>
  );
};

export default ChallengePage;
