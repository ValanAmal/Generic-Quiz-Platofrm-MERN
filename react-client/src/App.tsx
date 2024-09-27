// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import ChallengesPage from "./pages/ChallengesPage";
import Leaderboard from "./components/layout/Leaderboard";
import ChallengePage from "./pages/ChallengePage"; // Corrected the import path
import EditChallengePage from "./pages/EditChallengePage";
import { useChallenges } from "./hooks/useChallenges";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { challenges, updateChallenge } = useChallenges(); // Using the custom hook

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/challenges/:id" element={<ChallengePage />} />
          <Route
            path="/challenges/edit/:id"
            element={
              <EditChallengePage
                challenges={challenges}
                onUpdateChallenge={updateChallenge}
              />
            }
          />
          <Route path="/leader" element={<Leaderboard />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
