import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import { useAppState } from '../hooks/useAppState';
import BottomNavigation from '../components/BottomNavigation';
import './screens.css';

/**
 * AllServicesScreen Component
 * Shows all available services organized by category
 */
const AllServicesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { accountBalance } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');

  const handleServiceClick = (service: string) => {
    // For demo, navigate to payment screen for most services
    if (service === 'pay-anything' || service === 'pay-bills') {
      navigate(`/${ScreenType.PAYMENT}`);
    }
  };

  return (
    <div className="screen all-services-screen screen-with-bottom-nav">
      <div className="all-services-container">
        {/* Header */}
        <div className="all-services-header">
          <h1 className="all-services-title">All Services</h1>
          <button className="profile-icon-btn" onClick={() => navigate(`/${ScreenType.PROFILE}`)}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="1.5"/>
              <circle cx="12" cy="10" r="3" stroke="#666" strokeWidth="1.5"/>
              <path d="M6.5 18.5C7.5 16.5 9.5 15 12 15C14.5 15 16.5 16.5 17.5 18.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Balance Card */}
        <div className="services-balance-card">
          <p className="balance-label">Available Balance</p>
          <h2 className="balance-amount-large">${accountBalance.toFixed(2)}</h2>
          <div className="balance-actions">
            <button className="balance-action-btn">
              <span className="action-icon">💰</span>
              <span>Top-up</span>
            </button>
            <button className="balance-action-btn">
              <span className="action-icon">💸</span>
              <span>Withdraw</span>
            </button>
            <button className="balance-action-btn" onClick={() => navigate(`/${ScreenType.PAYMENT}`)}>
              <span className="action-icon">↔️</span>
              <span>Transfer</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="services-search">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Services Categories */}
        <div className="services-content">
          {/* Local Payments */}
          <div className="service-category">
            <h3 className="category-title">LOCAL PAYMENTS</h3>
            <div className="service-grid">
              <button className="service-item" onClick={() => navigate(`/${ScreenType.SEND_MONEY}`)}>
                <div className="service-icon">💳</div>
                <span className="service-name">Pay Anything (P2P transfers)</span>
              </button>
              <button className="service-item" onClick={() => navigate(`/${ScreenType.MOBILE_TOPUP}`)}>
                <div className="service-icon">📱</div>
                <span className="service-name">Telco Top-up (Mobile recharge)</span>
              </button>
              <button className="service-item" onClick={() => navigate(`/${ScreenType.PAY_BILLS}`)}>
                <div className="service-icon">📄</div>
                <span className="service-name">Pay Bills</span>
              </button>
            </div>
          </div>

          {/* International */}
          <div className="service-category">
            <h3 className="category-title">INTERNATIONAL</h3>
            <div className="service-grid">
              <button className="service-item" onClick={() => navigate(`/${ScreenType.PAY_OVERSEAS_BILLS}`)}>
                <div className="service-icon">🌍</div>
                <span className="service-name">Overseas Bills</span>
              </button>
              <button className="service-item" onClick={() => navigate(`/${ScreenType.SEND_MONEY_ABROAD}`)}>
                <div className="service-icon">✈️</div>
                <span className="service-name">Send money Overseas</span>
              </button>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="service-category">
            <h3 className="category-title">LIFESTYLE</h3>
            <div className="service-grid">
              <button className="service-item" onClick={() => navigate(`/${ScreenType.GIFT_CARDS}`)}>
                <div className="service-icon">🎁</div>
                <span className="service-name">Gift Cards</span>
              </button>
            </div>
          </div>

          {/* Wallet */}
          <div className="service-category">
            <h3 className="category-title">WALLET</h3>
            <div className="service-grid">
              <button className="service-item">
                <div className="service-icon">💵</div>
                <span className="service-name">Top-up Wallet</span>
              </button>
              <button className="service-item">
                <div className="service-icon">💰</div>
                <span className="service-name">Withdraw Funds</span>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="service-category">
            <h3 className="category-title">Recent Transactions</h3>
            <div className="recent-transactions-list">
              <div className="transaction-item-compact">
                <div className="transaction-icon-compact">🛒</div>
                <div className="transaction-details-compact">
                  <span className="transaction-name-compact">Grocery Shopping</span>
                  <span className="transaction-subtitle-compact">Food & Drink</span>
                </div>
                <span className="transaction-amount-compact negative">-$876.20</span>
              </div>
              <div className="transaction-item-compact">
                <div className="transaction-icon-compact">🛍️</div>
                <div className="transaction-details-compact">
                  <span className="transaction-name-compact">Online Purchase</span>
                  <span className="transaction-subtitle-compact">Shopping</span>
                </div>
                <span className="transaction-amount-compact negative">-$8120.00</span>
              </div>
              <div className="transaction-item-compact">
                <div className="transaction-icon-compact">💼</div>
                <div className="transaction-details-compact">
                  <span className="transaction-name-compact">Salary Deposit</span>
                  <span className="transaction-subtitle-compact">Income</span>
                </div>
                <span className="transaction-amount-compact positive">+$1,800.00</span>
              </div>
            </div>
            <button className="view-all-transactions-btn" onClick={() => navigate(`/${ScreenType.ALL_TRANSACTIONS}`)}>
              View All Transactions
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AllServicesScreen;
