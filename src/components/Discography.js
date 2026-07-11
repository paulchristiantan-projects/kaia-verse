import React, { useState } from 'react';
import { musicData } from '../data/music';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import { getAssetPath } from '../utils/assetHelper';
import LyricsPlayer from './LyricsPlayer';
import ShareSongCard from './ShareSongCard';
import MusicTimeline from './MusicTimeline';
import Awards from './Awards';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

const Discography = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playSong, currentSong, isPlaying } = useMusicPlayer();
  const selectedSong = musicData[currentIndex];

  const isCurrentlyPlaying = (song) => {
    return currentSong?.id === song.id && isPlaying;
  };

  // Check if the selected song is the one currently playing (for lyrics sync)
  const isSongPlaying = currentSong?.id === selectedSong.id && isPlaying;

  return (
    <section className="content-section" id="discography">
      <div className="container px-4 px-lg-5">
        <div className="content-section-heading text-center">
          <h2 className="mb-5 fade-in">Music</h2>
        </div>

        <div className="music-carousel-container">
          <Swiper
            modules={[Navigation]}
            spaceBetween={-20}
            slidesPerView={5}
            centeredSlides={true}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 }
            }}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.realIndex);
            }}
            className="music-carousel"
          >
            {musicData.map((song, index) => {
              const isActive = index === currentIndex;
              return (
                <SwiperSlide key={song.id} data-index={index}>
                  <div className="music-slide-content">
                    <img
                      src={getAssetPath(song.image)}
                      alt={song.title}
                      className="music-cover"
                      onError={(e) => {
                        e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg');
                      }}
                    />
                    <h5>{song.title}</h5>
                    <p>{song.releaseDate}</p>

                    {isActive && (
                      <button
                        className="playButton-inline"
                        onClick={() => playSong(song)}
                        aria-label={isCurrentlyPlaying(song) ? `Pause ${song.title}` : `Play ${song.title}`}
                      >
                        {isCurrentlyPlaying(song) ? '⏸' : '▶'}
                      </button>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </Swiper>
        </div>

        {/* Song Info & Lyrics */}
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="song-info-panel">
              <h3>{selectedSong.title}</h3>
              <div className="song-info-grid">
                <div><strong>Artist:</strong> {selectedSong.artist}</div>
                <div><strong>Release Date:</strong> {selectedSong.releaseDate}</div>
                <div><strong>Album:</strong> Single</div>
                <div><strong>Genre:</strong> P-Pop</div>
              </div>
              <div className="song-actions">
                <ShareSongCard song={selectedSong} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="lyrics-panel">
              <div className="lyrics-panel-header">
                <h4 className="lyrics-heading">Lyrics</h4>
                {isSongPlaying && <span className="lyrics-live-badge">● LIVE</span>}
              </div>
              <div className="lyrics-content">
                {isSongPlaying ? (
                  <LyricsPlayer lyrics={selectedSong.lyrics} />
                ) : (
                  <pre className="lyrics-text">{selectedSong.lyrics}</pre>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Discography Timeline + Awards side by side */}
        <div className="row mt-5">
          <div className="col-md-6">
            <MusicTimeline />
          </div>
          <div className="col-md-6">
            <Awards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discography;
