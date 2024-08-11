// src/components/RightClickMenu.js

import React, { useState, useRef, useEffect } from 'react';

const RightClickMenu = ({ x, y, isVisible, containerWidth }) => {
  const [visibleSubmenu, setVisibleSubmenu] = useState(null);
  const submenuTimeout = useRef(null);
  const newRef = useRef(null);

  const handleMouseEnter = (menu) => {
    if (submenuTimeout.current) {
      clearTimeout(submenuTimeout.current);
    }
    setVisibleSubmenu(menu);
  };

  const handleMouseLeave = () => {
    submenuTimeout.current = setTimeout(() => {
      setVisibleSubmenu(null);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (submenuTimeout.current) {
        clearTimeout(submenuTimeout.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  // Determine if the menu should be displayed to the left or right
  const isNearRightEdge = x + 200 > containerWidth;
  const menuPosition = isNearRightEdge ? { right: containerWidth - x, top: y } : { left: x, top: y };
  const submenuLeftPosition = isNearRightEdge ? 'auto' : '100%';
  const submenuRightPosition = isNearRightEdge ? '100%' : 'auto';

  return (
    <div className="right-click-menu" style={menuPosition}>
      <ul className="right-click-menu-list">
        <li
          className="right-click-menu-item has-submenu"
          onMouseEnter={() => handleMouseEnter('arrange')}
          onMouseLeave={handleMouseLeave}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;Arrange Icons <span className="submenu-arrow">▶</span>
          {visibleSubmenu === 'arrange' && (
            <ul className="right-click-submenu" style={{ top: 0, left: submenuLeftPosition, right: submenuRightPosition }}>
              <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;By Name</li>
              <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;By Size</li>
              <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;By Date</li>
              <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;By Type</li>
            </ul>
          )}
        </li>
        <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;Line up Icons</li>
        <li className="menu-separator"></li>
        <li className="right-click-menu-item disabled">&nbsp;&nbsp;&nbsp;&nbsp;Paste</li>
        <li className="right-click-menu-item disabled">&nbsp;&nbsp;&nbsp;&nbsp;Paste Shortcut</li>
        <li className="right-click-menu-item disabled">&nbsp;&nbsp;&nbsp;&nbsp;Undo Delete</li>
        <li className="menu-separator"></li>
        <li
          className="right-click-menu-item has-submenu"
          onMouseEnter={() => handleMouseEnter('new')}
          onMouseLeave={handleMouseLeave}
          ref={newRef}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;New <span className="submenu-arrow">▶</span>
          {visibleSubmenu === 'new' && newRef.current && (
            <ul className="right-click-submenu" style={{ top: newRef.current.offsetTop, left: submenuLeftPosition, right: submenuRightPosition }}>
              <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;Folder</li>
              <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;Shortcut</li>
            </ul>
          )}
        </li>
        <li className="menu-separator"></li>
        <li className="right-click-menu-item">&nbsp;&nbsp;&nbsp;&nbsp;Properties</li>
      </ul>
    </div>
  );
};

export default RightClickMenu;
