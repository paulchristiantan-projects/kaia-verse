import React, { useState, useEffect } from 'react';

const ALL_EVENTS = {
  2024: [
    { date: 'December 29', event: 'KPOP Convention 12', venue: 'SPACE, One Ayala' },
    { date: 'October 29', event: 'Wish Bus (Walang Biruan)', venue: 'Venice Grand Canal Mall' },
  ],
  2025: [
    { date: 'December 31', event: 'Eastwood New Year Countdown', venue: 'Eastwood, Quezon City' },
    { date: 'December 28', event: 'MMFF Rekonek Block Screening', venue: 'Gateway Cineplex 18' },
    { date: 'December 19', event: 'MMFF Parade', venue: 'Circuit Makati' },
    { date: 'December 15', event: 'Rekonek Premiere Night', venue: 'Trinoma, Quezon City' },
    { date: 'December 12', event: 'Sony 12:12 Mega Celebration', venue: 'Sony Philippines TikTok Live' },
    { date: 'December 8', event: 'Fierce and Fearless Carmona', venue: 'Brgy.Carmona, Makati' },
    { date: 'December 5', event: 'PPOP Caravan: Concert', venue: 'St. Scholastica College' },
    { date: 'December 2', event: 'Its Showtime', venue: 'Showtime Studio' },
    { date: 'November 22', event: 'Puregold Hakot Relay', venue: 'Manila' },
    { date: 'November 15', event: 'FLIGHT 27: TWIN EXPRESS', venue: 'Manila' },
    { date: 'November 9', event: 'NUBIA VIBEFEST 2025', venue: 'Gateway, Cubao' },
    { date: 'November 6', event: 'SONY ULT POWER SOUND', venue: 'Cebu' },
    { date: 'October 21', event: 'Filipino Music Awards', venue: 'MOA Arena' },
    { date: 'October 18', event: 'FWC 2025 Manila', venue: 'Ayala Malls, Manila Bay' },
    { date: 'October 11', event: 'Blackout', venue: 'Bridgetown Open Grounds' },
    { date: 'October 10', event: 'Fusion 10', venue: 'UPLB Freedom Park' },
    { date: 'October 3', event: 'PPOP Music & Culture Caravan', venue: 'Foro De Intramuros' },
    { date: 'September 24', event: 'YORI Launch', venue: 'SM Megamall' },
    { date: 'September 19', event: 'Billboard Philippines x Cosmos', venue: 'Baked Studios, Makati' },
    { date: 'September 12', event: 'Love on Loop Album Concert', venue: 'SPACE, One Ayala' },
    { date: 'September 6', event: 'DTI: Malikhaing Pinoy Expo', venue: 'SMX Convention Center' },
    { date: 'August 30', event: 'New Ground: Kitchie Nadal', venue: 'Robinson, Las Pinas' },
    { date: 'August 29', event: 'Wish Anniversary Celebration', venue: 'Eton Centris Open Grounds' },
    { date: 'August 9', event: 'New Ground: Kitchie Nadal', venue: 'Robinsons Galleria Cebu' },
    { date: 'August 2', event: 'Ult Vibe Live', venue: 'BGC Amphitheater' },
    { date: 'August 1', event: 'NESTCON 2025', venue: 'SMX Convention (SM Aura)' },
    { date: 'July 5', event: 'Puregold: OPM CON 2025', venue: 'Philippine Arena' },
    { date: 'June 28', event: 'PPOPCON: Fete de la Musique', venue: 'Farmers Mall, Cubao' },
    { date: 'June 21', event: "Kitchie Nadal's New Ground Manila", venue: 'Smart Araneta Coliseum' },
    { date: 'June 20', event: 'Animusika 2025', venue: 'DLSU Manila' },
    { date: 'June 14', event: 'TOYCON 2025', venue: 'SMX Convention Center Manila' },
    { date: 'June 7', event: 'Realme Mobile Legends Cup Grand Finals', venue: 'SM North EDSA' },
    { date: 'June 6', event: 'Walkie Talkie song release', venue: 'Online Music' },
    { date: 'May 27', event: 'KAOGMA Festival', venue: 'Pili, Camarines Sur' },
    { date: 'May 26', event: 'Monster RX 93.1: The Concert Series', venue: 'Pasig City' },
    { date: 'May 19', event: 'Grand Balangay Festival', venue: 'Butuan Sports Complex' },
    { date: 'May 4', event: 'All Out Sunday', venue: 'GMA' },
    { date: 'April 30', event: 'Love Boracay', venue: 'Boracay Station 2' },
    { date: 'April 26', event: "KAIA's Anniversary Celebration", venue: 'Quezon City' },
    { date: 'April 12', event: "Vinfast PH KAIA's Meet and Greet", venue: 'World Trade Center' },
    { date: 'April 8', event: 'KAIA 3rd Anniversary', venue: '-' },
    { date: 'March 28', event: 'TANGA music release', venue: 'Online' },
    { date: 'March 15', event: 'Fusion MNL 2025', venue: 'CCP Open Grounds' },
    { date: 'February 26', event: 'PINID National Arts Month', venue: 'Metropolitan Theater' },
    { date: 'February 23', event: 'Panagbenga Grand Float Parade', venue: 'Baguio City' },
    { date: 'February 19', event: 'Sayaw Pinoy!', venue: 'Quezon Convention Center' },
    { date: 'February 13', event: '27th Paranaque Cityhood Anniversary', venue: 'Paranaque City' },
    { date: 'January 28', event: 'Puregold Lunar Year 2025', venue: '-' },
    { date: 'January 26', event: 'Backyard Live', venue: 'Quezon City' },
    { date: 'January 25', event: 'Dance Supremacy Kings & Queens', venue: 'The Theater, Solaire' },
    { date: 'January 24', event: 'DTSN 2025', venue: 'Iloilo Convention Center' },
    { date: 'January 1', event: 'Kapuso Countdown to 2025', venue: 'SM Mall of Asia' },
  ],
  2026: [
    { date: 'February 22', event: 'Backyard Live Spotlight', venue: 'Backyard Warehouse Studio' },
    { date: 'January 28', event: 'ROUND PRESSCON', venue: 'Gateway, Cubao' },
    { date: 'January 27', event: 'PPOP Music and Culture Caravan', venue: 'Dela Salle - College of Saint Benilde' },
    { date: 'January 11', event: 'ASAP', venue: 'Online' },
    { date: 'January 10', event: 'ALPAS sunset sessions', venue: 'Alpas La Union' },
    { date: 'January 9', event: 'PPOP Music and Culture Caravan', venue: 'Holy Family Academy, Pampanga' },
  ]
};

const OnThisDay = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.toLocaleString('en-US', { month: 'long' });
    const currentDay = now.getDate();

    const found = [];
    Object.entries(ALL_EVENTS).forEach(([year, events]) => {
      events.forEach(event => {
        // Parse "Month Day" format
        const parts = event.date.split(' ');
        if (parts.length >= 2) {
          const eventMonth = parts[0];
          const eventDay = parseInt(parts[1]);
          if (eventMonth === currentMonth && eventDay === currentDay) {
            found.push({ ...event, year });
          }
        }
      });
    });
    setMatches(found);
  }, []);

  if (matches.length === 0) return null;

  return (
    <div className="on-this-day">
      <div className="on-this-day-icon">📅</div>
      <div className="on-this-day-content">
        <span className="on-this-day-label">On This Day</span>
        {matches.map((m, i) => (
          <div key={i} className="on-this-day-item">
            <span className="on-this-day-year">{m.year}</span>
            <span className="on-this-day-event">{m.event}</span>
            <span className="on-this-day-venue">{m.venue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnThisDay;
