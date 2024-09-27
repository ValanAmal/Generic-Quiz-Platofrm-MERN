import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api/constant';

interface User {
  userId: string; // Change to userId to match your API response
  email: string;  // Assuming you're fetching the email from your API
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
        setUsers(fetchedUsers); // Store fetched users directly
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const filteredAndSortedUsers = [...users]
    .filter(user => user.score > 0) // Filter out users with score of zero
    .sort((a, b) => {
      return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
    });
  // Sort users by score based on sortOrder
  return (
    <div className="p-6 h-screen bg-gradient-to-br from-gray-800 to-gray-600">
      <h2 className="text-xl font-bold glow-text text-white">Leaderboard</h2>
      <br />
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          className="bg-blue-500 text-white p-2"
          aria-label={`Sort by Score (${sortOrder === 'desc' ? 'Highest First' : 'Lowest First'})`}
        >
          Sort by Score (
          {sortOrder === "desc" ? "Highest First" : "Lowest First"})
        </button>
      </div>
      {loading ? ( // Loading state
        <div>Loading...</div>
      ) : (
        <div className="leaderboard-list">
          {filteredAndSortedUsers.map((user) => (
            <div
            key={user.userId}
            className="bg-white/30 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-2 shadow-lg"
          >
            <div className="flex justify-between text-white">
                <span className="font-semibold">{user.email}</span> {/* Displaying email instead of name */}
                <span>{user.score}</span>
              </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
