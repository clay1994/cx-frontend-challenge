import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

const Users = () => {
  const { users, setUsers } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAdd = () => {
    console.log(users);
    setIsEditing(true);
    setCurrentUser(null);
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleDelete = (user) => {
    const userId = user.id;
    alert(`${user.name} has been deleted`);
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      id: currentUser ? currentUser.id : users.length + 1,
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      address: {
        street: formData.get('street'),
        suite: formData.get('suite'),
        city: formData.get('city'),
        zipcode: formData.get('zipcode'),
        geo: {
          lat: formData.get('lat'),
          lng: formData.get('lng')
        }
      },
      phone: formData.get('phone'),
      website: formData.get('website'),
      company: {
        name: formData.get('companyName'),
        catchPhrase: formData.get('catchPhrase'),
        bs: formData.get('bs')
      },
      role: formData.get('role'),
      permissions: {
        CanCreateUser: formData.get('CanCreateUser') === 'on',
        CanReadUser: formData.get('CanReadUser') === 'on',
        CanUpdateUser: formData.get('CanUpdateUser') === 'on',
        CanDeleteUser: formData.get('CanDeleteUser') === 'on',
        CanViewProtectedRoute1: formData.get('CanViewProtectedRoute1') === 'on',
        CanViewProtectedRoute2: formData.get('CanViewProtectedRoute2') === 'on'
      }
    };

    if (currentUser) {
      // Update existing user
      const updatedUsers = users.map(u => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
    } else {
      // Add new user
      setUsers([...users, user]);
    }

    setIsEditing(false);
  };

  return (
    <>
      <h1>Users</h1>
      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
          <h2>{currentUser ? 'Edit User' : 'Add User'}</h2>
          <div className="form-group">
            <label>Name:</label>
            <input name="name" defaultValue={currentUser ? currentUser.name : ''} />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input name="username" defaultValue={currentUser ? currentUser.username : ''} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input name="email" defaultValue={currentUser ? currentUser.email : ''} />
          </div>
          <div className="form-group">
            <label>Street:</label>
            <input name="street" defaultValue={currentUser ? currentUser.address.street : ''} />
          </div>
          <div className="form-group">
            <label>Suite:</label>
            <input name="suite" defaultValue={currentUser ? currentUser.address.suite : ''} />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input name="city" defaultValue={currentUser ? currentUser.address.city : ''} />
          </div>
          <div className="form-group">
            <label>Zipcode:</label>
            <input name="zipcode" defaultValue={currentUser ? currentUser.address.zipcode : ''} />
          </div>
          <div className="form-group">
            <label>Lat:</label>
            <input name="lat" defaultValue={currentUser ? currentUser.address.geo.lat : ''} />
          </div>
          <div className="form-group">
            <label>Lng:</label>
            <input name="lng" defaultValue={currentUser ? currentUser.address.geo.lng : ''} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input name="phone" defaultValue={currentUser ? currentUser.phone : ''} />
          </div>
          <div className="form-group">
            <label>Website:</label>
            <input name="website" defaultValue={currentUser ? currentUser.website : ''} />
          </div>
          <div className="form-group">
            <label>Company Name:</label>
            <input name="companyName" defaultValue={currentUser ? currentUser.company.name : ''} />
          </div>
          <div className="form-group">
            <label>CatchPhrase:</label>
            <input name="catchPhrase" defaultValue={currentUser ? currentUser.company.catchPhrase : ''} />
          </div>
          <div className="form-group">
            <label>BS:</label>
            <input name="bs" defaultValue={currentUser ? currentUser.company.bs : ''} />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input name="role" defaultValue={currentUser ? currentUser.role : ''} />
          </div>
          <div className="form-checkbox">
            <label>Permissions:</label>
            <div>
              <label>
                <input type="checkbox" name="CanCreateUser" defaultChecked={currentUser ? currentUser.permissions.CanCreateUser : false} /> Can Create User
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="CanReadUser" defaultChecked={currentUser ? currentUser.permissions.CanReadUser : false} /> Can Read User
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="CanUpdateUser" defaultChecked={currentUser ? currentUser.permissions.CanUpdateUser : false} /> Can Update User
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="CanDeleteUser" defaultChecked={currentUser ? currentUser.permissions.CanDeleteUser : false} /> Can Delete User
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="CanViewProtectedRoute1" defaultChecked={currentUser ? currentUser.permissions.CanViewProtectedRoute1 : false} /> Can View Protected Route 1
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="CanViewProtectedRoute2" defaultChecked={currentUser ? currentUser.permissions.CanViewProtectedRoute2 : false} /> Can View Protected Route 2
              </label>
            </div>
          </div>
          <button className='form-btn' type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <button className="btn btn-success btn-sm mr-2 add-user-btn" onClick={handleAdd}>Add User</button>
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
                        onClick={() => handleEdit(user)}
                      >
                        Edit User
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
      )}
    </>
  );
};

export default Users;
