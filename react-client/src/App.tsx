import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import ChallengesPage from './pages/ChallengesPage';
import Leaderboard from './components/layout/Leaderboard';
import ChallengePage from './pages/ChallengePage';
import EditChallengePage from './pages/EditChallengePage';
import { useChallenges } from './hooks/useChallenges';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { challenges, updateChallenge } = useChallenges();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setAuthChecked(true);
    };
    checkAuthStatus();
  }, []);

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  if (!authChecked) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated}/>}
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <MainPage /> : <Navigate to="/auth" />} 
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/challenges" 
            element={isAuthenticated ? <ChallengesPage /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/challenges/:id" 
            element={isAuthenticated ? <ChallengePage /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/challenges/edit/:id" 
            element={
              isAuthenticated ? (
                <EditChallengePage 
                  challenges={challenges} 
                  onUpdateChallenge={updateChallenge} 
                />
              ) : (
                <Navigate to="/auth" />
              )
            } 
          />
          <Route 
            path="/leader" 
            element={isAuthenticated ? <Leaderboard /> : <Navigate to="/auth" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;