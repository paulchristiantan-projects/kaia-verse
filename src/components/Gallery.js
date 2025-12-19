import React, { useState, useEffect } from 'react';
import { getAssetPath } from '../utils/assetHelper';

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedMember, setSelectedMember] = useState('angela');
  const [loading, setLoading] = useState(true);
  const imagesPerPage = 6;

  useEffect(() => {
    // Generate gallery images array
    const images = [];
    const members = ['angela', 'charice', 'alexa', 'sophia', 'charlotte', 'kaia'];
    
    members.forEach(member => {
      for (let i = 18; i >= 1; i--) {
        if (member === 'kaia' && i > 18) continue; // KAIA has fewer images
        images.push({
          id: `${member}-${i}`,
          src: getAssetPath(`%PUBLIC_URL%/assets/img/gallery/${member}${i === 1 ? '' : i}.jpg`),
          alt: `${member.charAt(0).toUpperCase() + member.slice(1)} ${i}`,
          member: member
        });
      }
    });
    
    setGalleryImages(images);
    setFilteredImages(images.filter(img => img.member === 'angela'));
    setLoading(false);
  }, []);

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

  const handleMemberFilter = (member) => {
    setSelectedMember(member);
    setCurrentPage(1);
    setFilteredImages(galleryImages.filter(img => img.member === member));
  };

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

  const handleImageError = (e) => {
    e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg');
  };

  if (loading) {
    return (
      <section className="content-section" id="gallery">
        <div className="container px-4 px-lg-5">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-section" id="gallery">
      <div className="container px-4 px-lg-5">
        <div className="row">
          {/* Left Side - 3x3 Photo Grid */}
          <div className="col-md-9">
            <div className="content-section-heading text-center">
              <h2 className="fade-in">Gallery</h2>
            </div>
            
            {/* Mobile Dropdown */}
            <div className="mobile-member-select d-md-none mb-3 text-center">
              <select 
                value={selectedMember} 
                onChange={(e) => handleMemberFilter(e.target.value)}
                className="form-select"
              >
                {['angela', 'charice', 'alexa', 'sophia', 'charlotte', 'kaia'].map(member => (
                  <option key={member} value={member}>
                    {member.charAt(0).toUpperCase() + member.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="gallery-grid">
              {currentImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="gallery-tile"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    onError={handleImageError}
                    onClick={() => {
                      const modal = document.createElement('div');
                      modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 9999;
                        cursor: pointer;
                      `;
                      
                      const img = document.createElement('img');
                      img.src = image.src;
                      img.style.cssText = `
                        max-width: 90%;
                        max-height: 90%;
                        object-fit: contain;
                        border-radius: 10px;
                      `;
                      
                      modal.appendChild(img);
                      document.body.appendChild(modal);
                      
                      modal.onclick = () => {
                        document.body.removeChild(modal);
                      };
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="pagination">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
              >
                &laquo; Prev
              </button>
              
              <span className="page-info">
                {currentPage} of {totalPages}
              </span>
              
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
              >
                Next &raquo;
              </button>
            </div>
          </div>
          
          {/* Right Sidebar - Member Names Timeline */}
          <div className="col-md-3">
            {/* Desktop Timeline */}
            <div className="member-timeline gallery-timeline d-none d-md-flex">
              <div className="timeline-line"></div>
              {['angela', 'charice', 'alexa', 'sophia', 'charlotte', 'kaia'].map(member => (
                <div
                  key={member}
                  onClick={() => handleMemberFilter(member)}
                  className={`timeline-item ${selectedMember === member ? 'active' : ''}`}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-name">{member}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;