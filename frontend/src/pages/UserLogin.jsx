import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserLOgin.css';

function UserLogin({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const images = [
    'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/death-note-chromebook-wallpaper.jpg',
    'https://c4.wallpaperflare.com/wallpaper/865/301/276/anime-solo-leveling-sung-jin-woo-hd-wallpaper-preview.jpg',
    'https://images8.alphacoders.com/505/505616.png'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:1000/user/login', {
        username,
        password
      });
  
      if (response.status === 200) {
        alert('Login successful');
        setIsAuthenticated(true);
        navigate('/user/userhome'); // Correct path
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of 2xx
        if (error.response.status === 401) {
          alert('Invalid credentials');
        } else {
          alert('Server error: ' + error.response.data.message);
          console.error('Server error:', error.response.data);
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response from server. Check your network connection.');
        console.error('Request error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        alert('Error setting up the request: ' + error.message);
        console.error('Request setup error:', error.message);
      }
    }
  };

  return (
    <div className="login-container text-white" style={{ backgroundImage: `url(${images[currentImage]})` }}>
      <div className="login-box">
        <h1>User Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit">Login</button>
          <div className='p-3'>
        <button>    <Link  to="/user/register"><b>Didn't Registered yet?</b></Link></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
