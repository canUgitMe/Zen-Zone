import React, { useState, useRef, useEffect } from 'react';
import './ZenWave.css';
import { Play, Pause, Repeat, SkipBack, SkipForward, ArrowLeft } from 'lucide-react';

const ZenWave = ({ darkMode, setPage }) => {
  const [query, setQuery] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [volume, setVolume] = useState(50);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setVideoId(null);

    try {
      const res = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.videoId) {
        setVideoId(data.videoId);
      } else {
        setError('No video found. Try a different song.');
      }
    } catch (err) {
      console.error('🎧 Frontend search failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId && window.YT) {
      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId);
      } else {
        playerRef.current = new window.YT.Player('ytplayer', {
          videoId,
          events: {
            onReady: (event) => {
              event.target.setVolume(volume);
              event.target.playVideo();
              setDuration(event.target.getDuration());
            },
            onStateChange: () => {
              const interval = setInterval(() => {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                  setCurrentTime(playerRef.current.getCurrentTime());
                  setDuration(playerRef.current.getDuration());
                }
              }, 1000);
              return () => clearInterval(interval);
            },
          },
        });
      }
    }
  }, [videoId]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const loopVideo = () => {
    if (playerRef.current) {
      const videoId = playerRef.current.getVideoData().video_id;
      playerRef.current.loadVideoById({
        videoId,
        startSeconds: 0,
        endSeconds: undefined,
        suggestedQuality: 'default',
      });
    }
  };

  const changeVolume = (e) => {
    const vol = parseInt(e.target.value);
    setVolume(vol);
    if (playerRef.current) playerRef.current.setVolume(vol);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current) playerRef.current.seekTo(newTime, true);
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={`zenwave-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="video-bg">
        <div id="ytplayer" ref={iframeRef}></div>
      </div>

      {/* Back Button */}
      <div className="zenwave-back-btn" onClick={() => setPage('highlights')}>
        <ArrowLeft size={20} />
        <span> ⬅ Back to Zones</span>
      </div>

      <div className="zenwave-ui">
        <h2 className="zenwave-title">
          <span className="zen-text">Zen</span>
          <span className="wave-text">Wave</span>
        </h2>

        <input
          type="text"
          className="zenwave-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song..."
        />
        <button className="zenwave-button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search & Play'}
        </button>
        {error && <p className="zenwave-error">{error}</p>}

        {videoId && (
          <div className="zenwave-player">
            <div className="zenwave-center-controls">
              <div className="button-row">
                <button className="control-btn" onClick={() => playerRef.current.seekTo(currentTime - 10)}>
                  <SkipBack size={24} />
                </button>

                <button className="control-btn" onClick={togglePlayPause}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <button className="control-btn" onClick={() => playerRef.current.seekTo(currentTime + 10)}>
                  <SkipForward size={24} />
                </button>
              </div>

              <div className="duration-container">
                <span className="duration-time">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="seek-bar"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZenWave;