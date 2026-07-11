import React from 'react';
import { getAssetPath } from '../utils/assetHelper';

const TIMELINE_DATA = [
  { year: '2025', month: 'Sep', title: 'Tara Sayaw', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-tara-sayaw.png' },
  { year: '2025', month: 'Jun', title: 'Walkie Talkie', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-walkietalkie.png' },
  { year: '2025', month: 'Mar', title: 'Tanga', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-tanga.png' },
  { year: '2024', month: 'Dec', title: 'A Perfect Christmas', type: 'Christmas Single', image: '%PUBLIC_URL%/assets/img/music-aperfectchristmas.png' },
  { year: '2024', month: 'Aug', title: 'Walang Biruan', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-walangbiruan.png' },
  { year: '2024', month: 'Apr', title: 'You Did It', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-youdidit.png' },
  { year: '2023', month: 'Feb', title: '5678', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-5678.png' },
  { year: '2022', month: 'Oct', title: 'TURN UP', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-turnup.png' },
  { year: '2022', month: 'Jul', title: 'Dalawa', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-dalawa.png' },
  { year: '2022', month: 'Apr', title: 'Blah Blah', type: 'Debut Single', image: '%PUBLIC_URL%/assets/img/music-blahblah.png' },
  { year: '2021', month: 'Dec', title: 'KAYA', type: 'Pre-debut Single', image: '%PUBLIC_URL%/assets/img/music-kaya.png' },
];

const ReleaseTimeline = () => {
  return (
    <div className="release-timeline">
      <h3 className="release-timeline-title">📀 Music Journey</h3>
      <div className="release-timeline-vertical">
        {TIMELINE_DATA.map((item, index) => (
          <div key={index} className="release-tl-item">
            <div className="release-tl-dot-wrapper">
              <div className="release-tl-dot"></div>
              {index < TIMELINE_DATA.length - 1 && <div className="release-tl-line"></div>}
            </div>
            <div className="release-tl-card">
              <img
                src={getAssetPath(item.image)}
                alt={item.title}
                className="release-tl-img"
                onError={(e) => { e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg'); }}
              />
              <div className="release-tl-info">
                <span className="release-tl-date">{item.month} {item.year}</span>
                <span className="release-tl-song">{item.title}</span>
                <span className="release-tl-type">{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleaseTimeline;
