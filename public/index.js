const path = require('path');
const express = require('express');

let leadHandler;
try {
  leadHandler = require('../api/lead');
} catch (_) {
  try { leadHandler = require('./api/lead'); } catch (_) {}
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable caching headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Handle lead form submission
if (leadHandler) {
  app.all('/api/lead', (req, res) => {
    leadHandler(req, res);
  });
}

// Serve static assets from this directory
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  etag: false,
  lastModified: false,
  maxAge: 0
}));

// Fallback 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// For local direct execution
if (require.main === module && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
