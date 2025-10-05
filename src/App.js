import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Members from './components/Members';
import Gallery from './components/Gallery';
import Discography from './components/Discography';
import Videos from './components/Videos';
import News from './components/News';
import Events from './components/Events';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import AnnouncementModal from './components/AnnouncementModal';
import MessageButton from './components/MessageButton';
import MessageKaiaPage from './components/MessageKaiaPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBirthdayModal, setShowBirthdayModal] = useState(true);
  
  // Check if this is the message page
  const isMessagePage = window.location.pathname === '/message-kaia' || window.location.search.includes('message=true');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }
  
  // Show message page if requested
  if (isMessagePage) {
    return <MessageKaiaPage />;
  }

  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <Header />
        <Members />
        <Gallery />
        <Discography />
        <Videos />
        <News />
        <Events />
        <Footer />
        <ChatBot />
        
        {/* Message Board for KAIA */}
        <MessageButton />
        <AnnouncementModal 
          isOpen={showBirthdayModal}
          onClose={() => setShowBirthdayModal(false)}
          type="birthday"
          memberName="Charlotte"
          memberImage="/assets/img/gallery/charlotte17.jpg"
          date="October 9, 2025"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;