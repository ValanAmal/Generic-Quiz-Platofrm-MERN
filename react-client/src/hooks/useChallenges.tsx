// src/hooks/useChallenges.tsx
import { useState, useEffect } from "react";
import {
  fetchChallenges,
  updateChallengeApi,
} from "../services/api/challengesApi"; // Import API functions
import { Challenge } from "../types/types"; // Define Challenge type

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Fetch challenges from the JSON file
    const loadChallenges = async () => {
      try {
        const data = await fetchChallenges();
        setChallenges(data);
      } catch (error) {
      }
    };

    loadChallenges();
  }, []);

  const updateChallenge = async (updatedChallenge: Challenge) => {
    try {
      const updatedChallenges = await updateChallengeApi(updatedChallenge);
      setChallenges(updatedChallenges);
    } catch (error) {
    }
  };

  return { challenges, updateChallenge };
};
