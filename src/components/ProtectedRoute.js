import React, { useContext } from 'react';
import { Route, Navigate  } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ component: Component, permission, ...rest }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        currentUser && currentUser.permissions[permission] ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;