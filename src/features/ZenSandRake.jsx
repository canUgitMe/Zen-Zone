import React, { useRef, useEffect, useState } from 'react';
import './ZenSandRake.css';

const ZenSandRake = () => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Draw sandy background and setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size considering device pixel ratio
    canvas.width = 600 * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = '600px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);

    // Draw sandy background - light tan color with some noise
    const drawSandBackground = () => {
      ctx.fillStyle = '#f0e6d2'; // light sand color
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Optional: add some subtle noise/dots for texture
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * (canvas.width / dpr);
        const y = Math.random() * (canvas.height / dpr);
        const radius = Math.random() * 0.6;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(200,180,140, 0.15)';
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawSandBackground();
  }, []);

  // Start drawing lines on mouse down / touch start
  const startDrawing = (e) => {
    isDrawing.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    lastPos.current = { x, y };
  };

  // Draw lines following cursor/touch movement
  const draw = (e) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.strokeStyle = '#c9b58a'; // light brown (rake line)
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPos.current = { x, y };
  };

  // Stop drawing on mouse up / touch end
  const stopDrawing = () => {
    isDrawing.current = false;
  };

  // Clear canvas back to sandy background
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // redraw background
    ctx.fillStyle = '#f0e6d2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 0.6;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(200,180,140, 0.15)';
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <div className="zen-sand-rake-container">
      <h2>🪷 Zen Sand Rake</h2>
      <canvas
        ref={canvasRef}
        className="rake-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button className="clear-button" onClick={clearCanvas}>Clear Sand</button>
    </div>
  );
};

export default ZenSandRake;
