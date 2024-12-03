const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');
const Joi = require('joi');

const router = express.Router();
const JWT_SECRET = 'prince@1234';

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Admin', 'Librarian', 'Member').required()
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        await userSchema.validateAsync({ name, email, password, role });

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        db.query(query, [name, email, hashedPassword, role], (err, result) => {
            if (err) return res.status(500).send('Error registering user');
            res.json({ success: true, message: 'User registered successfully' });
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).send('Invalid email or password');
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Invalid email or password');

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
