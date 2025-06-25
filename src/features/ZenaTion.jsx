import React, { useState, useEffect, useRef } from 'react';
import './ZenaTion.css';

const SOUNDS = [
  { label: 'Forest Birds', src: `${process.env.PUBLIC_URL}/audio/mountain.mp3` },
  { label: 'Rain & Thunder', src: `${process.env.PUBLIC_URL}/audio/rain.mp3` },
  { label: 'Ocean Waves', src: `${process.env.PUBLIC_URL}/audio/ocean.mp3` },
  { label: 'Tibetan Bowls', src: `${process.env.PUBLIC_URL}/audio/bowls.mp3` },
];

const BACKGROUNDS = [
  { label: 'Soft Gradient', src: null }, // fallback to CSS gradient
  { label: 'Mountains', src: `${process.env.PUBLIC_URL}/videos/mountain.mp4` },
  { label: 'Sunrise', src: `${process.env.PUBLIC_URL}/videos/sunrise.mp4` },
  { label: 'Misty Forest', src: `${process.env.PUBLIC_URL}/videos/forest.mp4` },
];

const DURATIONS = [
  { label: '2 min', seconds: 120 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
];

const ZenaTion = ({ isDarkMode, setPage }) => {
  const [duration, setDuration] = useState(DURATIONS[1]); // default 5 min
  const [sound, setSound] = useState(SOUNDS[0]);
  const [bgVideo, setBgVideo] = useState(BACKGROUNDS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration.seconds);
  const [muted, setMuted] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);


  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimeLeft(duration.seconds);
  }, [duration]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      // Optionally, add alert or sound here when session ends
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, timeLeft]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setIsPlaying(true);
      audioRef.current.play().catch((err) => {
        console.error("Audio play error:", err);
      });
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  // Handle sound change safely during playback
  const handleSoundChange = (e) => {
    const selected = SOUNDS.find((s) => s.label === e.target.value);
    setSound(selected);

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = selected.src;
      audioRef.current.load();

      audioRef.current.oncanplaythrough = () => {
        audioRef.current.play().catch((err) => {
          console.error("Audio play error after source change:", err);
        });
        audioRef.current.oncanplaythrough = null; // cleanup listener
      };
    }
  };

  // Breathing phase animation (inhale 4s, exhale 2s cycle)
  const [breathPhase, setBreathPhase] = useState('inhale');
  useEffect(() => {
    if (!isPlaying) {
      setBreathPhase('inhale');
      return;
    }
    const cycleTime = 6000;
    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) % cycleTime;
      if (elapsed < 4000) setBreathPhase('inhale');
      else setBreathPhase('exhale');
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Format mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className={`zenation-page ${isDarkMode ? 'dark' : 'light'}`}>
      {bgVideo.src ? (
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          src={bgVideo.src}
        />
      ) : (
        <div className="gradient-background"></div>
      )}

      <div className="back-btn" onClick={() => setPage('highlights')}>
        ← Back
      </div>

      <div className="preferences-wrapper">
  <div className="preferences-toggle" onClick={() => setShowPrefs(!showPrefs)}>
  Preferences {showPrefs ? '▲' : '▼'}
</div>

  {showPrefs && (
    <div className={`controls-panel glassmorphic ${isDarkMode ? 'dark' : ''}`}>
      <div className="control-group">
        <label>Session Duration:</label>
        <div className="buttons-row">
          {DURATIONS.map((d) => (
            <button
              key={d.label}
              className={d.label === duration.label ? 'active' : ''}
              onClick={() => setDuration(d)}
              disabled={isPlaying}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Background Sound:</label>
        <select
          value={sound.label}
          onChange={handleSoundChange}
          disabled={isPlaying}
        >
          {SOUNDS.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label>Background Video:</label>
        <select
          value={bgVideo.label}
          onChange={(e) => {
            const selected = BACKGROUNDS.find((b) => b.label === e.target.value);
            setBgVideo(selected);
          }}
          disabled={isPlaying}
        >
          {BACKGROUNDS.map((b) => (
            <option key={b.label} value={b.label}>
              {b.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )}
</div>

      <div className="breathing-container">
  <div className={`breathing-circle ${breathPhase}`}>
    <div className="breathing-text">
      {breathPhase === 'inhale' ? 'Inhale' : 'Exhale'}
    </div>
  </div>

  <div className="below-circle-info">
    <div className="timer-display">{formatTime(timeLeft)}</div>
    <button className="start-stop-btn" onClick={togglePlay}>
      {isPlaying ? 'Pause' : 'Start'}
    </button>
  </div>
</div>


      {/* Render audio only if src exists to avoid unsupported source error */}
      {sound.src && (
        <audio
          ref={audioRef}
          src={sound.src}
          loop
          muted={muted}
        />
      )}
      <button className="mute-btn" onClick={toggleMute}>
            {muted ? '▶' : '❚❚'}
          </button>
    </div>
  );
};

export default ZenaTion;