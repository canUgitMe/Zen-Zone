import React from 'react';
import './AboutUs.css';

const zenFeatures = [
  {
    title: 'ZenScribble',
    desc: 'A mindful space to scribble, doodle, or journal your thoughts.'
  },
  {
    title: 'ZenWave',
    desc: 'A curated audio zone to immerse yourself in calming soundscapes.'
  },
  {
        title: 'ZenTasks',
    desc: 'A push to help you complete your tasks in a Zen kinda Way.'
  },
  {
    title: 'ZenZone',
    desc: 'Ambient visual experiences to ease stress and promote mindfulness.'
  }
];

const AboutUs = ({ isDarkMode }) =>{
  return (
    <div className={`zen-page-center ${isDarkMode ? '': 'dark-mode' }`}>
    <div className="zen-page-center" 
    style={{
    background: "url('/images/zen-bg.jpg') no-repeat center center fixed",
    backgroundSize: "cover"
  }}>
    <div className="zen-content-wrapper">

      <div className="zen-header-title">
        <h1>About ZenZone</h1>
        <p>Your digital sanctuary for peace, focus, and creative flow.</p>
      </div>
      <div className="zen-card-grid">
        {zenFeatures.map((feature, index) => {
          const [prefix, suffix] = feature.title.startsWith("Zen")
            ? ["Zen", feature.title.slice(3)]
            : ["", feature.title];

          return (
            <div className="zen-glass-card" key={index}>
              <h2>
                <span className="zen-prefix">{prefix}</span>
                <span className={`zen-suffix suffix-${index}`}>{suffix}</span>
              </h2>
              <p>{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
    </div>
    </div>
  );
};

export default AboutUs;