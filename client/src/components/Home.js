import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload'); // Redirect to the FileUpload page
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Document Summarizer 🌟</h1>
        <p className="home-subtitle">
          Transform lengthy documents into concise summaries with ease and speed!
        </p>
      </header>
      <main className="home-main">
        {/* About Section */}
        <section className="about-section">
          <p className="about-paragraph">
            Document Summarizer is your go-to solution for converting large, complex documents into short, easy-to-understand summaries. Whether you're a student, a professional, or just someone managing lots of information, our tool saves you time and effort while ensuring accuracy and security.
          </p>
          <p className="about-paragraph highlight">
            <span className="upload-link" onClick={handleGetStarted}>
              Click here to upload your document
            </span>{' '}
            and get started now!
          </p>
        </section>

        {/* Features Section */}
        <div className="features">
          <div className="feature-card">
            <h3>📄 Easy to Use</h3>
            <p>Upload your documents, and we’ll do the heavy lifting for you.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Fast Results</h3>
            <p>Get accurate summaries in just seconds, no more manual reading!</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>Your data is processed with atmost privacy and security in mind.</p>
          </div>
        </div>
      </main>
      <footer className="home-footer">
        <p>Crafted with ❤️ for effortless document summarization.</p>
      </footer>
    </div>
  );
}

export default Home;
