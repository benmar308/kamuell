// src/components/Notepad.js

import React, { useState } from 'react';
import '../styles/Notepad.css';

const Notepad = () => {
  const [content, setContent] = useState(
    "Song Ideas:\n" +
    "• Whispers of the Wind - Need to fix the chorus\n" +
    "• Echoes of Silence - \"In the dark, I find my light...\"\n\n" +
    "Random Thoughts:\n" +
    "I should call Mike about studio time.\n" +
    "Why do I always forget to practice fingerpicking?\n" +
    "Maybe the next album should be acoustic.\n\n" +
    "To Do:\n" +
    "1. Buy new guitar strings\n" +
    "2. Pick up groceries: milk, eggs, bread\n" +
    "3. Order more picks and a new capo\n" +
    "4. Find inspiration for the album cover\n\n" +
    "\"Falling Leaves\" - maybe start with a soft piano intro?\n" +
    "Need to sketch out melody ideas during the bus ride tomorrow.\n\n" +
    "Midnight Train:\n" +
    "• Needs a stronger ending.\n" +
    "• Could add a harmonica solo?\n\n" +
    "Don’t forget:\n" +
    "- Write thank-you notes to the band.\n" +
    "- Call producer about collaboration.\n" +
    "- Remember to look up lyrics for \"Ocean's Lullaby\".\n"
  );

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="notepad-content">
      <textarea
        className="notepad-textarea"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default Notepad;
