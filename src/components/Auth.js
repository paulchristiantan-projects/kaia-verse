import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [toast, setToast] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    if (!isLogin && emailValue && !validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: email,
          username: username
        });
      }
      onAuthSuccess();
    } catch (error) {
      let title = 'Authentication Error';
      let message = 'Server error please try again later';
      
      // Map Firebase error codes to user-friendly messages
      if (error.code === 'auth/invalid-credential') {
        title = 'Login Failed';
        message = 'Incorrect credentials / user not found';
      } else if (error.code === 'auth/user-not-found') {
        title = 'Login Failed';
        message = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        title = 'Login Failed';
        message = 'Incorrect password';
      } else if (error.code === 'auth/email-already-in-use') {
        title = 'Registration Failed';
        message = 'Email already in use';
      } else if (error.code === 'auth/weak-password') {
        title = 'Registration Failed';
        message = 'Password is too weak';
      }
      
      setToast({ type: 'error', title, message });
      setTimeout(() => setToast(null), 5000);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/assets/img/gallery/kaia17.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
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
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        zIndex: 2
      }}>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--kaia-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          title="Back to Homepage"
        >
          ✕
        </button>
        <h2 style={{
          textAlign: 'center',
          color: 'var(--kaia-primary)',
          marginBottom: '2rem',
          fontSize: '1.8rem'
        }}>
          {isLogin ? 'Login' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: emailError ? '0.5rem' : '1rem',
              border: `2px solid ${emailError ? '#dc3545' : '#ddd'}`,
              borderRadius: '10px',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          {emailError && (
            <div style={{
              color: '#dc3545',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              marginTop: '0.25rem'
            }}>
              {emailError}
            </div>
          )}
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1.5rem',
              border: '2px solid #ddd',
              borderRadius: '10px',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--kaia-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: '#666' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--kaia-primary)',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              background: 'none',
              border: '2px solid var(--kaia-primary)',
              color: 'var(--kaia-primary)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 1001,
          maxWidth: '400px',
          border: '1px solid #ddd',
          overflow: 'hidden'
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
            color: '#333',
            fontSize: '0.9rem',
            lineHeight: '1.4'
          }}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;