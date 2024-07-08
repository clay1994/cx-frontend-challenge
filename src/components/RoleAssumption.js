import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom';

const RoleAssumption = () => {
  const { users, setUsers, setCurrentUser } = useContext(UserContext);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      setAdmin(users.find(user => user.role === 'Admin'));
      setCurrentUser(users.find(user => user.role === 'Admin'));
    }
  }, [users]);

  const assumeRole = (user) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      const adminIndex = updatedUsers.findIndex(user => user.id === admin.id);
      const userIndex = updatedUsers.findIndex(u => u.id === user.id);

      if (adminIndex !== -1 && userIndex !== -1) {
        const admin = updatedUsers[adminIndex];
        const user = updatedUsers[userIndex];

        // Swap roles
        const tempRole = admin.role;
        admin.role = user.role;
        user.role = tempRole;

        alert(`${admin.name} has assumed the role of ${user.name}`);
        setCurrentUser(users.find(user => user.role === 'Admin'));
      };
      return updatedUsers;
    })
  };

  if (!admin) {
    return <p>Loading...</p>;
  }

  return (
    <>
        {/* as an improvement we can get rid of inline styles and create seperate css files for each component */}
        <nav style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#f8f9fa', padding: '1rem' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
        <Link to="/protected1" style={{ margin: '0 1rem' }}>Protected1</Link>
        <Link to="/protected2" style={{ margin: '0 1rem' }}>Protected2</Link>
      </nav>

      <h2>Assume Role</h2>

      <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <button onClick={() => assumeRole(user)}>Assume Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default RoleAssumption;
