import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * SelectPaymentMethodScreen Component
 * Select payment method with amount summary
 */
const SelectPaymentMethodScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipient, amount, purpose, reference } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState('wallet');

  const fee = 2.50;
  const total = parseFloat(amount || '0') + fee;

  const handleContinue = () => {
    navigate(`/${ScreenType.REVIEW_PAYMENT}`, {
      state: { recipient, amount, purpose, reference, paymentMethod: selectedMethod, fee, total }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="screen select-payment-method-screen">
      <div className="select-payment-method-container">
        {/* Header */}
        <div className="payment-method-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="payment-method-title">Select Payment Method</h1>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods-list">
          <button
            className={`payment-method-card ${selectedMethod === 'wallet' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('wallet')}
          >
            <div className="method-icon">💳</div>
            <div className="method-info">
              <span className="method-name">OxPay Wallet Balance</span>
              <span className="method-detail">S$1,250 available</span>
            </div>
            {selectedMethod === 'wallet' && <span className="check-icon">✓</span>}
          </button>

          <button
            className={`payment-method-card ${selectedMethod === 'card' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('card')}
          >
            <div className="method-icon">💳</div>
            <div className="method-info">
              <span className="method-name">Credit/Debit Card</span>
              <span className="method-detail">Visa ••••5678</span>
            </div>
            {selectedMethod === 'card' && <span className="check-icon">✓</span>}
          </button>

          <button
            className={`payment-method-card ${selectedMethod === 'qr' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('qr')}
          >
            <div className="method-icon">📱</div>
            <div className="method-info">
              <span className="method-name">QR Payments</span>
              <span className="method-detail">Payment Page</span>
            </div>
            {selectedMethod === 'qr' && <span className="check-icon">✓</span>}
          </button>
        </div>

        {/* Amount Summary */}
        <div className="amount-summary-card">
          <div className="summary-row">
            <span className="summary-label">Amount:</span>
            <span className="summary-value">S${amount}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Fee:</span>
            <span className="summary-value">S${fee.toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span className="summary-label-total">Total:</span>
            <span className="summary-value-total">S${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button className="continue-to-review-btn" onClick={handleContinue}>
          Continue to Review
        </button>
      </div>
    </div>
  );
};

export default SelectPaymentMethodScreen;
