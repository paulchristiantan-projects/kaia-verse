import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase/config';
import { ThemeProvider } from './contexts/ThemeContext';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import { MemberProvider } from './contexts/MemberContext';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Members from './components/Members';
import Discography from './components/Discography';
import Videos from './components/Videos';
import News from './components/News';
import Events from './components/Events';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import PersistentPlayer from './components/PersistentPlayer';
import MessageButton from './components/MessageButton';
import MessageKaiaPage from './components/MessageKaiaPage';
import BirthdayCelebration from './components/BirthdayCelebration';
import EventCountdown from './components/EventCountdown';
import FanCardButton from './components/FanCardButton';
import BackToTop from './components/BackToTop';
import LoadingSkeleton from './components/LoadingSkeleton';
import OnThisDay from './components/OnThisDay';
import NotFound from './components/NotFound';
import { useScrollReveal } from './hooks/useScrollReveal';

const HomePage = () => {
  useScrollReveal();
  return (
    <>
      <ThemeToggle />
      <Header />
      <OnThisDay />
      <BirthdayCelebration />
      <EventCountdown />
      <Members />
      <Discography />
      <Videos />
      <News />
      {/* <Events /> */}
      <Footer />
      <ChatBot />
      <MessageButton />
      <FanCardButton />
      <BackToTop />
      <PersistentPlayer />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);

    // Track site visit once per session (guards against StrictMode double-invoke)
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', '1');
      const visitRef = doc(db, 'stats', 'siteVisits');
      updateDoc(visitRef, { count: increment(1) })
        .catch(() => {
          // Doc doesn't exist yet, create it
          setDoc(visitRef, { count: 1 });
        });
    }

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <MusicPlayerProvider>
          <MemberProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/message-kaia" element={<MessageKaiaPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
          </MemberProvider>
        </MusicPlayerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
