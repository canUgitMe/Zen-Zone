import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import './ZonaLize.css';

const MOODS = [
  { mood: 'Anxious', color: '#C3E0E5' },
  { mood: 'Depressed', color: '#C9ADA7' },
  { mood: 'Upset', color: '#F4DADA' },
  { mood: 'Low', color: '#E6E6FA' },
  { mood: 'Panicked', color: '#FFE0AC' },
  { mood: 'Sad', color: '#AEC6CF' },
  { mood: 'Angry', color: '#FFB3B3' },
  { mood: 'Stressed', color: '#FFD580' },
  { mood: 'Lonely', color: '#D8BFD8' },
  { mood: 'Bored', color: '#E0E0E0' },
  { mood: 'Insecure', color: '#FFCBCB' },
  { mood: 'Guilty', color: '#F9D5E5' },
  { mood: 'Confused', color: '#D5E1DF' },
  { mood: 'Indifferent', color: '#CFCFC4' },
  { mood: 'Tired', color: '#E6DADA' },
  { mood: 'Nostalgic', color: '#FFDAC1' },
  { mood: 'Melancholic', color: '#D6CDEA' }
];

const QUOTES = {
  Anxious: ["Breathe. You’ve survived 100% of your worst days.", "Inhale calm, exhale stress."],
  Depressed: ["This feeling is temporary. You are not alone.", "Every storm runs out of rain."],
  Upset: ["Let go of what you can't control.", "You deserve peace."],
  Low: ["Be gentle with yourself today.", "Small steps are still progress."],
  Panicked: ["Ground yourself. You are safe.", "You are in control."],
  Sad: ["It's okay to feel sad. Let it pass through you.", "Tears are a sign of healing."],
  Angry: ["Take a pause, not a reaction.", "Even fire cools down."],
  Stressed: ["Breathe in calm, exhale tension.", "One task at a time."],
  Lonely: ["You're never truly alone.", "Reach out—someone cares."],
  Bored: ["This moment will pass. Find something new.", "Creativity often starts with boredom."],
  Insecure: ["You are more than your doubts.", "Growth starts with believing in yourself."],
  Guilty: ["Mistakes make us human.", "Forgive yourself, grow from it."],
  Confused: ["Clarity comes after reflection.", "It’s okay to not have all the answers."],
  Indifferent: ["Numbness is a sign to rest, not ignore.", "Start small, feel again."],
  Tired: ["Rest is productive.", "Give yourself permission to recharge."],
  Nostalgic: ["Old days shaped you, but now is your power.", "Honor the past, but live the present."],
  Melancholic: ["Beauty lives in reflection too.", "Soft sadness is still strength."]
};

const ACTIVITIES = {
  Anxious: ["Try deep breathing", "Take a short walk"],
  Depressed: ["Write down one good thing", "Drink water"],
  Upset: ["Listen to calming music", "Stretch a little"],
  Low: ["Take a warm shower", "Call a friend"],
  Panicked: ["Do a 5-4-3-2-1 grounding exercise", "Focus on your breath"],
  Sad: ["Watch a comforting video", "Write down what you're feeling"],
  Angry: ["Punch a pillow (safely!)", "Write a letter you won’t send"],
  Stressed: ["Make a to-do list", "Stretch or move for 5 mins"],
  Lonely: ["Send a message to someone", "Go outside for a walk"],
  Bored: ["Start a new playlist", "Try doodling something silly"],
  Insecure: ["List 3 things you like about yourself", "Wear your favorite outfit"],
  Guilty: ["Talk to someone you trust", "Write an apology or reflection"],
  Confused: ["Journal your thoughts", "Take a short break to reset"],
  Indifferent: ["Step outside", "Watch something that used to make you laugh"],
  Tired: ["Drink water", "Lie down and close your eyes for 10 mins"],
  Nostalgic: ["Look at old photos", "Call someone from your past"],
  Melancholic: ["Play soft instrumental music", "Draw or color your feelings"]
};

const ZonaLize = ({ darkMode, muted, setPage }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  useEffect(() => {
  const audio = audioRef.current;

  if (audio && !muted) {
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay was blocked. User interaction required.");
      }
    };

    playAudio();
  }
}, [muted]);

  const moodColor = selectedMood ? MOODS.find(m => m.mood === selectedMood).color : '#ffffff';

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleShuffle = () => {
    if (!selectedMood) return;
    setQuoteIndex((prev) => (prev + 1) % QUOTES[selectedMood].length);
    setActivityIndex((prev) => (prev + 1) % ACTIVITIES[selectedMood].length);
  };


  return (
    <>
      <video
        className="zonalize-bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={`${process.env.PUBLIC_URL}/videos/ZonaLize.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} loop>
        <source src={`${process.env.PUBLIC_URL}/audio/ZonaLize.mp3`} type="audio/mp3" />
      </audio>

      <div className={`music-controller ${darkMode ? 'dark' : 'light'}`} onClick={togglePlayPause}>
        <div className="glass-circle">
          {isPlaying ? (
            <svg className="icon" viewBox="0 0 24 24">
              {/* Pause icon */}
              <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="icon" viewBox="0 0 24 24">
              {/* Play icon */}
              <path fill="white" d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>

      <div className={`zonalize-container ${darkMode ? 'dark' : 'light'}`} style={{ backgroundColor: moodColor }}>
        {!selectedMood ? (
          <div className="zonalize-wrapper">
            <div className="zonalize-glass-box">
              <button className="back-button" onClick={() => setPage('highlights')}>
                ⬅ Back to Zones
              </button>
              <h2 className="zonalize-title">
                <span className="feature5-text1">Zona</span>
                <span className="feature5-text2">Lize</span>
              </h2>
              <h3>How are you feeling?</h3>
              <div className="dropdown-wrapper">
                <input
                  type="text"
                  placeholder="Search your mood..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                  className="dropdown-input"
                />
                <span className="search-icon">🔍</span>
                {dropdownOpen && searchInput && (
                  <div className="dropdown-menu">
                    {MOODS.filter(m =>
                      m.mood.toLowerCase().includes(searchInput.toLowerCase())
                    ).map(m => (
                      <div
                        key={m.mood}
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedMood(m.mood);
                          setDropdownOpen(false);
                        }}
                      >
                        {m.mood}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="content">
            <h3>{selectedMood} Mode</h3>
            <div className="quote-box">{QUOTES[selectedMood][quoteIndex]}</div>
            <div className="activity-box">
              Suggested: {ACTIVITIES[selectedMood][activityIndex]}
            </div>
            <div className="controls">
              <button onClick={handleShuffle}>Shuffle </button>
              <button onClick={() => setSelectedMood(null)}>Change Mood</button>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default ZonaLize;