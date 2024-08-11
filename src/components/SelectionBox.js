// src/components/SelectionBox.js

import React, { useState, useEffect, useCallback, useRef } from 'react';

const SelectionBox = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const containerRect = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      e.preventDefault();
      containerRect.current = containerRef.current.getBoundingClientRect();
      setIsDragging(true);
      setStartPos({ x: e.clientX - containerRect.current.left, y: e.clientY - containerRect.current.top });
      setCurrentPos({ x: e.clientX - containerRect.current.left, y: e.clientY - containerRect.current.top });
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
      const x = Math.max(0, Math.min(e.clientX - containerRect.current.left, containerRect.current.width));
      const y = Math.max(0, Math.min(e.clientY - containerRect.current.top, containerRect.current.height));
      setCurrentPos({ x, y });
    }
  }, [isDragging]);

  const handleMouseUp = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
      // Logic to handle selected area can be added here
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
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div className="selection-box-container" onMouseDown={handleMouseDown} ref={containerRef} />
      {isDragging && (
        <div
          className="selection-box"
          style={{
            left: Math.min(startPos.x, currentPos.x),
            top: Math.min(startPos.y, currentPos.y),
            width: Math.abs(currentPos.x - startPos.x),
            height: Math.abs(currentPos.y - startPos.y),
          }}
        />
      )}
    </>
  );
};

export default SelectionBox;
