import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import AuthApp from './AuthApp';

const MessageKaiaPage = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <AuthApp />
      </div>
    </ThemeProvider>
  );
};

export default MessageKaiaPage;