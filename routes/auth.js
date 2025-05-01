const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Replace this with your actual secret directly
const JWT_SECRET = '131a46f7264dc7e435c1327080a3af199be0ffa73b65ec2e27f2dc6dd6c168565c3c4268334b3f52b5ab925dc7fea4dbc43ec3c75d68c3feab0d4cad140657e1';

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.run(query, [username, email, hashed], function (err) {
    if (err) return res.status(500).json({ err: err.message });
    res.status(201).json({ message: 'User registered', userId: this.lastID });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(401).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

module.exports = router;
