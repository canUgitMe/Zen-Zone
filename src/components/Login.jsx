import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  if (username.trim() && password.trim()) {
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        onLogin(); // ✅ Login successful
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check your connection or try again later.');
    }
  } else {
    setError('Username and Password are required');
  }
};


return (
<div className="login-container">
<div className="login-box glassy">
<h1 className="login-title">
<span className="zen-wh">Zen</span>
<span className="zone-bl">Zone</span>
</h1>
<form onSubmit={handleSubmit}>
<label>
Username<span className="required"></span>
<input
type="text"
value={username}
onChange={(e) => setUsername(e.target.value)}
placeholder="Enter your username"
/>
</label>
<label>
Password<span className="required"></span>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Enter your password"
/>
</label>
{error && <div className="error-message">{error}</div>}
<button type="submit" className="break-button1">Login</button>
</form>
</div>
</div>
);
};

export default Login;