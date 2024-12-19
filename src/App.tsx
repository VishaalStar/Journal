import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from '@/pages/Background';
import Home from '@/pages/Home';
import { SignupFormDemo } from '@/pages/SignupForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Background />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignupFormDemo />} /> {/* Signup route */}
      </Routes>
    </Router>
  );
};

export default App;
