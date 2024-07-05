import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Users = () => {
  const { users, setUsers, currentUser } = useContext(UserContext);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = (user) => {
    const userId = user.id;
    alert(`${user.name} has been deleted`);
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <>
      <h1>Users</h1>
      <button className="btn btn-success btn-sm mr-2 add-user-btn" onClick={() => handleEdit()}>Add User</button>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit User {currentUser}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user)}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
