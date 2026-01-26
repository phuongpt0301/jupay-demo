import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface Country {
  name: string;
  popular?: boolean;
}

/**
 * PayOverseasBillsScreen Component
 * Select country to pay overseas bills
 */
const PayOverseasBillsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const popularCountries: Country[] = [
    { name: 'Malaysia', popular: true },
    { name: 'Indonesia', popular: true },
    { name: 'Thailand', popular: true },
    { name: 'Philippines', popular: true },
    { name: 'USA', popular: true },
    { name: 'UK', popular: true }
  ];

  const allCountries: Country[] = [
    { name: 'Argentina' },
    { name: 'Australia' },
    { name: 'Brazil' },
    { name: 'Canada' },
    { name: 'China' },
    { name: 'Denmark' },
    { name: 'Egypt' },
    { name: 'France' },
    { name: 'Germany' },
    { name: 'India' },
    { name: 'Japan' },
    { name: 'Kenya' },
    { name: 'Mexico' },
    { name: 'Netherlands' },
    { name: 'New Zealand' },
    { name: 'Nigeria' },
    { name: 'Norway' },
    { name: 'Pakistan' },
    { name: 'Russia' },
    { name: 'Saudi Arabia' },
    { name: 'Singapore' },
    { name: 'South Africa' },
    { name: 'South Korea' },
    { name: 'Spain' },
    { name: 'Sweden' },
    { name: 'Switzerland' },
    { name: 'Turkey' },
    { name: 'United Arab Emirates' },
    { name: 'Vietnam' }
  ];

  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleCountrySelect = (country: string) => {
    alert(`Selected country: ${country}`);
  };

  const handleNext = () => {
    alert('Proceed to next step');
  };

  return (
    <div className="screen pay-overseas-bills-screen">
      <div className="pay-overseas-bills-container">
        {/* Header */}
        <div className="overseas-bills-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="overseas-bills-title">Pay Overseas Bills</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Search */}
        <div className="country-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search country"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Popular Countries */}
        {!searchQuery && (
          <>
            <h3 className="section-title">Popular Countries</h3>
            <div className="popular-countries-grid">
              {popularCountries.map(country => (
                <button
                  key={country.name}
                  className="country-card"
                  onClick={() => handleCountrySelect(country.name)}
                >
                  {country.name}
                </button>
              ))}
            </div>
          </>
        )}

        {/* All Countries */}
        <h3 className="section-title">All Countries</h3>
        <div className="all-countries-list">
          {filteredCountries.map(country => (
            <button
              key={country.name}
              className="country-list-item"
              onClick={() => handleCountrySelect(country.name)}
            >
              <span>{country.name}</span>
              <span className="arrow-icon">→</span>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button className="next-btn-fixed" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PayOverseasBillsScreen;
