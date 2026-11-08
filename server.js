const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'vaultify-capstone-session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

const users = {};

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

app.post('/api/signup', (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  if (users[cleanEmail]) {
    return res.status(400).json({ error: 'Account already exists.' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  users[cleanEmail] = {
    fullName,
    email: cleanEmail,
    salt,
    passwordHash,
    vault: [
      { id: 1, title: 'Email Account', username: cleanEmail, isFavorite: false },
      { id: 2, title: 'Shopping Account', username: 'user@store.com', isFavorite: false },
      { id: 3, title: 'Social Account', username: 'user@social.com', isFavorite: false }
    ]
  };

  req.session.userEmail = cleanEmail;
  res.json({ success: true, user: { fullName, email: cleanEmail } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = users[cleanEmail];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const hash = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  req.session.userEmail = cleanEmail;
  res.json({ success: true, user: { fullName: user.fullName, email: cleanEmail } });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/vault', (req, res) => {
  if (!req.session.userEmail || !users[req.session.userEmail]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = users[req.session.userEmail];
  res.json({
    fullName: user.fullName,
    email: user.email,
    vault: user.vault
  });
});

app.post('/api/vault', (req, res) => {
  if (!req.session.userEmail || !users[req.session.userEmail]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { title, username } = req.body;
  if (!title || !username) {
    return res.status(400).json({ error: 'Title and username are required.' });
  }

  const user = users[req.session.userEmail];
  const newItem = { id: Date.now(), title, username, isFavorite: false };
  user.vault.push(newItem);
  res.json({ success: true, item: newItem });
});

app.put('/api/vault/:id', (req, res) => {
  if (!req.session.userEmail || !users[req.session.userEmail]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const itemId = Number(req.params.id);
  const { title, username } = req.body;
  const user = users[req.session.userEmail];
  
  const item = user.vault.find(i => i.id === itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  if (title) item.title = title;
  if (username) item.username = username;

  res.json({ success: true, item });
});

app.delete('/api/vault/:id', (req, res) => {
  if (!req.session.userEmail || !users[req.session.userEmail]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const itemId = Number(req.params.id);
  const user = users[req.session.userEmail];
  
  user.vault = user.vault.filter(i => i.id !== itemId);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Vaultify Capstone running at http://localhost:${PORT}`);
});