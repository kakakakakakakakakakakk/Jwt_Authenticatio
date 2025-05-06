const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

dotenv.config();
const app = express();

// ✅ Enable CORS (allow from any origin during development; restrict in production)
app.use(cors({
  origin: '*', // For development only. Replace with frontend domain in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Landing Page
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My API 🎉</h1>
    <p>Use <code>/api/auth</code> for authentication routes and <code>/api/products</code> for product management.</p>
  `);
});

// ✅ API Routes
app.use('/api/auth', authRoutes);       // example: /api/auth/register, /api/auth/login
app.use('/api/products', productRoutes); // example: /api/products/add, /api/products/view

// ✅ 404 Error Handler
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource could not be found. 😐" });
});

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
