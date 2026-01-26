import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * ForgotPasswordNewScreen Component
 * Set a New Password
 */
const ForgotPasswordNewScreen: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation rules
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== '';

  const isValid = hasMinLength && hasUppercase && hasNumber && hasSpecialChar && passwordsMatch;

  const handleResetPassword = () => {
    if (isValid) {
      alert('Password reset successful!');
      navigate(`/${ScreenType.CREATE_ACCOUNT}`);
    }
  };

  const handleBack = () => {
    navigate(`/${ScreenType.FORGOT_PASSWORD_CODE}`);
  };

  return (
    <div className="screen forgot-password-screen">
      <div className="forgot-password-container new-password-container">
        {/* Header */}
        <div className="new-password-header">
          <button className="back-btn-simple" onClick={handleBack} aria-label="Go back">
            ←
          </button>
          <h1 className="new-password-title">Set a New Password</h1>
        </div>

        {/* New Password Input */}
        <div className="form-group">
          <label className="form-label-new">New Password</label>
          <div className="password-input-wrapper">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className="form-input-new"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            >
              👁️
            </button>
          </div>
          <p className="password-hint">Enter your password</p>
        </div>

        {/* Confirm Password Input */}
        <div className="form-group">
          <label className="form-label-new">Confirm New Password</label>
          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-input-new"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              👁️
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="password-requirements">
          <div className={`requirement ${hasMinLength ? 'met' : ''}`}>
            <span className="requirement-icon">{hasMinLength ? '✓' : '✕'}</span>
            <span>At least 8 characters</span>
          </div>
          <div className={`requirement ${hasUppercase ? 'met' : ''}`}>
            <span className="requirement-icon">{hasUppercase ? '✓' : '✕'}</span>
            <span>At least one uppercase letter</span>
          </div>
          <div className={`requirement ${hasNumber ? 'met' : ''}`}>
            <span className="requirement-icon">{hasNumber ? '✓' : '✕'}</span>
            <span>At least one number</span>
          </div>
          <div className={`requirement ${hasSpecialChar ? 'met' : ''}`}>
            <span className="requirement-icon">{hasSpecialChar ? '✓' : '✕'}</span>
            <span>At least one special character</span>
          </div>
        </div>

        {/* Reset Password Button */}
        <button 
          className="reset-password-btn" 
          onClick={handleResetPassword}
          disabled={!isValid}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordNewScreen;
