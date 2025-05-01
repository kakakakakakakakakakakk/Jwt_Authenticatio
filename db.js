const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the SQLite database file
const dbPath = path.resolve(__dirname, process.env.DB_NAME || 'jwt_db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err.message);
    return;
  }
  console.log('Connected to SQLite database.');

  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Failed to create users table:', err.message);
    } else {
      console.log('Users table ensured.');
    }
  });

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      product_Id INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT NOT NULL,
      description TEXT,
      quantity INTEGER,
      price REAL
    )
  `, (err) => {
    if (err) {
      console.error('Failed to create products table:', err.message);
    } else {
      console.log('Products table ensured.');
    }
  });
});

module.exports = db;
