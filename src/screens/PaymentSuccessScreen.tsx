import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import { Modal, useModal } from '../components';
import './screens.css';

/**
 * PaymentSuccessScreen Component
 * Payment success confirmation with timeline
 */
const PaymentSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, total } = location.state || {};
  const { modalState, showModal, hideModal } = useModal();

  const transactionId = 'PAY-1234-5678';

  const handleViewStatus = () => {
    navigate(`/${ScreenType.ALL_TRANSACTIONS}`);
  };

  const handleDone = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  const handleShareReceipt = () => {
    showModal({
      title: 'Share Receipt',
      message: 'Share receipt functionality',
      type: 'info',
    });
  };

  return (
    <div className="payment-success-screen">
      <div className="payment-success-container">
        {/* Header */}
        <div className="success-header">
          <h1 className="success-title">Payment Success</h1>
        </div>

        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M69.9701 40.0001C69.9701 23.4482 56.5522 10.0301 40.0001 10.0301C23.4482 10.0301 10.0301 23.4482 10.0301 40.0001C10.0301 56.5522 23.4482 69.9701 40.0001 69.9701C56.5522 69.9701 69.9701 56.5522 69.9701 40.0001ZM76.6301 40.0001C76.6301 60.2302 60.2302 76.6301 40.0001 76.6301C19.7699 76.6301 3.37012 60.2302 3.37012 40.0001C3.37012 19.7699 19.7699 3.37012 40.0001 3.37012C60.2302 3.37012 76.6301 19.7699 76.6301 40.0001Z" fill="#171A1F" />
              <path d="M47.8893 30.7582C49.197 29.6914 51.125 29.7666 52.3442 30.9858C53.5636 32.2049 53.6389 34.133 52.5719 35.4411L52.3442 35.6945L39.0242 49.0145C37.805 50.2339 35.877 50.3092 34.5693 49.2423L34.3155 49.0145L27.6555 42.3545L27.4278 42.1011C26.3611 40.793 26.4363 38.865 27.6555 37.6459C28.8746 36.4268 30.8027 36.3515 32.1106 37.4181L32.3643 37.6459L36.6699 41.9512L47.6355 30.9858L47.8893 30.7582Z" fill="#171A1F" />
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
            <div className="timeline-icon">
              <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.28623 0.186232C5.61217 -0.0796586 6.09274 -0.0609086 6.39661 0.242971C6.70055 0.546842 6.71931 1.02742 6.45338 1.35344L6.39661 1.41661L3.07661 4.73661C2.77274 5.04055 2.29217 5.05931 1.96623 4.79338L1.90299 4.73661L0.242971 3.07661L0.186232 3.01344C-0.0796586 2.68742 -0.0609086 2.20685 0.242971 1.90299C0.546842 1.59912 1.02742 1.58037 1.35342 1.84622L1.41664 1.90299L2.4898 2.97609L5.22299 0.242971L5.28623 0.186232Z" fill="#171A1F" />
              </svg>
            </div>
            <div className="timeline-content">
              <span className="timeline-label">Submitted</span>
              <span className="timeline-time">Now</span>
            </div>
          </div>

          <div className="timeline-item pending">
            <div className="timeline-icon"></div>
            <div className="timeline-content">
              <span className="timeline-label">Processing</span>
              <span className="timeline-time">3 business days</span>
            </div>
          </div>

          <div className="timeline-item pending">
            <div className="timeline-icon"></div>
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
            <div className="btn-icon">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8154 0.830078L15.7954 0.830078V5.81008" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.66016 9.96496L15.7902 0.834961" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.2801 9.15497V14.135C13.2801 15.0518 12.5369 15.795 11.6201 15.795L2.49008 15.795C1.57329 15.795 0.830078 15.0518 0.830078 14.135L0.830078 5.00497C0.830078 4.08818 1.57329 3.34497 2.49008 3.34497L7.47008 3.34497" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            View Status
          </button>

          <button className="done-btn" onClick={handleDone}>
            Done
          </button>

          <button className="share-receipt-btn" onClick={handleShareReceipt}>
            <div className="btn-icon">
              <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3201 5.81008C14.6953 5.81008 15.8101 4.69527 15.8101 3.32008C15.8101 1.94489 14.6953 0.830078 13.3201 0.830078C11.9449 0.830078 10.8301 1.94489 10.8301 3.32008C10.8301 4.69527 11.9449 5.81008 13.3201 5.81008Z" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.32008 11.6402C4.69527 11.6402 5.81008 10.5253 5.81008 9.15016C5.81008 7.77497 4.69527 6.66016 3.32008 6.66016C1.94489 6.66016 0.830078 7.77497 0.830078 9.15016C0.830078 10.5253 1.94489 11.6402 3.32008 11.6402Z" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.3201 17.47C14.6953 17.47 15.8101 16.3552 15.8101 14.98C15.8101 13.6048 14.6953 12.49 13.3201 12.49C11.9449 12.49 10.8301 13.6048 10.8301 14.98C10.8301 16.3552 11.9449 17.47 13.3201 17.47Z" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.48535 10.4185L11.1543 13.7219" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.1508 4.57837L5.49023 7.88177" stroke="#767676" stroke-width="1.66" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            Share Receipt
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
};

export default PaymentSuccessScreen;
