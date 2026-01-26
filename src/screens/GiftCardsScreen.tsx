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
    <div className="screen gift-cards-screen">
      <div className="gift-cards-container">
        {/* Header */}
        <div className="gift-cards-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="gift-cards-title">Gift Cards</h1>
          <button className="my-gift-cards-btn" onClick={handleMyGiftCards}>
            My Gift Cards
          </button>
        </div>

        {/* Current Balance */}
        <div className="balance-card">
          <span className="balance-label">Current Balance</span>
          <div className="balance-amount-row">
            <span className="balance-amount">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="wallet-icon">💳</span>
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
  );
};

export default GiftCardsScreen;
