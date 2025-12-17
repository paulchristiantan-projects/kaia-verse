import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Events = () => {
  const { isDarkMode } = useTheme();
  const [events, setEvents] = useState([]);
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const eventsPerPage = 10;

  useEffect(() => {
    const eventsData = {
      2024: [
        { id: 2, date: 'December 29', event: 'KPOP Convention 12', venue: 'SPACE, One Ayala', status: 'Completed' },
        { id: 1, date: 'October 29', event: 'Wish Bus (Walang Biruan)', venue: 'Venice Grand Canal Mall', status: 'Completed' }
      ],
      2025: [
        { id: 70, date: 'December 12', event: 'Sony 12:12 Mega Celebration', venue: 'Sony Philippines Tiktok Live', status: 'Completed' },
        { id: 69, date: 'December 8', event: 'Fierce and Fearless Carmona', venue: 'Brgy.Carmona, Makati', status: 'Completed' },
        { id: 68, date: 'December 5', event: 'PPOP Caravan: Concert', venue: 'St. Scholastica College', status: 'Completed' },
        { id: 67, date: 'December 2', event: 'Its Showtime', venue: 'Showtime Studio', status: 'Completed' },
        { id: 66, date: 'November 22', event: 'Puregold Hakot Relay', venue: 'Manila', status: 'Completed' },
        { id: 65, date: 'November 15', event: 'FLIGHT 27: TWIN EXPRESS', venue: 'Manila', status: 'Completed' },
        { id: 64, date: 'November 11', event: 'SONY 11:11 MEGA CELEBRATION', venue: 'Online', status: 'Completed' },
        { id: 63, date: 'November 9', event: 'NUBIA VIBEFEST 2025', venue: 'Gateway, Cubao', status: 'Completed' },
        { id: 62, date: 'November 8', event: 'ALPAS sunset sessions', venue: 'Alpas La Union', status: 'Postponed' },
        { id: 61, date: 'November 6', event: 'SONY ULT POWER SOUND', venue: 'Cebu', status: 'Completed' },
        { id: 60, date: 'October 21', event: 'Filipino Music Awards', venue: 'MOA Arena', status: 'Completed' },
        { id: 59, date: 'October 18', event: 'FWC 2025 Manila', venue: 'Ayala Malls, Manila Bay', status: 'Completed' },
        { id: 58, date: 'October 11', event: 'Blackout', venue: 'Bridgetown Open Grounds', status: 'Completed' },
        { id: 57, date: 'October 10', event: 'Fusion 10 (The Philippine Music Festival)', venue: 'UPLB Freedom Park', status: 'Completed' },
        { id: 56, date: 'October 3', event: 'PPOP Music & Culture Caravan', venue: 'Foro De Intramuros', status: 'Completed' },
        { id: 55, date: 'September 24', event: 'YORI Launch', venue: 'SM Megamall', status: 'Completed' },
        { id: 54, date: 'September 19', event: 'It\'s Showtime', venue: 'ABS CBN Live', status: 'Completed' },
        { id: 53, date: 'September 19', event: 'Billboard Philippines x Cosmos', venue: 'Baked Studios, Makati', status: 'Completed' },
        { id: 52, date: 'September 12', event: 'Love on Loop Album Concert (Lola Amour)', venue: 'SPACE, One Ayala', status: 'Completed' },
        { id: 51, date: 'September 6', event: 'DTI: Malikhaing Pinoy Expo', venue: 'SMX Convention Center, SM Aura', status: 'Completed' },
        { id: 50, date: 'August 30', event: 'New Ground: Kitchie Nadal', venue: 'Robinson, Las Pinas', status: 'Completed' },
        { id: 49, date: 'August 29', event: 'Wish Anniversary Celebration', venue: 'Eton Centris Open Grounds', status: 'Completed' },
        { id: 48, date: 'August 9', event: 'New Ground: Kitchie Nadal', venue: 'Robinsons Galleria Cebu City', status: 'Completed' },
        { id: 47, date: 'August 2', event: 'Ult Vibe Live', venue: 'BGC Amphitheater, Taguig City', status: 'Completed' },
        { id: 46, date: 'August 1', event: 'NESTCON 2025 (Nestle)', venue: 'SMX Convention (SM Aura), Taguig City', status: 'Completed' },
        { id: 45, date: 'July 5', event: 'Puregold: OPM CON 2025', venue: 'Philippine Arena', status: 'Completed' },
        { id: 44, date: 'June 28', event: 'Airasia: Fun Run', venue: 'Parqal, Paranaque City', status: 'Completed' },
        { id: 43, date: 'June 28', event: 'PPOPCON: Fete de la Musique', venue: 'Farmers Mall, Cubao', status: 'Completed' },
        { id: 42, date: 'June 21', event: 'Kitchie Nadal\'s New Ground Manila', venue: 'Smart Araneta Coliseum', status: 'Completed' },
        { id: 41, date: 'June 20', event: 'Animusika 2025', venue: 'DLSU Manila', status: 'Completed' },
        { id: 40, date: 'June 14', event: 'TOYCON 2025', venue: 'SMX Convention Center Manila', status: 'Completed' },
        { id: 39, date: 'June 12', event: 'Puregold MV', venue: '-', status: 'Completed' },
        { id: 38, date: 'June 7', event: 'Realme Mobile Legends Cup Grand Finals', venue: 'SM North EDSA', status: 'Completed' },
        { id: 37, date: 'June 6', event: 'Walkie Talkie song release', venue: 'Online Music', status: 'Completed' },
        { id: 36, date: 'May 27', event: 'KAOGMA Festival', venue: 'Pili, Camarines Sur', status: 'Completed' },
        { id: 35, date: 'May 26', event: 'Monster RX 93.1: The Concert Series', venue: 'Pasig City', status: 'Completed' },
        { id: 34, date: 'May 22 & May 24', event: 'Huawei Watch Fit 4 Series Launch', venue: 'BGC High Street Activity Center, Taguig City', status: 'Completed' },
        { id: 33, date: 'May 22', event: 'Binibining Pilipinas Press Presentation', venue: 'Live', status: 'Completed' },
        { id: 32, date: 'May 19', event: 'Grand Balangay Festival', venue: 'Butuan Sports Complex', status: 'Completed' },
        { id: 31, date: 'May 18', event: 'San Jose Partido Town Fiesta 2025', venue: 'San Jose, Camarines Sur', status: 'Completed' },
        { id: 30, date: 'May 17', event: 'KFC Crave and Music Live', venue: 'Live', status: 'Completed' },
        { id: 29, date: 'May 14', event: 'Magic 89.9', venue: 'Live', status: 'Completed' },
        { id: 28, date: 'May 4', event: 'All Out Sunday', venue: 'GMA', status: 'Completed' },
        { id: 27, date: 'April 30', event: 'Love Boracay', venue: 'Boracay Station 2', status: 'Completed' },
        { id: 26, date: 'April 26', event: 'KAIA\'s Anniversary Celebration', venue: 'Quezon City', status: 'Completed' },
        { id: 25, date: 'April 12', event: 'Vinfast PH KAIA\'s Meet and Greet', venue: 'World Trade Center', status: 'Completed' },
        { id: 24, date: 'April 8', event: 'TANGA MV release', venue: '-', status: 'Completed' },
        { id: 23, date: 'April 8', event: 'KAIA 3rd Anniversary', venue: '-', status: 'Completed' },
        { id: 22, date: 'April 7', event: 'Wish107.5', venue: 'Eton, Centris', status: 'Completed' },
        { id: 21, date: 'April 5', event: 'PJMA Madworld 2025', venue: 'FILOIL ECOOIL CENTRE', status: 'Completed' },
        { id: 20, date: 'March 28', event: 'TANGA music release', venue: '-', status: 'Completed' },
        { id: 19, date: 'March 17', event: 'Walkie Talkie', venue: 'SM City Davao', status: 'Completed' },
        { id: 18, date: 'March 15', event: 'Fusion MNL 2025', venue: 'CCP Open Grounds', status: 'Completed' },
        { id: 17, date: 'February 26', event: 'PINID National Arts Month', venue: 'Metropolitan Theater, Manila City', status: 'Completed' },
        { id: 16, date: 'February 24', event: 'Wish107.5 Roadshow', venue: 'Arellano University', status: 'Completed' },
        { id: 15, date: 'February 23', event: 'Panagbenga Grand Float Parade', venue: 'Baguio City', status: 'Completed' },
        { id: 14, date: 'February 19', event: 'Sayaw Pinoy!', venue: 'Quezon Convention Center, Lucena City', status: 'Completed' },
        { id: 13, date: 'February 15 - 16', event: 'BEECON 2025', venue: 'SMX Convention Center Bacolod', status: 'Completed' },
        { id: 12, date: 'February 13', event: '27th Paranaque Cityhood Anniversary', venue: 'Paranaque City', status: 'Completed' },
        { id: 11, date: 'February 7 - 9', event: 'Udaipur World Music Festival 2025', venue: 'Udaipur, India', status: 'Completed' },
        { id: 10, date: 'January 28', event: 'Puregold Lunar Year 2025', venue: '-', status: 'Completed' },
        { id: 9, date: 'January 26', event: 'Backyard Live', venue: 'Quezon City', status: 'Completed' },
        { id: 8, date: 'January 25', event: 'Dance Supremacy Kings & Queens', venue: 'The Theater, Solaire', status: 'Completed' },
        { id: 7, date: 'January 24', event: 'DTSN 2025', venue: 'Iloilo Convention Center', status: 'Completed' },
        { id: 6, date: 'January 10', event: 'Honor X9C 5G Grand Launch', venue: '-', status: 'Completed' },
        { id: 5, date: 'January 8', event: 'BRGY TFC', venue: '-', status: 'Completed' },
        { id: 4, date: 'January 1', event: 'Kapuso Countdown to 2025', venue: 'SM Mall of Asia (Open Grounds)', status: 'Completed' }
      ],
      2026: [
        { id: 57, date: 'January 10', event: 'ALPAS sunset sessions', venue: 'Alpas La Union', status: 'Upcoming' }
      ]
    };
    
    setEvents(eventsData);
    setLoading(false);
  }, []);

  const currentEvents = events[currentYear] || [];
  const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const displayEvents = currentEvents.slice(startIndex, startIndex + eventsPerPage);

  const setYear = (year) => {
    setCurrentYear(year);
    setCurrentPage(1);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'Upcoming': return 'var(--kaia-primary)';
      case 'Planned': return '#ffc107';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <section className="content-section" id="events">
        <div className="container px-4 px-lg-5">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-section" id="events">
      <div className="container px-4 px-lg-5">
        <div className="content-section-heading text-center mb-4">
          <h2 className="fade-in">Events</h2>
        </div>

        <div className="text-center mb-5">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <select
              value={currentYear}
              onChange={(e) => setYear(parseInt(e.target.value))}
              style={{
                background: isDarkMode ? '#4a5568' : 'white',
                color: isDarkMode ? 'white' : '#333',
                border: isDarkMode ? '2px solid #4a5568' : '2px solid #ddd',
                borderRadius: '8px',
                padding: '0.75rem 2rem 0.75rem 1rem',
                fontWeight: '500',
                fontSize: '1rem',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                minWidth: '120px'
              }}
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
            <div style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#666',
              fontSize: '0.8rem'
            }}>▼</div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(214, 51, 132, 0.05), rgba(184, 41, 107, 0.05))',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid rgba(214, 51, 132, 0.1)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid rgba(214, 51, 132, 0.1)'
          }}>
            <h3 style={{ 
              color: 'var(--kaia-primary)', 
              fontWeight: '700',
              fontSize: '1.75rem',
              margin: '0',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              KAIA Events {currentYear}
            </h3>
          </div>
        
        <div className="event-table-wrapper slide-in-left">
          <div 
            style={{
              background: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
          >
            <table className="table table-hover mb-0">
              <thead style={{ background: 'var(--kaia-primary)', color: 'white' }}>
                <tr>
                  <th style={{ padding: '1rem', border: 'none' }}>Date</th>
                  <th style={{ padding: '1rem', border: 'none' }}>Event</th>
                  <th style={{ padding: '1rem', border: 'none' }}>Venue</th>
                  <th style={{ padding: '1rem', border: 'none' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayEvents.map((event, index) => (
                  <tr 
                    key={event.id}
                    style={{
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8f9fa';
                      e.currentTarget.style.transform = 'scale(1.01)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <td style={{ padding: '1rem', border: 'none', fontWeight: '500' }}>
                      {event.date}
                    </td>
                    <td style={{ padding: '1rem', border: 'none', fontWeight: 'bold', color: 'var(--kaia-primary)' }}>
                      {event.event}
                    </td>
                    <td style={{ padding: '1rem', border: 'none', color: '#666' }}>
                      {event.venue}
                    </td>
                    <td style={{ padding: '1rem', border: 'none' }}>
                      <span 
                        style={{
                          background: getStatusColor(event.status),
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: '500'
                        }}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="events-mobile-cards">
          {displayEvents.map((event) => (
            <div key={event.id} className="event-mobile-card">
              <div className="event-date">{event.date}</div>
              <div className="event-title">{event.event}</div>
              <div className="event-venue">
                <i className="fas fa-map-marker-alt" style={{ marginRight: '0.5rem', color: 'var(--kaia-primary)' }}></i>
                {event.venue}
              </div>
              <span 
                className="event-status"
                style={{ background: getStatusColor(event.status) }}
              >
                {event.status}
              </span>
            </div>
          ))}
        </div>

          {totalPages > 1 && (
            <div className="pagination-controls" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginTop: '2rem',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button 
                className="pagination-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                style={{
                  background: currentPage === 1 ? 'rgba(0,0,0,0.1)' : 'var(--kaia-primary)',
                  color: currentPage === 1 ? '#999' : 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  boxShadow: currentPage === 1 ? 'none' : '0 4px 12px rgba(214, 51, 132, 0.3)'
                }}
              >
                Prev
              </button>
              
              <div className="pagination-info" style={{
                background: 'rgba(214, 51, 132, 0.1)',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                fontWeight: '600',
                color: 'var(--kaia-primary)',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap'
              }}>
                {currentPage} of {totalPages}
              </div>
              
              <button 
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{
                  background: currentPage === totalPages ? 'rgba(0,0,0,0.1)' : 'var(--kaia-primary)',
                  color: currentPage === totalPages ? '#999' : 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  boxShadow: currentPage === totalPages ? 'none' : '0 4px 12px rgba(214, 51, 132, 0.3)'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;