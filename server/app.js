const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import CORS
const summarizeRoutes = require('./routes/summarize');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Enable CORS for all routes (can be customized for specific origins)
app.use(cors()); // Add this line to enable CORS

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Directory to save temporary files

// Route for summarization (attach multer middleware)
app.use('/summarize', upload.single('file'), summarizeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Document Summarization API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
