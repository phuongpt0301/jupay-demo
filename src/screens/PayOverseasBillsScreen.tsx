import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, useModal } from '../components';
import './screens.css';
import ProductImg from '../assets/product.png';

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
  const { modalState, showModal, hideModal } = useModal();

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
    showModal({ title: 'Country Selected', message: `Selected country: ${country}`, type: 'info' });
  };

  const handleNext = () => {
    showModal({ title: 'Next Step', message: 'Proceed to next step', type: 'info' });
  };

  return (
    <div className="pay-overseas-bills-screen">
      <div className="pay-overseas-bills-container">
        {/* Header */}
        <div className="overseas-bills-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="overseas-bills-title">Pay Overseas Bills</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        <div className="overseas-bills-content">
          {/* Search */}
          <div className="country-search">
            <div className="search-input-wrapper">
              <div className="search-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3025 13.3021C13.6064 12.9982 14.087 12.9795 14.413 13.2454L14.4762 13.3021L18.0783 16.9042L18.1359 16.9674C18.4015 17.2934 18.382 17.7741 18.0783 18.0778C17.7745 18.3816 17.2938 18.401 16.9678 18.1354L16.9046 18.0778L13.3025 14.4758L13.2458 14.4126C12.9799 14.0865 12.9987 13.606 13.3025 13.3021Z" fill="#171A1F" />
                  <path d="M14.9802 9.17C14.9802 5.96123 12.379 3.36 9.1702 3.36C5.96142 3.36 3.3602 5.96123 3.3602 9.17C3.3602 12.3788 5.96142 14.98 9.1702 14.98C12.379 14.98 14.9802 12.3788 14.9802 9.17ZM16.6402 9.17C16.6402 13.2956 13.2958 16.64 9.1702 16.64C5.04463 16.64 1.7002 13.2956 1.7002 9.17C1.7002 5.04443 5.04463 1.7 9.1702 1.7C13.2958 1.7 16.6402 5.04443 16.6402 9.17Z" fill="#171A1F" />
                </svg>
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search country"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Popular Countries */}
          {!searchQuery && (
            <>
              <h3 className="section-title">Popular Countries</h3>
              <div className="popular-countries-grid">
                {popularCountries.map(country => (
                  <div className='country-card-wrapper'>
                    <img src={ProductImg} alt={country.name} />
                    <button
                      key={country.name}
                      className="country-card"
                      onClick={() => handleCountrySelect(country.name)}
                    >
                      {country.name}
                    </button>
                  </div>
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
                <div className="arrow-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.51606 3.50668C5.76136 3.26138 6.14929 3.24624 6.41245 3.46088L6.46349 3.50668L10.4835 7.52669C10.7451 7.78833 10.7451 8.21244 10.4835 8.47407L6.46349 12.4941C6.20183 12.7558 5.77772 12.7558 5.51606 12.4941C5.25441 12.2324 5.25441 11.8083 5.51606 11.5467L9.06234 8.00038L5.51606 4.4541L5.47026 4.40307C5.25563 4.13991 5.27077 3.75197 5.51606 3.50668Z" fill="#565E6D" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button className="next-btn-fixed" onClick={handleNext}>
          Next
        </button>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
};

export default PayOverseasBillsScreen;
