import React, { useState, useEffect, useMemo } from 'react';
import { members } from '../data/members';

const MEMBER_BIRTHDAYS = members.map(m => ({
  name: m.name,
  emoji: m.emoji,
  img: m.img,
  birthday: m.birthday,
}));

const parseBirthday = (birthdayStr) => {
  const parts = birthdayStr.split(' ');
  const month = new Date(`${parts[0]} 1, 2000`).getMonth();
  const day = parseInt(parts[1]);
  return { month, day };
};

const getNextBirthday = (member) => {
  const now = new Date();
  const { month, day } = parseBirthday(member.birthday);
  let next = new Date(now.getFullYear(), month, day);
  if (next < now) {
    next = new Date(now.getFullYear() + 1, month, day);
  }
  return next;
};

const getTimeUntil = (targetDate) => {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const isBirthdayToday = (member) => {
  const now = new Date();
  const { month, day } = parseBirthday(member.birthday);
  return now.getMonth() === month && now.getDate() === day;
};

const BirthdayCelebration = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [dismissed, setDismissed] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const birthdayMembers = useMemo(() =>
    MEMBER_BIRTHDAYS.filter(isBirthdayToday), []
  );

  const nextBirthdayMember = useMemo(() => {
    if (birthdayMembers.length > 0) return null;
    return MEMBER_BIRTHDAYS.reduce((closest, member) => {
      const next = getNextBirthday(member);
      const closestNext = closest ? getNextBirthday(closest) : null;
      if (!closestNext || next < closestNext) return member;
      return closest;
    }, null);
  }, [birthdayMembers]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nextBirthdayMember) {
        setTimeLeft(getTimeUntil(getNextBirthday(nextBirthdayMember)));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextBirthdayMember]);

  useEffect(() => {
    if (birthdayMembers.length > 0) {
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
        color: ['#d63384', '#ecb807', '#ff6b9d', '#ffd700', '#ff1493'][Math.floor(Math.random() * 5)],
      }));
      setConfetti(particles);
    }
  }, [birthdayMembers]);

  if (dismissed) return null;

  // Birthday celebration toaster
  if (birthdayMembers.length > 0) {
    return (
      <div className="bday-toaster bday-toaster-celebration">
        <div className="bday-confetti-mini">
          {confetti.slice(0, 20).map(p => (
            <div
              key={p.id}
              className="confetti-particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                backgroundColor: p.color,
              }}
            />
          ))}
        </div>
        <div className="bday-toaster-content">
          <div className="bday-toaster-left">
            {birthdayMembers.map(member => (
              <img key={member.name} src={member.img} alt={member.name} className="bday-toaster-avatar" />
            ))}
          </div>
          <div className="bday-toaster-info">
            <span className="bday-toaster-title">🎂 Happy Birthday!</span>
            <span className="bday-toaster-name">
              {birthdayMembers.map(m => `${m.emoji} ${m.name}`).join(' & ')}
            </span>
          </div>
        </div>
        <button className="bday-toaster-close" onClick={() => setDismissed(true)} aria-label="Close">✕</button>
      </div>
    );
  }

  // Countdown toaster
  if (!nextBirthdayMember) return null;

  return (
    <div className="bday-toaster">
      <div className="bday-toaster-content">
        <div className="bday-toaster-left">
          <img src={nextBirthdayMember.img} alt={nextBirthdayMember.name} className="bday-toaster-avatar" />
        </div>
        <div className="bday-toaster-info">
          <span className="bday-toaster-label">🎂 Next Birthday</span>
          <span className="bday-toaster-name">{nextBirthdayMember.emoji} {nextBirthdayMember.name}</span>
        </div>
        <div className="bday-toaster-timer">
          <div className="bday-toaster-unit">
            <span className="bday-toaster-num">{timeLeft.days || 0}</span>
            <span className="bday-toaster-lbl">D</span>
          </div>
          <div className="bday-toaster-unit">
            <span className="bday-toaster-num">{timeLeft.hours || 0}</span>
            <span className="bday-toaster-lbl">H</span>
          </div>
          <div className="bday-toaster-unit">
            <span className="bday-toaster-num">{timeLeft.minutes || 0}</span>
            <span className="bday-toaster-lbl">M</span>
          </div>
          <div className="bday-toaster-unit">
            <span className="bday-toaster-num">{timeLeft.seconds || 0}</span>
            <span className="bday-toaster-lbl">S</span>
          </div>
        </div>
      </div>
      <button className="bday-toaster-close" onClick={() => setDismissed(true)} aria-label="Close">✕</button>
    </div>
  );
};

export default BirthdayCelebration;
