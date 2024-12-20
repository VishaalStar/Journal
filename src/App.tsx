import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from '@/pages/Background';
import Home from '@/pages/Home';
import Profile from "@/pages/Profile";
import { SignupFormDemo } from '@/pages/SignupForm';
import Settings from './pages/Settings';
import JournalForm from './pages/Journal';
import MapUI from './pages/MapUI';

const App: React.FC = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Background />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<SignupFormDemo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/journal" element={<JournalForm />} />
        <Route path="/map" element={<MapUI />} />

      </Routes>
    </Router>
  );
};

export default App;
  