import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useTheme } from '../contexts/ThemeContext';

const KaiaWall = ({ onClose }) => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState('KAIA');
  const [userProfiles, setUserProfiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;

  const members = ['KAIA', 'Angela', 'Charlotte', 'Sophia', 'Alexa', 'Charice'];

  useEffect(() => {
    fetchApprovedMessages();
    fetchUserProfiles();
    
    // Refresh profiles every 30 seconds to catch updates
    const interval = setInterval(() => {
      fetchUserProfiles();
    }, 30000);
    
    return () => clearInterval(interval);
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
      // Set empty messages array if there's a permissions error
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
          photoURL: userData.photoURL || '/assets/kaia-logo.jpg'
        };
      });
      setUserProfiles(profiles);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const filteredMessages = selectedMember === 'KAIA' 
    ? messages 
    : messages.filter(msg => msg.member === selectedMember);
    
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + messagesPerPage);
  
  // Reset to page 1 when member changes
  const handleMemberChange = (member) => {
    setSelectedMember(member);
    setCurrentPage(1);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: isDarkMode ? '#2d3748' : 'white',
        color: isDarkMode ? 'white' : 'black',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            color: 'var(--kaia-primary)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.5rem',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: isDarkMode ? '1px solid #4a5568' : '1px solid #eee'
        }}>
          {/* Title */}
          <h2 style={{ color: 'var(--kaia-primary)', margin: '0 0 1rem 0' }}>
            KAIA Wall
          </h2>
          
          {/* Create Message Button */}
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => window.open('/?message=true', '_blank')}
              style={{
                background: 'transparent',
                color: 'var(--kaia-primary)',
                border: '2px solid var(--kaia-primary)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Create Message to KAIA
            </button>
          </div>
          
          {/* Dropdown Selection */}
          <div>
            <select
              value={selectedMember}
              onChange={(e) => handleMemberChange(e.target.value)}
              style={{
                padding: '0.5rem',
                border: isDarkMode ? '2px solid #4a5568' : '2px solid #ddd',
                background: isDarkMode ? '#4a5568' : 'white',
                color: isDarkMode ? 'white' : 'black',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            >
              {members.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '1.5rem'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading messages...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No messages found for {selectedMember}
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {paginatedMessages.map(msg => (
                <div key={msg.id} style={{
                  background: isDarkMode ? 'linear-gradient(135deg, #4a5568, #2d3748)' : 'linear-gradient(135deg, #fff, #f8f9fa)',
                  border: '2px solid var(--kaia-primary)',
                  borderRadius: '15px',
                  padding: '1rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease'
                }}>
                  {/* Header: To {member} and date */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      background: 'var(--kaia-primary)',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      To: {msg.member}
                    </span>
                    <div style={{
                      fontSize: '0.8rem',
                      color: isDarkMode ? '#a0aec0' : '#666',
                      fontStyle: 'italic'
                    }}>
                      {formatDate(msg.timestamp)}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <p style={{
                    margin: '0 0 0.75rem 0',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    color: isDarkMode ? '#e2e8f0' : '#333'
                  }}>
                    {msg.message}
                  </p>
                  
                  {/* Username on bottom right */}
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <div style={{
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      color: isDarkMode ? '#e2e8f0' : '#333'
                    }}>
                      {msg.authorId && userProfiles[msg.authorId] ? userProfiles[msg.authorId].username : msg.author}
                    </div>
                  </div>
                </div>
              ))}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      background: currentPage === 1 ? 'transparent' : 'var(--kaia-primary)',
                      color: currentPage === 1 ? isDarkMode ? '#666' : '#ccc' : 'white',
                      border: '2px solid var(--kaia-primary)',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Previous
                  </button>
                  <span style={{
                    color: isDarkMode ? '#e2e8f0' : '#333',
                    fontWeight: '600'
                  }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      background: currentPage === totalPages ? 'transparent' : 'var(--kaia-primary)',
                      color: currentPage === totalPages ? isDarkMode ? '#666' : '#ccc' : 'white',
                      border: '2px solid var(--kaia-primary)',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KaiaWall;