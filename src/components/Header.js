import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className="masthead d-flex align-items-center" id="page-top">
        {/* Desktop Top Navigation */}
        <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-brand" onClick={() => scrollToSection('page-top')} style={{cursor: 'pointer'}}>
            <img src="/assets/kaia-logo.jpg" alt="KAIA Logo" />
            <span>KAIA</span>
          </div>
          <ul className="nav-links">
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
        
        <div className="image-background">
          <img 
            src="/assets/img/gallery/kaia17.jpg" 
            alt="KAIA Banner" 
            className="d-none d-md-block"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <img 
            src="/assets/img/gallery/kaia172.jpg" 
            alt="KAIA Banner" 
            className="d-md-none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          <div className="content-banner">
            <div className="container px-4 px-lg-5 text-center">
              <h1 className="mb-1 fade-in">KAIAverse</h1>
              <h6 className="kaia-official fade-in">
                {/* Official website link can be added here */}
              </h6>
            </div>
          </div>
        </div>
      </header>
      
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

export default Header;