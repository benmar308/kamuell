// src/App.js

import React, { useState } from 'react';
import './App.css';
import Bios from './components/Bios';
import IntermediateScreen from './components/IntermediateScreen';
import Login from './components/Login';
import MainScreen from './components/MainScreen';
import { useBiosLoader } from './hooks/useBiosLoader';

function App() {
  const { loadingIndex, isLoaded, isIntermediateScreen } = useBiosLoader();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStartMenuVisible, setIsStartMenuVisible] = useState(false);
  const [showBackgroundImage, setShowBackgroundImage] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const audio = new Audio(`${process.env.PUBLIC_URL}/startup.mp3`); // Play the startup sound
    audio.volume = 0.75; // Set volume to 75%
    audio.play();
    const randomDelay = Math.random() * 800 + 200; // Random delay between 400ms and 1200ms
    setTimeout(() => {
      setShowBackgroundImage(true);
    }, randomDelay);
  };

  const toggleStartMenu = () => {
    setIsStartMenuVisible(!isStartMenuVisible);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className={`container ${isLoaded ? 'loaded' : 'loading'} ${isIntermediateScreen ? 'intermediate' : ''}`}>
          {!isLoaded ? (
            <>
              <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
              </div>
              <Bios loadingIndex={loadingIndex} />
              <div className="setup-message">Press &lt;Del&gt; to enter SETUP</div>
            </>
          ) : (
            !isIntermediateScreen ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <IntermediateScreen />
            )
          )}
        </div>
      ) : (
        <MainScreen
          toggleStartMenu={toggleStartMenu}
          isStartMenuVisible={isStartMenuVisible}
          showBackgroundImage={showBackgroundImage}
        />
      )}
    </div>
  );
}

export default App;
