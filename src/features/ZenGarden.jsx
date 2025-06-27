import React, { useState } from 'react';
import './ZenGarden.css';

const ZenGarden = () => {
  const [popped, setPopped] = useState(Array(64).fill(false));

  const handlePop = (i) => {
    const newPopped = [...popped];
    newPopped[i] = true;
    setPopped(newPopped);

    // Play pop sound from public/audio/pop.mp3
    const popSound = new Audio(process.env.PUBLIC_URL + '/audio/pop.mp3');
    popSound.play();
  };

  return (
    <div className="zen-garden">
      <h2>🫧 Zen Bubble Popper</h2>
      <div className="bubble-grid">
        {popped.map((isPopped, i) => (
          <div
            key={i}
            className={`bubble ${isPopped ? 'popped' : ''}`}
            onClick={() => handlePop(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ZenGarden;
