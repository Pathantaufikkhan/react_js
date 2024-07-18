import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const usernameToFetch = 'aeishan'; // Replace with the username you want to fetch
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserByUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/user/getuserbyusername/${usernameToFetch}`);
        setUser(response.data.user);
        setError(null); // Reset error if successful fetch
      } catch (error) {
        console.error(`Error fetching user with username ${usernameToFetch}:`, error);
        setError(error.message); // Set error message for rendering
        setUser(null); // Clear user state on error
      }
    };

    fetchUserByUsername();

  }, []); // Ensure it runs only once on component mount

  const deleteUser = async () => {
    if (!user) return; // Ensure user is not null or undefined

    try {
      await axios.delete(`http://localhost:1000/user/deleteuser/${user._id}`);
      setUser(null); // Clear user state after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list-page container mt-5">
      <h3 className="text-center">User Profile</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {user && (
        <div className="user-card p-3 border bg-light text-dark">
          <h5>Username: {user.username}</h5>
          <p>Email: {user.email}</p>
          <button 
            className="btn btn-danger" 
            onClick={deleteUser}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
