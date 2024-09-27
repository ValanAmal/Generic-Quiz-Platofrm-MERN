// src/api/challengesApi.ts
import { Challenge } from "../../types/types";
import { API_URL } from "./constant";

export const fetchChallenges = async (): Promise<Challenge[]> => {
  const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token" :localStorage.getItem('token') || ''
      },
});
  if (!response.ok) {
    throw new Error("Failed to fetch challenges");
  }
  const data = await response.json();
  return data;
};

// Function to simulate API call to update a challenge (only in memory in this case)
export const updateChallengeApi = async (
  updatedChallenge: Challenge,
): Promise<Challenge[]> => {
  let challenges = await fetchChallenges();
  challenges = challenges.map((challenge) =>
    challenge.id === updatedChallenge.id ? updatedChallenge : challenge,
  );

  // This would be where you'd make a POST/PUT request to update the data in a real backend.
  // But since we're simulating, we simply return the updated challenges.
  return challenges;
};

// Function to simulate API call to add a new challenge
export const addChallengeApi = async (
  newChallenge: Challenge,
): Promise<Challenge[]> => {
  const challenges = await fetchChallenges();
  challenges.push(newChallenge);

  // In a real API setup, you'd send the data to a server.
  return challenges;
};

// Function to simulate API call to delete a challenge
export const deleteChallengeApi = async (id: string): Promise<Challenge[]> => {
  let challenges = await fetchChallenges();
  challenges = challenges.filter((challenge) => challenge.id !== id);

  // Return the updated challenges after deletion.
  return challenges;
};
