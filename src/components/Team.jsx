import './Team.css';

const Team = ({ isDarkMode, setPage }) => {
  return (
    <div className={`team-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="team-header">
        <h1>Meet Our Team</h1>
        <p>We are the minds behind ZenZone — building your calm one feature at a time!</p>
      </div>

      {/* Placeholder for team cards or more content */}
      <div className="team-members-grid">
        {/* Add members here */}
        <div className="team-card">
  <h2>
    <span className="arijit">Arijit</span> <span className="adhikary">Adhikary</span>
  </h2>
  <p>arijitadhikary777@gmail.com</p>
</div>

<div className="team-card">
  <h2>
    <span className="anupama">Anupama</span> <span className="bain">Bain</span>
  </h2>
  <p>anupamabain24@gmail.com</p>
</div>

<div className="team-card">
  <h2>
    <span className="rishave">Rishave</span> <span className="ghosh">Ghosh</span>
  </h2>
  <p>rishavecr2897@gmail.com</p>
</div>

<div className="team-card">
  <h2>
    <span className="annwesha">Annwesha</span> <span className="naha">Naha</span>
  </h2>
  <p>annweshanaha2005@gmail.com</p>
</div>
      </div>

      <div className="back-btn" onClick={() => setPage('about')}>
        ← Back
      </div>
    </div>
  );
};

export default Team;