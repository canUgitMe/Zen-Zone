import React, { useState } from 'react';
import ZenGarden from './ZenGarden';
import SoothingSoundBoard from './SoothingSoundBoard';
import ZenSandRake from './ZenSandRake';
import RipplePond from './RipplePond';
import './ZenZone.css';

const ZenZone = () => {
  const [activeGame, setActiveGame] = useState(null);

  const toggleGame = (game) => {
    setActiveGame(activeGame === game ? null : game);
  };

  return (
    <div className="zen-zone-background">
      <div className="zen-glass">
        <h1 className="zen-zone-heading">
          <span className="ZoneZZ">Zen</span><span className="ZoneBB">Zone</span></h1>

        <div className="zen-zone-icons">
          <button className="zen-icon" onClick={() => toggleGame('ZenGarden')} title="Bubble Wrap">🫧</button>
          <button className="zen-icon" onClick={() => toggleGame('SoothingSoundBoard')} title="Sound Board">🎧</button>
          <button className="zen-icon" onClick={() => toggleGame('ZenSandRake')} title="Sand Rake">🪷</button>
          <button className="zen-icon" onClick={() => toggleGame('RipplePond')} title="Ripple Pond">🌊</button>
        </div>

        <div className="zen-zone-section">
          {activeGame === 'ZenGarden' && <ZenGarden />}
          {activeGame === 'SoothingSoundBoard' && <SoothingSoundBoard />}
          {activeGame === 'ZenSandRake' && <ZenSandRake />}
          {activeGame === 'RipplePond' && <RipplePond />}
        </div>
      </div>
    </div>
  );
};

export default ZenZone;
