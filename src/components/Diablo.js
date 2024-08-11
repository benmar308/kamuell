// src/components/Diablo.js

import React, { useState, useEffect } from 'react';
import '../styles/Diablo.css';

const Diablo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Diablo loading...');

  useEffect(() => {
    // First message after 2 seconds
    const firstMessageTimeout = setTimeout(() => {
      setLoadingMessage('On the next screen - \nClick "Play Shareware" to enter the game');
    }, 2000); // 2-second delay for first message

    // End loading after 5 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5-second total loading time

    return () => {
      clearTimeout(firstMessageTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    const iframe = document.getElementById('diablo-frame');

    if (iframe) {
      iframe.onload = () => {
        // Post message to the iframe to load the MPQ file
        iframe.contentWindow.postMessage({
          type: 'load-mpq',
          file: `${process.env.PUBLIC_URL}/DIABDAT.MPQ`
        }, '*');
      };
    }
  }, []);

  return (
    <div className="diablo-container">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-content">
            <p className={loadingMessage.includes('Click') ? 'bold-message' : ''}>
              {loadingMessage}
            </p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      ) : (
        <iframe
          id="diablo-frame"
          src="https://d07riv.github.io/diabloweb/"
          title="Diablo 1"
          className="diablo-iframe"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Diablo;
