import React, { useEffect, useState } from "react";
import AuthPage from "./Pages/AuthPage";
import Home from "./Pages/Home";
import GetStartedCandidate from "./Pages/GetStartedCandidate";
import GetStartedExpert from "./Pages/GetStartedExpert";
import Profile from "./Pages/Profile";
import ExpertProfile from "./Pages/ExpertProfile";
import ExpertDashboard from "./Pages/ExpertDashboard";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import AdminDashboard from "./Components/AdminDashboard";
import Navbar from "./Components/Navbar";

const App = () => {
  const [loading,setLoading] = useState(true);
    useEffect(()=>{
        setLoading(false);
    },[]);
    const {user} = useAuthContext();
  return (
    <div>
      
      {
        !loading &&
        <Router>
          <Navbar />
          {/* <ExpertProfile /> */}
          <Routes>
            <Route path="/" element={!(user && user.role==="Admin")?<Home />:<Navigate to = "/admindashboard" />} />
            <Route path="/expertdashboard" element={(user && user.role==="Expert")?<ExpertDashboard />:<Navigate to = "/" />} />
            <Route path="/getstartedcandidate" element={user?<GetStartedCandidate />:<Navigate to = "/" />} />
            <Route path="/getstartedexpert" element={user?<GetStartedExpert />:<Navigate to = "/" />} />
            <Route path="/auth/login" element={!user?<AuthPage initialLogin={true} />:user.role==="Admin"?<Navigate to = "/admindashboard" />:<Navigate to = "/" />} />
            <Route path="/auth/signup" element={!user?<AuthPage initialLogin={false} />:<Navigate to = "/" />} />
            <Route path="/admindashboard" element={(user && user.role==="Admin")?<AdminDashboard />:<Navigate to = "/" />} />
          </Routes>
        </Router>
      }
    </div>
  );
};
export default App;

