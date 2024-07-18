import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookSection from '../pages/userbooksection';
import './addbook.css';

const Books = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="Home-Page bg-light text-dark container-fluid d-flex flex-column align-items-center">
      <h4 className='text-dark py-3'>Books Section</h4>
      <div className='d-flex flex-column align-items-center py-3'>
        {loading ? (
          <div className='text-dark'>Loading...</div>
        ) : error ? (
          <div className='text-dark'>{error}</div>
        ) : (
          <BookSection data={data} />
        )}
      </div>
    </div>
  );
};

export default Books;
