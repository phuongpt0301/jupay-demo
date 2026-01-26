import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * LoginScreen Component (OxPay Lite)
 * 
 * Authentication screen with email/phone and password fields.
 * Matches Figma design with shield icon, clean white background.
 * Includes Singpass login option and registration link.
 * 
 * Requirements: 3.2
 */
const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation - just check if fields have any text
    if (emailOrPhone.trim() && password.trim()) {
      // Navigate to verify screen
      navigate(`/${ScreenType.VERIFY}`);
    }
  };

  const handleSingpassLogin = () => {
    // Navigate to verify screen for Singpass flow
    navigate(`/${ScreenType.VERIFY}`);
  };

  const handleForgotPassword = () => {
    navigate(`/${ScreenType.FORGOT_PASSWORD}`);
  };

  const handleRegister = () => {
    navigate(`/${ScreenType.REGISTER_PERSONAL}`);
  };

  return (
    <div className="screen login-screen">
      <div className="login-container">
        {/* Shield Icon */}
        <div className="login-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z" 
                  stroke="#1a1a1a" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="login-title">OxPay Lite</h1>

        {/* Login Form */}
        <form className="login-form-new" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label-new">Email or Phone</label>
            <input
              type="text"
              className="form-input-new"
              placeholder="Enter your email or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label-new">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input-new"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="forgot-password-btn"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>

          <button type="submit" className="login-btn-primary">
            Login
          </button>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="login-btn-singpass"
            onClick={handleSingpassLogin}
          >
            Login with Singpass
          </button>

          <div className="register-link">
            <span>Don't have an account? </span>
            <button type="button" onClick={handleRegister}>
              Register here
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>Singapore residents only. MAS licensed.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;