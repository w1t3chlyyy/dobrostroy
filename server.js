const express = require('express');
const path = require('path');
const leadHandler = require('./api/lead');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable caching so preview always shows newest changes immediately
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Handle lead form submission
app.all('/api/lead', (req, res) => {
  leadHandler(req, res);
});

// Serve static assets from public/ with clean URL support (e.g., /privacy -> /privacy.html)
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  etag: false,
  lastModified: false,
  maxAge: 0
}));

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
