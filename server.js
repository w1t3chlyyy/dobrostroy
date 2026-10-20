const express = require('express');
const path = require('path');
const leadHandler = require('./api/lead');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle lead form submission
app.all('/api/lead', (req, res) => {
  leadHandler(req, res);
});

// Serve static assets from public/ with clean URL support (e.g., /privacy -> /privacy.html)
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  maxAge: '1h'
}));

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
