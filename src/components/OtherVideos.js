import React, { useState } from 'react';

const OtherVideos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 3;

  const otherKaiaVideos = [
    {
      title: "KAIA – 'Walang Biruan' | Backyard Live Performance",
      src: "https://www.youtube.com/embed/BWTRSFt1Q9Y?list=RDBWTRSFt1Q9Y"
    },
    {
      title: "KAIA – 'Walang Biruan' | 2024 ROUND FESTIVAL",
      src: "https://www.youtube.com/embed/LCzAZcqjB24?list=RDLCzAZcqjB24"
    },
    {
      title: "KAIA – 'KAYA' | 2024 ROUND FESTIVAL",
      src: "https://www.youtube.com/embed/5RmBL_XBSEo?list=RD5RmBL_XBSEo"
    },
    {
      title: "KAIA – 'Walang Biruan' | All-Out Sundays",
      src: "https://www.youtube.com/embed/eCj85yJGptE?list=RDeCj85yJGptE"
    },
    {
      title: "KAIA 'Tanga' | All-Out Sundays",
      src: "https://www.youtube.com/embed/X_rJ6ww3Usw?list=RDX_rJ6ww3Usw"
    },
    {
      title: "KAIA | Concert Series | RX931",
      src: "https://www.youtube.com/embed/jUIy6b02PQM"
    },
    {
      title: "KAIA plays The Whisper Challenge",
      src: "https://www.youtube.com/embed/6tv0FueOgPQ"
    },
    {
      title: "Family Feud: P-POP Battle with KAIA and 1621 BC (Feb 5, 2024)",
      src: "https://www.youtube.com/embed/ouxyqIRMSmU"
    }
  ];

  const totalPages = Math.ceil(otherKaiaVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = otherKaiaVideos.slice(startIndex, startIndex + videosPerPage);

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
    <div className="other-videos-section mt-5">
      <h3 className="text-center mb-4" style={{ color: 'var(--kaia-primary)' }}>
        Performances & More
      </h3>
      
      <div className="row gy-4">
        {currentVideos.map((video, index) => (
          <div key={index} className="col-md-4">
            <div className="video-card">
              <div 
                className="video-wrapper" 
                style={{ 
                  position: 'relative', 
                  paddingBottom: '56.25%', 
                  height: 0, 
                  overflow: 'hidden', 
                  borderRadius: '15px',
                  marginBottom: '1rem'
                }}
              >
                <iframe
                  src={video.src}
                  title={video.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '15px'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="video-caption text-center">
                <small style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.3' }}>
                  {video.title}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="other-videos-pagination text-center mt-4">
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
    </div>
  );
};

export default OtherVideos;