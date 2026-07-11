import React from 'react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import { getAssetPath } from '../utils/assetHelper';

const PersistentPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isPlayerVisible,
    togglePlay,
    seek,
    playNext,
    playPrevious,
    closePlayer,
    formatTime,
  } = useMusicPlayer();

  if (!isPlayerVisible || !currentSong) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="persistent-player">
      <div className="persistent-player-progress" style={{ width: `${progress}%` }} />
      
      <div className="persistent-player-content">
        <div className="persistent-player-song">
          <img
            src={getAssetPath(currentSong.image)}
            alt={currentSong.title}
            className="persistent-player-cover"
            onError={(e) => {
              e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg');
            }}
          />
          <div className="persistent-player-info">
            <span className="persistent-player-title">{currentSong.title}</span>
            <span className="persistent-player-artist">{currentSong.artist}</span>
          </div>
        </div>

        <div className="persistent-player-controls">
          <button
            className="persistent-player-btn"
            onClick={playPrevious}
            aria-label="Previous song"
          >
            ⏮
          </button>
          <button
            className="persistent-player-btn persistent-player-btn-main"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            className="persistent-player-btn"
            onClick={playNext}
            aria-label="Next song"
          >
            ⏭
          </button>
        </div>

        <div className="persistent-player-time">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            className="persistent-player-seek"
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <button
          className="persistent-player-close"
          onClick={closePlayer}
          aria-label="Close player"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PersistentPlayer;
