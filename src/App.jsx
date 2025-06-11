import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Highlights from './components/Highlights';
import AboutUs from './components/AboutUs';
import ZenScribble from './features/ZenScribble';
import Feedback from './components/Feedback';


const App = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [started, setStarted] = useState(false);
  const [media, setMedia] = useState({ video: '', audio: '' });
  const [nameError, setNameError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [muted, setMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [page, setPage] = useState('home');

  const audioRef = useRef(null);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const validate = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!time.trim()) {
      setTimeError('Time is required');
      valid = false;
    } else {
      setTimeError('');
    }

    return valid;
  };

  const handleStart = () => {
    if (!validate()) return;

    const hour = parseInt(time.split(':')[0], 10);
    const base = process.env.PUBLIC_URL;

    let videoPath = `${base}/videos/morning.mp4`;
    let audioPath = `${base}/audio/morning.mp3`;

    if (hour >= 5 && hour < 12) {
      videoPath = `${base}/videos/morning.mp4`;
      audioPath = `${base}/audio/morning.mp3`;
    } else if (hour >= 12 && hour < 18) {
      videoPath = `${base}/videos/evening.mp4`;
      audioPath = `${base}/audio/evening.mp3`;
    } else {
      videoPath = `${base}/videos/night.mp4`;
      audioPath = `${base}/audio/night.mp3`;
    }

    setMedia({ video: videoPath, audio: audioPath });
    setStarted(true);
  };

  const toggleMute = () => {
    setMuted(prev => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const renderContent = () => {
  switch (page) {
 case 'home':
  return (
    <>
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={media.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} autoPlay loop muted={muted}>
        <source src={media.audio} type="audio/mp3" />
      </audio>

      <div className="music-controller" onClick={toggleMute}>
        <div className="glass-circle">
          {muted ? (
            <svg className="icon" viewBox="0 0 24 24">
              <path fill="white" d="M16 7H14V17H16V7ZM10 7H8V17H10V7Z" />
            </svg>
          ) : (
            <svg className="icon" viewBox="0 0 24 24">
              <path fill="white" d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>

      {/* 👇 Display user's name in center */}
      <div className="username-display">
        Hey, {name}<br/>Welcome to ZenZone!
      </div>
    </>
  );
    case 'highlights':
      return (
        <Highlights
          darkMode={isDarkMode}
          muted={muted}
          toggleMute={toggleMute}
          audioRef={audioRef}
          setPage={setPage}
        />
      );
      case 'zenscribble':
      return <ZenScribble />;

    case 'about':
      return <AboutUs isDarkMode={isDarkMode} />;

    case 'feedback':
      return <Feedback darkMode={isDarkMode}/>;

    default:
      return null;
  }
};

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        <div className="glass-toggle">
          {isDarkMode ? '🌙' : '☀️'}
        </div>
      </div>

      {!started ? (
        <div className="welcome-overlay">
          <div className="welcome-box">
            <h1>
              Welcome to <span className="zen-highlight">ZenZone</span>
            </h1>

            <label>
              Name<span className="required"></span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={nameError ? 'input-error' : ''}
              />
            </label>
            {nameError && <div className="error-message">{nameError}</div>}

            <label>
              Time of Session<span className="required"></span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={timeError ? 'input-error' : ''}
              />
            </label>
            {timeError && <div className="error-message">{timeError}</div>}

            <button onClick={handleStart}>Start My Break</button>
          </div>
        </div>
      ) : (
        <div className="glass-wrapper popup">
          <div className="logo-top">
            <span className="zen-black">Zen</span><span className="zone-white">Zone</span>
          </div>
          <nav className="glass-navbar">
            <ul className="nav-links centered">
              <li onClick={() => setPage('home')}>Home</li>
              <li onClick={() => setPage('highlights')}>Zones</li>
              <li onClick={() => setPage('about')}>About us</li>
              <li onClick={() => setPage('feedback')}>Feedback</li>
            </ul>
          </nav>
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default App;