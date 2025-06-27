import React, { useState, useRef } from 'react';
import './SoothingSoundBoard.css';

const sounds = [
  { label: 'Rain', file: process.env.PUBLIC_URL + '/audio/rain.mp3' },
  { label: 'Ocean', file: process.env.PUBLIC_URL + '/audio/ocean.mp3' },
  { label: 'Mountain', file: process.env.PUBLIC_URL + '/audio/mountain.mp3' },
];

const SoothingSoundBoard = () => {
  const audioRefs = useRef({});
  const [playing, setPlaying] = useState({});

  const toggleSound = (label, file) => {
    let audio = audioRefs.current[label];

    if (!audio) {
      audio = new Audio(file);
      audio.loop = true;
      audioRefs.current[label] = audio;
    }

    if (playing[label]) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Playback failed:", err));
    }

    setPlaying((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="sound-board">
      {sounds.map((sound, i) => (
        <button
          key={i}
          className="sound-button"
          onClick={() => toggleSound(sound.label, sound.file)}
        >
          {playing[sound.label] ? `Pause ${sound.label}` : `Play ${sound.label}`}
        </button>
      ))}
    </div>
  );
};

export default SoothingSoundBoard;
