// src/components/layout/Leaderboard.tsx
import React, { useState, useEffect } from 'react';
import { fetchLeaderboardData } from '../../services/api/leaderboard';

interface User {
  id: number;
  name: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Sort order: ascending or descending

  useEffect(() => {
    // Fetch leaderboard data
    fetchLeaderboardData().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  // Sort users by score
  const sortedUsers = [...users].sort((a, b) => {
    return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Leaderboard</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          className="bg-blue-500 text-white p-2"
        >
          Sort by Score ({sortOrder === 'desc' ? 'Highest First' : 'Lowest First'})
        </button>
      </div>
      <div className="leaderboard-list">
        {sortedUsers.map((user) => (
          <div key={user.id} className="flex justify-between p-4 border-b">
            <span>{user.name}</span>
            <span>{user.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
