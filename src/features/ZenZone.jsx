import React, { useState, useRef, useEffect } from 'react';
import './ZenZone.css';

const videoOptions = [
  { name: 'Ocean', file: 'ocean.mp4' },
  { name: 'Train', file: 'train.mp4' },
  { name: 'Sakura', file: 'sakura.mp4' },
  { name: 'Stars', file: 'stars.mp4' },
  { name: 'Fire', file: 'fire.mp4' }
];

const ZenZone = () => {
  const [selectedVideo, setSelectedVideo] = useState('ocean.mp4');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handleVideoChange = (e) => {
    setSelectedVideo(e.target.value);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      videoRef.current.muted = isMuted;
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="zenzone-container">
      <video
        key={selectedVideo}
        ref={videoRef}
        className="zenzone-video"
        autoPlay
        loop
      >
        <source src={`/videos/${selectedVideo}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="zenzone-controls-container">
        <div className="zenzone-controls">
          <label htmlFor="videoSelect">🎥 Choose Your Visual</label>
          <select id="videoSelect" value={selectedVideo} onChange={handleVideoChange}>
            {videoOptions.map((video) => (
              <option key={video.file} value={video.file}>
                {video.name}
              </option>
            ))}
          </select>
          <div className="zenzone-buttons">
            <button onClick={togglePlayPause}>
              {isPlaying ? '⏸ Pause Visual' : '▶ Play Visual'}
            </button>
            <button onClick={toggleMute}>
              {isMuted ? '🔈 Unmute Sound' : '🔇 Mute Sound'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenZone;