import React from 'react';
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
    <div className="kyc-compliance-screen">
      <div className="kyc-compliance-container">
        <div className="kyc-compliance-content">
          {/* Header */}
          <div className="compliance-header">
            <button className="back-btn" onClick={handleBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
                <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
              </svg>
            </button>
            <h1 className="compliance-title">Compliance Status</h1>
            <div style={{ width: '56px' }}></div>
          </div>

          {/* Success Icon */}
          <div className="compliance-icon-wrapper">
            <div className="compliance-icon">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.4442 2.38121C26.2912 1.61761 31.246 2.43441 35.5817 4.69481L36.4389 5.16606L36.6178 5.27981C37.4735 5.89587 37.7406 7.07271 37.2027 8.00576C36.6644 8.93872 35.5116 9.29721 34.5498 8.86496L34.361 8.76747L33.6581 8.38357C30.1111 6.53441 26.0576 5.86585 22.0923 6.49043C17.8626 7.1568 13.9886 9.2534 11.1174 12.4298C8.24622 15.6064 6.55041 19.6717 6.31346 23.9469C6.07659 28.2223 7.31263 32.451 9.81535 35.9252C12.318 39.3994 15.937 41.9112 20.0671 43.0407C24.1971 44.1701 28.5902 43.8498 32.5125 42.1328C36.4351 40.4157 39.6508 37.4045 41.6227 33.6035C43.4712 30.0403 44.1218 25.9836 43.4913 22.0335L43.3472 21.2454L43.3168 21.0343C43.212 19.9856 43.9154 19.007 44.9702 18.7917C46.0258 18.5766 47.0577 19.2025 47.3712 20.2095L47.424 20.4147L47.5987 21.3775C48.3691 26.206 47.5731 31.1637 45.3134 35.519C42.9033 40.1644 38.9744 43.8448 34.1802 45.9433C29.3864 48.0418 24.018 48.4327 18.9702 47.0524C13.9222 45.6719 9.49825 42.603 6.4394 38.3567C3.3806 34.1102 1.87011 28.9428 2.15955 23.7175C2.44909 18.492 4.52264 13.5235 8.03191 9.64091C11.5411 5.75859 16.2747 3.19567 21.4442 2.38121Z" fill="#171A1F" />
                <path d="M44.4979 6.73721C45.3147 6.07088 46.519 6.11787 47.2805 6.8794C48.0422 7.64093 48.0892 8.84525 47.4228 9.66221L47.2805 9.82064L26.4805 30.6206C25.719 31.3821 24.5147 31.4291 23.6979 30.7629L23.5394 30.6206L17.2993 24.3806L17.1571 24.2223C16.4908 23.4053 16.5378 22.2009 17.2993 21.4395C18.0608 20.6779 19.2652 20.6309 20.0821 21.2972L20.2406 21.4395L25.0099 26.2087L44.3394 6.8794L44.4979 6.73721Z" fill="#171A1F" />
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
