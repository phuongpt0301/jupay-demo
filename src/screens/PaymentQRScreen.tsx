import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, useModal } from '../components';
import './screens.css';
import qrCode from '../assets/qr.png';
import { ScreenType } from '../types';
/**
 * PaymentQRScreen Component
 * 
 * QR Code payment screen for PayNow/bank app payments
 * Shows QR code with countdown timer and payment details
 */
const PaymentQRScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, phone, telco } = location.state || {
    amount: '50.00',
    phone: '+65 9123 4567',
    telco: 'SingTel'
  };

  const { modalState, showModal, hideModal } = useModal();
  
  // Countdown timer (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState(299); // Start at 4:59
  const [isExpired] = useState(false);

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showModal]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCheckStatus = () => {
    showModal({
      title: 'Payment Status',
      message: 'Payment is still pending. Please complete the payment using your bank app or PayNow.',
      type: 'info',
      onConfirm: () => {
        navigate(`/${ScreenType.PAYMENT_SUCCESS}`);
      }
    });
  };

  const handleCancelPayment = () => {
    showModal({
      title: 'Cancel Payment',
      message: 'Are you sure you want to cancel this payment?',
      type: 'warning',
      showCancel: true,
      onConfirm: () => {
        navigate(-1);
      }
    });
  };

  return (
    <div className="payment-qr-screen">
      <div className="payment-qr-container">
        {/* Header */}
        <div className="payment-qr-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#171A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="payment-qr-title-wrapper">
            <div className="payment-qr-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 16V4M7 4L3 8M7 4L11 8" stroke="#171A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 8V20M17 20L21 16M17 20L13 16" stroke="#171A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="payment-qr-title">OxPay Financial</h1>
          </div>
        </div>

        <div className="border"></div>

        <div className="qr-content">
          {/* QR Code Section */}
          <div className="qr-code-section">
            <div className="qr-code-wrapper">
              <div className="qr-code-placeholder">
                {/* QR Code Placeholder */}
                <img src={qrCode} alt="QR Code" />
              </div>
            </div>
            
            {/* Timer */}
            <p className={`qr-timer ${isExpired ? 'expired' : ''}`}>
              Expires in {formatTime(timeLeft)}
            </p>
          </div>

          {/* Scan Instructions */}
          <p className="qr-instructions">
            Scan with your bank app or PayNow
          </p>

          {/* Payment Details */}
          <div className="qr-payment-details">
            <div className="qr-detail-row">
              <span className="qr-detail-label">Amount:</span>
              <span className="qr-detail-value">S${amount}</span>
            </div>
            <div className="qr-detail-row">
              <span className="qr-detail-label">Phone:</span>
              <span className="qr-detail-value">{phone}</span>
            </div>
            <div className="qr-detail-row">
              <span className="qr-detail-label">Telco:</span>
              <span className="qr-detail-value">{telco}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="qr-actions">
            <button 
              className="qr-check-status-btn" 
              onClick={handleCheckStatus}
              disabled={isExpired}
            >
              Check Payment Status
            </button>
            
            <button 
              className="qr-cancel-btn" 
              onClick={handleCancelPayment}
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        showCancel={modalState.showCancel}
        onConfirm={modalState.onConfirm}
      />
    </div>
  );
};

export default PaymentQRScreen;
