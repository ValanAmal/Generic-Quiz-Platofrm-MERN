// src/components/layout/ChallengeCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Challenge {
  id: number;
  title: string;
  description: string;
  images?: string[];
}

interface ChallengeCardProps {
  challenge: Challenge;
  isAdmin: boolean;
  onEditChallenge: (id: number, updatedTitle: string, updatedDescription: string) => void;
  onDeleteChallenge: (id: number) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  isAdmin,
  onEditChallenge,
  onDeleteChallenge,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState(challenge.title);
  const [editDescription, setEditDescription] = useState(challenge.description);

  const handleSaveClick = () => {
    onEditChallenge(challenge.id, editTitle, editDescription);
    setEditMode(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {editMode ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <Link to={`/challenges/${challenge.id}`}>
            <h2 className="text-xl font-bold">{challenge.title}</h2>
            <p>{challenge.description}</p>
          </Link>
          {isAdmin && (
            <div className="mt-2">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteChallenge(challenge.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
