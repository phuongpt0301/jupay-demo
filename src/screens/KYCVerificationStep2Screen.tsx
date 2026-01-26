import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * KYCVerificationStep2Screen Component
 * Step 2-5: Document upload (front, back, selfie)
 */
const KYCVerificationStep2Screen: React.FC = () => {
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState('');
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleUploadFront = () => {
    setFrontUploaded(true);
    alert('Front of document uploaded');
  };

  const handleUploadBack = () => {
    setBackUploaded(true);
    alert('Back of document uploaded');
  };

  const handleUploadSelfie = () => {
    setSelfieUploaded(true);
    alert('Selfie uploaded');
  };

  const handleContinue = () => {
    if (documentType && frontUploaded && backUploaded && selfieUploaded) {
      navigate(`/${ScreenType.KYC_VERIFICATION_STEP3}`);
    } else {
      alert('Please select document type and upload all required documents');
    }
  };

  return (
    <div className="screen kyc-verification-screen">
      <div className="kyc-verification-container">
        {/* Header */}
        <div className="kyc-header-simple">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="kyc-title-center">Step 2-5</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Form */}
        <div className="kyc-form">
          {/* Document Type */}
          <div className="form-group">
            <label className="form-label">Document Type</label>
            <select
              className="form-select"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Select Document Type</option>
              <option value="passport">Passport</option>
              <option value="national_id">National ID</option>
              <option value="drivers_license">Driver's License</option>
            </select>
          </div>

          {/* Front of Document */}
          <button
            className={`upload-box ${frontUploaded ? 'uploaded' : ''}`}
            onClick={handleUploadFront}
          >
            <span className="upload-icon">☁️↑</span>
            <span className="upload-text">Front of Document</span>
            {frontUploaded && <span className="check-badge">✓</span>}
          </button>

          {/* Back of Document */}
          <button
            className={`upload-box ${backUploaded ? 'uploaded' : ''}`}
            onClick={handleUploadBack}
          >
            <span className="upload-icon">☁️↑</span>
            <span className="upload-text">Back of Document</span>
            {backUploaded && <span className="check-badge">✓</span>}
          </button>

          {/* Selfie */}
          <button
            className={`upload-box ${selfieUploaded ? 'uploaded' : ''}`}
            onClick={handleUploadSelfie}
          >
            <span className="upload-icon">📷</span>
            <span className="upload-text">Selfie</span>
            {selfieUploaded && <span className="check-badge">✓</span>}
          </button>

          {/* Instruction */}
          <p className="upload-instruction">Ensure clarity and no glare</p>
        </div>

        {/* Continue Button */}
        <button className="kyc-continue-btn" onClick={handleContinue}>
          Upload & Continue
        </button>
      </div>
    </div>
  );
};

export default KYCVerificationStep2Screen;
