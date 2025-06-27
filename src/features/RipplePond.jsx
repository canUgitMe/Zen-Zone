import React, { useRef } from 'react';
import './RipplePond.css';

const RipplePond = () => {
  const pondRef = useRef(null);

  const createRipple = (e) => {
    const circle = document.createElement("span");
    const diameter = Math.max(pondRef.current.clientWidth, pondRef.current.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - pondRef.current.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - pondRef.current.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = pondRef.current.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    pondRef.current.appendChild(circle);
  };

  return (
    <div className="ripple-pond" ref={pondRef} onClick={createRipple}>
      <h2>🌊 Ripple Pond</h2>
    </div>
  );
};

export default RipplePond;
