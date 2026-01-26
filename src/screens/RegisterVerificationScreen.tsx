import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import { useAuth } from '../hooks/useAuth';
import './screens.css';

/**
 * RegisterVerificationScreen Component
 * Verification in Progress - Shows submission status
 */
const RegisterVerificationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Auto-login after 3 seconds and navigate to dashboard
    const timer = setTimeout(async () => {
      await login({ username: 'demo', password: 'demo123' });
      navigate(`/${ScreenType.REGISTER_SECURITY}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, login]);

  const handleCheckStatus = () => {
    // For demo, just navigate to dashboard
    login({ username: 'demo', password: 'demo123' });
    navigate(`/${ScreenType.KYC_VERIFICATION_STEP1}`);
  };

  return (
    <div className="screen register-screen">
      <div className="register-container verification-container">
        <h1 className="verification-title">Verification in Progress</h1>

        {/* Hourglass Icon */}
        <div className="verification-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2h12v6l-6 6 6 6v6H6v-6l6-6-6-6V2z" 
                  stroke="#1a1a1a" 
                  strokeWidth="1.5" 
                  fill="none"/>
          </svg>
        </div>

        {/* Status Message */}
        <div className="verification-message">
          <p className="verification-main-text">
            Your documents have been submitted to our admin panel for review.
          </p>
          <p className="verification-sub-text">
            Usually takes 1-2 business hours
          </p>
        </div>

        {/* Status List */}
        <div className="verification-status-list">
          <div className="status-item">
            <span className="status-label">Identity</span>
            <div className="status-value">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2h12v6l-6 6 6 6v6H6v-6l6-6-6-6V2z" 
                      stroke="#666" 
                      strokeWidth="2" 
                      fill="none"/>
              </svg>
              <span>Pending</span>
            </div>
          </div>

          <div className="status-item">
            <span className="status-label">Address</span>
            <div className="status-value">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2h12v6l-6 6 6 6v6H6v-6l6-6-6-6V2z" 
                      stroke="#666" 
                      strokeWidth="2" 
                      fill="none"/>
              </svg>
              <span>Pending</span>
            </div>
          </div>

          <div className="status-item">
            <span className="status-label">Documents</span>
            <div className="status-value">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" 
                      stroke="#28a745" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
              <span className="submitted">Submitted</span>
            </div>
          </div>
        </div>

        <button className="check-status-btn" onClick={handleCheckStatus}>
          Check Status
        </button>

        <p className="verification-footer">
          You can still explore the app with limited features
        </p>
      </div>
    </div>
  );
};

export default RegisterVerificationScreen;
