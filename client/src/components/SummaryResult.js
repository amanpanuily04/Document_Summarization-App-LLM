import React from 'react';
import { useLocation } from 'react-router-dom';
import './SummaryResult.css';

function SummaryResult() {
  const location = useLocation();
  const { originalContent, summary } = location.state || {};

  return (
      <div className="content-wrapper">
        
        {/* Original Content - Display text */}
        <div className="original-content">
          <h3>Original Document Content</h3>
          <div className="content-box">
            {originalContent ? (
              <p className="document-text">{originalContent}</p>  
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="summary-content">
          <h3>Summary</h3>
          <div className="content-box">
            {summary ? (
              <p>{summary}</p>
            ) : (
              <p>No summary available.</p>
            )}
          </div>
        </div>
      </div>
  );
}

export default SummaryResult;
