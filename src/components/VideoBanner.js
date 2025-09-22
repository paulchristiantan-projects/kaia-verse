import React, { useEffect, useRef } from 'react';

const VideoBanner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('error', () => {
        // Handle video error by showing fallback image
        const fallback = video.nextElementSibling;
        if (fallback) {
          video.style.display = 'none';
          fallback.style.display = 'block';
        }
      });
    }
  }, []);

  return (
    <div className="video-banner position-relative text-white">
      {/* Video background for desktop */}
      <div className="video-wrapper position-absolute top-0 start-0 w-100 h-100 d-none d-md-block" style={{zIndex: -1}}>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-100 h-100"
          style={{objectFit: 'cover'}}
        >
          <source src="/assets/video/videoplayback-puregoldmv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fallback image for mobile */}
      <div className="image-wrapper position-absolute top-0 start-0 d-flex justify-content-center align-items-center d-block d-md-none" 
           style={{width: '100%', height: '100%', zIndex: -1}}>
        <img 
          src="/assets/img/gallery/kaia172.jpg" 
          alt="Puregold OPM Con 2025" 
          className="w-100 h-100"
          style={{objectFit: 'cover'}}
        />
      </div>

      {/* Bottom-centered content */}
      <div className="banner-content position-absolute start-50 translate-middle-x text-center p-4 w-100" 
           style={{bottom: '10%'}}>
        <h1 className="mb-2 slide-in-left">'KAIA performed at OPM Con 2025 in the Philippine Arena'</h1>
        <p className="mb-3 fade-in">Watch their Puregold Always Panalo MV on your favorite platform!</p>
        <div className="fade-in">
          <a 
            href="https://youtu.be/SqARYU7Xf0A?list=RDSqARYU7Xf0A" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-danger m-1"
            style={{
              background: '#FF0000',
              border: 'none',
              borderRadius: '25px',
              padding: '0.75rem 1.5rem',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 20px rgba(255, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <i className="fab fa-youtube"></i> Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;