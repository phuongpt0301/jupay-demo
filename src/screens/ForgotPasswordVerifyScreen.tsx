import React, { useEffect } from 'react';
import './screens.css';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';

/**
 * ForgotPasswordVerifyScreen Component
 * Step 2 of 5 - Verify Your Email
 */
const ForgotPasswordVerifyScreen: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(`/${ScreenType.REGISTER_ADDRESS}`);
    }, 1500);
  }, []);

  const handleOpenEmailApp = () => {
  };

  const handleResendEmail = () => {
    alert('Verification email resent!');
  };

  return (
    <div className="screen forgot-password-screen">
      <div className="forgot-password-container verify-email-container">
        {/* Step Indicator */}
        <p className="step-indicator">Step 2 of 5</p>

        {/* Check Icon */}
        <div className="verify-email-icon">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.1715 4.51149C50.4927 3.04303 60.0211 4.61381 68.3591 8.96073L70.0075 9.86697L70.3515 10.0857C71.9971 11.2704 72.5107 13.5336 71.4763 15.3279C70.4411 17.1221 68.2243 17.8115 66.3747 16.9802L66.0115 16.7928L64.6599 16.0545C57.8387 12.4984 50.0435 11.2127 42.4179 12.4138C34.2839 13.6953 26.8338 17.7272 21.3123 23.8357C15.7908 29.9445 12.5297 37.7625 12.074 45.984C11.6185 54.206 13.9955 62.338 18.8084 69.0192C23.6212 75.7004 30.5808 80.5308 38.5232 82.7028C46.4655 84.8748 54.9139 84.2588 62.4567 80.9568C70.0003 77.6548 76.1843 71.864 79.9763 64.5544C83.5311 57.702 84.7823 49.9008 83.5699 42.3044L83.2927 40.7888L83.2343 40.3828C83.0327 38.3661 84.3855 36.4841 86.4139 36.0701C88.4439 35.6565 90.4283 36.8602 91.0311 38.7966L91.1327 39.1912L91.4687 41.0428C92.9503 50.3284 91.4195 59.8624 87.0739 68.238C82.4391 77.1716 74.8835 84.2492 65.6639 88.2848C56.4451 92.3204 46.1211 93.072 36.4138 90.4176C26.7062 87.7628 18.1986 81.8612 12.3162 73.6952C6.43386 65.5288 3.52907 55.5916 4.0857 45.5428C4.6425 35.4938 8.6301 25.9389 15.3787 18.4724C22.1272 11.0064 31.2303 6.07777 41.1715 4.51149Z" fill="#171A1F"/>
          <path d="M85.4768 12.8985C87.0476 11.6171 89.3636 11.7074 90.828 13.1719C92.2928 14.6364 92.3832 16.9524 91.1016 18.5235L90.828 18.8282L50.828 58.828C49.3636 60.2924 47.0476 60.3828 45.4768 59.1016L45.172 58.828L33.1719 46.828L32.8985 46.5236C31.6171 44.9524 31.7074 42.6364 33.1719 41.172C34.6364 39.7074 36.9524 39.6171 38.5235 40.8984L38.8282 41.172L48 50.3436L85.172 13.1719L85.4768 12.8985Z" fill="#171A1F"/>
        </svg>

        </div>

        {/* Title and Description */}
        <div className="verify-email-content">
          <h1 className="verify-email-title">Verify Your Email</h1>
          <p className="verify-email-description">
            We sent a verification link to your email
          </p>
        </div>

        {/* Action Buttons */}
        <button className="open-email-btn" onClick={handleOpenEmailApp}>
          Open Email App
        </button>

        <button className="resend-email-btn" onClick={handleResendEmail}>
          Resend Email
        </button>

        <p className="spam-hint">Can't find it? Check spam folder</p>
      </div>
    </div>
  );
};

export default ForgotPasswordVerifyScreen;
