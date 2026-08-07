import React, { useState, useEffect, useMemo } from 'react';
import { getAssetPath } from '../utils/assetHelper';
import { useMember } from '../contexts/MemberContext';

const MEMBERS_LIST = ['angela', 'charice', 'alexa', 'sophia', 'charlotte', 'kaia'];

const Gallery = () => {
  const { selectedMember, setSelectedMember } = useMember();
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxImg, setLightboxImg] = useState(null);
  const imagesPerPage = 6;

  // Generate all gallery images once
  const galleryImages = useMemo(() => {
    const images = [];
    MEMBERS_LIST.forEach(member => {
      // Add numbered images from 18 down to 2
      for (let i = 18; i >= 2; i--) {
        images.push({
          id: `${member}-${i}`,
          src: getAssetPath(`%PUBLIC_URL%/assets/img/gallery/${member}${i}.jpg`),
          alt: `${member.charAt(0).toUpperCase() + member.slice(1)} photo ${i}`,
          member: member
        });
      }
      // Add member1a.jpg (variant of photo 1)
      images.push({
        id: `${member}-1a`,
        src: getAssetPath(`%PUBLIC_URL%/assets/img/gallery/${member}1a.jpg`),
        alt: `${member.charAt(0).toUpperCase() + member.slice(1)} photo 1a`,
        member: member
      });
      // Add member1.jpg (base photo, no number suffix)
      images.push({
        id: `${member}-1`,
        src: getAssetPath(`%PUBLIC_URL%/assets/img/gallery/${member}.jpg`),
        alt: `${member.charAt(0).toUpperCase() + member.slice(1)} photo 1`,
        member: member
      });
      // Add member0.jpg
      images.push({
        id: `${member}-0`,
        src: getAssetPath(`%PUBLIC_URL%/assets/img/gallery/${member}0.jpg`),
        alt: `${member.charAt(0).toUpperCase() + member.slice(1)} photo 0`,
        member: member
      });
    });
    return images;
  }, []);

  const filteredImages = useMemo(() =>
    galleryImages.filter(img => img.member === selectedMember),
    [galleryImages, selectedMember]
  );

  // Reset page when member changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMember]);

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

  const handleMemberFilter = (member) => {
    setSelectedMember(member);
  };

  return (
    <section className="content-section" id="gallery">
      <div className="container px-4 px-lg-5">
        {/* Header with member avatar tabs */}
        <div className="content-section-heading text-center">
          <h2 className="fade-in">Gallery</h2>
        </div>

        {/* Member filter tabs - avatar style */}
        <div className="gallery-member-tabs">
          {MEMBERS_LIST.map(member => (
            <button
              key={member}
              className={`gallery-member-tab ${selectedMember === member ? 'active' : ''}`}
              onClick={() => handleMemberFilter(member)}
            >
              <img
                src={getAssetPath(`%PUBLIC_URL%/assets/img/gallery/${member}.jpg`)}
                alt={member}
                className="gallery-member-tab-img"
                onError={(e) => { e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg'); }}
              />
              <span className="gallery-member-tab-name">
                {member.charAt(0).toUpperCase() + member.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="gallery-grid-unified">
          {currentImages.map((image) => (
            <div
              key={image.id}
              className="gallery-tile-unified"
              onClick={() => setLightboxImg(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                onError={(e) => { e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg'); }}
              />
              <div className="gallery-tile-overlay">
                <i className="fas fa-expand"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="gallery-pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="gallery-page-btn"
            >
              &laquo; Prev
            </button>
            <span className="gallery-page-info">{currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="gallery-page-btn"
            >
              Next &raquo;
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="gallery-lightbox" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Full size" />
          <button className="gallery-lightbox-close" aria-label="Close">✕</button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
