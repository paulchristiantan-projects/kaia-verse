import React, { useState, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { members } from '../data/members';
import { useMember } from '../contexts/MemberContext';
import { getAssetPath } from '../utils/assetHelper';

const Members = () => {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [galleryPage, setGalleryPage] = useState(1);
  const { setSelectedMember } = useMember();
  const imagesPerPage = 9;

  const currentMember = currentMemberIndex === -1 ? {
    name: 'KAIA',
    emoji: '🦋',
    birthName: 'About KAIA',
    position: 'P-Pop Girl Group',
    birthday: 'Debuted April 8, 2022',
    zodiac: 'Five Members',
    fandomName: 'ZAIA'
  } : members[currentMemberIndex];

  const handleMemberSelect = (index) => {
    setCurrentMemberIndex(index);
    setGalleryPage(1);
    if (index === -1) {
      setSelectedMember('kaia');
    } else {
      setSelectedMember(members[index].name.toLowerCase());
    }
  };

  const handlePrevMember = () => {
    const newIndex = currentMemberIndex > -1 ? currentMemberIndex - 1 : members.length - 1;
    handleMemberSelect(newIndex);
  };

  const handleNextMember = () => {
    const newIndex = currentMemberIndex < members.length - 1 ? currentMemberIndex + 1 : -1;
    handleMemberSelect(newIndex);
  };

  // Generate gallery photos for current member
  const memberPhotos = useMemo(() => {
    const memberName = currentMemberIndex === -1 ? 'kaia' : members[currentMemberIndex].name.toLowerCase();
    const photos = [];
    for (let i = 1; i <= 18; i++) {
      photos.push({
        id: `${memberName}-${i}`,
        src: getAssetPath(`%PUBLIC_URL%/assets/img/gallery/${memberName}${i === 1 ? '' : i}.jpg`),
        alt: `${memberName} photo ${i}`,
      });
    }
    return photos;
  }, [currentMemberIndex]);

  const totalGalleryPages = Math.ceil(memberPhotos.length / imagesPerPage);
  const currentGalleryImages = memberPhotos.slice(
    (galleryPage - 1) * imagesPerPage,
    galleryPage * imagesPerPage
  );

  return (
    <>
      <section className="content-section bg-light" id="about">
        <div className="container px-4 px-lg-5">
          <div className="row">
            {/* Left Side - Timeline */}
            <div className="col-md-2">
              <div className="member-timeline">
                <div className="timeline-line"></div>
                <div
                  className={`timeline-item ${currentMemberIndex === -1 ? 'active' : ''}`}
                  onClick={() => handleMemberSelect(-1)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-name">About KAIA</div>
                </div>
                {members.map((member, index) => (
                  <div
                    key={member.name}
                    className={`timeline-item ${index === currentMemberIndex ? 'active' : ''}`}
                    onClick={() => handleMemberSelect(index)}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-name">{member.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center - Photo + Gallery side by side */}
            <div className="col-md-10">
              <div className="content-section-heading text-center">
                <h2 className="mb-5 fade-in">About KAIA</h2>
              </div>

              <div className="member-top-row">
                {/* Instax photo */}
                <div className="photo-stack">
                  <div className="instax-photos">
                    <div className="photo-behind"></div>
                    <div className="photo-main">
                      <img
                        src={currentMemberIndex === -1 ? '/assets/img/gallery/kaia.jpg' : currentMember.img}
                        alt={currentMemberIndex === -1 ? 'KAIA Group' : currentMember.name}
                      />
                    </div>
                  </div>
                </div>

                {/* Gallery grid beside photo */}
                <div className="member-gallery-beside">
                  <div className="gallery-grid-unified">
                    {currentGalleryImages.map((photo) => (
                      <div
                        key={photo.id}
                        className="gallery-tile-unified"
                        onClick={() => setLightboxImg(photo.src)}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          onError={(e) => { e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg'); }}
                        />
                        <div className="gallery-tile-overlay">
                          <i className="fas fa-expand"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalGalleryPages > 1 && (
                    <div className="gallery-pagination">
                      <button onClick={() => setGalleryPage(p => Math.max(1, p - 1))} disabled={galleryPage === 1} className="gallery-page-btn">&laquo;</button>
                      <span className="gallery-page-info">{galleryPage} of {totalGalleryPages}</span>
                      <button onClick={() => setGalleryPage(p => Math.min(totalGalleryPages, p + 1))} disabled={galleryPage === totalGalleryPages} className="gallery-page-btn">&raquo;</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Details card below */}
              <div className="member-details-panel mt-4">
                <h3>{currentMember.name} {currentMember.emoji}</h3>

                {currentMemberIndex !== -1 && (
                  <>
                    <div className="member-info-grid">
                      <div><strong>Birth Name:</strong> {currentMember.birthName}</div>
                      <div><strong>Position:</strong> {currentMember.position}</div>
                      <div><strong>Birthday:</strong> {currentMember.birthday}</div>
                      <div><strong>Zodiac:</strong> {currentMember.zodiac}</div>
                      <div><strong>Fandom Name:</strong> {currentMember.fandomName}</div>
                    </div>

                    <button className="see-more-btn" onClick={() => setShowModal(true)}>
                      See More
                    </button>
                  </>
                )}

                {currentMemberIndex === -1 && (
                  <div className="kaia-about">
                    <p>KAIA is a five-member Filipina girl group consisting of Angela, Charice, Alexa, Sophia, and Charlotte.</p>
                    <p>The group name draws inspiration from the Cebuano word "kinaiya" reflecting inner character and individuality. It also resonates with the Filipino term "kaya" which symbolizes capability and courage.</p>
                    <p>They released a pre-debut single "KAYA" on December 10, 2021. They officially debuted on April 8, 2022 with "Blah Blah" followed up with digital singles "Dalawa", "TURN UP", and "5678".</p>
                    <p>Their fandom is called <strong>ZAIA</strong>, a community that shares in their journey, passion, and growth.</p>
                  </div>
                )}

                {currentMemberIndex !== -1 && (
                  <div className="member-socials">
                    <a href={currentMember.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                    <a href={currentMember.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href={currentMember.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href={currentMember.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Member navigation buttons */}
          <div className="member-nav-buttons">
            <button onClick={handlePrevMember} className="gallery-page-btn">&laquo; Prev</button>
            <span className="gallery-page-info">
              {currentMemberIndex === -1 ? 'About' : `${currentMemberIndex + 1} of ${members.length}`}
            </span>
            <button onClick={handleNextMember} className="gallery-page-btn">Next &raquo;</button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="gallery-lightbox" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Full size" />
          <button className="gallery-lightbox-close" aria-label="Close">✕</button>
        </div>
      )}

      {currentMemberIndex !== -1 && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton style={{ background: 'var(--kaia-primary)', color: 'white' }}>
            <Modal.Title>{currentMember.name} {currentMember.emoji}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="member-bio">
              {currentMember.bio && currentMember.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph.split('*').map((part, i) =>
                    i % 2 === 1 ? <em key={i}>{part}</em> : part
                  )}
                </p>
              ))}
            </div>
            <div className="member-socials text-center mt-4">
              <a href={currentMember.socials?.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href={currentMember.socials?.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href={currentMember.socials?.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href={currentMember.socials?.tiktok} target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Members;
