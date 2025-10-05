import React from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../contexts/ThemeContext';

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
  const { isDarkMode } = useTheme();
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
          background: isDarkMode ? 'linear-gradient(135deg, #2d3748, #1a202c)' : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
          color: isDarkMode ? 'white' : 'black',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(214, 51, 132, 0.1)',
          borderRadius: '20px',
          width: window.innerWidth <= 768 ? '90vw' : '350px',
          maxWidth: '350px',
          maxHeight: '90vh',
          overflow: 'auto',
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
            background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(214, 51, 132, 0.1)',
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            color: 'var(--kaia-primary)',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
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
            padding: '1.5rem 1rem 0.5rem 1rem',
            background: isDarkMode ? 'rgba(214, 51, 132, 0.05)' : 'rgba(214, 51, 132, 0.02)',
            borderRadius: '20px 20px 0 0',
            position: 'relative',
            zIndex: 5
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              padding: '4px',
              background: 'linear-gradient(135deg, var(--kaia-primary), #b8296b)',
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(214, 51, 132, 0.2)'
            }}>
              <img 
                src={memberImage}
                alt={memberName}
                style={{
                  width: '300px',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block'
                }}
              />
            </div>
          </div>
        )}

        {/* Content Below Photo */}
        <div style={{ 
          padding: '0.5rem 1rem 1.5rem 1rem', 
          textAlign: 'center',
          background: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.5)',
          borderRadius: '0 0 20px 20px'
        }}>
          <div style={{
            width: '40px',
            height: '2px',
            background: 'linear-gradient(90deg, var(--kaia-primary), #b8296b)',
            margin: '0 auto 1rem auto',
            borderRadius: '1px'
          }}></div>
          
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--kaia-primary)',
            marginBottom: '0.5rem',
            letterSpacing: '1px'
          }}>
            KAIA
          </div>
          
          <div style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: isDarkMode ? '#e2e8f0' : '#2d3748',
            marginBottom: '0.8rem'
          }}>
            {memberName}'s Birthday
          </div>
          
          {date && (
            <div style={{
              fontSize: '0.9rem',
              color: isDarkMode ? '#a0aec0' : '#666',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              background: isDarkMode ? 'rgba(214, 51, 132, 0.1)' : 'rgba(214, 51, 132, 0.05)',
              borderRadius: '10px',
              display: 'inline-block'
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