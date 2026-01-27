import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import { useAuth } from '../hooks/useAuth';
import './screens.css';

/**
 * VerifyScreen Component (Verify with Singpass)
 * 
 * Verification screen showing Singpass authentication in progress.
 * Displays loading spinner with "Redirecting to Singpass..." message.
 * Auto-navigates to dashboard after simulated verification.
 * 
 * Requirements: 3.2
 */
const VerifyScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;

    // Simulate Singpass verification process (3 seconds)
    const verifyTimer = setTimeout(async () => {
      // Auto-login with demo credentials
      const success = await login({ username: 'demo', password: 'demo123' });
      
      // Navigate to all services screen after successful login
      if (success) {
        navigate(`/${ScreenType.REGISTER_SECURITY}`);
      }
    }, 3000);

    return () => {
      clearTimeout(verifyTimer);
    };
  }, [navigate, login, cancelled]);

  const handleCancel = () => {
    setCancelled(true);
    navigate(`/${ScreenType.LOGIN}`);
  };

  return (
    <div className="screen verify-screen">
      <div className="verify-container">
        <h1 className="verify-title">Verify with Singpass</h1>

        <div className="verify-content">
          {/* Loading Spinner */}
          <div className="verify-spinner">
            <svg className="spinner-svg" viewBox="0 0 50 50">
              <circle
                className="spinner-circle"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Status Messages */}
          <div className="verify-messages">
            <p className="verify-main-message">Redirecting to Singpass...</p>
            <p className="verify-sub-message">Retrieving your information securely</p>
          </div>

          {/* Security Badge */}
          <div className="verify-security">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z" 
                    stroke="#666" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="none"/>
              <path d="M9 12L11 14L15 10" 
                    stroke="#666" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </svg>
            <span>Bank-level encryption</span>
          </div>

          {/* Cancel Button */}
          <button className="verify-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyScreen;
