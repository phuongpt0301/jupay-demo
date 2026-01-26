import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * RegisterDocumentsScreen Component
 * Step 3 of 4 - Upload Required Documents
 */
const RegisterDocumentsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({
    nricFront: false,
    nricBack: false,
    selfie: false,
    proofOfAddress: false
  });

  const handleDocumentUpload = (docType: keyof typeof documents) => {
    setDocuments(prev => ({ ...prev, [docType]: true }));
  };

  const handleSubmit = () => {
    navigate(`/${ScreenType.REGISTER_VERIFICATION}`);
  };

  const handleBack = () => {
    navigate(`/${ScreenType.REGISTER_ADDRESS}`);
  };

  const allUploaded = Object.values(documents).every(val => val);

  return (
    <div className="screen register-screen">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            ←
          </button>
          <div className="register-header-text">
            <h1 className="register-title">Upload Required Documents</h1>
            <p className="register-step">Step 3 of 4</p>
          </div>
        </div>

        {/* Instructions */}
        <p className="upload-instructions">
          Clear, well-lit photos required. Ensure all text is legible and no glare is present.
        </p>

        {/* Document Upload Cards */}
        <div className="document-list">
          <div className="document-card">
            <div className="document-header">
              <div className="document-icon">📷</div>
              <span className="document-name">NRIC Front</span>
              <button 
                className="upload-icon-btn"
                onClick={() => handleDocumentUpload('nricFront')}
                aria-label="Upload NRIC Front"
              >
                📷
              </button>
            </div>
            <div className="document-status">
              <span>{documents.nricFront ? 'Uploaded' : 'Ready for upload'}</span>
              <span>{documents.nricFront ? '100%' : '0%'} Uploaded</span>
            </div>
          </div>

          <div className="document-card">
            <div className="document-header">
              <div className="document-icon">📷</div>
              <span className="document-name">NRIC Back</span>
              <button 
                className="upload-icon-btn"
                onClick={() => handleDocumentUpload('nricBack')}
                aria-label="Upload NRIC Back"
              >
                📷
              </button>
            </div>
            <div className="document-status">
              <span>{documents.nricBack ? 'Uploaded' : 'Ready for upload'}</span>
              <span>{documents.nricBack ? '100%' : '0%'} Uploaded</span>
            </div>
          </div>

          <div className="document-card">
            <div className="document-header">
              <div className="document-icon">📷</div>
              <span className="document-name">Selfie with NRIC</span>
              <button 
                className="upload-icon-btn"
                onClick={() => handleDocumentUpload('selfie')}
                aria-label="Upload Selfie"
              >
                📷
              </button>
            </div>
            <div className="document-status">
              <span>{documents.selfie ? 'Uploaded' : 'Ready for upload'}</span>
              <span>{documents.selfie ? '100%' : '0%'} Uploaded</span>
            </div>
          </div>

          <div className="document-card">
            <div className="document-header">
              <div className="document-icon">📷</div>
              <span className="document-name">Proof of Address (utility bill)</span>
              <button 
                className="upload-icon-btn"
                onClick={() => handleDocumentUpload('proofOfAddress')}
                aria-label="Upload Proof of Address"
              >
                📷
              </button>
            </div>
            <div className="document-status">
              <span>{documents.proofOfAddress ? 'Uploaded' : 'Ready for upload'}</span>
              <span>{documents.proofOfAddress ? '100%' : '0%'} Uploaded</span>
            </div>
          </div>
        </div>

        <button 
          className="register-continue-btn" 
          onClick={handleSubmit}
          disabled={!allUploaded}
        >
          Submit for Verification
        </button>
      </div>
    </div>
  );
};

export default RegisterDocumentsScreen;
