import React, { useState } from 'react';
import axios from "axios";
import "./addbook.css"; // Import the CSS file

const AddBooks = () => {
  const [data, setData] = useState({
    bookname: "",
    author: "",
    description: "",
    image: "",
    price: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/book/add", data);
      alert(response.data.message);
    } catch (error) {
      console.error("There was an error adding the book!", error);
    }
    setData({
      bookname: "",
      author: "",
      description: "",
      image: "",
      price: "",
    });
  };

  return (
    <div className="addbooks-container">
      <div className='addbooks-form-container'>
        <div className="mb-3">
          <label htmlFor="bookname" className="form-label text-white">Book Name</label>
          <input
            type="text"
            className="form-control"
            id="bookname"
            name="bookname"
            placeholder="Enter The Book Name"
            onChange={change}
            value={data.bookname}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label text-white">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            placeholder="Enter The Book Author"
            onChange={change}
            value={data.author}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label text-white">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter The Book Description"
            onChange={change}
            value={data.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-white">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            placeholder="Enter The Book Image URL"
            onChange={change}
            value={data.image}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label text-white">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter The Book Price"
            onChange={change}
            value={data.price}
          />
        </div>
        <button className='btn btn-success' onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default AddBooks;
