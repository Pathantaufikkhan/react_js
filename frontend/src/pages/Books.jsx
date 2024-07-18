import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookSection from '../components/BookSection';
import UpdateBookModal from '../components/bookmodel';


const Books = () => {
  const [data, setData] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({
    bookname: '',
    author: '',
    description: '',
    image: '',
    price: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:1000/book/getbooks');
        setData(res.data.books); // Ensure res.data.books is an array
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (book) => {
    try {
      if (window.confirm(`Are you sure you want to delete "${book.bookname}"?`)) {
        await axios.delete(`http://localhost:1000/book/deletebook/${book._id}`);
        setData(data.filter(b => b._id !== book._id));
        alert(`Book "${book.bookname}" has been deleted.`);
      } else {
        alert(`Deletion of "${book.bookname}" cancelled.`);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  
  const handleUpdate = (book) => {
    setUpdatedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/book/updatebook/${updatedBook._id}`, updatedBook);
      setData(data.map(b => (b._id === updatedBook._id ? updatedBook : b)));
      alert("book updated successfully")
    } catch (error) {
      console.error('Error updating book:', error);
    }
    handleClose();
  };

  return (
    <div className="Home-Page bg-dark text-white container-fluid d-flex flex-column align-items-center">
      <h4 className='text-white py-3'>Mangas Section</h4>
      <div className='d-flex flex-column align-items-center py-3'>
        {loading ? (
          <div className='text-white'>Loading...</div>
        ) : error ? (
          <div className='text-white'>{error}</div>
        ) : (
          <BookSection data={data} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}
      </div>
      <UpdateBookModal
        show={showModal}
        handleClose={handleClose}
        updatedBook={updatedBook}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className='mt-5 text-white'>
        
      </div>
    </div>
  );
};

export default Books;
