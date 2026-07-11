import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-emoji">🦋</span>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Lost in the KAIAverse</h2>
        <p className="not-found-text">
          The page you're looking for doesn't exist. Maybe it flew away like a dragonfly.
        </p>
        <a href="/" className="not-found-btn">← Back to KAIAverse</a>
      </div>
    </div>
  );
};

export default NotFound;
