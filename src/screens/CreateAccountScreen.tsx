import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * CreateAccountScreen Component
 * Simple account creation with email and password
 */
const CreateAccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleContinue = () => {
    if (email.trim() && password.trim() && confirmPassword.trim() && agreeToTerms) {
      // For demo, navigate to register personal details
      navigate(`/${ScreenType.FORGOT_PASSWORD_VERIFY}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isValid = email.trim() && password.trim() && confirmPassword.trim() && agreeToTerms;
  console.log(password);
  console.log(email);
  console.log(confirmPassword);
  console.log(agreeToTerms);

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <div className="create-account-screen">
      <div className="create-account-container">
        {/* Header */}
        <div className="create-account-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="create-account-title">Create Account</h1>
        </div>

        <div className="border" />

        {/* Form */}
        <form className="create-account-form" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          {/* Email Address */}
          <div className="form-group-simple">
            <input
              type="email"
              className="form-input-simple"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-group-simple">
            <input
              type="password"
              className="form-input-simple"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='password-hint-container'>
            <div className={`password-hint-block ${hasMinLength ? 'valid' : ''}`} />
            <div className={`password-hint-block ${hasUppercase ? 'valid' : ''}`} />
            <div className={`password-hint-block ${hasNumber ? 'valid' : ''}`} />
          </div>

          {/* Password Hint */}
          <p className="password-hint-simple">Enter a password</p>

          {/* Confirm Password */}
          <div className="form-group-simple">
            <input
              type="password"
              className="form-input-simple"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Terms and Privacy Checkbox */}
          <div className="terms-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="checkbox-text">Agree to Terms and Privacy Policy</span>
            </label>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="create-account-continue-btn"
            disabled={!isValid}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountScreen;
