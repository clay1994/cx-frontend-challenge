import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import ProtectedRoute1 from './components/ProtectedRoute1';
import ProtectedRoute2 from './components/ProtectedRoute2';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleAssumption from './components/RoleAssumption';
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <RoleAssumption />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route
            path="/protected1"
            element={
                <ProtectedRoute1 />
            }
          />
          <Route
            path="/protected2"
            element={
                <ProtectedRoute2 />
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
