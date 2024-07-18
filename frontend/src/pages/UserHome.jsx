import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserHome.css'; // Import the CSS file



const UserHome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCarouselClick = () => {
    navigate('/user/userbook');
  };

  const handleGoToMangas = () => {
    navigate('/user/userbook');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:1000/book/getbooks');
        setData(res.data.books);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-home-container bg-dark text-white">
      <h2 className="user-home-heading text-white">UserHome</h2>
   

   
      <Carousel>
        <Carousel.Item onClick={handleCarouselClick}>
          <img
            className="d-block carousel-img"
            src="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/death-note-chromebook-wallpaper.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={handleCarouselClick}>
          <img
            className="d-block carousel-img"
            src="https://c4.wallpaperflare.com/wallpaper/865/301/276/anime-solo-leveling-sung-jin-woo-hd-wallpaper-preview.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={handleCarouselClick}>
          <img
            className="d-block carousel-img"
            src="https://images8.alphacoders.com/505/505616.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3> </h3>
            <p>      </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="card-container p-3">
        {data.map((book, index) => (
          <Card key={index} className="card-custom">
            <Card.Img variant="top" src={book.image} className="card-img" />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Button onClick={handleGoToMangas} variant="primary">
                Go to Mangas
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
