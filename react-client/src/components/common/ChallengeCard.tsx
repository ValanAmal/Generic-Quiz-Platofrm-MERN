// src/components/layout/ChallengeCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Challenge } from "../../types/types";

interface ChallengeCardProps {
  challenge: Challenge;
  isAdmin: boolean;
  onEditChallenge: (
    id: string,
    updatedTitle: string,
    updatedDescription: string,
    updatedPoints: number,
  ) => void;
  onDeleteChallenge: (id: string) => void;
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
  const [editPoints, setEditPoints] = useState(challenge.points);

  const handleSaveClick = () => {
    onEditChallenge(challenge.id, editTitle, editDescription, editPoints);
    setEditMode(false);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(challenge)
    navigate(`/challenges/${challenge.title}`, { state: { challenge } });
  };
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {editMode ? (
        <div>
          {/* Editable Title */}
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          {/* Editable Discription */}
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          {/* Editable Point */}
          <input
            type="number"
            value={editPoints}
            onChange={(e) => setEditPoints(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg mb-2"
            placeholder="Points"
          />
          {/* Save and Cancel button */}
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
           <div onClick={handleClick}>
            <h2 className="text-xl font-bold">{challenge.title}</h2>
            <p>{challenge.description}</p>
            <p>points: {challenge.points}</p>
          </div>
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
