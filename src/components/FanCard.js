import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { members } from '../data/members';

const BIAS_OPTIONS = members.map(m => ({ name: m.name, emoji: m.emoji, img: m.img }));

const FanCard = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedBias, setSelectedBias] = useState('');
  const [saving, setSaving] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Load profile from Firestore
        const profileDoc = await getDoc(doc(db, 'fanProfiles', firebaseUser.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
          setSelectedBias(profileDoc.data().bias || '');
        } else {
          // Create initial profile
          const newProfile = {
            displayName: firebaseUser.displayName || 'ZAIA',
            joinDate: new Date().toISOString(),
            bias: '',
            messagesCount: 0,
          };
          await setDoc(doc(db, 'fanProfiles', firebaseUser.uid), newProfile);
          setProfile(newProfile);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const saveBias = async () => {
    if (!user || !selectedBias) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'fanProfiles', user.uid), {
        ...profile,
        bias: selectedBias,
      }, { merge: true });
      setProfile(prev => ({ ...prev, bias: selectedBias }));
    } catch (err) {
      console.error('Error saving bias:', err);
    }
    setSaving(false);
  };

  const getMemberSince = () => {
    if (!profile?.joinDate) return 'Recently';
    const date = new Date(profile.joinDate);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getBiasInfo = () => {
    return BIAS_OPTIONS.find(m => m.name === (profile?.bias || selectedBias));
  };

  if (!isOpen) return null;

  return (
    <div className="fancard-overlay" onClick={onClose}>
      <div className="fancard-modal" onClick={e => e.stopPropagation()}>
        <button className="fancard-close" onClick={onClose} aria-label="Close">✕</button>
        
        {!user ? (
          <div className="fancard-login-prompt">
            <div className="fancard-icon">🎫</div>
            <h3>Your ZAIA Card</h3>
            <p>Log in to get your personalized fan card!</p>
            <a href="/message-kaia" className="fancard-login-btn">Log In</a>
          </div>
        ) : (
          <div className="fancard-content">
            <div className="fancard-card" ref={cardRef}>
              <div className="fancard-header-gradient"></div>
              <div className="fancard-body">
                <div className="fancard-avatar">
                  {getBiasInfo() ? (
                    <img src={getBiasInfo().img} alt={getBiasInfo().name} />
                  ) : (
                    <div className="fancard-avatar-placeholder">💖</div>
                  )}
                </div>
                <h2 className="fancard-username">
                  {profile?.displayName || user.displayName || 'ZAIA'}
                </h2>
                <div className="fancard-badge">ZAIA MEMBER</div>
                <div className="fancard-details">
                  <div className="fancard-detail">
                    <span className="fancard-detail-label">Member Since</span>
                    <span className="fancard-detail-value">{getMemberSince()}</span>
                  </div>
                  <div className="fancard-detail">
                    <span className="fancard-detail-label">Bias</span>
                    <span className="fancard-detail-value">
                      {getBiasInfo() ? `${getBiasInfo().emoji} ${getBiasInfo().name}` : 'Not set'}
                    </span>
                  </div>
                  <div className="fancard-detail">
                    <span className="fancard-detail-label">Messages Sent</span>
                    <span className="fancard-detail-value">{profile?.messagesCount || 0}</span>
                  </div>
                </div>
                <div className="fancard-logo">KAIAverse</div>
              </div>
            </div>

            {/* Bias selector */}
            <div className="fancard-bias-selector">
              <h4>Choose Your Bias</h4>
              <div className="fancard-bias-grid">
                {BIAS_OPTIONS.map(member => (
                  <button
                    key={member.name}
                    className={`fancard-bias-option ${selectedBias === member.name ? 'active' : ''}`}
                    onClick={() => setSelectedBias(member.name)}
                  >
                    <img src={member.img} alt={member.name} />
                    <span>{member.emoji} {member.name}</span>
                  </button>
                ))}
              </div>
              {selectedBias && selectedBias !== profile?.bias && (
                <button className="fancard-save-btn" onClick={saveBias} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Bias'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FanCard;
