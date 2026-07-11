import React, { useState } from 'react';
import FanCard from './FanCard';

const FanCardButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fancard-trigger-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open ZAIA Card"
        title="My ZAIA Card"
      >
        🎫
      </button>
      <FanCard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default FanCardButton;
