// src/components/MainScreen.js

import React, { useState, useRef, useEffect } from 'react';
import { useClock } from '../hooks/useClock';
import SelectionBox from './SelectionBox';
import RightClickMenu from './RightClickMenu';
import DesktopIcon from './DesktopIcon';
import RunProgram from './RunProgram';
import Notepad from './Notepad';
import MediaPlayer from './MediaPlayer';
import RecycleBin from './RecycleBin';
import MyComputer from './MyComputer';
import Diablo from './Diablo'; 

const MainScreen = ({ toggleStartMenu, isStartMenuVisible, showBackgroundImage }) => {
  const { renderClock } = useClock();
  const [contextMenu, setContextMenu] = useState({ isVisible: false, x: 0, y: 0 });
  const [icons, setIcons] = useState([
    { id: 1, name: 'Recycle Bin', icon: `${process.env.PUBLIC_URL}/images/recycle.png`, position: { x: 20, y: 20 } },
    { id: 2, name: 'Internet Explorer', icon: `${process.env.PUBLIC_URL}/images/ie.png`, position: { x: 20, y: 125 } },
    { id: 3, name: 'Diablo', icon: `${process.env.PUBLIC_URL}/images/diablo.ico`, position: { x: 20, y: 245 } }, // Diablo icon
    { id: 4, name: 'Media Player', icon: `${process.env.PUBLIC_URL}/images/wmp.png`, position: { x: 20, y: 350 } },
    { id: 5, name: 'Notes.txt', icon: `${process.env.PUBLIC_URL}/images/notepad.png`, position: { x: 220, y: 175 } },
  ]);
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [openPrograms, setOpenPrograms] = useState([]);
  const [taskbarItems, setTaskbarItems] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const defaultPosition = { x: 100, y: 100 };
  const offset = 30;
  const [activeProgramId, setActiveProgramId] = useState(null);

  useEffect(() => {
    const savedIcons = JSON.parse(localStorage.getItem('desktopIcons'));
    if (savedIcons) {
      setIcons(savedIcons);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('desktopIcons', JSON.stringify(icons));
  }, [icons]);

  const containerRef = useRef(null);
  const taskbarRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  const handleRightClick = (e) => {
    e.preventDefault();
    if (taskbarRef.current && taskbarRef.current.contains(e.target)) {
      return;
    }
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContextMenu({
        isVisible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setContainerWidth(rect.width);
    }
  };

  const handleClick = (e) => {
    const isIconClick = e.target.closest('.desktop-icon');
    if (!isIconClick) {
      setSelectedIconId(null);
    }
    if (contextMenu.isVisible) {
      setContextMenu({ ...contextMenu, isVisible: false });
    }
  };

  const handleSelect = (id) => {
    setSelectedIconId(id);
  };

  const handleDrag = (id, newPos) => {
    const updatedIcons = icons.map((icon) =>
      icon.id === id ? { ...icon, position: newPos } : icon
    );
    setIcons(updatedIcons);
  };

  const calculateNextPosition = () => {
    if (openPrograms.length === 0) {
      return defaultPosition;
    }
    const lastProgram = openPrograms[openPrograms.length - 1];
    const newX = lastProgram.position.x + offset;
    const newY = lastProgram.position.y + offset;

    const maxX = containerRef.current.clientWidth - 200; 
    const maxY = containerRef.current.clientHeight - 200; 

    return {
      x: Math.min(newX, maxX),
      y: Math.min(newY, maxY),
    };
  };

  const handleDoubleClick = (id) => {
    const icon = icons.find((icon) => icon.id === id);
  
    if (!icon) return;
  
    const existingProgram = openPrograms.find((program) => program.id === id);
  
    if (existingProgram) {
      handleBringToFront(id);
      return;
    }
  
    let content;
    let isMaximized = false;
  
    switch (icon.name) {
      case 'Notes.txt':
        content = <Notepad />;
        break;
      case 'Media Player':
        content = <MediaPlayer />;
        break;
      case 'Recycle Bin':
        content = <RecycleBin />;
        break;
      case 'My Computer':
        content = <MyComputer />;
        break;
      case 'Diablo':
        content = <Diablo />;
        isMaximized = true; 
        break;
      default:
        content = <div>{icon.name} content</div>;
    }
  
    const newProgram = {
      id,
      title: icon.name,
      content,
      icon: icon.icon,
      zIndex: zIndex + 1,
      position: isMaximized ? { x: 0, y: 0 } : calculateNextPosition(),
      isMinimized: false,
      isMaximized: isMaximized, 
    };
  
    setOpenPrograms([...openPrograms, newProgram]);
    setTaskbarItems([...taskbarItems, { id, title: icon.name, icon: icon.icon }]);
    setZIndex(zIndex + 1);
    setActiveProgramId(id);
  };
  
  const handleCloseProgram = (id) => {
    setOpenPrograms((prevPrograms) => prevPrograms.filter((program) => program.id !== id));
    setTaskbarItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (activeProgramId === id) {
      setActiveProgramId(null);
    }
  };

  const handleMinimizeProgram = (id) => {
    setOpenPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === id ? { ...program, isMinimized: true } : program
      )
    );
    if (activeProgramId === id) {
      setActiveProgramId(null);
    }
  };

  const handleRestoreProgram = (id) => {
    setOpenPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === id ? { ...program, isMinimized: false, zIndex: zIndex + 1 } : program
      )
    );
    setZIndex(zIndex + 1);
    setActiveProgramId(id); 
  };

  const handleBringToFront = (id) => {
    setOpenPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === id ? { ...program, zIndex: zIndex + 1 } : program
      )
    );
    setZIndex(zIndex + 1);
    setActiveProgramId(id); 
  };

  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`container loaded ${showBackgroundImage ? 'show-background' : ''}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      ref={containerRef}
    >
      <div className="main-content">
        <SelectionBox />
        <div className="desktop-icons">
          {icons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              name={icon.name}
              icon={icon.icon}
              position={icon.position}
              onSelect={handleSelect}
              onDrag={handleDrag}
              isSelected={selectedIconId === icon.id}
              onDoubleClick={handleDoubleClick}
            />
          ))}
        </div>
      </div>
      <div className="taskbar" ref={taskbarRef}>
        <div className="taskbar-left">
          <button className="start-button" onClick={toggleStartMenu}>
            <img src={`${process.env.PUBLIC_URL}/images/logo3.png`} alt="Logo" />
            Start
          </button>
          {taskbarItems.length > 0 && <span className="taskbar-separator">|</span>}
          <div className="taskbar-icons">
            {taskbarItems.map((item) => (
              <button
                key={item.id}
                className={`taskbar-icon ${activeProgramId === item.id ? 'active' : ''}`}
                onClick={() => handleRestoreProgram(item.id)}
              >
                <img src={item.icon} alt={item.title} />
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="clock">{renderClock()}</div>
      </div>
      {isStartMenuVisible && (
        <div className="start-menu">
          <div className="start-menu-header">
            <img src={`${process.env.PUBLIC_URL}/images/logo3.png`} alt="Logo" className="start-menu-logo" />
            Kamuell
          </div>
          <ul className="start-menu-list">
            <li>Programs</li>
            <li>Documents</li>
            <li>Settings</li>
            <li>Search</li>
            <li>Help</li>
            <li>Run...</li>
            <li>Shut Down...</li>
          </ul>
        </div>
      )}
      {openPrograms.map((program) => (
        <RunProgram
          key={program.id}
          id={program.id}
          title={program.title}
          content={program.content}
          isMinimized={program.isMinimized}
          position={program.position}
          zIndex={program.zIndex}
          onMinimize={handleMinimizeProgram}
          onClose={handleCloseProgram}
          onClick={() => handleBringToFront(program.id)}
          isMaximized={program.isMaximized} 
        />
      ))}
      <RightClickMenu x={contextMenu.x} y={contextMenu.y} isVisible={contextMenu.isVisible} containerWidth={containerWidth} />
    </div>
  );
};

export default MainScreen;
