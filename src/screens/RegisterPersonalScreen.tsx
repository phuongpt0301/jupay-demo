import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * RegisterPersonalScreen Component
 * Step 1 of 4 - Personal Details
 */
const RegisterPersonalScreen: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [nric, setNric] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    // Simple validation - just check if any field has text
    if (fullName.trim() || nric.trim() || mobile.trim() || email.trim()) {
      navigate(`/${ScreenType.REGISTER_ADDRESS}`);
    }
  };

  const handleBack = () => {
    navigate(`/${ScreenType.LOGIN}`);
  };

  return (
    <div className="screen register-screen">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            ←
          </button>
          <div className="register-header-text">
            <h1 className="register-title">Personal Details</h1>
            <p className="register-step">Step 1 of 4</p>
          </div>
        </div>

        {/* Form */}
        <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <div className="form-group">
            <label className="form-label-new">Full Name (as in NRIC)</label>
            <input
              type="text"
              className="form-input-new"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label-new">NRIC/FIN Number</label>
            <input
              type="text"
              className="form-input-new"
              placeholder="e.g. S1234567A"
              value={nric}
              onChange={(e) => setNric(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label-new">Date of Birth</label>
            <div className="date-input-wrapper">
              <input
                type="text"
                className="form-input-new"
                placeholder="Pick a date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
              />
              <span className="date-icon">📅</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label-new">Mobile Number</label>
            <div className="mobile-input-wrapper">
              <span className="country-code">+65</span>
              <input
                type="tel"
                className="form-input-new mobile-input"
                placeholder="e.g. 91234567"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label-new">Email Address</label>
            <input
              type="email"
              className="form-input-new"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="register-continue-btn">
            Continue
          </button>

          <p className="register-hint">Using Singpass is faster and more secure</p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPersonalScreen;
