import React from "react";
import AuthPage from "./Pages/AuthPage";
import Home from "./Pages/Home";
import GetStartedCandidate from "./Pages/GetStartedCandidate";
import Profile from "./Pages/Profile";
import ExpertDashboard from "./Pages/ExpertDashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/getstartedcandidate" element={<GetStartedCandidate />} />
          <Route path="/auth/login" element={<AuthPage initialLogin={true} />} />
          <Route path="/auth/signin" element={<AuthPage initialLogin={false}  />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

