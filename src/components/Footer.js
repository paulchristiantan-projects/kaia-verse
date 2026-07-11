import React from 'react';

const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://www.facebook.com/OfficialKAIA', icon: 'fab fa-facebook', colorClass: 'social-facebook' },
  { name: 'Twitter', url: 'https://x.com/KAIAOfficialPH', icon: 'fab fa-twitter', colorClass: 'social-twitter' },
  { name: 'Instagram', url: 'https://www.instagram.com/kaia.officialph', icon: 'fab fa-instagram', colorClass: 'social-instagram' },
  { name: 'Spotify', url: 'https://open.spotify.com/artist/5UWPjwwieMFFohWLHe4Usy', icon: 'icon-social-spotify', colorClass: 'social-spotify' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCdjyExLaRqAL7V684N8bayQ', icon: 'fab fa-youtube', colorClass: 'social-youtube' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@kaiaofficialph', icon: 'fab fa-tiktok', colorClass: 'social-tiktok' },
];

const Footer = () => {
  return (
    <footer className="footer text-center">
      <div className="container px-4 px-lg-5">
        <ul className="footer-social-links">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.name}>
              <a
                className={`social-link-btn ${social.colorClass}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit KAIA on ${social.name}`}
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
            className="footer-credit-link"
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
