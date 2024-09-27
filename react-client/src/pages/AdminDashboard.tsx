// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import ChallengeList from "../components/layout/ChallengeList";
import AdminChallengeCustomization from "../components/admin/AdminChallengeCustomization";
import { Challenge } from "../types/types";
import { DropResult } from "react-beautiful-dnd"; // Import DropResult

const fetchChallenges = (): Promise<Challenge[]> => {
  return new Promise((resolve) => {
    const storedChallenges = localStorage.getItem("challenges");
    const challenges = storedChallenges
      ? JSON.parse(storedChallenges)
      : [
          {
            id: 1,
            title: "Challenge 1",
            description: "Description of challenge 1",
          },
          {
            id: 2,
            title: "Challenge 2",
            description: "Description of challenge 2",
          },
          {
            id: 3,
            title: "Challenge 3",
            description: "Description of challenge 3",
          },
        ];
    setTimeout(() => resolve(challenges), 500); // Simulate delay
  });
};

const saveChallenges = (challenges: Challenge[]): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
    setTimeout(() => resolve(), 500); // Simulate delay
  });
};

const AdminDashboard: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch challenges from "API" (localStorage in this case)
    fetchChallenges().then((challenges) => setChallenges(challenges));
  }, []);

  const editChallenge = (id: string) => {
    const challengeToEdit = challenges.find((challenge) => challenge.id === id);
    if (challengeToEdit) {
      setSelectedChallenge(challengeToEdit);
      setIsEditing(true);
    }
  };

  const deleteChallenge = (id: string) => {
    const updatedChallenges = challenges.filter(
      (challenge) => challenge.id !== id,
    );
    saveChallenges(updatedChallenges).then(() => {
      setChallenges(updatedChallenges);
    });
  };

  const handleUpdateChallenge = (updatedChallenge: Challenge) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === updatedChallenge.id ? updatedChallenge : challenge,
    );
    saveChallenges(updatedChallenges).then(() => {
      setChallenges(updatedChallenges);
      setIsEditing(false);
      setSelectedChallenge(null);
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedChallenge(null);
  };

  const handleMoveChallenge = (dragIndex: number, hoverIndex: number) => {
    const updatedChallenges = [...challenges];
    const [movedChallenge] = updatedChallenges.splice(dragIndex, 1); // Remove the dragged item
    updatedChallenges.splice(hoverIndex, 0, movedChallenge); // Insert it at the hover index
    setChallenges(updatedChallenges); // Update the state
  };

  return (
    <div className="p-6">
      {isEditing && selectedChallenge ? (
        <AdminChallengeCustomization
          challenge={selectedChallenge}
          onUpdate={handleUpdateChallenge}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ChallengeList
          challenges={challenges}
          isAdmin={true}
          onMoveChallenge={handleMoveChallenge}
          onEditChallenge={editChallenge}
          onDeleteChallenge={deleteChallenge}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
