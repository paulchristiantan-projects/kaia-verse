import React, { useState } from 'react';
import KaiaWall from './KaiaWall';

const MessageButton = () => {
  const [showWall, setShowWall] = useState(false);



  return (
    <>
      <button
        onClick={() => setShowWall(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, var(--kaia-primary), #b8296b)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '1rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(214, 51, 132, 0.4)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 30px rgba(214, 51, 132, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 20px rgba(214, 51, 132, 0.4)';
        }}
      >
        💌 KAIA Wall
      </button>

      {showWall && (
        <KaiaWall onClose={() => setShowWall(false)} />
      )}
    </>
  );
};

export default MessageButton;