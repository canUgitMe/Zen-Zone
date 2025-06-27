import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = ({darkMode}) => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [minutes, setMinutes] = useState(workMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [tempWork, setTempWork] = useState(workMinutes);
  const [tempBreak, setTempBreak] = useState(breakMinutes);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          const nextIsWork = !isWork;
          setIsWork(nextIsWork);
          setMinutes(nextIsWork ? workMinutes : breakMinutes);
          setSeconds(0);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds, minutes, isWork, workMinutes, breakMinutes]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(workMinutes);
    setSeconds(0);
    setIsWork(true);
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
    setTempWork(workMinutes);
    setTempBreak(breakMinutes);
  };

  const applySettings = () => {
    const w = parseInt(tempWork);
    const b = parseInt(tempBreak);
    if (!isNaN(w) && w > 0 && !isNaN(b) && b > 0) {
      setWorkMinutes(w);
      setBreakMinutes(b);
      setMinutes(w);
      setSeconds(0);
      setIsWork(true);
      setIsRunning(false);
      setShowSettings(false);
    }
  };

  const formatTime = (val) => (val < 10 ? `0${val}` : val);

  return (
    <div className={`pomodoro-wrapper ${darkMode ? 'dark':'light'}`}>
      <div className="pomodoro-container">
        <h1 className="pomodoro-title">POMODORO TIMER</h1>
        <p className="timer-mode">{isWork ? 'Work Time' : 'Break Time'}</p>
        <div className="timer-display">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
        <div className="button-group">
          <button onClick={handleStartPause}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={toggleSettings}>Settings</button>
        </div>

        {showSettings && (
          <div className="settings-popup">
            <h3>Pomodoro Settings</h3>
            <label>
              Work Duration (minutes)
              <input
                type="number"
                value={tempWork}
                onChange={(e) => setTempWork(e.target.value)}
              />
            </label>
            <label>
              Break Duration (minutes)
              <input
                type="number"
                value={tempBreak}
                onChange={(e) => setTempBreak(e.target.value)}
              />
            </label>
            <div className="settings-buttons">
              <button onClick={applySettings}>Apply</button>
              <button onClick={toggleSettings}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;