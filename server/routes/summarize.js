
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
  const file = req.file;
  console.log("Uploaded file:", file);  // Debugging line to check if the file is present
  
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.resolve(file.path);

  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://127.0.0.1:8000/summarize/', formData, {
      headers: formData.getHeaders(),
    });

    fs.unlinkSync(filePath);

    res.json({
      originalContent: response.data.originalContent,
      summary: response.data.summary,
    });
  } catch (err) {
    console.error('Error in FastAPI request:', err);
    fs.unlinkSync(filePath);
    res.status(500).json({ error: 'Failed to summarize the document' });
  }
});

module.exports = router;

