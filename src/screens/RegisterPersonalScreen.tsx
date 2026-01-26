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
    navigate(-1);
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
          <div className="register-header-text">
            <h1 className="register-title">Personal Details</h1>
            <p className="register-step">Step 1 of 4</p>
          </div>
        </div>

        <div className="border" />

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
                type="date"
                className="form-input-new"
                placeholder="Pick a date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
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
