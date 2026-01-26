import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * SendMoneyScreen Component
 * Send Money to Anyone - Shows new payment option and recent beneficiaries
 */
const SendMoneyScreen: React.FC = () => {
  const navigate = useNavigate();

  const recentBeneficiaries = [
    { id: 1, name: 'Alice Wonderland' },
    { id: 2, name: 'Bob The Builder' },
    { id: 3, name: 'Charlie Chaplin' },
    { id: 4, name: 'Diana Prince' },
  ];

  const handleNewPayment = () => {
    navigate(`/${ScreenType.SELECT_RECIPIENT}`);
  };

  const handleReceiptClick = () => {
    // Navigate to payment screen with selected beneficiary
    // navigate(`/${ScreenType.PAYMENT}`, { state: { recipient: beneficiary.name } });
    navigate(`/${ScreenType.SELECT_RECIPIENT}`);
  };

  const handleViewAllTransactions = () => {
    navigate(`/${ScreenType.ALL_TRANSACTIONS}`);
  };

  return (
    <div className="screen send-money-screen">
      <div className="send-money-container">
        {/* Header */}
        <div className="send-money-header">
          <h1 className="send-money-title">Send Money to Anyone</h1>
          <div className="header-icons">
            <button className="icon-btn notification-btn">
              <span className="notification-badge">5</span>
              🔔
            </button>
            <button className="icon-btn profile-btn" onClick={() => navigate(`/${ScreenType.PROFILE}`)}>
              👤
            </button>
          </div>
        </div>

        {/* New Payment Card */}
        <button className="new-payment-card" onClick={handleNewPayment}>
          <div className="new-payment-icon">+</div>
          <span className="new-payment-text">New Payment</span>
        </button>

        {/* Recent Beneficiaries */}
        <div className="beneficiaries-section">
          <h2 className="section-title">Recent Beneficiaries</h2>
          <div className="beneficiaries-list">
            {recentBeneficiaries.map(beneficiary => (
              <button
                key={beneficiary.id}
                className="beneficiary-item"
                onClick={() => handleReceiptClick()}
              >
                <div className="beneficiary-avatar">👤</div>
                <span className="beneficiary-name">{beneficiary.name}</span>
                <span className="beneficiary-arrow">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="send-summary">
          <p className="summary-text">Sent S$1,250 this month</p>
          <button className="view-all-link" onClick={handleViewAllTransactions}>
            View All Transactions
          </button>
        </div>

        {/* Footer Note */}
        <div className="send-footer">
          <p>Funds delivered in 3 business days</p>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyScreen;
