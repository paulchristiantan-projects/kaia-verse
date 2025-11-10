import React, { useState, useRef, useEffect } from 'react';
import { musicData } from '../data/music';
import { getAssetPath } from '../utils/assetHelper';
// import Videos from './Videos';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

const Discography = () => {
  const [currentSong, setCurrentSong] = useState(musicData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [setSwiperInstance] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime = (e.target.value / 100) * duration;
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <section className="content-section" id="discography">
      <div className="container px-4 px-lg-5">
        <div className="content-section-heading text-center">
          <h2 className="mb-5 fade-in">Music</h2>
        </div>

        {/* Music Carousel */}
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
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              const activeIndex = swiper.realIndex;
              handleSongSelect(musicData[activeIndex]);
            }}
            className="music-carousel"
          >
            {musicData.map((song, index) => {
              const currentIndex = musicData.findIndex(s => s.id === currentSong.id);
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
                      <div className="music-player-inline">
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          <span style={{ fontSize: '0.8rem', marginRight: '0.5rem' }}>
                            {formatTime(currentTime)}
                          </span>
                          
                          <button 
                            className="playButton-inline"
                            onClick={togglePlay}
                          >
                            {isPlaying ? '⏸' : '▶'}
                          </button>
                          
                          <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                            {formatTime(duration)}
                          </span>
                        </div>

                        <input
                          type="range"
                          className="seekBar-inline"
                          value={duration ? (currentTime / duration) * 100 : 0}
                          onChange={handleSeek}
                        />

                        <audio ref={audioRef} src={getAssetPath(currentSong.audio)} />
                      </div>
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
              <h3>{currentSong.title}</h3>
              
              <div className="song-info-grid">
                <div><strong>Artist:</strong> {currentSong.artist}</div>
                <div><strong>Release Date:</strong> {currentSong.releaseDate}</div>
                <div><strong>Album:</strong> Single</div>
                <div><strong>Genre:</strong> P-Pop</div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="lyrics-panel">
              <h4 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>Lyrics</h4>
              <div 
                style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid rgba(214, 51, 132, 0.1)'
                }}
              >
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0
                }}>
                  {currentSong.lyrics}
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        {/* Videos Section */}
        {/* <Videos /> */}
      </div>
    </section>
  );
};

export default Discography;