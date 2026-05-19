const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve data/talks.json from the 'data' directory
app.get('/data/talks.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'talks.json'));
});

// Serve index.html for all other routes to enable single-page app routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});