import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * ReviewPaymentScreen Component
 * Review payment details before confirmation
 */
const ReviewPaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipient, amount, purpose, reference, paymentMethod, fee, total } = location.state || {};
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleConfirmPayment = () => {
    if (agreeToTerms) {
      navigate(`/${ScreenType.PAYMENT_SUCCESS}`, {
        state: { recipient, amount, purpose, reference, total }
      });
    }
  };

  const handleEditDetails = () => {
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="screen review-payment-screen">
      <div className="review-payment-container">
        {/* Header */}
        <div className="review-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="review-title">Review Payment</h1>
        </div>

        {/* Payment Details */}
        <div className="review-details-card">
          <div className="review-row">
            <span className="review-label">To:</span>
            <div className="review-value-right">
              <span className="review-value-main">{recipient || 'John Tan'}</span>
              <span className="review-value-sub">(DBS ••••1234)</span>
            </div>
          </div>

          <div className="review-row">
            <span className="review-label">Amount:</span>
            <span className="review-value">S${amount || '500.00'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Purpose:</span>
            <span className="review-value">{purpose || 'Family Support'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Reference:</span>
            <span className="review-value">{reference || 'Birthday gift'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Payment Method:</span>
            <span className="review-value">{paymentMethod === 'wallet' ? 'OxPay Wallet' : 'Credit Card'}</span>
          </div>

          <div className="review-divider"></div>

          <div className="review-row">
            <span className="review-label">Fee:</span>
            <span className="review-value">S${fee?.toFixed(2) || '2.50'}</span>
          </div>

          <div className="review-row total-row">
            <span className="review-label-total">Total:</span>
            <span className="review-value-total">S${total?.toFixed(2) || '502.50'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Processing:</span>
            <span className="review-value">3 business days</span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="terms-agreement">
          <label className="checkbox-label" htmlFor="terms-checkbox">
            <input
              id="terms-checkbox"
              type="checkbox"
              className="checkbox-input"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <span className="checkbox-text">I agree to terms and conditions</span>
          </label>
        </div>

        {/* Confirm Button */}
        <button 
          className="confirm-payment-btn"
          onClick={handleConfirmPayment}
          disabled={!agreeToTerms}
        >
          <span className="fingerprint-icon">👆</span>
          Confirm Payment
        </button>

        {/* Edit Details Link */}
        <button className="edit-details-link" onClick={handleEditDetails}>
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default ReviewPaymentScreen;
