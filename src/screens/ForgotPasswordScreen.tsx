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
        {/* Back Button - left aligned */}
        <button className="back-btn-left" onClick={handleBack} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
            <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
          </svg>
        </button>

        <div className="border" />

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
            <svg className="email-icon-centered" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 6L12 13L2 6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
