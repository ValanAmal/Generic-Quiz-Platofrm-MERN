// src/services/api/leaderboard.ts
// User interface
interface User {
  id: string;
  name: string;
  score: number;
}

// Simulate fetching users for the leaderboard
export const fetchLeaderboardData = (): Promise<User[]> => {
  return new Promise((resolve) => {
    const storedUsers = localStorage.getItem("leaderboard");
    const users = storedUsers
      ? JSON.parse(storedUsers)
      : [
          { id: 1, name: "Alice", score: 90 },
          { id: 2, name: "Bob", score: 80 },
          { id: 3, name: "Charlie", score: 95 },
          { id: 4, name: "Dave", score: 70 },
        ];
    setTimeout(() => resolve(users), 500); // Simulate delay
  });
};

// Simulate saving users to leaderboard (localStorage)
const saveLeaderboardData = (users: User[]): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.setItem("leaderboard", JSON.stringify(users));
    setTimeout(() => resolve(), 500); // Simulate delay
  });
};
