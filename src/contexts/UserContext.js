import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // I assume first user as an admin for this system since we don't have a login.
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const usersWithRoles = response.data.map(user => ({
          ...user,
          role: user.id === 1 ? 'Admin' : 'Staff', // Assign first user as 'Admin'
          permissions: {
            CanCreateUser: user.id === 1,
            CanReadUser: true,
            CanUpdateUser: user.id === 1,
            CanDeleteUser: user.id === 1,
            CanViewProtectedRoute1: user.id === 1 || user.id === 2,
            CanViewProtectedRoute2: user.id === 1 || user.id === 3
          }
        }));
        setUsers(usersWithRoles);
      });
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};