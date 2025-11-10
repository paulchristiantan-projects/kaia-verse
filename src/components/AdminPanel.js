import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';

const AdminPanel = () => {
  const [pendingMessages, setPendingMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [sendingAnnouncement, setSendingAnnouncement] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;
  const [toast, setToast] = useState(null);
  const [myAnnouncements, setMyAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchPendingMessages();
    fetchMyAnnouncements();
  }, []);

  const fetchPendingMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(msg => !msg.status || msg.status === 'pending');
      setPendingMessages(messagesData);
    } catch (error) {
      console.error('Error fetching pending messages:', error);
    }
  };

  const fetchMyAnnouncements = async () => {
    try {
      const q = query(collection(db, 'announcements'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const announcementsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMyAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const approveMessage = async (messageId) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'messages', messageId), {
        status: 'approved'
      });
      fetchPendingMessages();
    } catch (error) {
      alert('Error approving message: ' + error.message);
    }
    setLoading(false);
  };

  const rejectMessage = async (messageId) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'messages', messageId), {
        status: 'rejected'
      });
      fetchPendingMessages();
    } catch (error) {
      alert('Error rejecting message: ' + error.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const sendAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementMessage.trim()) return;
    
    setSendingAnnouncement(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        title: announcementTitle.trim(),
        message: announcementMessage.trim(),
        timestamp: new Date(),
        author: 'Admin'
      });
      setToast({ type: 'success', message: 'Announcement sent to all users!' });
      setAnnouncementTitle('');
      setAnnouncementMessage('');
      fetchMyAnnouncements();
      setTimeout(() => setToast(null), 4000);
    } catch (error) {
      setToast({ type: 'error', message: 'Error sending announcement: ' + error.message });
      setTimeout(() => setToast(null), 4000);
    }
    setSendingAnnouncement(false);
  };

  // const migrateExistingMessages = async () => {
  //   setLoading(true);
  //   try {
  //     // Get all users
  //     const usersQuery = query(collection(db, 'users'));
  //     const usersSnapshot = await getDocs(usersQuery);
  //     const userMap = {};
  //     
  //     usersSnapshot.docs.forEach(doc => {
  //       const userData = doc.data();
  //       if (userData.email) {
  //         userMap[userData.email] = doc.id;
  //       }
  //     });
  //     
  //     // Get all messages without authorId
  //     const messagesQuery = query(collection(db, 'messages'));
  //     const messagesSnapshot = await getDocs(messagesQuery);
  //     
  //     let updatedCount = 0;
  //     
  //     for (const messageDoc of messagesSnapshot.docs) {
  //       const messageData = messageDoc.data();
  //       
  //       // Skip if already has authorId
  //       if (messageData.authorId) continue;
  //       
  //       // Try to match author email to user ID
  //       const authorId = userMap[messageData.author];
  //       
  //       if (authorId) {
  //         await updateDoc(doc(db, 'messages', messageDoc.id), {
  //           authorId: authorId
  //         });
  //         updatedCount++;
  //       }
  //     }
  //     
  //     setToast({ type: 'success', message: `Updated ${updatedCount} existing messages!` });
  //     setTimeout(() => setToast(null), 4000);
  //   } catch (error) {
  //     setToast({ type: 'error', message: 'Error migrating messages: ' + error.message });
  //     setTimeout(() => setToast(null), 4000);
  //   }
  //   setLoading(false);
  // };

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h1 style={{
            color: 'var(--kaia-primary)',
            fontSize: '2rem',
            margin: 0
          }}>
            Admin Panel - Message Moderation
          </h1>
          <button
            onClick={handleLogout}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        {/* Send Announcement */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>
            Send Announcement
          </h3>
          
          <form onSubmit={sendAnnouncement}>
            <input
              type="text"
              placeholder="Announcement title..."
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                fontSize: '1rem'
              }}
            />
            
            <textarea
              value={announcementMessage}
              onChange={(e) => setAnnouncementMessage(e.target.value)}
              placeholder="Write your announcement message..."
              required
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '1rem',
                marginBottom: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
            
            <button
              type="submit"
              disabled={sendingAnnouncement}
              style={{
                background: 'var(--kaia-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: sendingAnnouncement ? 'not-allowed' : 'pointer'
              }}
            >
              {sendingAnnouncement ? 'Sending...' : 'Send Announcement'}
            </button>
          </form>
        </div>

        {/* Admin Tabs */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #eee'
          }}>
            <button
              onClick={() => setActiveTab('pending')}
              style={{
                flex: 1,
                padding: '1rem 2rem',
                border: 'none',
                background: activeTab === 'pending' ? 'var(--kaia-primary)' : 'transparent',
                color: activeTab === 'pending' ? 'white' : '#666',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              Pending Messages
              {pendingMessages.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
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
                  {pendingMessages.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              style={{
                flex: 1,
                padding: '1rem 2rem',
                border: 'none',
                background: activeTab === 'announcements' ? 'var(--kaia-primary)' : 'transparent',
                color: activeTab === 'announcements' ? 'white' : '#666',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              My Announcements
            </button>
          </div>
          
          {/* Tab Content */}
          <div style={{ padding: '2rem' }}>
            {activeTab === 'pending' ? (
              <>
                <h3 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>
                  Pending Messages ({pendingMessages.length})
                </h3>
                
                {pendingMessages.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center' }}>
                    No pending messages to review.
                  </p>
                ) : (
                  <>
                    {pendingMessages.slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage).map(msg => (
                      <div key={msg.id} style={{
                        border: '2px solid #ffc107',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        background: '#fff3cd'
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
                            From: {msg.author}
                          </small>
                        </div>
                        <p style={{ margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                          {msg.message}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => approveMessage(msg.id)}
                            disabled={loading}
                            style={{
                              background: '#28a745',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              padding: '0.5rem 1rem',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => rejectMessage(msg.id)}
                            disabled={loading}
                            style={{
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              padding: '0.5rem 1rem',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            ✗ Reject
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Pagination */}
                    {pendingMessages.length > messagesPerPage && (
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
                            background: currentPage === 1 ? '#f0f0f0' : 'var(--kaia-primary)',
                            color: currentPage === 1 ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Previous
                        </button>
                        <span style={{ color: '#666' }}>
                          Page {currentPage} of {Math.ceil(pendingMessages.length / messagesPerPage)}
                        </span>
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === Math.ceil(pendingMessages.length / messagesPerPage)}
                          style={{
                            background: currentPage === Math.ceil(pendingMessages.length / messagesPerPage) ? '#f0f0f0' : 'var(--kaia-primary)',
                            color: currentPage === Math.ceil(pendingMessages.length / messagesPerPage) ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            cursor: currentPage === Math.ceil(pendingMessages.length / messagesPerPage) ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <h3 style={{ color: 'var(--kaia-primary)', marginBottom: '1rem' }}>
                  My Announcements ({myAnnouncements.length})
                </h3>
                
                {myAnnouncements.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center' }}>
                    No announcements sent yet.
                  </p>
                ) : (
                  myAnnouncements.map(announcement => (
                    <div key={announcement.id} style={{
                      border: '1px solid rgba(214, 51, 132, 0.2)',
                      borderRadius: '10px',
                      padding: '1rem',
                      marginBottom: '1rem',
                      background: 'rgba(214, 51, 132, 0.05)'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        <strong style={{ color: 'var(--kaia-primary)', fontSize: '1.1rem' }}>
                          {announcement.title}
                        </strong>
                        <small style={{ color: '#666' }}>
                          {announcement.timestamp?.toDate?.()?.toLocaleDateString() || 'Recent'}
                        </small>
                      </div>
                      <p style={{ margin: 0, lineHeight: '1.5', color: '#333' }}>
                        {announcement.message}
                      </p>
                    </div>
                  ))
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
          background: toast.type === 'success' ? '#28a745' : '#dc3545',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '10px',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          maxWidth: '400px'
        }}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;