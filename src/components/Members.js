import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { members } from '../data/members';

const Members = () => {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const currentMember = currentMemberIndex === -1 ? {
    name: 'KAIA',
    emoji: '🦋',
    birthName: 'About KAIA',
    position: 'P-Pop Girl Group',
    birthday: 'Debuted April 8, 2022',
    zodiac: 'Five Members',
    fandomName: 'ZAIA'
  } : members[currentMemberIndex];

  const handlePrevMember = () => {
    setCurrentMemberIndex(prev => prev > -1 ? prev - 1 : members.length - 1);
  };

  const handleNextMember = () => {
    setCurrentMemberIndex(prev => prev < members.length - 1 ? prev + 1 : -1);
  };

  const handleSeeMore = () => {
    setShowModal(true);
  };

  return (
    <>
      <section className="content-section bg-light" id="about">
        <div className="container px-4 px-lg-5">
          <div className="row">
            {/* Left Side - Timeline Indicator */}
            <div className="col-md-2">
              <div className="member-timeline">
                <div className="timeline-line"></div>
                <div 
                  className={`timeline-item ${currentMemberIndex === -1 ? 'active' : ''}`}
                  onClick={() => setCurrentMemberIndex(-1)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-name">About KAIA</div>
                </div>
                {members.map((member, index) => (
                  <div 
                    key={member.name}
                    className={`timeline-item ${index === currentMemberIndex ? 'active' : ''}`}
                    onClick={() => setCurrentMemberIndex(index)}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-name">{member.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Center - Photo Stack */}
            <div className="col-md-4">
              <div className="content-section-heading text-center">
                <h2 className="mb-5 fade-in">About KAIA</h2>
              </div>
              
              <div className="photo-stack">
                <div className="instax-photos">
                  <div className="photo-behind"></div>
                  <div className="photo-main">
                    <img src={currentMemberIndex === -1 ? '/assets/img/gallery/kaia.jpg' : currentMember.img} alt={currentMemberIndex === -1 ? 'KAIA Group' : currentMember.name} />
                  </div>
                </div>
                
                <div className="pagination">
                  <button onClick={handlePrevMember}>
                    &laquo; Prev
                  </button>
                  <span className="page-info">
                    {currentMemberIndex === -1 ? 'About' : `${currentMemberIndex + 1} of ${members.length}`}
                  </span>
                  <button onClick={handleNextMember}>
                    Next &raquo;
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Side - Member Details */}
            <div className="col-md-6">
              <div className="member-details-panel">
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
                    
                    <button className="see-more-btn" onClick={handleSeeMore}>
                      See More
                    </button>
                  </>
                )}
                
                {currentMemberIndex === -1 && (
                  <div className="kaia-about">
                    <p>KAIA is a five-member Filipina girl group consisting of Angela, Charice, Alexa, Sophia, and Charlotte.</p>
                    <p>The group name draws inspiration from the Cebuano word "kinaiya" reflecting inner character and individuality. It also resonates with the Filipino term "kaya" which symbolizes capability and courage. Coupled with their dragonfly-inspired logo, embodying beauty, strength, and subtle allure, KAIA is dedicated to unveiling their skill, uniqueness, and resolute determination through their music and performance. As they embark on the path to becoming successful artists, they are committed to transforming their dreams into reality.</p>
                    <p>They released a pre-debut single "KAYA" on December 10, 2021. They officially debuted on April 8, 2022 with "Blah Blah" followed up with digital singles "Dalawa", "TURN UP", and "5678". The group recently released their newest single, YOU DID IT, on April 12, 2024.</p>
                    <p>Their fandom is called <strong>ZAIA</strong>, a community that shares in their journey, passion, and growth.</p>
                  </div>
                )}
                
                {currentMemberIndex !== -1 && (
                  <div className="member-socials">
                    <a href={currentMember.socials.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href={currentMember.socials.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={currentMember.socials.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href={currentMember.socials.tiktok} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-tiktok"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <a href={currentMember.socials?.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href={currentMember.socials?.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={currentMember.socials?.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={currentMember.socials?.tiktok} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Members;