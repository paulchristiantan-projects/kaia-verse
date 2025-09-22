import React, { useState } from 'react';
import OtherVideos from './OtherVideos';

const Videos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 1;

  const videoList = [
    {
      src: "https://www.youtube.com/embed/SqARYU7Xf0A",
      title: "Puregold Nasa Atin Ang Panalo- Kaya Mo ft. KAIA"
    },
    {
      src: "https://www.youtube.com/embed/jY5--PXuAx0",
      title: "KAIA 'TANGA' Official Music Video"
    },
    {
      src: "https://www.youtube.com/embed/i7b-r5yszw0",
      title: "KAIA 'Walang Biruan' Official Music Video"
    },
    {
      src: "https://www.youtube.com/embed/Z1Lfxww39h8",
      title: "KAIA 'YOU DID IT' Official Music Video"
    },
    {
      src: "https://www.youtube.com/embed/7_PGKzNVD4I",
      title: "KAIA '5678' Official Music Video"
    },
    {
      src: "https://www.youtube.com/embed/kGwgyKovR-w",
      title: "KAIA 'KAYA' Performance (Acoustic Version)"
    }
  ];

  const totalPages = Math.ceil(videoList.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideo = videoList[startIndex];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="videos-section mt-5">
      <h3 className="text-center mb-4" style={{ color: 'var(--kaia-primary)' }}>
        Music Videos
      </h3>
      
      <div className="video-container text-center">
        <div className="video-wrapper" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '15px', background: '#f0f0f0' }}>
          <iframe
            src={currentVideo.src}
            title={currentVideo.title}
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={(e) => console.log('Video failed to load:', e)}
          />
          {/* Fallback link */}
          <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
            <a 
              href={currentVideo.src.replace('/embed/', '/watch?v=')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--kaia-primary)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontSize: '12px'
              }}
            >
              Watch on YouTube
            </a>
          </div>
        </div>
        
        <h4 className="mt-3" style={{ color: 'var(--kaia-primary)', fontSize: '1.1rem' }}>
          {currentVideo.title}
        </h4>
        
        {/* Debug info */}
        <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
          Video URL: {currentVideo.src}
        </small>
      </div>

      {/* Pagination */}
      <div className="video-pagination text-center mt-4">
        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            background: currentPage === 1 ? '#ccc' : 'var(--kaia-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            padding: '0.5rem 1rem',
            margin: '0 0.5rem',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          &laquo; Prev
        </button>
        
        <span style={{ 
          margin: '0 1rem', 
          fontWeight: 'bold',
          color: 'var(--kaia-primary)'
        }}>
          {currentPage} of {totalPages}
        </span>
        
        <button 
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            background: currentPage === totalPages ? '#ccc' : 'var(--kaia-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            padding: '0.5rem 1rem',
            margin: '0 0.5rem',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Next &raquo;
        </button>
      </div>
      
      {/* Other Videos Section */}
      <OtherVideos />
    </div>
  );
};

export default Videos;