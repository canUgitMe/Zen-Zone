import React, { useState, useEffect } from 'react';
import './ZenScribble.css';

const ZenScribble = ({ darkMode, setPage }) => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  // Load notes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('zenscribble-notes');
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotes(parsed);
      if (parsed.length > 0) {
        setNote(parsed[0]);
        setCurrentIndex(0);
      }
    }
  }, []);

  // Save notes to localStorage on notes change
  useEffect(() => {
    localStorage.setItem('zenscribble-notes', JSON.stringify(notes));
  }, [notes]);

  // Sync textarea with current note
  useEffect(() => {
    if (notes.length === 0) {
      setNote('');
      setCurrentIndex(0);
    } else if (currentIndex >= notes.length) {
      setCurrentIndex(notes.length - 1);
    } else {
      setNote(notes[currentIndex]);
    }
  }, [notes, currentIndex]);

  const handleAdd = () => {
  if (note.trim() !== '') {
    setNotes((prev) => [...prev, note]);
    setNote(''); // ✅ Clear textarea
    setCurrentIndex(notes.length); // ✅ Set index to the new note

    // ✅ Prevent sync effect from overriding our cleared note
    setTimeout(() => {
      setNote('');
    }, 0);
  }
};


  const handleDelete = (index) => {
    // Trigger fade out animation before deletion
    setFadeClass('fade-out');

    setTimeout(() => {
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);

      if (updatedNotes.length === 0) {
        setCurrentIndex(0);
        setNote('');
      } else if (index === currentIndex) {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        setCurrentIndex(newIndex);
        setNote(updatedNotes[newIndex]);
      } else if (index < currentIndex) {
        setCurrentIndex((prev) => prev - 1);
      }

      setFadeClass('fade-in');
    }, 200); // duration must match your CSS transition
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setFadeClass('fade-in');
      }, 200);
    }
  };

  const handleNext = () => {
    if (currentIndex < notes.length - 1) {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setFadeClass('fade-in');
      }, 200);
    }
  };

  const handleLoadNoteToTextarea = (index) => {
    setNote(notes[index]);
    setCurrentIndex(index);
  };

  return (
    <div
      className={`scribble-wrapper ${darkMode ? 'light' : 'dark'}`}
      style={{
        background: "url('/images/Scribble.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        width: "100%",
        height: "100vh",
      }}
    >
    <button
  className={`scribble-back-btn ${darkMode ? 'dark' : 'light'}`}
  onClick={() => setPage('highlights')}
>
  ⬅
</button>

      <div className="scribble-box glassy">
        <h2 className="scribble-title">📝 ZenScribble</h2>
        <p className="scribble-sub">Let your thoughts flow mindfully...</p>

        <textarea
          className="scribble-input"
          placeholder="Type your note here..."
          value={note}
          onChange={(e) => {
            const words = e.target.value.trim().split(/\s+/);
            if (words.length <= 2000) {
              setNote(e.target.value);
            }
          }}
        />

        <div className="scribble-bottom-layout">
          <div className="glass-plus-btn" onClick={handleAdd}>
            +
          </div>

          <div className="note-viewer">
            {notes.length > 0 && notes[currentIndex] !== undefined ? (
              <>
                <button
                  className="arrow-btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  &lt;
                </button>

                <div
                  className={`note-display glassy ${fadeClass}`}
                  onClick={() => handleLoadNoteToTextarea(currentIndex)}
                  title="Click to load this note"
                >
                  <p className="note-preview">
                    {notes[currentIndex]
                      .split(' ')
                      .slice(0, 25)
                      .join(' ') +
                      (notes[currentIndex].split(' ').length > 25 ? '...' : '')}
                  </p>

                  <button
                    onClick={() => handleDelete(currentIndex)}
                    className="delete-btn"
                  >
                    🗑
                  </button>
                </div>

                <button
                  className="arrow-btn"
                  onClick={handleNext}
                  disabled={currentIndex === notes.length - 1}
                >
                  &gt;
                </button>
              </>
            ) : (
              <div className="no-notes-msg">No notes yet!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenScribble;