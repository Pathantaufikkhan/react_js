import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/register.css';

const RegistrationForm = () => {
  const [userdata, setUserdata] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (userdata.password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:1000/user/useradd', userdata);
      alert(response.data.message);
      setUserdata({
        username: '',
        password: '',
        email: '',
      });
      setConfirmPassword('');
      // Redirect to login page
      navigate('/user/userlogin');
    } catch (error) {
      if (error.response && error.response.data.message === 'User already exists') {
        alert('User already exists');
      } else {
        alert('There was an error adding the user. Please try again later.');
        console.error('There was an error adding the user!', error.response.data.error);
      }
    }
  };

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <section className="registration-section">
      <div className="registration-form">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userdata.username}
              onChange={change}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userdata.email}
              onChange={change}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userdata.password}
              onChange={change}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
      <audio
        ref={audioRef}
        src="https://winifone.com/wp-content/uploads/2023/12/You-Are-My-Special-Jujutsu-Kaisen-Song.mp3"
        loop
      >
        Your browser does not support the audio element.
      </audio>
    </section>
  );
};

export default RegistrationForm;
