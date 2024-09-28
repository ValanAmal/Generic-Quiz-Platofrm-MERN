import React, { useState, useEffect } from "react";
import ChallengeList from "../components/layout/ChallengeList";
import AddChallengeForm from "../components/admin/AddChallengeForm";
import ChallengeFilters from "../components/ui/ChallengeFilters";
import { Challenge } from "../types/types";
import { API_URL } from "../services/api/constant";

const ChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddChallenge, setShowAddChallenge] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Fetch challenges from API on component mount
  useEffect(() => {
    fetch(`${API_URL}/challenges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChallenges(data);
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
      });
  }, []);

  const toggleAdminMode = () => {
    setIsAdmin((prev) => !prev);
  };

  const handleAddChallenge = (
    title: string,
    description: string,
    points: number,
  ) => {
    const newChallenge = {
      title,
      description,
      points, // Include points here
    };

    fetch(`${API_URL}/challenges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChallenge),
    })
      .then((response) => response.json())
      .then((data) => {
        setChallenges((prevChallenges) => [...prevChallenges, data]);
      })
      .catch((error) => {
        console.error("Error adding challenge:", error);
      });
  };

  const handleEditChallenge = (
    id: string,
    updatedTitle: string,
    updatedDescription: string,
    updatedPoints: number,
  ) => {
    const updatedChallenge = {
      title: updatedTitle,
      description: updatedDescription,
      points: updatedPoints, // Include points here
    };

    fetch(`${API_URL}/challenges/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedChallenge),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update challenge");
        }
        return response.json();
      })
      .then(() => {
        setChallenges((prevChallenges) =>
          prevChallenges.map((challenge) =>
            challenge.id === id
              ? {
                  ...challenge,
                  title: updatedTitle,
                  description: updatedDescription,
                  points: updatedPoints, // Update points
                }
              : challenge,
          ),
        );
      })
      .catch((error) => {
        console.error("Error updating challenge:", error);
      });
  };

  const handleDeleteChallenge = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this challenge?",
    );

    if (confirmDelete) {
      fetch(`http://localhost:3001/challenges/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setChallenges((prevChallenges) =>
              prevChallenges.filter((challenge) => challenge.id !== id),
            );
          } else {
            throw new Error("Failed to delete challenge");
          }
        })
        .catch((error) => {
          console.error("Error deleting challenge:", error);
        });
    }
  };

  // Handling reordering due to DND => Drag n Drop
  const handleMoveChallenge = (dragIndex: number, hoverIndex: number) => {
    if (!isAdmin) return;

    const reorderedChallenges = [...challenges];
    const [movedChallenge] = reorderedChallenges.splice(dragIndex, 1);
    reorderedChallenges.splice(hoverIndex, 0, movedChallenge);

    setChallenges(reorderedChallenges);

    // Send the updated order to the backend (JSON file)
    fetch("http://localhost:3001/challenges/reorder", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reorderedChallenges),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reorder challenges");
        }
      })
      .catch((error) => {
        console.error("Error reordering challenges:", error);
      });
  };

  // Function to handle filter changes
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-800 to-gray-600">
      <h1 className="text-2xl font-bold glow-text text-white mb-6">
        Challenges
      </h1>
      {/*<div className="flex justify-end mb-4">
        <button
          onClick={toggleAdminMode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isAdmin ? "Switch to User Mode" : "Switch to Admin Mode"}
        </button>
      </div>*/}

      {isAdmin && (
        <div className="mb-4">
          <button
            onClick={() => setShowAddChallenge((prev) => !prev)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {showAddChallenge ? "Hide Add Challenge Form" : "Add New Challenge"}
          </button>
        </div>
      )}

      {isAdmin && showAddChallenge && (
        <AddChallengeForm onAddChallenge={handleAddChallenge} />
      )}
      {challenges && challenges.length > 0 && (
        <ChallengeList
          challenges={challenges}
          isAdmin={isAdmin}
          onEditChallenge={handleEditChallenge}
          onDeleteChallenge={handleDeleteChallenge}
          onMoveChallenge={isAdmin ? handleMoveChallenge : () => {}} // Add the move challenge function here
        />
      )}
    </div>
  );
};

export default ChallengesPage;
