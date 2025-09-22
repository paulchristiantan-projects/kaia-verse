import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeSidebar();
  };

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="top-nav">
        <div className="nav-brand">
          <img src="/assets/kaia-logo.jpg" alt="KAIA Logo" />
          <span>KAIA</span>
        </div>
        <ul className="nav-links">
          <li><a href="#page-top" onClick={() => scrollToSection('page-top')}>Home</a></li>
          <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
          <li><a href="#gallery" onClick={() => scrollToSection('gallery')}>Gallery</a></li>
          <li><a href="#discography" onClick={() => scrollToSection('discography')}>Music</a></li>
          <li><a href="#news" onClick={() => scrollToSection('news')}>News</a></li>
          <li><a href="#events" onClick={() => scrollToSection('events')}>Events</a></li>
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        <i className={`fas ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>
      
      {/* Mobile Sidebar */}
      <nav className={`sidebar-wrapper ${isOpen ? 'active' : ''}`}>
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#page-top" onClick={() => scrollToSection('page-top')}>
              <img src="/assets/kaia-logo.jpg" style={{height: '24px', width: 'auto', verticalAlign: 'middle'}} alt="KAIA Logo" />
              K A I A
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#page-top" onClick={() => scrollToSection('page-top')}>Home</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#about" onClick={() => scrollToSection('about')}>About</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#gallery" onClick={() => scrollToSection('gallery')}>Gallery</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#discography" onClick={() => scrollToSection('discography')}>Music</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#news" onClick={() => scrollToSection('news')}>News</a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#events" onClick={() => scrollToSection('events')}>Events</a>
          </li>
        </ul>
      </nav>
      
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1049
          }}
        />
      )}
    </>
  );
};

export default Navigation;