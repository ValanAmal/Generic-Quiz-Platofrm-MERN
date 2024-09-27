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

  const navigate = useNavigate();

  const handleSaveClick = (): void => {
    onEditChallenge(challenge.id, editTitle, editDescription, editPoints);
    setEditMode(false);
  };

  const handleClick = (): void => {
    console.log(challenge._id);
    navigate(`/challenges/${challenge._id}`);
  };

  return (
    <div
      className="bg-white/30 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg 
                 max-w-full mx-auto transition-transform transform hover:scale-105 hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.4)] 
                 duration-300 ease-in-out"
    >
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
          <input
            type="number"
            value={editPoints}
            onChange={(e) => setEditPoints(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg mb-2"
            placeholder="Points"
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
          <div onClick={handleClick}>
            <h2 className="text-xl text-slate-300 font-bold">
              {challenge.title}
            </h2>
            <p className="text-slate-300">{challenge.description}</p>
            <p className="text-slate-300">Points: {challenge.points}</p>
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

