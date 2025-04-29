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
});

module.exports = db;
