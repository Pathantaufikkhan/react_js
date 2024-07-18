const router = require('express').Router();
const { Route } = require('express');
const bookmodel = require('../models/bookmodel');

// Add a new book
router.post('/add', async (req, res) => {
    try {
        // Log the incoming request body
        const data = req.body;
        const newBook = new bookmodel(data);

        // Save the new book to the database
        await newBook.save().then(() => {

            res.status(200).json({ message: 'Book created successfully' });

        });

    } catch (error) {
        console.error(error);

    }
});

//GET REQUEST

router.get("/getbooks", async (req, res) => {
    let books;
    try {

        books = await bookmodel.find()
        res.status(200).json({ books })
    } catch (error) {
        console.error(error);   
    }


})

//GET REQUEST by id
router.get("/getbooks/:id", async (req, res) => {
    const id = req.params.id; // Corrected req.param to req.params
    try {
        const book = await bookmodel.findById(id); // Corrected method name to findById
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//UPDATE BOOK BY ID

router.put("/updatebook/:id", async (req, res) => {
    const id = req.params.id;
    const { bookname, description, author, image, price } = req.body;

    try {
        const book = await bookmodel.findByIdAndUpdate(id, {
            bookname,
            description,
            author,
            image,
            price
        }, { new: true }); // Use { new: true } to return the updated document

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Data updated", book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});

//delete book by id
router.delete("/deletebook/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const book = await bookmodel.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});
module.exports = router;



module.exports = router;
