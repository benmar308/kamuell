import React, { useState, useRef } from 'react';
import '../styles/MediaPlayer.css';

const MediaPlayer = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navBarRef = useRef(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="media-player-container">
      <div className="media-player-nav-bar" ref={navBarRef}>
        <span
          onClick={() => handleMenuClick('file')}
          className={activeMenu === 'file' ? 'active' : ''}
        >
          File
        </span>
        {activeMenu === 'file' && (
          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: `${navBarRef.current.offsetTop + navBarRef.current.offsetHeight}px`,
              left: `${navBarRef.current.children[0].offsetLeft}px`,
            }}
          >
            <div>New</div>
            <div>Open</div>
            <div>Save</div>
            <div>Exit</div>
          </div>
        )}

        <span
          onClick={() => handleMenuClick('view')}
          className={activeMenu === 'view' ? 'active' : ''}
        >
          View
        </span>
        {activeMenu === 'view' && (
          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: `${navBarRef.current.offsetTop + navBarRef.current.offsetHeight}px`,
              left: `${navBarRef.current.children[1].offsetLeft}px`,
            }}
          >
            <div>Visualizer</div>
            <div>Track Details</div>
            <div>Fullscreen</div>
          </div>
        )}

        <span
          onClick={() => handleMenuClick('play')}
          className={activeMenu === 'play' ? 'active' : ''}
        >
          Play
        </span>
        {activeMenu === 'play' && (
          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: `${navBarRef.current.offsetTop + navBarRef.current.offsetHeight}px`,
              left: `${navBarRef.current.children[2].offsetLeft}px`,
            }}
          >
            <div>Play</div>
            <div>Pause</div>
            <div>Stop</div>
            <div>Next</div>
            <div>Back</div>
          </div>
        )}

        <span
          onClick={() => handleMenuClick('navigate')}
          className={activeMenu === 'navigate' ? 'active' : ''}
        >
          Navigate
        </span>
        {activeMenu === 'navigate' && (
          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: `${navBarRef.current.offsetTop + navBarRef.current.offsetHeight}px`,
              left: `${navBarRef.current.children[3].offsetLeft}px`,
            }}
          >
            <div>Songs</div>
            <div>Albums</div>
            <div>Artists</div>
          </div>
        )}

        <span
          onClick={() => handleMenuClick('favorites')}
          className={activeMenu === 'favorites' ? 'active' : ''}
        >
          Favorites
        </span>
        {activeMenu === 'favorites' && (
          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: `${navBarRef.current.offsetTop + navBarRef.current.offsetHeight}px`,
              left: `${navBarRef.current.children[4].offsetLeft}px`,
            }}
          >
            <div>Add to Favorites</div>
            <div>Remove from Favorites</div>
          </div>
        )}
      </div>

      <div className="media-display">
        <h3>Now Playing: Sample Track</h3>
      </div>

      <div className="media-time-bar">
        <input
          type="range"
          min="0"
          max="100"
          value="0"
        />
      </div>

      <div className="media-controls">
        <div className="media-buttons">
          <button>❚❚</button>
          <button>■</button>
          <button>&lt;&lt;</button>
          <button>&gt;&gt;</button>
        </div>
        <div className="media-volume">
          <label>Vol</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value="1"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
