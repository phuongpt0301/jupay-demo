import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * KYCComplianceStatusScreen Component
 * Shows compliance check complete status
 */
const KYCComplianceStatusScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartTrading = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleToggleDemo = () => {
    navigate(`/${ScreenType.KYC_VERIFICATION_STEP2}`);
  };

  return (
    <div className="screen kyc-compliance-screen">
      <div className="kyc-compliance-container">
        {/* Header */}
        <div className="compliance-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="compliance-title">Compliance Status</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Success Icon */}
        <div className="compliance-icon-wrapper">
          <div className="compliance-icon">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" stroke="#1a1a1a" strokeWidth="3"/>
              <path d="M30 50L45 65L70 35" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="compliance-message">
          <h2 className="compliance-main-text">Compliance Check Complete</h2>
          <p className="compliance-sub-text">Your location has been verified.</p>
          <p className="compliance-sub-text">
            Crypto trading is available in your region.
          </p>
          <p className="compliance-welcome">Welcome to JuPay Crypto!</p>
        </div>

        {/* Action Buttons */}
        <div className="compliance-actions">
          <button className="start-trading-btn" onClick={handleStartTrading}>
            Start Trading
          </button>

          <button className="toggle-demo-btn" onClick={handleToggleDemo}>
            Toggle Status (Demo)
          </button>
        </div>

        {/* Footer Note */}
        <p className="compliance-footer">
          Regulations may change. We will notify you if access becomes available.
        </p>
      </div>
    </div>
  );
};

export default KYCComplianceStatusScreen;
