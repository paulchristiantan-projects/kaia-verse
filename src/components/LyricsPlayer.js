import React, { useRef, useEffect, useMemo } from 'react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const LyricsPlayer = ({ lyrics }) => {
  const { currentTime, duration, isPlaying } = useMusicPlayer();
  const lyricsRef = useRef(null);

  // Split lyrics into lines and assign approximate timestamps
  const lines = useMemo(() => {
    if (!lyrics) return [];
    const splitLines = lyrics.split('\n').filter(l => l.trim());
    if (!duration || duration === 0) return splitLines.map((text, i) => ({ text, time: 0 }));

    // Distribute lines evenly across song duration
    const interval = duration / splitLines.length;
    return splitLines.map((text, i) => ({
      text,
      time: i * interval,
    }));
  }, [lyrics, duration]);

  // Find current line index based on playback time
  const currentLineIndex = useMemo(() => {
    if (!isPlaying || lines.length === 0) return -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (currentTime >= lines[i].time) return i;
    }
    return 0;
  }, [currentTime, lines, isPlaying]);

  // Auto-scroll to current line
  useEffect(() => {
    if (currentLineIndex >= 0 && lyricsRef.current) {
      const activeEl = lyricsRef.current.querySelector('.lyrics-line-active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLineIndex]);

  if (!lyrics) return <p className="lyrics-empty">No lyrics available</p>;

  return (
    <div className="lyrics-karaoke" ref={lyricsRef}>
      {lines.map((line, i) => (
        <p
          key={i}
          className={`lyrics-line ${i === currentLineIndex ? 'lyrics-line-active' : ''} ${i < currentLineIndex ? 'lyrics-line-past' : ''}`}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
};

export default LyricsPlayer;
