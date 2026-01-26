import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * SelectRecipientScreen Component
 * Select Recipient - Shows search and list of all recipients
 */
const SelectRecipientScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const allRecipients = [
    { id: 1, name: 'Sarah Johnson [Tech Solutions]', bank: 'Global Bank', account: '**** 7890', lastTransaction: '2023-11-20', verified: true },
    { id: 2, name: 'Michael Chen', bank: 'City Bank', account: '**** 1234', lastTransaction: '2023-11-18', verified: true },
    { id: 3, name: 'Innovate Corp', bank: 'First National', account: '**** 5678', lastTransaction: '2023-11-15', verified: true },
    { id: 4, name: 'Alice Smith', bank: 'Apex Credit', account: '**** 2345', lastTransaction: '2023-11-22', verified: true },
    { id: 5, name: 'Bob Williams', bank: 'Pacific Trust', account: '**** 6789', lastTransaction: '2023-11-19', verified: true },
    { id: 6, name: 'Catherine Lee', bank: 'Summit Finance', account: '**** 0123', lastTransaction: '2023-11-17', verified: true },
    { id: 7, name: 'David Brown', bank: 'United Savings', account: '**** 4567', lastTransaction: '2023-11-16', verified: true },
    { id: 8, name: 'Elena Garcia', bank: 'Metro Bank', account: '**** 8901', lastTransaction: '2023-11-14', verified: true },
  ];

  const handleAddNewRecipient = () => {
    navigate(`/${ScreenType.ADD_RECIPIENT}`);
  };

  const handleRecipientClick = (recipient: any) => {
    navigate(`/${ScreenType.PAYMENT}`, { state: { recipient: recipient.name } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="screen select-recipient-screen">
      <div className="select-recipient-container">
        {/* Header */}
        <div className="select-recipient-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="select-recipient-title">Select Recipient</h1>
          <button className="menu-btn">⋮</button>
        </div>

        {/* Search */}
        <div className="recipient-search">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search Recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add New Recipient Button */}
        <button className="add-new-recipient-btn" onClick={handleAddNewRecipient}>
          Add new Recipient
        </button>

        {/* Recent Recipients Section */}
        <div className="recipients-section">
          <h2 className="section-title-small">Recent Recipients</h2>
          <div className="recipients-list">
            {allRecipients.slice(0, 3).map(recipient => (
              <button
                key={recipient.id}
                className="recipient-card"
                onClick={() => handleRecipientClick(recipient)}
              >
                <div className="recipient-info">
                  <div className="recipient-header-row">
                    <span className="recipient-name">{recipient.name}</span>
                    {recipient.verified && <span className="verified-badge">Verified</span>}
                  </div>
                  <div className="recipient-details">
                    <span className="recipient-bank">🏦 {recipient.bank} · {recipient.account}</span>
                  </div>
                  <div className="recipient-meta">
                    <span className="last-transaction">Last transaction: {recipient.lastTransaction}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Recipients Section */}
        <div className="recipients-section">
          <h2 className="section-title-small">All Recipients</h2>
          <div className="recipients-list">
            {allRecipients.map(recipient => (
              <button
                key={recipient.id}
                className="recipient-card"
                onClick={() => handleRecipientClick(recipient)}
              >
                <div className="recipient-info">
                  <div className="recipient-header-row">
                    <span className="recipient-name">{recipient.name}</span>
                    {recipient.verified && <span className="verified-badge">Verified</span>}
                  </div>
                  <div className="recipient-details">
                    <span className="recipient-bank">🏦 {recipient.bank} · {recipient.account}</span>
                  </div>
                  <div className="recipient-meta">
                    <span className="last-transaction">Last transaction: {recipient.lastTransaction}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add Button at Bottom */}
        <button className="floating-add-btn" onClick={handleAddNewRecipient}>
          +
        </button>
      </div>
    </div>
  );
};

export default SelectRecipientScreen;
