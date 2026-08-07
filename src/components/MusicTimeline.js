import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { getAssetPath } from '../utils/assetHelper';

const VOTE_KEY = 'kaia-song-vote';

const SONGS = [
  { id: 0, title: 'Hulog', date: 'June 2026', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-hulog.png' },
  { id: 1, title: 'Tara Sayaw', date: 'Sep 2025', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-tara-sayaw.png' },
  { id: 2, title: 'Walkie Talkie', date: 'Jun 2025', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-walkietalkie.png' },
  { id: 3, title: 'Tanga', date: 'Mar 2025', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-tanga.png' },
  { id: 4, title: 'A Perfect Christmas', date: 'Dec 2024', type: 'Christmas Single', image: '%PUBLIC_URL%/assets/img/music-aperfectchristmas.png' },
  { id: 5, title: 'Walang Biruan', date: 'Aug 2024', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-walangbiruan.png' },
  { id: 6, title: 'You Did It', date: 'Apr 2024', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-youdidit.png' },
  { id: 7, title: '5678', date: 'Feb 2023', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-5678.png' },
  { id: 8, title: 'TURN UP', date: 'Oct 2022', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-turnup.png' },
  { id: 9, title: 'Dalawa', date: 'Jul 2022', type: 'Single', image: '%PUBLIC_URL%/assets/img/music-dalawa.png' },
  { id: 10, title: 'Blah Blah', date: 'Apr 2022', type: 'Debut Single', image: '%PUBLIC_URL%/assets/img/music-blahblah.png' },
  { id: 11, title: 'KAYA', date: 'Dec 2021', type: 'Pre-debut Single', image: '%PUBLIC_URL%/assets/img/music-kaya.png' },
];

const MusicTimeline = () => {
  const [votes, setVotes] = useState({});
  const [userVote, setUserVote] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVotes();
    const saved = localStorage.getItem(VOTE_KEY);
    if (saved) setUserVote(saved);
  }, []);

  const loadVotes = async () => {
    try {
      const pollDoc = await getDoc(doc(db, 'polls', 'favoriteSong'));
      if (pollDoc.exists()) {
        const data = pollDoc.data();
        setVotes(data.votes || {});
        const total = Object.values(data.votes || {}).reduce((sum, v) => sum + v, 0);
        setTotalVotes(total);
      }
    } catch (err) {
      console.error('Error loading poll:', err);
    }
    setLoading(false);
  };

  const handleVote = async (songTitle) => {
    if (userVote) return;
    try {
      const pollRef = doc(db, 'polls', 'favoriteSong');
      const pollDoc = await getDoc(pollRef);
      if (pollDoc.exists()) {
        await setDoc(pollRef, {
          votes: { ...pollDoc.data().votes, [songTitle]: increment(1) }
        }, { merge: true });
      } else {
        await setDoc(pollRef, { votes: { [songTitle]: 1 } });
      }
      setVotes(prev => ({ ...prev, [songTitle]: (prev[songTitle] || 0) + 1 }));
      setTotalVotes(prev => prev + 1);
      setUserVote(songTitle);
      localStorage.setItem(VOTE_KEY, songTitle);
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const getPercentage = (songTitle) => {
    if (totalVotes === 0) return 0;
    return Math.round(((votes[songTitle] || 0) / totalVotes) * 100);
  };

  return (
    <div className="music-timeline-merged">
      <div className="music-timeline-header">
        <h3>📀 Discography & Fan Favorites</h3>
        <p className="music-timeline-subtitle">
          {userVote
            ? <span>You voted for <strong>{userVote}</strong> · {totalVotes} total votes</span>
            : <span>Vote for your favorite! · {totalVotes} votes</span>
          }
        </p>
      </div>

      <div className="music-timeline-list">
        {SONGS.map((song, index) => {
          const pct = getPercentage(song.title);
          const isVoted = userVote === song.title;
          const hasVoted = !!userVote;

          return (
            <div key={song.id} className={`mtl-item ${isVoted ? 'mtl-item-voted' : ''}`}>
              {/* Timeline connector */}
              <div className="mtl-connector">
                <div className="mtl-dot"></div>
                {index < SONGS.length - 1 && <div className="mtl-line"></div>}
              </div>

              {/* Song card */}
              <div className="mtl-card">
                <img
                  src={getAssetPath(song.image)}
                  alt={song.title}
                  className="mtl-img"
                  onError={(e) => { e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg'); }}
                />

                <div className="mtl-info">
                  <div className="mtl-top-row">
                    <span className="mtl-title">{song.title}</span>
                    <span className="mtl-date">{song.date}</span>
                  </div>
                  <span className="mtl-type">{song.type}</span>

                  {/* Vote bar */}
                  <div className="mtl-vote-row">
                    <div className="mtl-bar-bg">
                      <div
                        className="mtl-bar-fill"
                        style={{ width: hasVoted ? `${pct}%` : '0%' }}
                      />
                    </div>
                    {hasVoted ? (
                      <span className="mtl-pct">{pct}%</span>
                    ) : (
                      <button
                        className="mtl-vote-btn"
                        onClick={() => handleVote(song.title)}
                        disabled={loading}
                      >
                        Vote
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicTimeline;
