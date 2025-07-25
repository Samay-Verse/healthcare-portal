import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import Dashboard from './pages/Dashboard/Dashboard'; // Import the new Dashboard component
import './App.css'; // Your global CSS

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the authentication page (login/signup) */}
          <Route path="/" element={<AuthPage />} />
          {/* Route for the dashboard page, accessible after login */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* You can add more routes here as your application grows */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
