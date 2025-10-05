import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import Auth from './Auth';
import MessageBoard from './MessageBoard';
import AdminPanel from './AdminPanel';

const AuthApp = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Admin emails
  const adminEmails = ['admin@kaiaverse.com', 'kaiaadmin@gmail.com'];
  
  const isAdmin = user && adminEmails.includes(user.email);
  
  // Debug logging
  console.log('User:', user);
  console.log('Email:', user?.email);
  console.log('Is Admin:', isAdmin);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--kaia-primary), #b8296b)'
      }}>
        <div style={{ color: 'white', fontSize: '1.2rem' }}>Loading...</div>
      </div>
    );
  }

  if (user) {
    // Show current user info for debugging
    console.log('Current user email:', user.email);
    console.log('Admin check result:', isAdmin);
    
    return isAdmin ? <AdminPanel /> : <MessageBoard />;
  }
  
  return <Auth onAuthSuccess={() => setUser(auth.currentUser)} />;
};

export default AuthApp;