import React from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface Telco {
  name: string;
  logo?: string;
}

interface RecentNumber {
  number: string;
}

/**
 * MobileTopUpScreen Component
 * Top up mobile phone credit
 */
const MobileTopUpScreen: React.FC = () => {
  const navigate = useNavigate();

  const telcos: Telco[] = [
    { name: 'SingTel' },
    { name: 'StarHub' },
    { name: 'M1' },
    { name: 'Circles.Life' },
    { name: 'GOMO' },
    { name: 'Heya' }
  ];

  const recentNumbers: RecentNumber[] = [
    { number: '+65 9123 4567' },
    { number: '+65 8876 5432' }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleTelcoClick = (telco: string) => {
    alert(`Selected: ${telco}`);
  };

  const handleInternationalTopUp = () => {
    alert('International Top-up');
  };

  const handleRecentNumberClick = (number: string) => {
    alert(`Top up ${number}`);
  };

  return (
    <div className="screen mobile-topup-screen">
      <div className="mobile-topup-container">
        {/* Header */}
        <div className="topup-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="topup-title">Mobile Top-up</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Promotion Banner */}
        <div className="promotion-banner">
          <p className="promotion-text">Top-up S$50, get S$52 credit</p>
        </div>

        {/* Select Telco */}
        <h3 className="section-title">Select Telco</h3>
        <div className="telco-grid">
          {telcos.map(telco => (
            <button
              key={telco.name}
              className="telco-card"
              onClick={() => handleTelcoClick(telco.name)}
            >
              <div className="telco-logo">📱</div>
              <span className="telco-name">{telco.name}</span>
            </button>
          ))}
        </div>

        {/* International Top-up */}
        <button className="international-topup-btn" onClick={handleInternationalTopUp}>
          <span className="globe-icon">🌐</span>
          International Top-up
        </button>

        {/* Recent Numbers */}
        <h3 className="section-title">Recent numbers</h3>
        <div className="recent-numbers-list">
          {recentNumbers.map((item, index) => (
            <button
              key={index}
              className="recent-number-item"
              onClick={() => handleRecentNumberClick(item.number)}
            >
              <span className="phone-icon">📞</span>
              <span className="number-text">{item.number}</span>
              <span className="arrow-icon">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileTopUpScreen;
