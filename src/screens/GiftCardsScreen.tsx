import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface Brand {
  name: string;
  logo?: string;
}

/**
 * GiftCardsScreen Component
 * Browse and purchase gift cards
 */
const GiftCardsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const balance = 1250.75;

  const featuredBrands: Brand[] = [
    { name: 'Adidas' },
    { name: 'Nike' },
    { name: 'Starbucks' },
    { name: 'Amazon' },
    { name: 'Walmart' },
    { name: 'Target' }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleMyGiftCards = () => {
    alert('My Gift Cards');
  };

  const handleCategoryClick = (category: string) => {
    alert(`${category} category selected`);
  };

  const handleBrandClick = (brand: string) => {
    alert(`Selected: ${brand}`);
  };

  return (
    <div className="gift-cards-screen">
      <div className="gift-cards-container">
        {/* Header */}
        <div className="gift-cards-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22438C11.7618 3.90403 12.3408 3.92662 12.7069 4.29274C13.073 4.65885 13.0956 5.23786 12.7753 5.63063L12.7069 5.7068L6.41399 11.9998L12.7069 18.2928L12.7753 18.369C13.0956 18.7617 13.073 19.3407 12.7069 19.7068C12.3408 20.073 11.7618 20.0956 11.369 19.7752L11.2929 19.7068L4.29289 12.7068C3.90237 12.3163 3.90237 11.6833 4.29289 11.2928L11.2929 4.29274L11.369 4.22438Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="gift-cards-title">Gift Cards</h1>
          <button className="my-gift-cards-btn" onClick={handleMyGiftCards}>
            My Gift Cards
          </button>
        </div>

        <div className="gift-cards-content">
          {/* Current Balance */}
          <div className="balance-card">
            <div className="balance-meta">
              <span className="balance-label">Current Balance</span>
              <div className="balance-amount-row">
                <span className="balance-amount">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="wallet-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0149 15.1752C20.7046 15.1752 20.4071 15.2985 20.1877 15.518C19.9682 15.7374 19.8449 16.0349 19.8449 16.3452L19.8507 16.4605C19.8772 16.7285 19.9956 16.9804 20.1877 17.1724C20.4071 17.3919 20.7046 17.5152 21.0149 17.5152H24.5249V15.1752H21.0149ZM5.80492 4.64518C5.49461 4.64518 5.19712 4.76853 4.9777 4.98795C4.75828 5.20737 4.63492 5.50487 4.63492 5.81518L4.64063 5.93057C4.66718 6.1985 4.78565 6.45036 4.9777 6.6424C5.19712 6.86182 5.49461 6.98518 5.80492 6.98518L21.0149 6.98518V4.64518L5.80492 4.64518ZM23.3549 6.98518C23.9755 6.98518 24.5706 7.23188 25.0094 7.67073C25.4482 8.10956 25.6949 8.70457 25.6949 9.32518L25.6949 13.1505C25.8702 13.2518 26.0338 13.3751 26.1794 13.5207C26.6182 13.9595 26.8649 14.5546 26.8649 15.1752V17.5152C26.8649 18.1357 26.6182 18.7308 26.1794 19.1697C25.7406 19.6084 25.1455 19.8552 24.5249 19.8552L21.0149 19.8552C20.084 19.8552 19.1915 19.4851 18.5332 18.8269C17.9574 18.251 17.6019 17.4959 17.522 16.6925L17.5049 16.3452C17.5049 15.4142 17.875 14.5217 18.5332 13.8635C19.1915 13.2052 20.084 12.8352 21.0149 12.8352H23.3549L23.3549 9.32518L5.80492 9.32518C4.87401 9.32518 3.9815 8.9551 3.32325 8.29685C2.74737 7.72099 2.39193 6.96588 2.31206 6.16252L2.29492 5.81518C2.29492 4.88427 2.66499 3.99175 3.32325 3.3335C3.9815 2.67525 4.87401 2.30518 5.80492 2.30518L21.0149 2.30518L21.2458 2.31661C21.7816 2.3697 22.2853 2.60663 22.6694 2.99073C23.1082 3.42956 23.3549 4.02457 23.3549 4.64518V6.98518Z" fill="#171A1F" />
                <path d="M2.2998 22.1901L2.2998 5.81014C2.2998 5.16397 2.82364 4.64014 3.4698 4.64014C4.11597 4.64014 4.6398 5.16397 4.6398 5.81014L4.6398 22.1901C4.6398 22.5004 4.76316 22.798 4.98258 23.0173C5.202 23.2368 5.4995 23.3601 5.8098 23.3601L23.3598 23.3601V18.6801C23.3598 18.0339 23.8836 17.5101 24.5298 17.5101C25.176 17.5101 25.6998 18.0339 25.6998 18.6801V23.3601C25.6998 23.9807 25.4531 24.5758 25.0143 25.0146C24.5754 25.4534 23.9804 25.7001 23.3598 25.7001L5.8098 25.7001C4.87889 25.7001 3.98638 25.3301 3.32813 24.6718C2.66988 24.0136 2.2998 23.121 2.2998 22.1901Z" fill="#171A1F" />
              </svg>
            </div>
          </div>

          {/* Special Offers */}
          <h3 className="section-title">Special Offers</h3>
          <div className="special-offers-carousel">
            <div className="offer-card">
              <div className="offer-image">🎉</div>
              <p className="offer-title">Summer Savings Event!</p>
            </div>
          </div>

          {/* Search */}
          <div className="gift-card-search">
            <input
              type="text"
              className="search-input"
              placeholder="Search gift cards or brands"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Shop by Category */}
          <h3 className="section-title">Shop by Category</h3>
          <div className="category-chips">
            <button className="category-chip" onClick={() => handleCategoryClick('Fashion & Retail')}>
              <span className="chip-icon">👔</span>
              Fashion & Retail
            </button>
            <button className="category-chip" onClick={() => handleCategoryClick('Food & Dining')}>
              <span className="chip-icon">🍴</span>
              Food & Dining
            </button>
          </div>

          {/* Featured Brands */}
          <h3 className="section-title">Featured Brands</h3>
          <div className="brands-grid">
            {featuredBrands.map(brand => (
              <button
                key={brand.name}
                className="brand-card"
                onClick={() => handleBrandClick(brand.name)}
              >
                <div className="brand-logo">🏷️</div>
                <span className="brand-name">{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardsScreen;
