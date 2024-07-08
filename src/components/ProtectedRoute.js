import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ element: Element, permission, ...rest }) => {
  const { currentUser } = useContext(UserContext);

  console.log('current user');
  console.log(currentUser);

  return currentUser && currentUser.permissions[permission] ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
