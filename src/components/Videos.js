import React, { useState } from 'react';
// import { useTheme } from '../contexts/ThemeContext';

const Videos = () => {
  // const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOtherPage, setCurrentOtherPage] = useState(1);
  const videosPerPage = 1;
  const videosPerPageOther = 3;

  const videoList = [
    {
      src: "https://www.youtube.com/embed/SqARYU7Xf0A?list=RDSqARYU7Xf0A",
      title: "Puregold Nasa Atin Ang Panalo- Kaya Mo ft. KAIA"
    },
    {
      src: "https://www.youtube.com/embed/jY5--PXuAx0",
      title: "KAIA 'TANGA' Official Music Video"
    },
    {
      src: "https://www.youtube.com/embed/i7b-r5yszw0?list=RDi7b-r5yszw0",
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

  const totalPages = Math.ceil(videoList.length / videosPerPage);
  const totalOtherPages = Math.ceil(otherKaiaVideos.length / videosPerPageOther);
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

  const handlePrevOtherPage = () => {
    if (currentOtherPage > 1) {
      setCurrentOtherPage(currentOtherPage - 1);
    }
  };

  const handleNextOtherPage = () => {
    if (currentOtherPage < totalOtherPages) {
      setCurrentOtherPage(currentOtherPage + 1);
    }
  };

  return (
    <section className="page-section" id="videos">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="text-white mt-0 slide-in-left">Videos</h2>
            <hr className="divider divider-light" />
            <p className="text-white-75 mb-4 fade-in">
              Watch KAIA's official music videos and performances
            </p>
          </div>
        </div>

        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-lg-10">
            <div className="video-container mb-4 fade-in">
              <div className="ratio ratio-16x9">
                <iframe
                  src={currentVideo.src}
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                ></iframe>
              </div>
              <h5 className="text-white text-center mt-3">{currentVideo.title}</h5>
            </div>

            {/* Pagination Controls */}
            <div className="text-center mt-4">
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
                ← Prev
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
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Other KAIA Videos Section */}
        <div className="row gx-4 gx-lg-5 justify-content-center mt-5">
          <div className="col-lg-10">
            <h4 className="text-white text-center mb-4 fade-in">Other KAIA Performances</h4>
            
            <div className="row gx-4 gx-lg-5 mb-4">
              {otherKaiaVideos
                .slice((currentOtherPage - 1) * videosPerPageOther, currentOtherPage * videosPerPageOther)
                .map((video, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="video-card fade-in">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={video.src}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        style={{
                          borderRadius: '10px',
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                        }}
                      ></iframe>
                    </div>
                    <div className="video-caption mt-2 text-center">
                      <small className="text-white-75">{video.title}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Videos Pagination */}
            <div className="text-center mt-4">
              <button 
                onClick={handlePrevOtherPage}
                disabled={currentOtherPage === 1}
                style={{
                  background: currentOtherPage === 1 ? '#ccc' : 'var(--kaia-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0.5rem 1rem',
                  margin: '0 0.5rem',
                  cursor: currentOtherPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ← Prev
              </button>
              
              <span style={{ 
                margin: '0 1rem', 
                fontWeight: 'bold',
                color: 'var(--kaia-primary)'
              }}>
                {currentOtherPage} of {totalOtherPages}
              </span>
              
              <button 
                onClick={handleNextOtherPage}
                disabled={currentOtherPage === totalOtherPages}
                style={{
                  background: currentOtherPage === totalOtherPages ? '#ccc' : 'var(--kaia-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0.5rem 1rem',
                  margin: '0 0.5rem',
                  cursor: currentOtherPage === totalOtherPages ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;