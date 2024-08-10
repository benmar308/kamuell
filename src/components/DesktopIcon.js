// src/components/DesktopIcon.js

import React, { useState, useEffect } from 'react';

const DesktopIcon = ({ id, name, icon, position, onSelect, onDrag, isSelected, onDoubleClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState(position);
  const [originalPos, setOriginalPos] = useState(position);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setInitialMousePos({ x: e.clientX - currentPos.x, y: e.clientY - currentPos.y });
    setIsDragging(true);
    onSelect(id); // Select the icon
    setOriginalPos(currentPos);
  };

  const handleDoubleClick = () => {
    onDoubleClick(id); // Trigger the double-click handler passed from props
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - initialMousePos.x;
        const newY = e.clientY - initialMousePos.y;
        setCurrentPos({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const iconWidth = 100; // Adjust this value based on your icon size
        const iconHeight = 100; // Adjust this value based on your icon size

        const isOutOfBounds =
          currentPos.x < 0 ||
          currentPos.x + iconWidth > windowWidth ||
          currentPos.y < 0 ||
          currentPos.y + iconHeight > windowHeight;

        if (isOutOfBounds) {
          setCurrentPos(originalPos);
        } else {
          onDrag(id, currentPos);
        }
      }
    };

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
    };
  }, [isDragging, initialMousePos, currentPos, onDrag, id, originalPos]);

  return (
    <div
      className={`desktop-icon ${isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`} // Apply selected class
      style={{ top: currentPos.y, left: currentPos.x, position: 'absolute' }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <img src={icon} alt={name} className="desktop-icon-image" />
      <span className="desktop-icon-name">{name}</span>
    </div>
  );
};

export default DesktopIcon;
