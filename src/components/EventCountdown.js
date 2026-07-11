import React, { useState, useEffect } from 'react';

// Upcoming events that haven't happened yet
const UPCOMING_EVENTS = [
  {
    id: 1,
    name: "Backyard Live Spotlight",
    date: "2026-02-22",
    venue: "Backyard Warehouse Studio",
  },
];

const getNextEvent = () => {
  const now = new Date();
  const upcoming = UPCOMING_EVENTS
    .map(e => ({ ...e, dateObj: new Date(e.date) }))
    .filter(e => e.dateObj > now)
    .sort((a, b) => a.dateObj - b.dateObj);
  return upcoming[0] || null;
};

const getTimeUntil = (targetDate) => {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const EventCountdown = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const event = getNextEvent();
    setNextEvent(event);
  }, []);

  useEffect(() => {
    if (!nextEvent) return;
    const interval = setInterval(() => {
      const remaining = getTimeUntil(nextEvent.dateObj);
      setTimeLeft(remaining);
      if (!remaining) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextEvent]);

  if (!nextEvent || !timeLeft) return null;

  return (
    <div className="event-countdown">
      <div className="event-countdown-inner">
        <div className="event-countdown-info">
          <span className="event-countdown-badge">🔥 NEXT EVENT</span>
          <h3 className="event-countdown-name">{nextEvent.name}</h3>
          <p className="event-countdown-venue">
            <i className="fas fa-map-marker-alt"></i> {nextEvent.venue}
          </p>
        </div>
        <div className="event-countdown-timer">
          <div className="event-countdown-unit">
            <span className="event-countdown-number">{timeLeft.days}</span>
            <span className="event-countdown-label">Days</span>
          </div>
          <div className="event-countdown-separator">:</div>
          <div className="event-countdown-unit">
            <span className="event-countdown-number">{timeLeft.hours}</span>
            <span className="event-countdown-label">Hours</span>
          </div>
          <div className="event-countdown-separator">:</div>
          <div className="event-countdown-unit">
            <span className="event-countdown-number">{timeLeft.minutes}</span>
            <span className="event-countdown-label">Min</span>
          </div>
          <div className="event-countdown-separator">:</div>
          <div className="event-countdown-unit">
            <span className="event-countdown-number">{timeLeft.seconds}</span>
            <span className="event-countdown-label">Sec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCountdown;
