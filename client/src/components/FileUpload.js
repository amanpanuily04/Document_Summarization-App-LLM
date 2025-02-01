import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FileUpload.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    setIsUploading(true);
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/summarize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      navigate('/summary', {
        state: {
          originalContent: response.data.originalContent,
          summary: response.data.summary,
        },
      });
    } catch (err) {
      console.error(err);
      setError('Failed to summarize the document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-container">
      <header className="app-header">
        <h1>📝 Document Summarizer</h1>
        <p>Upload your documents and get a concise summary in seconds!</p>
      </header>
      <div className="file-upload-container">
        <div className="upload-box">
          <h2>Document Summarizer</h2>
          <p>Upload a PDF to get a quick summary of your document.</p>
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
            accept=".pdf"
          />
          <button className="upload-button" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload & Summarize'}
          </button>
          {isUploading && (
            <div className="loading-screen">
              <div className="spinner"></div>
              <p>We are processing your document...</p>
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;