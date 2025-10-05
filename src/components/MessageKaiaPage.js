import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import AuthApp from './AuthApp';

const MessageKaiaPage = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        
        
        {/* Main Content */}
        <div style={{
          minHeight: '100vh',
          backgroundImage: 'url(/assets/img/gallery/kaia17.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 2
          }}>
            <AuthApp />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MessageKaiaPage;