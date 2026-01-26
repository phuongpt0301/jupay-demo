import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

/**
 * ForgotPasswordVerifyScreen Component
 * Step 2 of 5 - Verify Your Email
 */
const ForgotPasswordVerifyScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenEmailApp = () => {
  };

  const handleResendEmail = () => {
    alert('Verification email resent!');
  };

  return (
    <div className="screen forgot-password-screen">
      <div className="forgot-password-container verify-email-container">
        {/* Step Indicator */}
        <p className="step-indicator">Step 5 of 5</p>

        {/* Check Icon */}
        <div className="verify-email-icon">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
            <path d="M8 12L11 15L16 9" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title and Description */}
        <div className="verify-email-content">
          <h1 className="verify-email-title">Verify Your Email</h1>
          <p className="verify-email-description">
            We sent a verification link to your email
          </p>
        </div>

        {/* Action Buttons */}
        <button className="open-email-btn" onClick={handleOpenEmailApp}>
          Open Email App
        </button>

        <button className="resend-email-btn" onClick={handleResendEmail}>
          Resend Email
        </button>

        <p className="spam-hint">Can't find it? Check spam folder</p>
      </div>
    </div>
  );
};

export default ForgotPasswordVerifyScreen;
