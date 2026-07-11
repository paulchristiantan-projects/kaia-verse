import React, { useState } from 'react';
import KaiaWall from './KaiaWall';

const MessageButton = () => {
  const [showWall, setShowWall] = useState(false);

  return (
    <>
      <button
        className="kaia-wall-btn"
        onClick={() => setShowWall(true)}
        aria-label="Open KAIA Wall"
        title="KAIA Wall"
      >
        💌
      </button>

      {showWall && (
        <KaiaWall onClose={() => setShowWall(false)} />
      )}
    </>
  );
};

export default MessageButton;
