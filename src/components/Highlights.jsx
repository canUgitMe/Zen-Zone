import React, { useState } from 'react';
import './Highlights.css';

const Highlights = ({ darkMode, muted, toggleMute, audioRef, setPage }) => {

  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState('');

  const featureSlides = [
  [
    {
      icon: `${process.env.PUBLIC_URL}/icons/feature1.png`,
      title: `<span class='feature1-text1'>Zen</span><span class='feature1-text2'>Scribble</span>`,
      desc: 'A Zen-Way To Scribble!',
      pageKey: 'zenscribble',
    },
    {
      icon: `${process.env.PUBLIC_URL}/icons/feature2.png`,
      title: `<span class='feature2-text1'>Zen</span><span class='feature2-text2'>Wave</span>`,
      desc: 'A Zen-Way To Musify!',
      pageKey: 'zenwave',
    },
    {
      icon: `${process.env.PUBLIC_URL}/icons/feature3.png`,
      title: `<span class='feature3-text1'>Zen</span><span class='feature3-text2'>Tasks</span>`,
      desc: 'A Zen-Way To-Do!',
      pageKey: 'zentasks',
    },
  ],
  [
    {
      icon: `${process.env.PUBLIC_URL}/icons/feature4.png`,
      title: `<span class='feature4-text1'>Zena</span><span class='feature4-text2'>Tion</span>`,
      desc: 'A Zen-Way To Calm!',
      pageKey: 'zenation',
    },
    {
      icon: `${process.env.PUBLIC_URL}/icons/feature5.png`,
      title: `<span class='feature5-text1'>Zona</span><span class='feature5-text2'>Lize</span>`,
      desc: 'A Zen-Way To Rise!',
      pageKey: 'zonalize',
    },
    {
      icon: `${process.env.PUBLIC_URL}/icons/feature6.png`,
      title: `<span class='feature6-text1'>Zen</span><span class='feature6-text2'>Zone</span>`,
      desc: 'A Zen-Way To ZenZone!',
      pageKey: 'zenzone',
    },
  ],
];

  const toggleSlide = () => {
    setDirection(slideIndex === 0 ? 'left' : 'right');
    setSlideIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className={`highlights-container ${darkMode ? '': 'dark-mode'}`}>
      <video className="bg-video" autoPlay loop muted playsInline>
        <source
          src={`${process.env.PUBLIC_URL}/videos/highlights-bg.mp4`}
          type="video/mp4"
        />
      </video>

      <audio ref={audioRef} autoPlay loop muted={muted}>
        <source
          src={`${process.env.PUBLIC_URL}/audio/highlights-music.mp3`}
          type="audio/mp3"
        />
      </audio>

      <div className={`music-controller ${darkMode ? 'dark' : 'light'}`} onClick={toggleMute}>
        <div className="glass-circle">
          {muted ? (
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M16 7H14V17H16V7ZM10 7H8V17H10V7Z" />
            </svg>
          )}
        </div>
      </div>

      <div className="glass-feature-box">
        <h2 className="highlight-title">Zones</h2>
        <div className={`features-grid slide-${direction}`}>
          {featureSlides[slideIndex].map((feature, index) => (
            <div className="feature-card" key={index} onClick={() => setPage(feature.pageKey)}>
              <img src={feature.icon} alt={`Feature ${index + 1}`} />
              <h4
                className="feature-title"
                dangerouslySetInnerHTML={{ __html: feature.title }}
              />
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="arrow-button-container">
          <div className="arrow-button" onClick={toggleSlide}>
            {slideIndex === 0 ? '»' : '«'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;