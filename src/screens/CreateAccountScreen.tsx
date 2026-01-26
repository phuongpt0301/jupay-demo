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
    navigate(`/${ScreenType.LOGIN}`);
  };

  const isValid = email.trim() && password.trim() && confirmPassword.trim() && agreeToTerms;

  return (
    <div className="screen create-account-screen">
      <div className="create-account-container">
        {/* Header */}
        <div className="create-account-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            ←
          </button>
          <h1 className="create-account-title">Create Account</h1>
        </div>

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
