import React from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface Corridor {
  from: string;
  to: string;
}

interface QuickSendContact {
  name: string;
  amount: string;
  currency: string;
}

/**
 * SendMoneyAbroadScreen Component
 * Send money internationally with exchange rates
 */
const SendMoneyAbroadScreen: React.FC = () => {
  const navigate = useNavigate();

  const exchangeRate = '1 SGD = 42.50 PHP';

  const popularCorridors: Corridor[] = [
    { from: 'Singapore', to: 'Philippines' },
    { from: 'Singapore', to: 'India' },
    { from: 'Singapore', to: 'Indonesia' },
    { from: 'Singapore', to: 'China' }
  ];

  const quickSendContacts: QuickSendContact[] = [
    { name: 'Maria Santos', amount: '₱15,000', currency: 'PHP' },
    { name: 'Anand Kumar', amount: '₹8,000', currency: 'INR' },
    { name: 'Budi Santoso', amount: 'Rp500,000', currency: 'IDR' }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleCorridorClick = (corridor: Corridor) => {
    alert(`Selected: ${corridor.from} → ${corridor.to}`);
  };

  const handleQuickSendClick = (contact: QuickSendContact) => {
    alert(`Send to ${contact.name}`);
  };

  const handleSeeHowMuch = () => {
    alert('See how much you can send');
  };

  const handleAddRecipient = () => {
    alert('Add new recipient');
  };

  return (
    <div className="screen send-money-abroad-screen">
      <div className="send-money-abroad-container">
        {/* Header */}
        <div className="abroad-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="abroad-title">Send Money Abroad</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Exchange Rate */}
        <div className="exchange-rate-card">
          <h2 className="exchange-rate">{exchangeRate}</h2>
          <p className="exchange-rate-label">Live exchange rate</p>
          <button className="info-icon-btn">ⓘ</button>
        </div>

        {/* Popular Corridors */}
        <h3 className="section-title">Popular Corridors</h3>
        <div className="corridors-grid">
          {popularCorridors.map((corridor, index) => (
            <button
              key={index}
              className="corridor-card"
              onClick={() => handleCorridorClick(corridor)}
            >
              <div className="corridor-flags">
                <span className="flag-icon">🇸🇬</span>
                <span className="flag-icon">
                  {corridor.to === 'Philippines' && '🇵🇭'}
                  {corridor.to === 'India' && '🇮🇳'}
                  {corridor.to === 'Indonesia' && '🇮🇩'}
                  {corridor.to === 'China' && '🇨🇳'}
                </span>
              </div>
              <div className="corridor-text">
                <span className="corridor-from">{corridor.from}</span>
                <span className="corridor-to">{corridor.to}</span>
              </div>
              <span className="arrow-icon">→</span>
            </button>
          ))}
        </div>

        {/* Quick Send */}
        <h3 className="section-title">Quick Send</h3>
        <div className="quick-send-list">
          {quickSendContacts.map((contact, index) => (
            <button
              key={index}
              className="quick-send-item"
              onClick={() => handleQuickSendClick(contact)}
            >
              <div className="quick-send-avatar">👤</div>
              <div className="quick-send-info">
                <span className="quick-send-name">{contact.name}</span>
                <span className="quick-send-amount">Sent {contact.amount}</span>
              </div>
              <span className="arrow-icon">→</span>
            </button>
          ))}
        </div>

        {/* See How Much */}
        <button className="see-how-much-btn" onClick={handleSeeHowMuch}>
          <span className="calculator-icon">🧮</span>
          See how much you can send
          <span className="arrow-icon">→</span>
        </button>

        {/* Lowest Fees */}
        <div className="lowest-fees-badge">
          <span className="info-icon">ⓘ</span>
          Lowest fees guaranteed.
        </div>

        {/* Add Recipient Button */}
        <button className="floating-add-btn" onClick={handleAddRecipient}>+</button>
      </div>
    </div>
  );
};

export default SendMoneyAbroadScreen;
