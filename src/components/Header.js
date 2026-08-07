import React, { useState } from 'react';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import { useTheme } from '../contexts/ThemeContext';
import KaiaWall from './KaiaWall';
import FanCard from './FanCard';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'discography', label: 'Music' },
  { id: 'videos', label: 'Videos' },
  { id: 'news', label: 'News' },
  { id: 'events', label: 'Events' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWall, setShowWall] = useState(false);
  const [showFanCard, setShowFanCard] = useState(false);
  const { isScrolled, scrollToSection } = useScrollNavigation();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <header className="masthead d-flex align-items-center" id="page-top">
        <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-brand" onClick={() => handleNavClick('page-top')} style={{cursor: 'pointer'}}>
            <img src="/assets/kaia-logo.jpg" alt="KAIA Logo" />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span>KAIA</span>
              <span style={{ fontSize: '0.55rem', opacity: 0.45, letterSpacing: '0.05em' }}>v20260807</span>
            </div>
          </div>
          <ul className="nav-links">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => handleNavClick(item.id)}>{item.label}</a>
              </li>
            ))}
            <li><a href="/message-kaia" className="nav-login-link">Member Login</a></li>
          </ul>
        </nav>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <i className={`fas ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        <div className="image-background">
          <img
            src="/assets/img/gallery/kaia17.jpg"
            alt="KAIA Banner"
            className="d-none d-md-block"
          />
          <img
            src="/assets/img/gallery/kaia172.jpg"
            alt="KAIA Banner"
            className="d-md-none"
          />
          <div className="content-banner">
            <div className="container px-4 px-lg-5 text-center">
              <h1 className="mb-1 fade-in">KAIAverse</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <nav className={`sidebar-wrapper ${isOpen ? 'active' : ''}`}>
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#page-top" onClick={() => handleNavClick('page-top')}>
              <img src="/assets/kaia-logo.jpg" alt="KAIA Logo" />
              K A I A
            </a>
          </li>
          {NAV_ITEMS.map(item => (
            <li key={item.id} className="sidebar-nav-item">
              <a href={`#${item.id}`} onClick={() => handleNavClick(item.id)}>{item.label}</a>
            </li>
          ))}
          <li className="sidebar-nav-item">
            <a href="/message-kaia" className="nav-login-link">Member Login</a>
          </li>
          <li className="sidebar-nav-item sidebar-actions">
            <button
              className="sidebar-action-btn"
              onClick={() => { setShowWall(true); setIsOpen(false); }}
              aria-label="Open KAIA Wall"
              title="KAIA Wall"
            >💌 KAIA Wall</button>
            <button
              className="sidebar-action-btn"
              onClick={() => { setShowFanCard(true); setIsOpen(false); }}
              aria-label="Open ZAIA Card"
              title="My ZAIA Card"
            >🎫 ZAIA Card</button>
            <button
              className="sidebar-action-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >{isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {showWall && <KaiaWall onClose={() => setShowWall(false)} />}
      <FanCard isOpen={showFanCard} onClose={() => setShowFanCard(false)} />
    </>
  );
};

export default Header;
