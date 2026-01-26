import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

interface Recipient {
  id: number;
  name: string;
  bank: string;
  account: string;
  lastTransaction: string;
  verified: boolean;
}

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

  const handleRecipientClick = (recipient: Recipient) => {
    navigate(`/${ScreenType.PAYMENT}`, { state: { recipient: recipient.name } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="select-recipient-screen">
      <div className="select-recipient-container">
        {/* Header */}
        <div className="select-recipient-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="select-recipient-title">Select Recipient</h1>
          <button className="menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z" fill="#565E6D" />
              <path d="M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5Z" fill="#565E6D" />
              <path d="M10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19Z" fill="#565E6D" />
            </svg>
          </button>
        </div>

        <div className="border"></div>

        <div className="select-recipient-content">
          {/* Search */}
          <div className="recipient-search">
            <div className="search-input-wrapper">
              <div className="search-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6219 10.6224C10.8672 10.3771 11.2551 10.362 11.5183 10.5766L11.5693 10.6224L14.477 13.5301L14.5235 13.5811C14.7379 13.8443 14.7222 14.2323 14.477 14.4775C14.2318 14.7227 13.8438 14.7384 13.5806 14.524L13.5296 14.4775L10.6219 11.5698L10.5761 11.5188C10.3615 11.2556 10.3766 10.8677 10.6219 10.6224Z" fill="#171A1F" />
                  <path d="M12.0198 7.33005C12.0198 4.73984 9.92002 2.64005 7.3298 2.64005C4.73959 2.64005 2.6398 4.73984 2.6398 7.33005C2.6398 9.92027 4.73959 12.02 7.3298 12.02C9.92002 12.02 12.0198 9.92027 12.0198 7.33005ZM13.3598 7.33005C13.3598 10.6604 10.6601 13.36 7.3298 13.36C3.99953 13.36 1.2998 10.6604 1.2998 7.33005C1.2998 3.99977 3.99953 1.30005 7.3298 1.30005C10.6601 1.30005 13.3598 3.99977 13.3598 7.33005Z" fill="#171A1F" />
                </svg>
              </div>
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
                      <div className="recipient-bank">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.0299 5.32006C14.0299 4.95003 13.7299 4.65006 13.3599 4.65006L2.63988 4.65006C2.26986 4.65006 1.96988 4.95003 1.96988 5.32006L1.96988 10.6801C1.96988 11.0501 2.26986 11.3501 2.63988 11.3501L13.3599 11.3501C13.7299 11.3501 14.0299 11.0501 14.0299 10.6801L14.0299 5.32006ZM15.3699 10.6801C15.3699 11.7902 14.47 12.6901 13.3599 12.6901L2.63988 12.6901C1.52979 12.6901 0.629883 11.7902 0.629883 10.6801L0.629883 5.32006C0.629883 4.20997 1.52979 3.31006 2.63988 3.31006L13.3599 3.31006C14.47 3.31006 15.3699 4.20997 15.3699 5.32006L15.3699 10.6801Z" fill="#171A1F" />
                          <path d="M8.67023 7.99999C8.67023 7.62995 8.37028 7.32999 8.00023 7.32999C7.63019 7.32999 7.33023 7.62995 7.33023 7.99999C7.33023 8.37003 7.63019 8.66999 8.00023 8.66999C8.37028 8.66999 8.67023 8.37003 8.67023 7.99999ZM10.0102 7.99999C10.0102 9.11011 9.11036 10.01 8.00023 10.01C6.89011 10.01 5.99023 9.11011 5.99023 7.99999C5.99023 6.88987 6.89011 5.98999 8.00023 5.98999C9.11036 5.98999 10.0102 6.88987 10.0102 7.99999Z" fill="#171A1F" />
                          <path d="M3.98612 7.33008L4.05481 7.33336C4.39266 7.36767 4.65612 7.65315 4.65612 8.00008C4.65612 8.347 4.39266 8.63249 4.05481 8.6668L3.98612 8.67008H3.97957C3.60954 8.67008 3.30957 8.37012 3.30957 8.00008C3.30957 7.63004 3.60954 7.33008 3.97957 7.33008H3.98612ZM12.0261 7.33008L12.0948 7.33336C12.4326 7.36767 12.6961 7.65315 12.6961 8.00008C12.6961 8.347 12.4326 8.63249 12.0948 8.6668L12.0261 8.67008H12.0196C11.6495 8.67008 11.3496 8.37012 11.3496 8.00008C11.3496 7.63004 11.6495 7.33008 12.0196 7.33008H12.0261Z" fill="#171A1F" />
                        </svg>
                        <div className="recipient-bank-text">
                          {recipient.bank} · {recipient.account}
                        </div>
                      </div>
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
            <div className="recipients-list all-recipients-list">
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
                      <div className="recipient-bank">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.0299 5.32006C14.0299 4.95003 13.7299 4.65006 13.3599 4.65006L2.63988 4.65006C2.26986 4.65006 1.96988 4.95003 1.96988 5.32006L1.96988 10.6801C1.96988 11.0501 2.26986 11.3501 2.63988 11.3501L13.3599 11.3501C13.7299 11.3501 14.0299 11.0501 14.0299 10.6801L14.0299 5.32006ZM15.3699 10.6801C15.3699 11.7902 14.47 12.6901 13.3599 12.6901L2.63988 12.6901C1.52979 12.6901 0.629883 11.7902 0.629883 10.6801L0.629883 5.32006C0.629883 4.20997 1.52979 3.31006 2.63988 3.31006L13.3599 3.31006C14.47 3.31006 15.3699 4.20997 15.3699 5.32006L15.3699 10.6801Z" fill="#171A1F" />
                          <path d="M8.67023 7.99999C8.67023 7.62995 8.37028 7.32999 8.00023 7.32999C7.63019 7.32999 7.33023 7.62995 7.33023 7.99999C7.33023 8.37003 7.63019 8.66999 8.00023 8.66999C8.37028 8.66999 8.67023 8.37003 8.67023 7.99999ZM10.0102 7.99999C10.0102 9.11011 9.11036 10.01 8.00023 10.01C6.89011 10.01 5.99023 9.11011 5.99023 7.99999C5.99023 6.88987 6.89011 5.98999 8.00023 5.98999C9.11036 5.98999 10.0102 6.88987 10.0102 7.99999Z" fill="#171A1F" />
                          <path d="M3.98612 7.33008L4.05481 7.33336C4.39266 7.36767 4.65612 7.65315 4.65612 8.00008C4.65612 8.347 4.39266 8.63249 4.05481 8.6668L3.98612 8.67008H3.97957C3.60954 8.67008 3.30957 8.37012 3.30957 8.00008C3.30957 7.63004 3.60954 7.33008 3.97957 7.33008H3.98612ZM12.0261 7.33008L12.0948 7.33336C12.4326 7.36767 12.6961 7.65315 12.6961 8.00008C12.6961 8.347 12.4326 8.63249 12.0948 8.6668L12.0261 8.67008H12.0196C11.6495 8.67008 11.3496 8.37012 11.3496 8.00008C11.3496 7.63004 11.6495 7.33008 12.0196 7.33008H12.0261Z" fill="#171A1F" />
                        </svg>
                        <div className="recipient-bank-text">
                          {recipient.bank} · {recipient.account}
                        </div>
                      </div>
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
    </div>
  );
};

export default SelectRecipientScreen;
