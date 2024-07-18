import React, { useState } from 'react';
import axios from 'axios';

const UpdateBookForm = ({ book, onUpdateComplete }) => {
  const [updatedBook, setUpdatedBook] = useState(book);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/book/updatebook/${updatedBook._id}`, updatedBook);
      onUpdateComplete();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="bookname" value={updatedBook.bookname} onChange={handleChange} />
      <input type="text" name="author" value={updatedBook.author} onChange={handleChange} />
      <input type="text" name="description" value={updatedBook.description} onChange={handleChange} />
      <input type="text" name="image" value={updatedBook.image} onChange={handleChange} />
      <input type="number" name="price" value={updatedBook.price} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateBookForm;
