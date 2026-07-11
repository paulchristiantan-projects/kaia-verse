import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const MEMBERS = ['All', 'KAIA', 'Angela', 'Charlotte', 'Sophia', 'Alexa', 'Charice'];

const MEMBER_COLORS = {
  KAIA: '#d63384',
  Angela: '#8B4513',
  Charice: '#dc143c',
  Alexa: '#DAA520',
  Sophia: '#ff6b6b',
  Charlotte: '#2e8b57',
};

const KaiaWall = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState('All');
  const [userProfiles, setUserProfiles] = useState({});

  useEffect(() => {
    fetchApprovedMessages();
    fetchUserProfiles();
  }, []);

  const fetchApprovedMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(msg => msg.status === 'approved' || !msg.status);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
    setLoading(false);
  };

  const fetchUserProfiles = async () => {
    try {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const profiles = {};
      querySnapshot.docs.forEach(doc => {
        const userData = doc.data();
        profiles[doc.id] = {
          username: userData.username || userData.email,
        };
      });
      setUserProfiles(profiles);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const filteredMessages = selectedMember === 'All'
    ? messages
    : messages.filter(msg => msg.member === selectedMember);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getAuthor = (msg) => {
    if (msg.authorId && userProfiles[msg.authorId]) {
      return userProfiles[msg.authorId].username;
    }
    return msg.author || 'Anonymous';
  };

  return (
    <div className="kwall-overlay" onClick={onClose}>
      <div className="kwall-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="kwall-header">
          <div className="kwall-header-left">
            <h2 className="kwall-title">💌 KAIA Wall</h2>
            <p className="kwall-subtitle">Messages from ZAIA to KAIA</p>
          </div>
          <button className="kwall-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Member filter tabs */}
        <div className="kwall-tabs">
          {MEMBERS.map(member => (
            <button
              key={member}
              className={`kwall-tab ${selectedMember === member ? 'active' : ''}`}
              onClick={() => setSelectedMember(member)}
            >
              {member}
            </button>
          ))}
        </div>

        {/* Messages feed */}
        <div className="kwall-feed">
          {loading ? (
            <div className="kwall-empty">
              <div className="spinner"></div>
              <p>Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="kwall-empty">
              <span className="kwall-empty-icon">📭</span>
              <p>No messages yet for {selectedMember}</p>
              <a href="/message-kaia" className="kwall-write-btn">Be the first to write!</a>
            </div>
          ) : (
            <div className="kwall-messages">
              {filteredMessages.map(msg => (
                <div key={msg.id} className="kwall-card">
                  <div className="kwall-card-accent" style={{ background: MEMBER_COLORS[msg.member] || '#d63384' }}></div>
                  <div className="kwall-card-content">
                    <div className="kwall-card-header">
                      <span className="kwall-card-to" style={{ background: MEMBER_COLORS[msg.member] || '#d63384' }}>
                        To: {msg.member}
                      </span>
                      <span className="kwall-card-date">{formatDate(msg.timestamp)}</span>
                    </div>
                    <p className="kwall-card-message">{msg.message}</p>
                    <div className="kwall-card-footer">
                      <span className="kwall-card-author">— {getAuthor(msg)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="kwall-footer">
          <a href="/message-kaia" className="kwall-cta-btn">
            ✍️ Write a message to KAIA
          </a>
        </div>
      </div>
    </div>
  );
};

export default KaiaWall;
