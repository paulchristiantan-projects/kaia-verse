import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { getAssetPath } from '../utils/assetHelper';

const VOTE_KEY = 'kaia-song-vote';

// All KAIA songs for the poll
const ALL_SONGS = [
  { id: 0, title: 'Hulog', image: '%PUBLIC_URL%/assets/img/music-hulog.png' },
  { id: 1, title: 'Tara Sayaw', image: '%PUBLIC_URL%/assets/img/music-tara-sayaw.png' },
  { id: 2, title: 'Walkie Talkie', image: '%PUBLIC_URL%/assets/img/music-walkietalkie.png' },
  { id: 3, title: 'Tanga', image: '%PUBLIC_URL%/assets/img/music-tanga.png' },
  { id: 4, title: 'A Perfect Christmas', image: '%PUBLIC_URL%/assets/img/music-aperfectchristmas.png' },
  { id: 5, title: 'Walang Biruan', image: '%PUBLIC_URL%/assets/img/music-walangbiruan.png' },
  { id: 6, title: 'You Did It', image: '%PUBLIC_URL%/assets/img/music-youdidit.png' },
  { id: 7, title: '5678', image: '%PUBLIC_URL%/assets/img/music-5678.png' },
  { id: 8, title: 'TURN UP', image: '%PUBLIC_URL%/assets/img/music-turnup.png' },
  { id: 9, title: 'Dalawa', image: '%PUBLIC_URL%/assets/img/music-dalawa.png' },
  { id: 10, title: 'Blah Blah', image: '%PUBLIC_URL%/assets/img/music-blahblah.png' },
  { id: 11, title: 'KAYA', image: '%PUBLIC_URL%/assets/img/music-kaya.png' },
];

const SongPoll = () => {
  const [votes, setVotes] = useState({});
  const [userVote, setUserVote] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVotes();
    // Check if user already voted (localStorage)
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
    if (userVote) return; // Already voted

    try {
      const pollRef = doc(db, 'polls', 'favoriteSong');
      const pollDoc = await getDoc(pollRef);

      if (pollDoc.exists()) {
        await setDoc(pollRef, {
          votes: { ...pollDoc.data().votes, [songTitle]: increment(1) }
        }, { merge: true });
      } else {
        await setDoc(pollRef, {
          votes: { [songTitle]: 1 }
        });
      }

      // Update local state
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

  if (loading) return null;

  return (
    <div className="song-poll">
      <div className="song-poll-header">
        <h3>🗳️ Fan Favorites</h3>
        <p className="song-poll-subtitle">
          {userVote ? `You voted for "${userVote}"` : 'Vote for your favorite KAIA song!'}
        </p>
        <span className="song-poll-total">{totalVotes} votes</span>
      </div>

      <div className="song-poll-list">
        {ALL_SONGS.map(song => {
          const pct = getPercentage(song.title);
          const isVoted = userVote === song.title;

          return (
            <div
              key={song.id}
              className={`song-poll-item ${isVoted ? 'voted' : ''} ${userVote ? 'has-voted' : ''}`}
              onClick={() => !userVote && handleVote(song.title)}
            >
              <img
                src={getAssetPath(song.image)}
                alt={song.title}
                className="song-poll-img"
                onError={(e) => { e.target.src = getAssetPath('%PUBLIC_URL%/assets/img/fallback-image.jpg'); }}
              />
              <div className="song-poll-info">
                <span className="song-poll-title">{song.title}</span>
                <div className="song-poll-bar-bg">
                  <div
                    className="song-poll-bar-fill"
                    style={{ width: userVote ? `${pct}%` : '0%' }}
                  />
                </div>
              </div>
              <span className="song-poll-pct">
                {userVote ? `${pct}%` : ''}
              </span>
              {!userVote && <span className="song-poll-vote-hint">Vote</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongPoll;
