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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation - just check if fields have any text
    if (emailOrPhone.trim() && password.trim()) {
      // Navigate to all services screen after successful login
      navigate(`/${ScreenType.VERIFY}`);
    }
  };

  const handleSingpassLogin = async () => {
    // Navigate to all services screen after successful login
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
              fill="none" />
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_0_901)">
                    <path d="M10.0004 3.3605C11.9317 3.36058 13.8196 3.93416 15.4246 5.00834C16.9292 6.01542 18.1219 7.41998 18.8718 9.06268L19.0161 9.39501L19.0267 9.42257C19.1477 9.74867 19.1629 10.1033 19.0721 10.4366L19.0267 10.5776C19.0233 10.5868 19.0199 10.5961 19.0161 10.6052C18.2798 12.3906 17.0296 13.9176 15.4246 14.9919C13.9199 15.9989 12.1665 16.5654 10.3619 16.6324L10.0004 16.6397C8.06898 16.6397 6.18049 16.0661 4.57541 14.9919C3.07059 13.9847 1.87809 12.5796 1.12815 10.9367L0.983871 10.6052C0.980128 10.5961 0.97675 10.5868 0.97333 10.5776C0.835039 10.205 0.835085 9.79524 0.97333 9.42257L0.983871 9.39501C1.72023 7.60957 2.9704 6.08261 4.57541 5.00834C6.18049 3.93408 8.06898 3.3605 10.0004 3.3605ZM10.0004 5.0205C8.39777 5.0205 6.8305 5.49648 5.49861 6.3879C4.17523 7.27369 3.14288 8.53015 2.53039 9.99967C3.14287 11.4694 4.17503 12.7264 5.49861 13.6123C6.8305 14.5037 8.39777 14.9797 10.0004 14.9797L10.3003 14.974C11.7977 14.9184 13.2528 14.448 14.5013 13.6123C15.8249 12.7265 16.8563 11.4693 17.4688 9.99967C16.8563 8.53032 15.8247 7.27363 14.5013 6.3879C13.1696 5.49656 11.6029 5.02058 10.0004 5.0205Z" fill="#565E6D" />
                    <path d="M11.66 9.99999C11.66 9.08317 10.9168 8.33999 9.99999 8.33999C9.08317 8.33999 8.33999 9.08317 8.33999 9.99999C8.33999 10.9168 9.08317 11.66 9.99999 11.66C10.9168 11.66 11.66 10.9168 11.66 9.99999ZM13.32 9.99999C13.32 11.8335 11.8335 13.32 9.99999 13.32C8.16641 13.32 6.67999 11.8335 6.67999 9.99999C6.67999 8.16641 8.16641 6.67999 9.99999 6.67999C11.8335 6.67999 13.32 8.16641 13.32 9.99999Z" fill="#565E6D" />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_901">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

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

          <button type="submit" className="login-btn-text">
            Login
          </button>

          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span>or</span>
            <div className="login-divider-line"></div>
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