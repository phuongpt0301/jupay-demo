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
    if (value.length > 1) return; // Only allow single digit
    
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
      navigate(`/${ScreenType.FORGOT_PASSWORD_NEW}`);
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
    <div className="screen forgot-password-screen">
      <div className="forgot-password-container code-container">
        {/* Back Button */}
        <button className="back-btn-simple" onClick={handleBack} aria-label="Go back">
          ←
        </button>

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
