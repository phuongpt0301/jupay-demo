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
    <div className="send-money-abroad-screen">
      <div className="send-money-abroad-container">
        {/* Header */}
        <div className="abroad-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="abroad-title">Send Money Abroad</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Exchange Rate */}
        <div className="exchange-rate-card">
          <div className='exchange-rate-card-content'>
            <h2 className="exchange-rate">{exchangeRate}</h2>
            <p className="exchange-rate-label">Live exchange rate</p>
            <button className="info-icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_2357)">
                  <path d="M17.4701 10.0001C17.4701 5.87455 14.1257 2.53012 10.0001 2.53012C5.87455 2.53012 2.53012 5.87455 2.53012 10.0001C2.53012 14.1257 5.87455 17.4701 10.0001 17.4701C14.1257 17.4701 17.4701 14.1257 17.4701 10.0001ZM19.1301 10.0001C19.1301 15.0424 15.0424 19.1301 10.0001 19.1301C4.95776 19.1301 0.870117 15.0424 0.870117 10.0001C0.870117 4.95776 4.95776 0.870117 10.0001 0.870117C15.0424 0.870117 19.1301 4.95776 19.1301 10.0001Z" fill="#171A1F" />
                  <path d="M9.16992 13.3297L9.16992 10.0097C9.16992 9.55128 9.54151 9.17969 9.99992 9.17969C10.4583 9.17969 10.8299 9.55128 10.8299 10.0097L10.8299 13.3297C10.8299 13.7881 10.4583 14.1597 9.99992 14.1597C9.54151 14.1597 9.16992 13.7881 9.16992 13.3297Z" fill="#171A1F" />
                  <path d="M10.0081 5.83984L10.0931 5.84389C10.5116 5.88642 10.8381 6.2401 10.8381 6.66984C10.8381 7.09958 10.5116 7.45327 10.0931 7.49579L10.0081 7.49984H9.99992C9.54151 7.49984 9.16992 7.12824 9.16992 6.66984C9.16992 6.21145 9.54151 5.83984 9.99992 5.83984H10.0081Z" fill="#171A1F" />
                </g>
                <defs>
                  <clipPath id="clip0_1_2357">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
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
        </div>

        {/* Add Recipient Button */}
        <button className="floating-add-btn" onClick={handleAddRecipient}>+</button>
      </div>
    </div>
  );
};

export default SendMoneyAbroadScreen;
