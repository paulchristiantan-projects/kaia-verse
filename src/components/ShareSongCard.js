import React, { useRef, useState } from 'react';
import { getAssetPath } from '../utils/assetHelper';

const ShareSongCard = ({ song }) => {
  const canvasRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const generateCard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 315;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 600, 315);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#2d1a25');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 315);

    // Pink accent bar
    const accentGrad = ctx.createLinearGradient(0, 0, 200, 0);
    accentGrad.addColorStop(0, '#d63384');
    accentGrad.addColorStop(1, '#ecb807');
    ctx.fillStyle = accentGrad;
    ctx.fillRect(0, 280, 600, 4);

    // Song title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Source Sans Pro", sans-serif';
    ctx.fillText(song.title, 220, 120);

    // Artist
    ctx.fillStyle = '#d63384';
    ctx.font = '18px "Source Sans Pro", sans-serif';
    ctx.fillText(song.artist, 220, 155);

    // Release year
    ctx.fillStyle = '#999999';
    ctx.font = '14px "Source Sans Pro", sans-serif';
    ctx.fillText(`Released ${song.releaseDate}`, 220, 185);

    // Genre tag
    ctx.fillStyle = 'rgba(214, 51, 132, 0.2)';
    ctx.beginPath();
    ctx.roundRect(220, 200, 60, 24, 12);
    ctx.fill();
    ctx.fillStyle = '#d63384';
    ctx.font = '12px "Source Sans Pro", sans-serif';
    ctx.fillText('P-Pop', 235, 216);

    // Branding
    ctx.fillStyle = '#d63384';
    ctx.font = 'bold 16px "Source Sans Pro", sans-serif';
    ctx.fillText('KAIAverse', 220, 260);

    ctx.fillStyle = '#666666';
    ctx.font = '11px "Source Sans Pro", sans-serif';
    ctx.fillText('kaia-verse.web.app', 220, 278);

    // Load and draw album art
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Rounded album art
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(40, 60, 150, 150, 12);
      ctx.clip();
      ctx.drawImage(img, 40, 60, 150, 150);
      ctx.restore();

      // Border around art
      ctx.strokeStyle = 'rgba(214, 51, 132, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 60, 150, 150, 12);
      ctx.stroke();

      const url = canvas.toDataURL('image/png');
      setPreviewUrl(url);
      setShowPreview(true);
    };

    img.onerror = () => {
      // Still show card without album art
      const url = canvas.toDataURL('image/png');
      setPreviewUrl(url);
      setShowPreview(true);
    };

    img.src = getAssetPath(song.image);
  };

  const downloadCard = () => {
    const link = document.createElement('a');
    link.download = `kaia-${song.title.toLowerCase().replace(/\s/g, '-')}.png`;
    link.href = previewUrl;
    link.click();
  };

  const shareCard = async () => {
    if (navigator.share) {
      try {
        const blob = await (await fetch(previewUrl)).blob();
        const file = new File([blob], `kaia-${song.title}.png`, { type: 'image/png' });
        await navigator.share({
          title: `${song.title} - KAIA`,
          text: `Check out "${song.title}" by KAIA! 🎶`,
          files: [file],
        });
      } catch (err) {
        // Fallback to download
        downloadCard();
      }
    } else {
      downloadCard();
    }
  };

  return (
    <>
      <button className="share-song-btn" onClick={generateCard} aria-label="Share this song">
        <i className="fas fa-share-alt"></i> Share
      </button>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {showPreview && (
        <div className="share-preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="share-preview-modal" onClick={e => e.stopPropagation()}>
            <button className="share-preview-close" onClick={() => setShowPreview(false)}>✕</button>
            <h4>Share this song</h4>
            <img src={previewUrl} alt="Share card preview" className="share-preview-img" />
            <div className="share-preview-actions">
              <button className="share-action-btn" onClick={shareCard}>
                <i className="fas fa-share"></i> Share
              </button>
              <button className="share-action-btn share-action-download" onClick={downloadCard}>
                <i className="fas fa-download"></i> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareSongCard;
