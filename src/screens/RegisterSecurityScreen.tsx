import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * RegisterSecurityScreen Component
 * Step 4 of 4 - Secure Your Account
 */
const RegisterSecurityScreen: React.FC = () => {
  const navigate = useNavigate();
  const [biometric, setBiometric] = useState(false);
  const [pin, setPin] = useState(false);

  const handleContinueToDashboard = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleSkip = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleBack = () => {
    navigate(`/${ScreenType.REGISTER_DOCUMENTS}`);
  };

  const handleToggle = (type: 'biometric' | 'pin') => {
    if (type === 'biometric') {
      setBiometric(!biometric);
      if (!biometric) setPin(false); // Only one can be enabled
    } else {
      setPin(!pin);
      if (!pin) setBiometric(false); // Only one can be enabled
    }
  };

  return (
    <div className="screen register-screen">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            ←
          </button>
          <h1 className="register-title">Secure Your Account</h1>
        </div>

        {/* Security Icon */}
        <div className="security-icon-large">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z" 
                  stroke="#1a1a1a" 
                  strokeWidth="1.5" 
                  fill="none"/>
            <path d="M9 12L11 14L15 10" 
                  stroke="#1a1a1a" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="security-subtitle">Add an extra layer of security</h2>

        {/* Security Options */}
        <div className="security-options">
          <div className="security-option">
            <div className="security-option-left">
              <div className="security-option-icon">👆</div>
              <div className="security-option-text">
                <h3>Biometric Login</h3>
                <p>Use Face ID/Touch ID for instant access</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={biometric}
                onChange={() => handleToggle('biometric')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="security-option">
            <div className="security-option-left">
              <div className="security-option-icon">🔒</div>
              <div className="security-option-text">
                <h3>6-Digit PIN</h3>
                <p>Set up a secure PIN code</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={pin}
                onChange={() => handleToggle('pin')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <p className="security-note">Only one method can be enabled at a time</p>

        <div className="security-badge">
          <span className="flag-icon">🇸🇬</span>
          <span>MAS-regulated security</span>
        </div>

        <button className="register-continue-btn" onClick={handleContinueToDashboard}>
          Continue to Dashboard
        </button>

        <button className="skip-btn" onClick={handleSkip}>
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default RegisterSecurityScreen;
