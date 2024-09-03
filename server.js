const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

// Create a write stream (in append mode) for logging
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Use morgan to log all requests to the console and to the access.log file
app.use(morgan('combined', { stream: logStream }));

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
  console.log("here", req)
});

// Middleware to log errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  logStream.write(`Error: ${err.stack}\n`);
  res.status(500).send('Something broke!');
  console.log("here", req)
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

