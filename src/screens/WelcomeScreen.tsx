import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';
import useAuth from '../hooks/useAuth';

/**
 * WelcomeScreen Component (Welcome Screen)
 * 
 * Welcome screen with JuPay branding and login options.
 * Provides Singpass and Email/Phone login options.
 * Implements mobile-optimized layout matching Figma design.
 * Uses immediate navigation (no loading delay) for better UX.
 * 
 * Requirements: 3.1
 */
const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(fadeInTimer);
    };
  }, []);

  const handleSingpassLogin = () => {
    // For demo, navigate to regular login immediately
    login({ username: 'demo', password: 'demo123' });
    navigate(`/${ScreenType.VERIFY}`);
  };

  const handleEmailPhoneLogin = () => {
    // Navigate to login immediately
    navigate(`/${ScreenType.LOGIN}`);
  };

  return (
    <div className="screen welcome-screen">
      <div className={`welcome-container ${isVisible ? 'fade-in' : ''}`}>
        {/* Shield Icon */}
        <div className="welcome-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z" 
                  stroke="#1a1a1a" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"/>
          </svg>
        </div>

        {/* Title */}
        <div className="welcome-title-section">
          <h1 className="welcome-main-title">Singapore's All-in-One</h1>
          <h1 className="welcome-main-title">Payments App</h1>
        </div>

        {/* Login Options */}
        <div className="welcome-login-section">
          <button 
            className="welcome-login-link"
            onClick={handleSingpassLogin}
          >
            Login with Singpass
          </button>

          <div className="welcome-divider">
            <div className="welcome-divider-line"></div>
            <span>or</span>
            <div className="welcome-divider-line"></div>
          </div>

          <button 
            className="welcome-login-link"
            onClick={handleEmailPhoneLogin}
          >
            Login with Email/Phone
          </button>
        </div>

        {/* Footer */}
        <div className="welcome-footer">
          <p>Singapore residents only. MAS licensed.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
