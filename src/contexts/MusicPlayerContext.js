import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { musicData } from '../data/music';
import { getAssetPath } from '../utils/assetHelper';

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Auto-play next song
      playNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSong = useCallback((song) => {
    const audio = audioRef.current;
    const songSrc = getAssetPath(song.audio);

    if (currentSong?.id === song.id) {
      // Toggle play/pause for same song
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      // New song
      audio.src = songSrc;
      audio.load();
      audio.play();
      setCurrentSong(song);
      setIsPlaying(true);
      setIsPlayerVisible(true);
    }
  }, [currentSong, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!currentSong) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }, [currentSong, isPlaying]);

  const seek = useCallback((percent) => {
    const audio = audioRef.current;
    if (duration) {
      const seekTime = (percent / 100) * duration;
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  }, [duration]);

  const playNext = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = musicData.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % musicData.length;
    const nextSong = musicData[nextIndex];
    const audio = audioRef.current;
    audio.src = getAssetPath(nextSong.audio);
    audio.load();
    audio.play();
    setCurrentSong(nextSong);
    setIsPlaying(true);
  }, [currentSong]);

  const playPrevious = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = musicData.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    const prevSong = musicData[prevIndex];
    const audio = audioRef.current;
    audio.src = getAssetPath(prevSong.audio);
    audio.load();
    audio.play();
    setCurrentSong(prevSong);
    setIsPlaying(true);
  }, [currentSong]);

  const closePlayer = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
    setIsPlayerVisible(false);
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const value = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isPlayerVisible,
    playSong,
    togglePlay,
    seek,
    playNext,
    playPrevious,
    closePlayer,
    formatTime,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
