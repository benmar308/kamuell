import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/RunProgram.css';

const RunProgram = ({ id, title, content, onMinimize, onClose, isMinimized, position, zIndex, onClick, isMaximized: initialMaximized }) => {
  const [isMaximized, setIsMaximized] = useState(initialMaximized);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(null);

  const handleMinimize = () => {
    onMinimize(id);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    onClose(id);
  };

  const handleMouseDown = (e) => {
    if (!isMaximized) {
      setIsDragging(true);
      offsetRef.current = {
        x: e.clientX - currentPosition.x,
        y: e.clientY - currentPosition.y,
      };
      document.body.style.userSelect = 'none';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
    if (dragRef.current) {
      cancelAnimationFrame(dragRef.current);
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      };
      if (dragRef.current) {
        cancelAnimationFrame(dragRef.current);
      }
      dragRef.current = requestAnimationFrame(() => {
        setCurrentPosition(newPosition);
      });
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (dragRef.current) {
        cancelAnimationFrame(dragRef.current);
      }
    };
  }, [isDragging, handleMouseMove]);

  useEffect(() => {
    setIsMaximized(initialMaximized);
  }, [initialMaximized]);

  return (
    <div
      className={`program-window ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        display: isMinimized ? 'none' : 'block',
        top: isMaximized ? 0 : currentPosition.y,
        left: isMaximized ? 0 : currentPosition.x,
        zIndex: zIndex,
      }}
      onClick={onClick}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <span className="program-title">{title}</span>
        <div className="window-controls">
          <button onClick={handleMinimize}>_</button>
          <button onClick={handleMaximize}>{isMaximized ? '❐' : '□'}</button>
          <button onClick={handleClose}>X</button>
        </div>
      </div>
      <div className="program-content">
        {content}
      </div>
    </div>
  );
};

export default RunProgram;
