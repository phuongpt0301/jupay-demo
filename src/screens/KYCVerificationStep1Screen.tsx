import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * KYCVerificationStep1Screen Component
 * Step 1-5: Personal information collection
 */
const KYCVerificationStep1Screen: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleContinue = () => {
    if (fullName && dateOfBirth && nationality && countryOfResidence && phoneNumber) {
      navigate(`/${ScreenType.KYC_COMPLIANCE_STATUS}`);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="screen kyc-verification-screen">
      <div className="kyc-verification-container">
        {/* Header */}
        <div className="kyc-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <div className="kyc-header-center">
            <h1 className="kyc-title">KYC Verification</h1>
            <p className="kyc-step">Step 1-5</p>
          </div>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        {/* Form */}
        <div className="kyc-form">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your full legal name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <div className="input-with-icon">
              <span className="input-icon">📅</span>
              <input
                type="text"
                className="form-input"
                placeholder="DD/MM/YYYY"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>

          {/* Nationality */}
          <div className="form-group">
            <label className="form-label">Nationality</label>
            <div className="input-with-icon">
              <span className="input-icon">🌐</span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., United States"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
          </div>

          {/* Country of Residence */}
          <div className="form-group">
            <label className="form-label">Country of Residence</label>
            <div className="input-with-icon">
              <span className="input-icon">📍</span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., United States"
                value={countryOfResidence}
                onChange={(e) => setCountryOfResidence(e.target.value)}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-with-icon">
              <span className="input-icon">📞</span>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g., +1 234 567 8900"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button className="kyc-continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default KYCVerificationStep1Screen;
