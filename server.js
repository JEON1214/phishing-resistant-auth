const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'vaultify.db');

// Connect to SQLite Database (creates vaultify.db if it doesn't exist)
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite persistent database (vaultify.db)');
  }
});

// Initialize Database Schema (Users & Vault Tables)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      salt TEXT NOT NULL,
      passwordHash TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS vault (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userEmail TEXT NOT NULL,
      title TEXT NOT NULL,
      username TEXT NOT NULL,
      isFavorite INTEGER DEFAULT 0,
      FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE
    )
  `);
});

// Express Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'vaultify-capstone-session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1-hour session
}));

// PBKDF2 Password Hashing
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Authentication Session Guard Middleware
function requireAuth(req, res, next) {
  if (!req.session.userEmail) {
    return res.status(401).json({ error: 'Unauthorized session.' });
  }
  next();
}

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// Sign Up / Register Account
app.post('/api/signup', (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  db.run(
    `INSERT INTO users (fullName, email, salt, passwordHash) VALUES (?, ?, ?, ?)`,
    [fullName, cleanEmail, salt, passwordHash],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Account already exists.' });
        }
        return res.status(500).json({ error: 'Database signup error.' });
      }

      // Seed default accounts into database
      const stmt = db.prepare(`INSERT INTO vault (userEmail, title, username, isFavorite) VALUES (?, ?, ?, ?)`);
      stmt.run(cleanEmail, 'Email Account', cleanEmail, 0);
      stmt.run(cleanEmail, 'Shopping Account', 'user@store.com', 0);
      stmt.run(cleanEmail, 'Social Account', 'user@social.com', 0);
      stmt.finalize();

      req.session.userEmail = cleanEmail;
      res.json({ success: true, user: { fullName, email: cleanEmail } });
    }
  );
});

// Log In
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  db.get(`SELECT * FROM users WHERE email = ?`, [cleanEmail], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const hash = hashPassword(password, user.salt);
    if (hash !== user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    req.session.userEmail = cleanEmail;
    res.json({ success: true, user: { fullName: user.fullName, email: cleanEmail } });
  });
});

// Log Out
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed.' });
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// ==========================================
// VAULT DATABASE ENDPOINTS (CRUD)
// ==========================================

// READ: Fetch all user items from SQLite
app.get('/api/vault', requireAuth, (req, res) => {
  const cleanEmail = req.session.userEmail;

  db.get(`SELECT fullName, email FROM users WHERE email = ?`, [cleanEmail], (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'User record not found.' });

    db.all(`SELECT id, title, username, isFavorite FROM vault WHERE userEmail = ? ORDER BY id DESC`, [cleanEmail], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to retrieve vault entries.' });

      const vault = rows.map(item => ({
        id: item.id,
        title: item.title,
        username: item.username,
        isFavorite: Boolean(item.isFavorite)
      }));

      res.json({
        fullName: user.fullName,
        email: user.email,
        vault
      });
    });
  });
});

// CREATE: Insert new vault entry into database
app.post('/api/vault', requireAuth, (req, res) => {
  const { title, username } = req.body;
  if (!title || !username) {
    return res.status(400).json({ error: 'Title and username are required.' });
  }

  const cleanEmail = req.session.userEmail;

  db.run(
    `INSERT INTO vault (userEmail, title, username, isFavorite) VALUES (?, ?, ?, 0)`,
    [cleanEmail, title, username],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to save entry.' });

      res.json({
        success: true,
        item: { id: this.lastID, title, username, isFavorite: false }
      });
    }
  );
});

// UPDATE: Modify vault entry or favorite status in database
app.put('/api/vault/:id', requireAuth, (req, res) => {
  const itemId = Number(req.params.id);
  const { title, username, isFavorite } = req.body;
  const cleanEmail = req.session.userEmail;

  db.run(
    `UPDATE vault SET 
      title = COALESCE(?, title), 
      username = COALESCE(?, username), 
      isFavorite = COALESCE(?, isFavorite) 
     WHERE id = ? AND userEmail = ?`,
    [
      title !== undefined ? title : null, 
      username !== undefined ? username : null, 
      isFavorite !== undefined ? (isFavorite ? 1 : 0) : null, 
      itemId, 
      cleanEmail
    ],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to update entry.' });
      if (this.changes === 0) return res.status(404).json({ error: 'Item not found.' });
      res.json({ success: true });
    }
  );
});

// DELETE: Remove vault entry from database
app.delete('/api/vault/:id', requireAuth, (req, res) => {
  const itemId = Number(req.params.id);
  const cleanEmail = req.session.userEmail;

  db.run(
    `DELETE FROM vault WHERE id = ? AND userEmail = ?`,
    [itemId, cleanEmail],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to delete entry.' });
      res.json({ success: true });
    }
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Vaultify Capstone running with SQLite at http://localhost:${PORT}`);
});