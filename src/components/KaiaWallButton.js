import React, { useState } from 'react';
import KaiaWall from './KaiaWall';

const KaiaWallButton = () => {
  const [showWall, setShowWall] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowWall(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'linear-gradient(135deg, var(--kaia-primary), #b8296b)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '15px 20px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 999,
          transition: 'all 0.3s ease'
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

export default KaiaWallButton;