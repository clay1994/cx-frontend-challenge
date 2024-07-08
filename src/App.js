import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './contexts/UserContext';
import RoleAssumption from './components/RoleAssumption';
import ProtectedRoute1 from './components/ProtectedRoute1';
import ProtectedRoute2 from './components/ProtectedRoute2';
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
              <ProtectedRoute element={ProtectedRoute1} permission="CanViewProtectedRoute1" />
            }
          />
          <Route
            path="/protected2"
            element={
              <ProtectedRoute element={ProtectedRoute2} permission="CanViewProtectedRoute2" />
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
