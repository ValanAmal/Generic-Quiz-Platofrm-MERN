// src/components/layout/Leaderboard.tsx
import React, { useState, useEffect } from 'react';
import { fetchLeaderboardData } from '../../services/api/leaderboard';
import { API_URL } from '../../services/api/constant';

interface User {
  id: string;
  name: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetch(`${API_URL}/leaderboard`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const fetchedUsers: User[] = await response.json();
        const sortedUsers = fetchedUsers.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  // Sort users by score based on sortOrder
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
          aria-label={`Sort by Score (${sortOrder === 'desc' ? 'Highest First' : 'Lowest First'})`}
        >
          Sort by Score ({sortOrder === 'desc' ? 'Highest First' : 'Lowest First'})
        </button>
      </div>
      {loading ? ( // Loading state
        <div>Loading...</div>
      ) : (
        <div className="leaderboard-list">
          {sortedUsers.map((user) => (
            <div key={user.id} className="flex justify-between p-4 border-b">
              <span>{user.name}</span>
              <span>{user.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
