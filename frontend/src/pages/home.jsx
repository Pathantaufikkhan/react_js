import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css'; // Import the CSS file

const Home = () => {
  const images = [
    'https://wallpaper.forfun.com/fetch/cc/cc96eb2d8bd19c73ba167f481bb72d62.jpeg?h=900&r=0.5',
    'https://w0.peakpx.com/wallpaper/198/283/HD-wallpaper-minato-neon-naruto-black-shippuden-simple-hokage-anime.jpg',
    'https://wallpaper.forfun.com/fetch/92/92ccd7f38ee1403885bb080fa0801723.jpeg?h=900&r=0.5',
    'https://w0.peakpx.com/wallpaper/519/311/HD-wallpaper-tokyo-manji-gang-tokyo-revengers-manjiro-anime-tokyo-revengers-tokyo-revengers-art-anime-fan-art-takemichi-anime-art-anime-edits-draken-trk-mikey-thumbnail.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:1000/user/adgetuser');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="home-page bg-dark text-white container-fluid d-flex justify-content-center align-items-center">
      <div className="row container">
        <div className="col-lg-6 d-flex justify-content-center align-items-start flex-column" style={{ height: "91.5vh" }}>
          <h2 style={{ fontSize: "80px" }}>MANGA STORE</h2>
          <h3 style={{ fontSize: "50px" }}>FOR YOU</h3>
          <p className='mb-0' style={{ color: "silver" }}>CHECK OUT THE MANGA FROM HERE</p>
          <Link to="/books" className='viewbook my-3'>View Mangas</Link>
        </div>
        <div className="col-lg-6 d-flex justify-content-center align-items-end flex-column" style={{ height: "91.5vh" }}>
          <img 
            className='img' 
            src={images[currentImageIndex]} 
            alt='Book Store'
          />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
