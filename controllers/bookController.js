const Book = require('../models/book');

exports.addBook = async (req, res) => {
    try {
        const { title, author, genre, availableCopies } = req.body;
        const book = await Book.create({ title, author, genre, availableCopies });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).send('Error adding book.');
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).send('Error fetching books.');
    }
};
