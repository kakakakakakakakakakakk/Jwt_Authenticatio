const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

dotenv.config();
const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
