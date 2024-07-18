// src/BookSection.js

import React, { useState } from 'react';
import './css/userbooksection.css';

const BookSection = ({ data }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleViewClick = (book) => {
    setSelectedBook(book);
  };

  const handleClose = () => {
    setSelectedBook(null);
  };

  return (
    <div className="book-section1 text-white d-flex flex-wrap">
      {data.map((book) => (
        <div key={book._id} className="book-card">
          <div className="image-container">
            <img src={book.image} alt={book.bookname} className="book-image" />
          </div>
          <div className="book-details">
            <h5 className="book-title">{book.bookname}</h5>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-price">Price: ${book.price}</p>
            {selectedBook === null && (
              <button 
                onClick={() => handleViewClick(book)} 
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
            )}
          </div>
        </div>
      ))}

      {selectedBook && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedBook.bookname}</h2>
            <p className="modal-description">{selectedBook.description}</p>
            <button onClick={handleClose} className="btn btn-sm btn-outline-secondary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSection;
