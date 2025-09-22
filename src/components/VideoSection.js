import React from 'react';
import Videos from './Videos';

const VideoSection = () => {
  return (
    <section className="content-section" id="videos">
      <div className="container px-4 px-lg-5">
        <div className="content-section-heading text-center">
          <h2 className="mb-5 fade-in">Videos</h2>
        </div>
        <Videos />
      </div>
    </section>
  );
};

export default VideoSection;