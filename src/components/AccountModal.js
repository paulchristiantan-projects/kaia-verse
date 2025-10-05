import React, { useState } from 'react';
import { updateProfile, updatePassword, signOut } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AccountModal = ({ onClose }) => {
  const [username, setUsername] = useState(auth.currentUser?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const updateExistingMessages = async (newUsername) => {
    try {
      // Update messages that have authorId matching current user
      const messagesQuery = query(
        collection(db, 'messages'),
        where('authorId', '==', auth.currentUser.uid)
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      
      // Update messages that have author matching current user email (for old messages)
      const emailMessagesQuery = query(
        collection(db, 'messages'),
        where('author', '==', auth.currentUser.email)
      );
      const emailMessagesSnapshot = await getDocs(emailMessagesQuery);
      
      const updatePromises = [];
      
      // Update messages with authorId
      messagesSnapshot.docs.forEach(messageDoc => {
        updatePromises.push(
          updateDoc(doc(db, 'messages', messageDoc.id), {
            author: newUsername
          })
        );
      });
      
      // Update messages with email as author
      emailMessagesSnapshot.docs.forEach(messageDoc => {
        updatePromises.push(
          updateDoc(doc(db, 'messages', messageDoc.id), {
            author: newUsername,
            authorId: auth.currentUser.uid // Add authorId if missing
          })
        );
      });
      
      await Promise.all(updatePromises);
      return updatePromises.length;
    } catch (error) {
      console.error('Error updating existing messages:', error);
      return 0;
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newUsername = username.trim();
      
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: newUsername
      });
      
      // Update Firestore user document
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        email: auth.currentUser.email,
        username: newUsername
      }, { merge: true });
      
      // Update existing messages
      const updatedCount = await updateExistingMessages(newUsername);
      
      showToast('success', `Profile updated! ${updatedCount} messages updated.`);
    } catch (error) {
      showToast('error', 'Error updating profile: ' + error.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    signOut(auth);
    onClose();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      showToast('error', 'New passwords do not match!');
      return;
    }
    
    if (newPassword.length < 6) {
      showToast('error', 'Password must be at least 6 characters long!');
      return;
    }
    
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      showToast('success', 'Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      showToast('error', 'Error changing password: ' + error.message);
    }
    setLoading(false);
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
        background: 'var(--card-bg)',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid var(--border-color)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ color: 'var(--kaia-primary)', margin: 0 }}>
            Account Settings
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'var(--kaia-primary)',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Profile Section */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              type="button"
              onClick={() => setShowProfileSection(!showProfileSection)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--kaia-primary)',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                padding: 0
              }}
            >
              <span style={{ transform: showProfileSection ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
              Profile Information
            </button>
            
            {showProfileSection && (
              <form onSubmit={handleUpdateProfile}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={auth.currentUser?.email || ''}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'var(--card-bg)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter your username"
                />
              </div>
              

              
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'var(--kaia-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
              </form>
            )}
          </div>

          {/* Password Section */}
          <div style={{ 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '2rem' 
          }}>
            <button
              type="button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--kaia-primary)',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                padding: 0
              }}
            >
              <span style={{ transform: showPasswordSection ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
              Change Password
            </button>
            
            {showPasswordSection && (
              <form onSubmit={handleChangePassword}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'var(--card-bg)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'var(--card-bg)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'var(--kaia-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
              </form>
            )}
          </div>
          
          {/* Logout Button */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <button
              onClick={handleLogout}
              style={{
                background: 'var(--kaia-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: toast.type === 'success' ? 'var(--kaia-primary)' : '#dc3545',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            zIndex: 1001
          }}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountModal;