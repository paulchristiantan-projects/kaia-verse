import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/OfficialKAIA',
      icon: 'fab fa-facebook',
      color: '#1877F2'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/KAIAOfficialPH',
      icon: 'fab fa-twitter',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/kaia.officialph',
      icon: 'fab fa-instagram',
      color: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/artist/5UWPjwwieMFFohWLHe4Usy',
      icon: 'icon-social-spotify',
      color: '#1DB954'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UCdjyExLaRqAL7V684N8bayQ',
      icon: 'fab fa-youtube',
      color: '#FF0000'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@kaiaofficialph',
      icon: 'fab fa-tiktok',
      color: '#000000'
    }
  ];

  return (
    <footer className="footer text-center">
      <div className="container px-4 px-lg-5">
        <ul className="list-inline mb-5" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isMobile ? '0.5rem' : '1rem',
          padding: '0'
        }}>
          {socialLinks.map((social, index) => (
            <li key={social.name} className="list-inline-item">
              <a
                className="social-link text-white mr-2"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  width: isMobile ? '40px' : '50px',
                  height: isMobile ? '40px' : '50px',
                  lineHeight: isMobile ? '40px' : '50px',
                  textAlign: 'center',
                  borderRadius: '50%',
                  background: social.color,
                  color: 'white',
                  margin: isMobile ? '0 0.25rem' : '0 0.5rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  animationDelay: `${index * 0.1}s`,
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.1)';
                  e.target.style.boxShadow = '0 10px 25px rgba(214, 51, 132, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <i className={social.icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="container px-4 px-lg-5">
        <p className="text-muted small mb-0 slide-in-left">
          Built with ❤️ by:{' '}
          <a
            href="https://www.instagram.com/paulchristiantan"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--kaia-primary)',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#b8296b';
              e.target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--kaia-primary)';
              e.target.style.textDecoration = 'none';
            }}
          >
            Paul Christian Tan
          </a>
        </p>
        
        <p className="text-muted small mt-2 fade-in">
          This is a fanmade website dedicated to KAIA. All rights belong to their respective owners.
        </p>
        
        <p className="text-muted small mt-2 fade-in">
          © 2025 KAIAverse. Made with React for the ZAIA community.
        </p>
      </div>
    </footer>
  );
};

export default Footer;