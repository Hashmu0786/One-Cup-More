import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smokes, setSmokes] = useState([]);

  const updatePosition = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    addSmoke(e.clientX, e.clientY);
  };

  const addSmoke = (x, y) => {
    const newSmoke = { x, y, id: Date.now() };
    setSmokes((prev) => [...prev, newSmoke]);

    // Remove smoke after animation duration (1s here)
    setTimeout(() => {
      setSmokes((prev) => prev.filter((smoke) => smoke.id !== newSmoke.id));
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updatePosition);
    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <>
      <div
        className="cursor z-[110] pointer-events-none"
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${position.x}px`,
          height: `${position.y}px`,
          backgroundColor: "transparent",
        }}
      />
      {smokes.map((smoke) => (
        <div
          key={smoke.id}
          className="smoke"
          style={{
            position: "fixed",
            left: `${smoke.x}px`,
            top: `${smoke.y}px`,
          }}
        />
      ))}
    </>
  );
};

export default Cursor;
