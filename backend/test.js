fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'master_admin', password: 'admin123' })
}).then(r => r.json()).then(console.log).catch(console.error);
