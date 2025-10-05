import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import AccountModal from './AccountModal';

const MessageBoard = () => {
  const [message, setMessage] = useState('');
  const [selectedMember, setSelectedMember] = useState('KAIA');
  const [messages, setMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('recent');
  const [recentPage, setRecentPage] = useState(1);
  const [myMessagesPage, setMyMessagesPage] = useState(1);
  const messagesPerPage = 5;
  const [showAccount, setShowAccount] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const members = ['KAIA', 'Angela', 'Charlotte', 'Sophia', 'Alexa', 'Charice'];

  useEffect(() => {
    fetchMessages();
    fetchUserMessages();
    fetchAnnouncements();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(msg => msg.status === 'approved');
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUserMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const userMessagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(msg => msg.author === (auth.currentUser.displayName || auth.currentUser.email));
      setUserMessages(userMessagesData);
    } catch (error) {
      console.error('Error fetching user messages:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const q = query(collection(db, 'announcements'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const announcementsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        message: message.trim(),
        member: selectedMember,
        author: auth.currentUser.displayName || auth.currentUser.email,
        authorId: auth.currentUser.uid,
        authorPhoto: auth.currentUser.photoURL || '/assets/kaia-logo.jpg',
        timestamp: new Date(),
        status: 'pending'
      });
      setToast({ type: 'success', title: 'Message Sent', message: 'Message submitted! It will appear after admin approval.' });
      setMessage('');
      fetchUserMessages(); // Refresh user messages
      setTimeout(() => setToast(null), 4000);
    } catch (error) {
      setToast({ type: 'error', title: 'Send Failed', message: 'Error sending message: ' + error.message });
      setTimeout(() => setToast(null), 4000);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/assets/img/gallery/kaia17.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      padding: '2rem 1rem'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }}></div>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '2rem'
        }}>
          {/* Back to Homepage - Top */}
          <div style={{
            marginBottom: '1rem',
            paddingTop: isMobile ? '3rem' : '0'
          }}>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: 'transparent',
                color: 'var(--kaia-primary)',
                border: 'none',
                padding: '0',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              ← Back to Homepage
            </button>
          </div>
          
          {/* Notification and Account Buttons - Middle */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  background: 'transparent',
                  color: 'var(--kaia-primary)',
                  border: 'none',
                  width: '45px',
                  height: '45px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                🔔
                {(userMessages.filter(msg => msg.status === 'pending').length + announcements.length) > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: '#dc3545',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {userMessages.filter(msg => msg.status === 'pending').length + announcements.length}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '55px',
                  right: '0',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  boxShadow: '0 5px 20px var(--shadow-color)',
                  width: '300px',
                  maxHeight: '400px',
                  overflow: 'auto',
                  zIndex: 1000
                }}>
                  <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--border-color)',
                    fontWeight: '600',
                    color: 'var(--kaia-primary)'
                  }}>
                    Notifications
                  </div>
                  
                  {userMessages.length === 0 && announcements.length === 0 ? (
                    <div style={{ padding: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      No notifications
                    </div>
                  ) : (
                    <>
                    {/* Admin Announcements */}
                    {announcements.slice(0, 3).map(announcement => (
                      <div key={`announcement-${announcement.id}`} style={{
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid #f0f0f0',
                        fontSize: '0.9rem',
                        background: 'var(--bg-secondary)'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.25rem'
                        }}>
                          <span style={{ fontWeight: '600', color: 'var(--kaia-primary)' }}>
                            📢 Admin Announcement
                          </span>
                          <span style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.7rem'
                          }}>
                            {announcement.timestamp?.toDate?.()?.toLocaleDateString() || 'Recent'}
                          </span>
                        </div>
                        <div style={{
                          color: 'var(--text-primary)',
                          fontSize: '0.85rem',
                          fontWeight: '500'
                        }}>
                          {announcement.title}
                        </div>
                        <div style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.8rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginTop: '0.25rem'
                        }}>
                          {announcement.message}
                        </div>
                      </div>
                    ))}
                    
                    {/* Message Status Updates */}
                    {userMessages.slice(0, announcements.length > 0 ? 3 : 5).map(msg => {
                      const getStatusColor = (status) => {
                        switch (status) {
                          case 'approved': return '#28a745';
                          case 'pending': return '#ffc107';
                          case 'rejected': return '#dc3545';
                          default: return '#6c757d';
                        }
                      };
                      
                      const getStatusIcon = (status) => {
                        switch (status) {
                          case 'approved': return '✓';
                          case 'pending': return '⏳';
                          case 'rejected': return '✗';
                          default: return '•';
                        }
                      };
                      
                      return (
                        <div key={msg.id} style={{
                          padding: '0.75rem 1rem',
                          borderBottom: '1px solid #f0f0f0',
                          fontSize: '0.9rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.25rem'
                          }}>
                            <span style={{ fontWeight: '500' }}>To: {msg.member}</span>
                            <span style={{
                              color: getStatusColor(msg.status || 'pending'),
                              fontWeight: '600',
                              fontSize: '0.8rem'
                            }}>
                              {getStatusIcon(msg.status || 'pending')} {(msg.status || 'pending').toUpperCase()}
                            </span>
                          </div>
                          <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.8rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {msg.message}
                          </div>
                        </div>
                      );
                    })}
                    </>
                  )}
                  
                  {(userMessages.length + announcements.length) > 5 && (
                    <div style={{
                      padding: '0.5rem 1rem',
                      textAlign: 'center',
                      color: 'var(--kaia-primary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowNotifications(false)}
                    >
                      View all in "My Messages" below
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* My Account Button */}
            <button
              onClick={() => setShowAccount(true)}
              style={{
                background: 'var(--kaia-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              My Account
            </button>
          </div>
          
          {/* Title - Bottom */}
          <div>
            <h1 style={{
              color: 'var(--kaia-primary)',
              fontSize: '2rem',
              margin: 0
            }}>
              Messages for KAIA
            </h1>
          </div>
        </div>

        {/* Message Form */}
        <div className="content-section" style={{
          background: 'var(--card-bg)',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 5px 20px var(--shadow-color)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>
            Send a Message to KAIA 💌
          </h3>
          
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            lineHeight: '1.5'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--kaia-primary)' }}>
              How it works:
            </p>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              • Your message will be reviewed by our admin team before appearing on the KAIA Wall
            </p>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              • Please keep messages positive, respectful, and supportive
            </p>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              • Check "My Messages" below to track your submission status
            </p>
            <p style={{ margin: '0', color: 'var(--text-primary)' }}>
              • Approved messages will appear on the public KAIA Wall for everyone to see!
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1rem',
                border: '2px solid var(--border-color)',
                borderRadius: '10px',
                fontSize: '1rem',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)'
              }}
            >
              {members.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message to the KAIA member..."
              required
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                marginBottom: '1rem',
                border: '2px solid var(--border-color)',
                borderRadius: '10px',
                fontSize: '1rem',
                resize: 'vertical',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)'
              }}
            />
            
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'var(--kaia-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Messages with Tabs */}
        <div className="content-section" style={{
          background: 'var(--card-bg)',
          borderRadius: '15px',
          boxShadow: '0 5px 20px var(--shadow-color)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            <button
              onClick={() => setActiveTab('recent')}
              style={{
                flex: 1,
                padding: isMobile ? '0.75rem 0.5rem' : '1rem 2rem',
                border: 'none',
                background: activeTab === 'recent' ? 'var(--kaia-primary)' : 'transparent',
                color: activeTab === 'recent' ? 'white' : 'var(--text-secondary)',
                fontSize: isMobile ? '0.8rem' : '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
Recent Messages
            </button>
            <button
              onClick={() => setActiveTab('my')}
              style={{
                flex: 1,
                padding: isMobile ? '0.75rem 0.5rem' : '1rem 2rem',
                border: 'none',
                background: activeTab === 'my' ? 'var(--kaia-primary)' : 'transparent',
                color: activeTab === 'my' ? 'white' : 'var(--text-secondary)',
                fontSize: isMobile ? '0.8rem' : '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
My Messages
              {userMessages.filter(msg => msg.status === 'pending').length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: '#dc3545',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {userMessages.filter(msg => msg.status === 'pending').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              style={{
                flex: 1,
                padding: isMobile ? '0.75rem 0.5rem' : '1rem 2rem',
                border: 'none',
                background: activeTab === 'announcements' ? 'var(--kaia-primary)' : 'transparent',
                color: activeTab === 'announcements' ? 'white' : 'var(--text-secondary)',
                fontSize: isMobile ? '0.8rem' : '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Announcements
            </button>
          </div>
          
          {/* Tab Content */}
          <div style={{ padding: isMobile ? '1rem' : '2rem' }}>
            {activeTab === 'recent' ? (
              <>
                <h3 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>
                  Recent Messages from Community
                </h3>
                {messages.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center' }}>
                    No messages yet. Be the first to send a message!
                  </p>
                ) : (
                  <>
                    {messages.slice((recentPage - 1) * messagesPerPage, recentPage * messagesPerPage).map(msg => (
                      <div key={msg.id} style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        background: 'var(--bg-secondary)'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                          flexWrap: 'wrap'
                        }}>
                          <strong style={{ color: 'var(--kaia-primary)' }}>
                            To: {msg.member}
                          </strong>
                          <small style={{ color: '#666' }}>
                            From: {msg.author === (auth.currentUser.displayName || auth.currentUser.email) ? 'You' : msg.author}
                          </small>
                        </div>
                        <p style={{ margin: 0, lineHeight: '1.5' }}>
                          {msg.message}
                        </p>
                      </div>
                    ))}
                    
                    {/* Recent Messages Pagination */}
                    {messages.length > messagesPerPage && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '2rem'
                      }}>
                        <button
                          onClick={() => setRecentPage(recentPage - 1)}
                          disabled={recentPage === 1}
                          style={{
                            background: recentPage === 1 ? '#f0f0f0' : 'var(--kaia-primary)',
                            color: recentPage === 1 ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                            cursor: recentPage === 1 ? 'not-allowed' : 'pointer',
                            fontSize: isMobile ? '0.8rem' : '1rem'
                          }}
                        >
                          Previous
                        </button>
                        <span style={{ color: '#666', fontSize: isMobile ? '0.8rem' : '1rem' }}>
                          Page {recentPage} of {Math.ceil(messages.length / messagesPerPage)}
                        </span>
                        <button
                          onClick={() => setRecentPage(recentPage + 1)}
                          disabled={recentPage === Math.ceil(messages.length / messagesPerPage)}
                          style={{
                            background: recentPage === Math.ceil(messages.length / messagesPerPage) ? '#f0f0f0' : 'var(--kaia-primary)',
                            color: recentPage === Math.ceil(messages.length / messagesPerPage) ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                            cursor: recentPage === Math.ceil(messages.length / messagesPerPage) ? 'not-allowed' : 'pointer',
                            fontSize: isMobile ? '0.8rem' : '1rem'
                          }}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : activeTab === 'announcements' ? (
              <>
                <h3 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>
                  Admin Announcements
                </h3>
                {announcements.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center' }}>
                    No announcements yet.
                  </p>
                ) : (
                  announcements.map(announcement => (
                    <div key={announcement.id} style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '1.5rem',
                      marginBottom: '1rem',
                      background: 'var(--bg-secondary)'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        flexWrap: 'wrap'
                      }}>
                        <strong style={{ color: 'var(--kaia-primary)', fontSize: '1.2rem' }}>
                          {announcement.title}
                        </strong>
                        <small style={{ color: 'var(--text-secondary)' }}>
                          {announcement.timestamp?.toDate?.()?.toLocaleDateString() || 'Recent'}
                        </small>
                      </div>
                      <p style={{ margin: 0, lineHeight: '1.6', color: 'var(--text-primary)' }}>
                        {announcement.message}
                      </p>
                    </div>
                  ))
                )}
              </>
            ) : (
              <>
                <h3 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>
                  My Sent Messages
                </h3>
                {userMessages.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center' }}>
                    You haven't sent any messages yet.
                  </p>
                ) : (
                  <>
                    {userMessages.slice((myMessagesPage - 1) * messagesPerPage, myMessagesPage * messagesPerPage).map(msg => {
                      const getStatusColor = (status) => {
                        switch (status) {
                          case 'approved': return '#28a745';
                          case 'pending': return '#ffc107';
                          case 'rejected': return '#dc3545';
                          default: return '#6c757d';
                        }
                      };
                      
                      return (
                        <div key={msg.id} style={{
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '1rem',
                          marginBottom: '1rem',
                          background: 'var(--bg-secondary)'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem',
                            flexWrap: 'wrap'
                          }}>
                            <strong style={{ color: 'var(--kaia-primary)' }}>
                              To: {msg.member}
                            </strong>
                            <span style={{
                              background: getStatusColor(msg.status || 'pending'),
                              color: 'white',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '15px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              textTransform: 'capitalize'
                            }}>
                              {msg.status || 'Pending'}
                            </span>
                          </div>
                          <p style={{ margin: 0, lineHeight: '1.5' }}>
                            {msg.message}
                          </p>
                        </div>
                      );
                    })}
                    
                    {/* My Messages Pagination */}
                    {userMessages.length > messagesPerPage && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '2rem'
                      }}>
                        <button
                          onClick={() => setMyMessagesPage(myMessagesPage - 1)}
                          disabled={myMessagesPage === 1}
                          style={{
                            background: myMessagesPage === 1 ? '#f0f0f0' : 'var(--kaia-primary)',
                            color: myMessagesPage === 1 ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            cursor: myMessagesPage === 1 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Previous
                        </button>
                        <span style={{ color: '#666' }}>
                          Page {myMessagesPage} of {Math.ceil(userMessages.length / messagesPerPage)}
                        </span>
                        <button
                          onClick={() => setMyMessagesPage(myMessagesPage + 1)}
                          disabled={myMessagesPage === Math.ceil(userMessages.length / messagesPerPage)}
                          style={{
                            background: myMessagesPage === Math.ceil(userMessages.length / messagesPerPage) ? '#f0f0f0' : 'var(--kaia-primary)',
                            color: myMessagesPage === Math.ceil(userMessages.length / messagesPerPage) ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            cursor: myMessagesPage === Math.ceil(userMessages.length / messagesPerPage) ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--card-bg)',
          borderRadius: '10px',
          boxShadow: '0 5px 20px var(--shadow-color)',
          zIndex: 1000,
          maxWidth: '400px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          animation: 'slideIn 0.3s ease'
        }}>
          <div style={{
            background: toast.type === 'success' ? '#28a745' : 'var(--kaia-primary)',
            color: 'white',
            padding: '0.75rem 1rem',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            {toast.title || (toast.type === 'success' ? 'Success' : 'Error')}
          </div>
          <div style={{
            padding: '1rem',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            lineHeight: '1.4'
          }}>
            {toast.message}
          </div>
        </div>
      )}
      
      {/* Account Modal */}
      {showAccount && (
        <AccountModal onClose={() => setShowAccount(false)} />
      )}
    </div>
  );
};

export default MessageBoard;