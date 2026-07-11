import React from 'react';

const AWARDS_DATA = [
  {
    year: '2026',
    awards: [
      { event: 'Billboard Philippines Women in Music', title: 'Listeners\' Choice Award', song: 'Tanga', won: true },
    ]
  },
  {
    year: '2025',
    awards: [
      { event: '10th PPOP Music Awards', title: 'International Breakthrough Artist of the Year', song: null, won: true },
      { event: 'Filipino Music Awards', title: 'Pop Song of the Year', song: 'Tanga', won: false },
    ]
  },
  {
    year: '2024',
    awards: [
      { event: '9th PPOP Music Awards', title: 'Rising Girl Group of the Year', song: null, won: true },
      { event: '9th PPOP Music Awards', title: 'Best Vocal Arrangement in a Song Recording', song: 'You Did It', won: true },
    ]
  },
];

const Awards = () => {
  return (
    <div className="awards-section">
      <h3 className="awards-section-title">🏆 Awards & Recognition</h3>
      <div className="awards-timeline">
        {AWARDS_DATA.map((yearGroup) => (
          <div key={yearGroup.year} className="awards-year-group">
            <div className="awards-year-badge">{yearGroup.year}</div>
            <div className="awards-list">
              {yearGroup.awards.map((award, i) => (
                <div key={i} className={`awards-card ${award.won ? 'awards-card-won' : 'awards-card-nom'}`}>
                  <div className="awards-card-icon">
                    {award.won ? '🏆' : '⭐'}
                  </div>
                  <div className="awards-card-info">
                    <span className="awards-card-event">{award.event}</span>
                    <span className="awards-card-title">{award.title}</span>
                    {award.song && (
                      <span className="awards-card-song">♪ {award.song}</span>
                    )}
                  </div>
                  <div className={`awards-card-status ${award.won ? 'won' : 'nom'}`}>
                    {award.won ? 'Won' : 'Nominated'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
