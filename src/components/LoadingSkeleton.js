import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-page">
      {/* Header skeleton */}
      <div className="skeleton-header">
        <div className="skeleton-nav">
          <div className="skeleton-box skeleton-logo"></div>
          <div className="skeleton-nav-links">
            <div className="skeleton-box skeleton-link"></div>
            <div className="skeleton-box skeleton-link"></div>
            <div className="skeleton-box skeleton-link"></div>
            <div className="skeleton-box skeleton-link"></div>
          </div>
        </div>
        <div className="skeleton-box skeleton-banner"></div>
      </div>

      {/* Content skeleton */}
      <div className="skeleton-content">
        <div className="skeleton-box skeleton-title"></div>
        <div className="skeleton-row">
          <div className="skeleton-box skeleton-card"></div>
          <div className="skeleton-box skeleton-card"></div>
          <div className="skeleton-box skeleton-card"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
