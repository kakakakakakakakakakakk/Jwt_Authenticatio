const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

dotenv.config();
const app = express();

// Enable CORS for all origins (for development)
// Alternatively, you can specify allowed origins as shown in the example below.
app.use(cors({
  origin: 'https://adolphe-jwt.onrender.com/auth/register', // Allows all domains, or specify a domain like 'https://adolphe-jwt.onrender.com/auth/register'
}));

// Parse JSON bodies
app.use(express.json());

// 👇 Landing Page
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My API 🎉</h1>
    <p>Use <code>/api/auth</code> for authentication routes and <code>/api/products</code> for products.</p>
  `);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 404 handler 
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource could not be found. 😐" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
