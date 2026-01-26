import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * SendMoneyAmountScreen Component
 * Enter amount with number pad
 */
const SendMoneyAmountScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recipient = location.state?.recipient || 'Alex Johnson';
  const [amount, setAmount] = useState('252.50');
  const [purpose, setPurpose] = useState('');
  const [reference, setReference] = useState('');
  const [scheduleOption, setScheduleOption] = useState('now');

  const handleNumberClick = (num: string) => {
    if (num === '.' && amount.includes('.')) return;
    setAmount(prev => prev === '0' ? num : prev + num);
  };

  const handleBackspace = () => {
    setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const handleContinue = () => {
    navigate(`/${ScreenType.SELECT_PAYMENT_METHOD}`, {
      state: { recipient, amount, purpose, reference, scheduleOption }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate(`/${ScreenType.DASHBOARD}`);
  };

  return (
    <div className="screen send-money-amount-screen">
      <div className="send-money-amount-container">
        {/* Header */}
        <div className="amount-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="amount-title">Send Money</h1>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        {/* Recipient Info */}
        <div className="recipient-info-card">
          <div className="recipient-avatar-large">👤</div>
          <div className="recipient-details-inline">
            <span className="recipient-name-large">{recipient}</span>
            <span className="recipient-account">SG 1234 5678 9012</span>
          </div>
          <button className="edit-btn">✎ Edit</button>
        </div>

        {/* Amount Display */}
        <div className="amount-display">
          <span className="currency-symbol">$</span>
          <span className="amount-value">{amount}</span>
        </div>

        {/* Number Pad */}
        <div className="number-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button key={num} className="number-btn" onClick={() => handleNumberClick(num.toString())}>
              {num}
            </button>
          ))}
          <button className="number-btn" onClick={() => handleNumberClick('.')}>.</button>
          <button className="number-btn" onClick={() => handleNumberClick('0')}>0</button>
          <button className="number-btn backspace-btn" onClick={handleBackspace}>✕</button>
        </div>

        {/* Purpose */}
        <div className="payment-details-section">
          <label className="detail-label">Purpose</label>
          <select 
            className="detail-select"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="">Select purpose</option>
            <option value="family">Family Support</option>
            <option value="gift">Gift</option>
            <option value="payment">Payment</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Reference */}
        <div className="payment-details-section">
          <label className="detail-label">Reference</label>
          <textarea
            className="detail-textarea"
            placeholder="Add note (optional)"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            rows={3}
          />
        </div>

        {/* Schedule Options */}
        <div className="schedule-options">
          <label className="detail-label">Schedule Options</label>
          <div className="schedule-tabs">
            <button 
              className={`schedule-tab ${scheduleOption === 'now' ? 'active' : ''}`}
              onClick={() => setScheduleOption('now')}
            >
              Send Now
            </button>
            <button 
              className={`schedule-tab ${scheduleOption === 'schedule' ? 'active' : ''}`}
              onClick={() => setScheduleOption('schedule')}
            >
              Schedule
            </button>
            <button 
              className={`schedule-tab ${scheduleOption === 'recurring' ? 'active' : ''}`}
              onClick={() => setScheduleOption('recurring')}
            >
              Recurring
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendMoneyAmountScreen;
