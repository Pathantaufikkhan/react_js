import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateBookModal = ({ show, handleClose, updatedBook, handleChange, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              name="bookname"
              value={updatedBook.bookname}
              onChange={handleChange}
              placeholder="Book Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={updatedBook.author}
              onChange={handleChange}
              placeholder="Author"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={updatedBook.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={updatedBook.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={updatedBook.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateBookModal;
