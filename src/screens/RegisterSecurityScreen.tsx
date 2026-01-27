import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';
import useAuth from '../hooks/useAuth';

/**
 * RegisterSecurityScreen Component
 * Step 4 of 4 - Secure Your Account
 */
const RegisterSecurityScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [biometric, setBiometric] = useState(false);
  const [pin, setPin] = useState(false);

  const handleContinueToDashboard = () => {
    login({ username: 'demo', password: 'demo123' });
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleSkip = () => {
    login({ username: 'demo', password: 'demo123' });
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleBack = () => {
    navigate(-1);
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
    <div className="register-screen">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="register-title">Secure Your Account</h1>
        </div>

        <div className="border" />

        {/* Security Icon */}
        <div className="security-icon-large">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              fill="none" />
            <path d="M9 12L11 14L15 10"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="security-subtitle">Add an extra layer of security</h2>

        {/* Security Options */}
        <div className="security-options">
          <div className="security-option">
            <div className="security-option-left">
              <div className="security-option-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.99966 12C8.99966 11.2044 9.31603 10.4415 9.87857 9.87891C10.4411 9.31635 11.2041 9.00006 11.9997 9C12.5519 9 12.9997 9.44772 12.9997 10C12.9997 10.5523 12.5519 11 11.9997 11C11.7345 11.0001 11.4801 11.1055 11.2926 11.293C11.1052 11.4805 10.9997 11.7348 10.9997 12C10.9997 13.0698 10.8959 14.5988 10.734 16.1064C10.6751 16.6555 10.1824 17.0529 9.63345 16.9941C9.08443 16.9352 8.68697 16.4426 8.74576 15.8936C8.90385 14.4213 8.99966 12.9701 8.99966 12Z" fill="#171A1F" />
                  <path d="M13.0001 13.12C13.0001 12.5677 13.4478 12.12 14.0001 12.12C14.5524 12.12 15.0001 12.5677 15.0001 13.12C15.0001 14.3065 15.0006 15.9386 14.8722 17.5927C14.745 19.2306 14.4861 20.9775 13.9288 22.371C13.7237 22.8837 13.1417 23.1335 12.629 22.9286C12.1163 22.7235 11.8665 22.1415 12.0714 21.6288C12.5139 20.5225 12.7552 19.0192 12.878 17.4374C12.9996 15.8715 13.0001 14.3135 13.0001 13.12Z" fill="#171A1F" />
                  <path d="M18.2706 21.2158C18.1623 21.7574 17.6354 22.1093 17.0938 22.001C16.5524 21.8926 16.2015 21.3656 16.3096 20.8242L18.2706 21.2158ZM17.8868 17.0049C18.402 17.055 18.7878 17.4875 18.7901 17.9941L18.7852 18.0967C18.7097 18.8733 18.3899 20.6193 18.2706 21.2158L16.3096 20.8242C16.4304 20.2205 16.7305 18.5666 16.795 17.9033L16.8096 17.8018C16.9095 17.3049 17.3715 16.9548 17.8868 17.0049Z" fill="#171A1F" />
                  <path d="M1 12C1 9.69135 1.72634 7.44123 3.07617 5.56835C4.4261 3.69543 6.33125 2.29452 8.52148 1.56444C10.7117 0.834361 13.0766 0.811603 15.2803 1.49999C17.3462 2.1454 19.1726 3.38527 20.5342 5.05956L20.7998 5.40038L20.8574 5.48534C21.1187 5.91942 21.0137 6.48923 20.5996 6.79979C20.1854 7.1103 19.6091 7.05126 19.2656 6.6787L19.2002 6.5996L18.9824 6.32128C17.8684 4.95142 16.3739 3.93719 14.6836 3.40916C12.8807 2.84597 10.9462 2.86466 9.1543 3.46189C7.36244 4.05919 5.80369 5.2051 4.69922 6.73729C3.59473 8.26968 3 10.1111 3 12C3 12.5523 2.55228 13 2 13C1.44772 13 1 12.5523 1 12Z" fill="#171A1F" />
                  <path d="M2.00977 15L2.1123 15.0049C2.61655 15.0561 3.00977 15.4822 3.00977 16C3.00977 16.5178 2.61655 16.9439 2.1123 16.9951L2.00977 17H2C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15H2.00977Z" fill="#171A1F" />
                  <path d="M21.6007 9.01952C22.1082 8.91661 22.6047 9.21802 22.7551 9.70214L22.7805 9.80077L22.8137 10.0137C22.8444 10.2514 22.8661 10.5587 22.882 10.8789C22.9046 11.3325 22.9196 11.8898 22.924 12.4854C22.9327 13.6694 22.9001 15.0483 22.795 16.0996C22.74 16.6491 22.2498 17.0501 21.7003 16.9951C21.1508 16.9401 20.7498 16.4499 20.8048 15.9004C20.8996 14.952 20.9325 13.6542 20.924 12.5C20.9198 11.9263 20.9059 11.398 20.885 10.9785C20.8738 10.7556 20.8612 10.5798 20.8498 10.4502L20.8195 10.1992L20.8048 10.0977C20.7547 9.59334 21.0934 9.12259 21.6007 9.01952Z" fill="#171A1F" />
                  <path d="M5.43541 9.57323C5.65111 9.11466 6.18338 8.88483 6.67174 9.05663C7.16006 9.22842 7.43121 9.74081 7.31237 10.2334L7.28307 10.332C7.09481 10.8673 6.99908 11.4307 6.99987 11.998V12C6.99987 14.8876 6.55191 17.8022 6.04967 19.4941L5.94811 19.8164C5.77335 20.3402 5.20731 20.6229 4.68346 20.4482C4.1597 20.2735 3.87701 19.7074 4.05162 19.1836L4.13756 18.9082C4.56908 17.4469 4.99987 14.7369 4.99987 12C4.99886 11.2058 5.13281 10.4171 5.39635 9.66796L5.43541 9.57323Z" fill="#171A1F" />
                  <path d="M8.25832 19.7266C8.39637 19.2389 8.88416 18.9256 9.39407 19.0156C9.93772 19.1118 10.3006 19.6301 10.2046 20.1738L10.148 20.46C10.0023 21.1265 9.77161 21.773 9.60305 22.3027C9.43565 22.8289 8.87334 23.1202 8.34719 22.9531C7.82107 22.7857 7.52968 22.2234 7.6968 21.6973C7.92419 20.9826 8.13009 20.42 8.23489 19.8262L8.25832 19.7266Z" fill="#171A1F" />
                  <path d="M17 14.0001V11.9991L16.9893 11.671C16.9395 10.9073 16.7148 10.1636 16.3311 9.49808C15.8925 8.73763 15.2611 8.1062 14.501 7.66702C13.7409 7.22791 12.8788 6.9963 12.001 6.99612C11.123 6.99598 10.2603 7.22707 9.49998 7.66605C9.02169 7.94217 8.40991 7.77812 8.13377 7.29984C7.85778 6.82157 8.02175 6.20973 8.49998 5.93362C9.56437 5.31913 10.772 4.99595 12.001 4.99612C13.2301 4.99632 14.4377 5.31977 15.502 5.9346C16.5662 6.54948 17.4494 7.43436 18.0635 8.49905C18.6774 9.56365 19.0007 10.7711 19 12.0001V14.0001C19 14.5523 18.5523 15.0001 18 15.0001C17.4477 15.0001 17 14.5523 17 14.0001Z" fill="#171A1F" />
                </svg>
              </div>
              <div className="security-option-text">
                <h3>Biometric Login</h3>
                <p>Use Face ID/Touch ID for instant access</p>
              </div>
            </div>
            <label className={`toggle-switch ${biometric ? 'active' : ''}`}>
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
              <div className="security-option-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16Z" fill="#171A1F" />
                  <path d="M20 12C20 11.4477 19.5523 11 19 11L5 11C4.44772 11 4 11.4477 4 12L4 20C4 20.5523 4.44772 21 5 21L19 21C19.5523 21 20 20.5523 20 20L20 12ZM22 20C22 21.6569 20.6569 23 19 23L5 23C3.34315 23 2 21.6569 2 20L2 12C2 10.3431 3.34315 9 5 9L19 9C20.6569 9 22 10.3431 22 12L22 20Z" fill="#171A1F" />
                  <path d="M16 10V7C16 5.93913 15.5783 4.92202 14.8281 4.17188C14.078 3.42173 13.0609 3 12 3C10.9391 3 9.92202 3.42173 9.17188 4.17188C8.42173 4.92202 8 5.93913 8 7V10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10V7C6 5.4087 6.63259 3.88303 7.75781 2.75781C8.88303 1.63259 10.4087 1 12 1C13.5913 1 15.117 1.63259 16.2422 2.75781C17.3674 3.88303 18 5.4087 18 7V10C18 10.5523 17.5523 11 17 11C16.4477 11 16 10.5523 16 10Z" fill="#171A1F" />
                </svg>
              </div>
              <div className="security-option-text">
                <h3>6-Digit PIN</h3>
                <p>Set up a secure PIN code</p>
              </div>
            </div>
            <label className={`toggle-switch ${pin ? 'active' : ''}`}>
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
