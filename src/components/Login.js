import React from 'react';

const Login = ({ handleLogin }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <span>Enter Password</span>
        <span className="close-button">X</span>
      </div>
      <div className="login-body">
        <img src={`${process.env.PUBLIC_URL}/images/logo2.png`} alt="Logo" className="login-logo2" />
        <div className="login-fields">
          <label>Select user name:</label>
          <div className="user-select">
            <div className="user-option highlighted">Kamuell</div>
            <div className="blank-space"></div> {/* Blank white space */}
          </div>
          <label>Password:</label>
          <input type="password" className="login-input" />
        </div>
      </div>
      <div className="login-buttons">
        <button onClick={handleLogin}>OK</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Login;
