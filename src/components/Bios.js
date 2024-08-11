import React from 'react';

const Bios = ({ loadingIndex }) => {
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

  return (
    <div className="bios-text">
      {biosMessages.slice(0, loadingIndex + 1).map((message, index) => (
        <React.Fragment key={index}>
          {message === "" ? <p>&nbsp;</p> : <p>{message}</p>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Bios;
