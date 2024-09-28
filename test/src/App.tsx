import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ChallengePage from "./pages/ChallengePage";
import FinalHintPage from "./pages/FinalHintPage";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/*Fragment 3: _th3_flag_in_pla1n*/}
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/final-hint" element={<FinalHintPage />} />
      </Routes>
    </Router>
  );
};

export default App;
