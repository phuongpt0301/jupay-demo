import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * ForgotPasswordScreen Component
 * Step 1 - Reset Password - Enter email
 */
const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSendResetLink = () => {
    if (email.trim()) {
      navigate(`/${ScreenType.FORGOT_PASSWORD_CODE}`);
    }
  };

  const handleBackToLogin = () => {
    navigate(`/${ScreenType.LOGIN}`);
  };

  const handleBack = () => {
    navigate(`/${ScreenType.LOGIN}`);
  };

  return (
    <div className="screen forgot-password-screen">
      <div className="forgot-password-container-centered">
        {/* Back Button - centered at top */}
        <div className="back-btn-centered-wrapper">
          <button className="back-btn-centered" onClick={handleBack} aria-label="Go back">
            ←
          </button>
        </div>

        {/* Title and Description */}
        <div className="forgot-password-header-centered">
          <h1 className="forgot-password-title-centered">Reset Password</h1>
          <p className="forgot-password-description-centered">
            Enter your email to receive reset instructions.
          </p>
        </div>

        {/* Email Input */}
        <div className="form-group-centered">
          <label className="form-label-centered">Email Address</label>
          <div className="email-input-wrapper-centered">
            <span className="email-icon-centered">✉️</span>
            <input
              type="email"
              className="form-input-centered"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Send Reset Link Button */}
        <button 
          className="send-reset-link-btn" 
          onClick={handleSendResetLink}
          disabled={!email.trim()}
        >
          Send Reset Link
        </button>

        {/* Back to Login Link */}
        <button className="back-to-login-link" onClick={handleBackToLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
