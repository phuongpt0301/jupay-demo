import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * ForgotPasswordCodeScreen Component
 * Check Your Email - Enter 6-digit code
 */
const ForgotPasswordCodeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow numeric input (0-9)
    if (value && !/^[0-9]$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (newCode.every(digit => digit !== '') && index === 5) {
      setTimeout(() => handleVerifyCode(), 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = () => {
    const enteredCode = code.join('');
    if (enteredCode.length === 6) {
      navigate(`/${ScreenType.FORGOT_PASSWORD_VERIFY}`);
    }
  };

  const handleResendCode = () => {
    setTimer(59);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    alert('Code resent!');
  };

  const handleBack = () => {
    navigate(`/${ScreenType.FORGOT_PASSWORD}`);
  };

  return (
    <div className="forgot-password-screen">
      <div className="forgot-password-container code-container">
        {/* Back Button */}
        <button className="back-btn-simple" onClick={handleBack} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
            <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
          </svg>
        </button>

        <div className="border" />

        {/* Title and Description */}
        <div className="code-header">
          <h1 className="code-title">Check Your Email</h1>
          <p className="code-description">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Code Input Boxes */}
        <div className="code-input-container">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              className="code-input-box"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer */}
        <p className="resend-timer">
          Resend in 0:{timer.toString().padStart(2, '0')}
        </p>

        {/* Verify Button */}
        <button
          className="verify-code-btn"
          onClick={handleVerifyCode}
          disabled={code.some(digit => digit === '')}
        >
          Verify Code
        </button>

        {/* Resend Code Button */}
        <button
          className="resend-code-btn"
          onClick={handleResendCode}
          disabled={timer > 0}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordCodeScreen;
