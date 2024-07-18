import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap';
import './BookSection.css'; // Import the CSS file

const BookSection = ({ data, onUpdate, onDelete }) => {
  useEffect(() => {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    
    return () => {
      // Cleanup tooltips on component unmount
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, [data]);

  const confirmDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.bookname}"?`)) {
      onDelete(item);
    }
  };

  return (
    <div className="book-section d-flex justify-content-around align-items-center flex-wrap my-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="book-card d-flex flex-column justify-content-between align-items-center m-3 p-2"
        >
          <div className="book-image-container w-100 h-50 text-">
            <img
              className="book-image"
              src={item.image}
              alt={item.bookname}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={item.description}
            />
          </div>
          <div className="book-info text-center p-3">
            <h5 className="book-title">{item.bookname.length > 20 ? item.bookname.slice(0, 20) + '...' : item.bookname}</h5>
            <h6 ><b>author:{item.author}</b></h6>
            <h6 className="book-price"><b>Price: {item.price}</b></h6>
            <div className="book-actions d-flex justify-content-around align-items-center my-2">
              <button className="btn btn-primary" onClick={() => onUpdate(item)}>UPDATE</button>
              <button className="btn btn-danger" onClick={() => confirmDelete(item)}>DELETE</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookSection;
