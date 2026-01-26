import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * KYCAddressRejectedScreen Component
 * Shows document rejection with reason and resubmit option
 */
const KYCAddressRejectedScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleResubmit = () => {
    navigate(`/${ScreenType.KYC_VERIFICATION_STEP3}`);
  };

  return (
    <div className="screen kyc-rejected-screen">
      <div className="kyc-rejected-container">
        {/* Header */}
        <div className="rejected-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="rejected-title">Address Verification</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Step Indicator */}
        <p className="rejected-step">Step 3-5</p>

        {/* Upload Box */}
        <div className="rejected-upload-box">
          <span className="upload-icon-large">☁️↑</span>
          <p className="upload-title">Proof of Address</p>
          <p className="upload-subtitle">
            Accepted documents: Utility Bill, Bank Statement, Government Letter.
          </p>
        </div>

        {/* Rejection Status */}
        <div className="rejection-status">
          <div className="rejection-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="35" stroke="#dc3545" strokeWidth="3"/>
              <path d="M30 30L50 50M50 30L30 50" stroke="#dc3545" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="rejection-title">Rejected</h2>
          <p className="rejection-reason">
            Reason: Document is blurry or expired. Please upload a clear, current utility bill or bank statement within the last 3 months.. Please review the requirements and resubmit a new document.
          </p>
        </div>

        {/* Resubmit Button */}
        <button className="resubmit-btn" onClick={handleResubmit}>
          Resubmit
        </button>
      </div>
    </div>
  );
};

export default KYCAddressRejectedScreen;
