
import { useState, useEffect } from 'react';

const biosMessages = [
  "KamuellBIOS 4.2.0 Release 6.9",
  "Copyright 1985-1999 Kamuell Technologies Ltd.",
  "All Rights Reserved",
  "Copyright 1996-1999 Kamuell Corporation.",
  "4H32D432X.10A.0022.P06",
  "", // Line break
  "Kamuell Dimension KPS T500",
  "BIOS Version AO5",
  "Kamuell(R) Pentium III processor 550 MHz",
  "256MB System RAM Passed",
  "", // Line break
  "Keyboard .................. Detected",
  "Mouse ..................... Detected",
  "", // Line break
  "Fixed Disk 0: TSK WD200EB-900CFP0- (PM)",
  "", // Line break
  "Starting system...",
  "", // Line break
  "Relax, this isn't real lol"

];

const initialBlockEndIndex = 8; // The index up to which we display the initial block of text
const specialMessageIndex = 9; // The index for "256MB System RAM Passed"

export const useBiosLoader = () => {
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntermediateScreen, setIsIntermediateScreen] = useState(false);

  useEffect(() => {
    if (loadingIndex === 0) {
      const initialDelay = 1250; // Initial delay before showing the first block
      const timer = setTimeout(() => {
        setLoadingIndex(initialBlockEndIndex);
      }, initialDelay);
      return () => clearTimeout(timer);
    } else if (loadingIndex === initialBlockEndIndex) {
      const pauseBeforeSpecialMessage = 1500; // 0.5s pause before showing the special message
      const timer = setTimeout(() => {
        setLoadingIndex(specialMessageIndex);
      }, pauseBeforeSpecialMessage);
      return () => clearTimeout(timer);
    } else if (loadingIndex < biosMessages.length) {
      const randomDelay = Math.random() * 400 + 200; // Random delay between 200ms and 600ms
      const timer = setTimeout(() => {
        setLoadingIndex(loadingIndex + 1);
      }, randomDelay);
      return () => clearTimeout(timer);
    } else if (loadingIndex === biosMessages.length) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setIsIntermediateScreen(true);
        setTimeout(() => {
          setIsIntermediateScreen(false);
        }, 2000); // Show the intermediate screen for 2 seconds
      }, 2000); // 3 second pause after the last message
      return () => clearTimeout(timer);
    }
  }, [loadingIndex]);

  return { loadingIndex, isLoaded, isIntermediateScreen, biosMessages };
};
