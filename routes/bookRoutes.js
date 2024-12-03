const express = require('express');
const upload = require('../middleware/multerConfig');
const authorize = require('../middleware/authorize');
const db = require('../config/dbConfig');

const router = express.Router();

router.post('/books', authorize(['Admin']), upload.single('bookImage'), (req, res) => {
    const { title, author, genre } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const query = `INSERT INTO books (title, author, genre, image_path) VALUES (?, ?, ?, ?)`;
    db.query(query, [title, author, genre, imagePath], (err) => {
        if (err) return res.status(500).send('Error adding book');
        res.json({ success: true });
    });
});

router.get('/books', authorize(['Librarian', 'Member']), (req, res) => {
    const query = `SELECT * FROM books`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error fetching books');
        res.json(results);
    });
});

router.delete('/books/:id', authorize(['Admin']), (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM books WHERE id = ?`;
    db.query(query, [id], (err) => {
        if (err) return res.status(500).send('Error deleting book');
        res.json({ success: true });
    });
});

module.exports = router;
