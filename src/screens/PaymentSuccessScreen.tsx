import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * PaymentSuccessScreen Component
 * Payment success confirmation with timeline
 */
const PaymentSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, total } = location.state || {};
  
  const transactionId = 'PAY-1234-5678';

  const handleViewStatus = () => {
    navigate(`/${ScreenType.ALL_TRANSACTIONS}`);
  };

  const handleDone = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleShareReceipt = () => {
    alert('Share receipt functionality');
  };

  return (
    <div className="screen payment-success-screen">
      <div className="payment-success-container">
        {/* Header */}
        <div className="success-header">
          <h1 className="success-title">Payment Success</h1>
        </div>

        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="2"/>
              <path d="M8 12L11 15L16 9" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-message">
          <h2 className="success-main-text">Payment Submitted Successfully!</h2>
        </div>

        {/* Transaction Details */}
        <div className="transaction-details-card">
          <div className="transaction-detail-row">
            <span className="detail-label-gray">Transaction ID</span>
            <span className="detail-value-bold">{transactionId}</span>
          </div>
          <div className="transaction-detail-row">
            <span className="detail-label-gray">Amount</span>
            <span className="detail-value-bold">S${total || amount || '500.00'}</span>
          </div>
        </div>

        {/* Payment Timeline */}
        <div className="payment-timeline">
          <h3 className="timeline-title">Payment Timeline</h3>
          
          <div className="timeline-item completed">
            <div className="timeline-icon">✓</div>
            <div className="timeline-content">
              <span className="timeline-label">Submitted</span>
              <span className="timeline-time">Now</span>
            </div>
          </div>

          <div className="timeline-item pending">
            <div className="timeline-icon">○</div>
            <div className="timeline-content">
              <span className="timeline-label">Processing</span>
              <span className="timeline-time">3 business days</span>
            </div>
          </div>

          <div className="timeline-item pending">
            <div className="timeline-icon">○</div>
            <div className="timeline-content">
              <span className="timeline-label">Completed</span>
            </div>
          </div>
        </div>

        {/* Email Confirmation Note */}
        <p className="email-confirmation-note">
          You'll receive email confirmation
        </p>

        {/* Action Buttons */}
        <div className="success-actions">
          <button className="view-status-btn" onClick={handleViewStatus}>
            <span className="btn-icon">🔍</span>
            View Status
          </button>

          <button className="done-btn" onClick={handleDone}>
            Done
          </button>

          <button className="share-receipt-btn" onClick={handleShareReceipt}>
            <span className="btn-icon">↗️</span>
            Share Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessScreen;
