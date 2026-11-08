let currentVault = [];

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
}

async function handleSignUp(e) {
  e.preventDefault();
  const fullName = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password })
    });
    const data = await res.json();

    if (data.success) {
      loadVault();
    } else {
      alert(data.error || 'Sign up failed');
    }
  } catch (err) {
    alert('Server communication error.');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.success) {
      loadVault();
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (err) {
    alert('Server communication error.');
  }
}

async function loadVault() {
  try {
    const res = await fetch('/api/vault');
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    currentVault = data.vault || [];
    renderVaultItems(currentVault);
    updateNavUser(data.fullName);
    showView('vault-view');
  } catch (err) {
    console.error('Failed to load vault');
  }
}

function renderVaultItems(items) {
  const listContainer = document.getElementById('vault-list');
  listContainer.innerHTML = '';

  if (items.length === 0) {
    listContainer.innerHTML = '<p style="color: var(--text-muted)">No items found.</p>';
    return;
  }

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'vault-item';
    el.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.username}</p>
    `;
    listContainer.appendChild(el);
  });
}

function filterVaultItems() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = currentVault.filter(item => 
    item.title.toLowerCase().includes(query) || item.username.toLowerCase().includes(query)
  );
  renderVaultItems(filtered);
}

async function openNewItemModal() {
  const title = prompt('Item Title (e.g. Work Email):');
  const username = prompt('Username / Email:');
  if (!title || !username) return;

  try {
    const res = await fetch('/api/vault', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, username })
    });
    const data = await res.json();
    if (data.success) {
      loadVault();
    }
  } catch (err) {
    alert('Failed to add item');
  }
}

function updateNavUser(name) {
  const navActions = document.getElementById('nav-actions');
  navActions.innerHTML = `<span style="font-size:0.9rem; color:var(--text-muted); margin-right:12px;">Welcome, ${name}</span>
                          <button class="btn-text" onclick="handleLogout()">Logout</button>`;
}

async function handleLogout() {
  await fetch('/api/logout', { method: 'POST' });
  const navActions = document.getElementById('nav-actions');
  navActions.innerHTML = `<button class="btn-text" onclick="showView('login-view')">Log In</button>
                          <button class="btn-text" onclick="showView('signup-view')">Sign Up</button>`;
  showView('hero-view');
}

// Check session on page load
loadVault();