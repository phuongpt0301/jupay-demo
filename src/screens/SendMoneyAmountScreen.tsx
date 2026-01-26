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
    <div className="send-money-amount-screen">
      <div className="send-money-amount-container">
        {/* Header */}
        <div className="amount-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="amount-title">Send Money</h1>
          <button className="close-btn" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.3936 4.43329C14.7177 4.10915 15.2431 4.10915 15.5672 4.43329C15.8914 4.75742 15.8914 5.28282 15.5672 5.60696L5.6072 15.567C5.28307 15.8911 4.75766 15.8911 4.43353 15.567C4.1094 15.2429 4.1094 14.7174 4.43353 14.3933L14.3936 4.43329Z" fill="#565E6D" />
              <path d="M4.4334 4.43316C4.73727 4.12928 5.21785 4.11053 5.54385 4.37642L5.60707 4.43316L15.567 14.3932L15.6238 14.4564C15.8897 14.7824 15.8709 15.2629 15.567 15.5668C15.2632 15.8707 14.7826 15.8895 14.4566 15.6236L14.3934 15.5668L4.4334 5.60683L4.37666 5.5436C4.11077 5.21761 4.12952 4.73703 4.4334 4.43316Z" fill="#565E6D" />
            </svg>
          </button>
        </div>

        {/* Recipient Info */}
        <div className="recipient-info-card">
          <div className="recipient-avatar-large">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="24" fill="#9095A0" />
              <path d="M25.7998 26.3999H22.1998C19.2172 26.3999 16.7998 28.8173 16.7998 31.7999C16.7998 31.7999 19.4998 32.9999 23.9998 32.9999C28.4998 32.9999 31.1998 31.7999 31.1998 31.7999C31.1998 28.8173 28.7824 26.3999 25.7998 26.3999Z" stroke="white" stroke-width="1.44" stroke-miterlimit="10" stroke-linecap="square" />
              <path d="M19.7998 19.2C19.7998 16.8804 21.6802 15 23.9998 15C26.3194 15 28.1998 16.8804 28.1998 19.2C28.1998 21.5196 26.3194 24 23.9998 24C21.6802 24 19.7998 21.5196 19.7998 19.2Z" stroke="white" stroke-width="1.44" stroke-miterlimit="10" stroke-linecap="square" />
            </svg>
          </div>
          <div className="recipient-details-inline">
            <span className="recipient-name-large">{recipient}</span>
            <span className="recipient-account">SG 1234 5678 9012</span>
          </div>
          <button className="edit-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_926)">
                <path d="M14.0299 3.18859C14.0299 2.86539 13.9011 2.55545 13.6727 2.32688C13.4442 2.09842 13.1347 1.96977 12.8116 1.96964C12.4885 1.9696 12.1778 2.09725 11.9492 2.32558L11.9499 2.32623L3.00695 11.2711C2.92925 11.3486 2.87163 11.4442 2.83945 11.5492L2.13674 13.8615L4.45295 13.1594L4.5295 13.1313C4.60433 13.0981 4.67273 13.0514 4.73102 12.9932L13.6727 4.0503L13.7537 3.96066C13.9314 3.74389 14.0299 3.4713 14.0299 3.18859ZM15.3699 3.18859C15.3698 3.82483 15.1329 4.4368 14.7078 4.90612L14.6201 4.99772L5.67714 13.942C5.44417 14.1742 5.15762 14.3461 4.84291 14.4419L1.92605 15.3265L1.92409 15.3271C1.75049 15.3793 1.56598 15.383 1.39019 15.3389C1.21435 15.2947 1.05333 15.2039 0.92498 15.0758C0.796588 14.9477 0.70516 14.7865 0.660645 14.6107C0.616214 14.4349 0.619906 14.2505 0.671767 14.0767L0.673074 14.0741L1.55769 11.1579L1.55834 11.156L1.59825 11.0395C1.68475 10.8089 1.81303 10.5963 1.97644 10.412L2.06084 10.3217L11.0018 1.37881L11.094 1.29113C11.5634 0.866263 12.1754 0.629558 12.8116 0.629639C13.4901 0.629764 14.141 0.899596 14.6207 1.37946C15.1004 1.85934 15.37 2.51008 15.3699 3.18859Z" fill="#565E6D" />
                <path d="M9.51647 2.85629C9.76175 2.61099 10.1497 2.59585 10.4129 2.81049L10.4638 2.85629L13.1438 5.53629L13.1897 5.58732C13.4043 5.85048 13.3891 6.23841 13.1438 6.48371C12.8986 6.72898 12.5106 6.74412 12.2475 6.52951L12.1965 6.48371L9.51647 3.80371L9.47064 3.75267C9.25604 3.48952 9.27111 3.10159 9.51647 2.85629Z" fill="#565E6D" />
              </g>
              <defs>
                <clipPath id="clip0_1_926">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Edit</span>
          </button>
        </div>

        {/* Amount Display */}
        <div className="amount-display">
          <div className="amount-currency-symbol">$</div>
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
          <button className="number-btn backspace-btn" onClick={handleBackspace}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2929 5.2929C17.6834 4.90237 18.3164 4.90237 18.7069 5.2929C19.0975 5.68342 19.0975 6.31643 18.7069 6.70696L6.70695 18.707C6.31643 19.0975 5.68341 19.0975 5.29289 18.707C4.90237 18.3165 4.90237 17.6834 5.29289 17.2929L17.2929 5.2929Z" fill="#565E6D" />
              <path d="M5.29274 5.29274C5.65885 4.92662 6.23786 4.90403 6.63063 5.22438L6.7068 5.29274L18.7068 17.2928L18.7752 17.369C19.0955 17.7617 19.0729 18.3407 18.7068 18.7068C18.3407 19.073 17.7617 19.0956 17.3689 18.7752L17.2928 18.7068L5.29274 6.7068L5.22438 6.63063C4.90403 6.23786 4.92662 5.65885 5.29274 5.29274Z" fill="#565E6D" />
            </svg>
          </button>
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
