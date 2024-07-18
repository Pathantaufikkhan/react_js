import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/user/adgetuser/${userId}`); // Endpoint to fetch user details by ID
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>; // Display a loading message while fetching user data
  }

  return (
    <div className="user-profile-page container mt-5">
      <h3 className="text-center">User Profile</h3>
      <div className="user-profile">
        <div className="user-card p-3 border bg-light text-dark">
          <h5>Username: {user.username}</h5>
          <p>Email: {user.email}</p>
          {/* Display other user details as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
