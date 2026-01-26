import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * KYCVerificationStep3Screen Component
 * Step 3-5: Address verification with document upload
 */
const KYCVerificationStep3Screen: React.FC = () => {
  const navigate = useNavigate();
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'progress' | 'complete'>('idle');

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpload = () => {
    setDocumentUploaded(true);
    setVerificationStatus('progress');
    alert('Document uploaded. Verification in progress...');
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus('complete');
    }, 2000);
  };

  const handleResubmit = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  return (
    <div className="screen kyc-verification-screen">
      <div className="kyc-verification-container">
        {/* Header */}
        <div className="kyc-header-with-icon">
          <button className="back-btn" onClick={handleBack}>←</button>
          <div className="kyc-header-center">
            <span className="shield-icon">🛡️</span>
            <h1 className="kyc-title-inline">Address Verification</h1>
            <span className="kyc-step-inline">Step 3-5</span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="kyc-form">
          <h3 className="section-title">Proof of Address</h3>

          {!documentUploaded ? (
            <button className="upload-box-large" onClick={handleUpload}>
              <span className="upload-icon-large">☁️↑</span>
              <p className="upload-text-large">
                Drag & drop your document here, or<br />click to upload
              </p>
              <p className="upload-format">PDF, JPG, PNG (Max 5MB)</p>
            </button>
          ) : (
            <div className="upload-box-large uploaded">
              <span className="upload-icon-large">✓</span>
              <p className="upload-text-large">Document uploaded</p>
            </div>
          )}

          {/* Accepted Documents */}
          <div className="accepted-documents">
            <h4 className="accepted-title">Accepted Documents:</h4>
            <ul className="accepted-list">
              <li>
                <span className="bullet-icon">👁️</span>
                Utility bill (electricity, water, gas, internet)
              </li>
              <li>
                <span className="bullet-icon">👁️</span>
                Bank statement or credit card statement
              </li>
              <li>
                <span className="bullet-icon">👁️</span>
                Government-issued correspondence (tax, social security)
              </li>
              <li>
                <span className="bullet-icon">👁️</span>
                Rental agreement or mortgage statement
              </li>
            </ul>
          </div>

          {/* Verification Status */}
          {verificationStatus === 'progress' && (
            <div className="verification-status">
              <span className="status-icon spinning">⟳</span>
              <span className="status-text">Verification in progress.</span>
            </div>
          )}

          {verificationStatus === 'complete' && (
            <div className="verification-status complete">
              <span className="status-icon">✓</span>
              <span className="status-text">Verification complete!</span>
            </div>
          )}
        </div>

        {/* Resubmit Button */}
        <button className="kyc-continue-btn" onClick={handleResubmit}>
          Resubmit
        </button>
      </div>
    </div>
  );
};

export default KYCVerificationStep3Screen;
