import React, { useState, useEffect, useRef } from 'react';
import './ZenTasks.css';

const ZenTasks = ({ darkMode, setPage }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [activeReminder, setActiveReminder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [reminderPopup, setReminderPopup] = useState(null);
  const audioRef = useRef(null); // Ref to store audio

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nowTrimmed = new Date();
      nowTrimmed.setSeconds(0);
      nowTrimmed.setMilliseconds(0);

      tasks.forEach((task, index) => {
        if (
          !task.reminder ||
          task.done ||
          activeReminder !== null ||
          task.reminderShown
        )
          return;

        const [hour, minute] = task.reminder.split(':').map(Number);
        const taskReminder = new Date();
        taskReminder.setHours(hour);
        taskReminder.setMinutes(minute);
        taskReminder.setSeconds(0);
        taskReminder.setMilliseconds(0);

        if (taskReminder.getTime() === nowTrimmed.getTime()) {
          const audio = new Audio(`${process.env.PUBLIC_URL}/audio/pop-up{Zen-Tasks}.mp3`);
          audioRef.current = audio;
          audio.play();

          setReminderPopup(task.text);
          setActiveReminder(index);

          const updatedTasks = [...tasks];
          updatedTasks[index].reminderShown = true;
          setTasks(updatedTasks);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, activeReminder]);

  const addTask = () => {
    if (newTask.trim() === '') return;

    if (tasks.length >= 8) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }

    setTasks([
      ...tasks,
      {
        text: newTask,
        done: false,
        reminder: reminderTime || null,
        reminderShown: false,
      },
    ]);
    setNewTask('');
    setReminderTime('');
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    if (activeReminder === index) setActiveReminder(null);
  };

  const handleDismiss = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setReminderPopup(null);
    setActiveReminder(null);
  };

  return (
    <div className={`zentasks-wrapper ${darkMode ? 'dark' : 'light'}`}>
      <div className="zentask-glass">
        <button className="zentask-back-btn" onClick={() => setPage('highlights')}>
          ⬅ Back to Zones
        </button>

        <h2 className="zentask-title">Zen<span className='task-yellow'>Tasks</span></h2>

        <div className="zentask-input-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="zentask-input"
          />
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="zentask-input"
          />
          <button onClick={addTask} className="zentask-add-btn">
            Add
          </button>
        </div>

        <ul className="zentask-list">
          {tasks.length === 0 ? (
            <p className="zentask-empty">No Tasks Yet</p>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className={`zentask-item fade ${task.done ? 'checked' : 'crossed'}`}
              >
                <span className="check-icon" onClick={() => toggleTask(index)}>
                  {task.done ? '✔' : '✘'}
                </span>
                <span className="task-text">{task.text}</span>
                <button
                  className="zentask-delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  🗑
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {showPopup && (
        <div className="zentask-popup">
          Finish one task to add more!
        </div>
      )}

      {reminderPopup && (
        <div className="zentask-reminder-popup">
          <div className="zentask-reminder-text">Reminder: {reminderPopup}</div>
          <button className="zentask-dismiss-btn" onClick={handleDismiss}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default ZenTasks;