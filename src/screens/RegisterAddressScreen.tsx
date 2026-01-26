import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * RegisterAddressScreen Component
 * Step 2 of 4 - Verify Your Address
 */
const RegisterAddressScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<'singpass' | 'manual' | null>(null);

  const handleContinue = () => {
    if (selectedMethod) {
      navigate(`/${ScreenType.REGISTER_DOCUMENTS}`);
    }
  };

  const handleBack = () => {
    navigate(`/${ScreenType.REGISTER_PERSONAL}`);
  };

  return (
    <div className="screen register-screen">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            ←
          </button>
          <div className="register-header-text">
            <h1 className="register-title">Verify Your Address</h1>
            <p className="register-step">Step 2 of 4</p>
          </div>
        </div>

        {/* Address Options */}
        <div className="address-options">
          <button
            className={`address-option ${selectedMethod === 'singpass' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('singpass')}
          >
            <div className="option-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z" 
                      stroke="#1a1a1a" 
                      strokeWidth="1.5" 
                      fill="none"/>
              </svg>
            </div>
            <div className="option-content">
              <h3>Use Singpass Address</h3>
              <p>Auto-fill your residential address securely from Singpass.</p>
            </div>
          </button>

          <button
            className={`address-option ${selectedMethod === 'manual' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('manual')}
          >
            <div className="option-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" 
                      stroke="#1a1a1a" 
                      strokeWidth="1.5" 
                      fill="none"/>
              </svg>
            </div>
            <div className="option-content">
              <h3>Enter Manually</h3>
              <p>Manually type in your address details field by field.</p>
            </div>
          </button>
        </div>

        <button 
          className="register-continue-btn" 
          onClick={handleContinue}
          disabled={!selectedMethod}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RegisterAddressScreen;
