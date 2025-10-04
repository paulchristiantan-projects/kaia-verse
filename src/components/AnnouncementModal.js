import React from 'react';
import { createPortal } from 'react-dom';

const AnnouncementModal = ({ 
  isOpen, 
  onClose, 
  type = 'birthday', 
  memberName, 
  memberImage, 
  title, 
  message, 
  date 
}) => {
  if (!isOpen) return null;

  const getBirthdayMessage = (name) => {
    return `🎉 Happy Birthday to our amazing ${name}! 🎂\n\nWishing you all the love, joy, and success in the world. Thank you for being such an incredible part of KAIA and bringing so much happiness to ZAIA! 💖\n\n#HappyBirthday${name} #KAIA #ZAIA`;
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'birthday':
        return {
          background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
          icon: '🎉',
          color: 'white'
        };
      case 'announcement':
        return {
          background: 'linear-gradient(135deg, var(--kaia-primary), #b8296b)',
          icon: '📢',
          color: 'white'
        };
      case 'event':
        return {
          background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
          icon: '🎪',
          color: 'white'
        };
      default:
        return {
          background: 'linear-gradient(135deg, var(--kaia-primary), #b8296b)',
          icon: '✨',
          color: 'white'
        };
    }
  };

  const styles = getTypeStyles();
  const displayMessage = message || (type === 'birthday' ? getBirthdayMessage(memberName) : '');

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '20px',
          width: '20vw',
          maxHeight: '90vh',
          overflow: 'hidden',
          position: 'relative',

        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            width: '30px',
            height: '30px',
            color: 'var(--kaia-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          ×
        </button>

        {/* Big Photo on Top */}
        {memberImage && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 2rem 1rem 2rem',
            position: 'relative',
            zIndex: 5
          }}>
            <img 
              src={memberImage}
              alt={memberName}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '15px',
                border: '4px solid var(--kaia-primary)',

              }}
            />
          </div>
        )}

        {/* Content Below Photo */}
        <div style={{ padding: '0 2rem 2rem 2rem', textAlign: 'center' }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--kaia-primary)',
            marginBottom: '0.5rem'
          }}>
            KAIA
          </div>
          
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            {memberName}'s Birthday
          </div>
          
          {date && (
            <div style={{
              fontSize: '1.1rem',
              color: '#666',
              fontWeight: '500'
            }}>
              {date}
            </div>
          )}
        </div>


      </div>
    </div>,
    document.body
  );
};

export default AnnouncementModal;