import React, { useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import './screens.css';

/**
 * AllTransactionsScreen Component
 * Shows all transactions with filters and search
 */
const AllTransactionsScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'payments', label: 'Payments' },
    { id: 'bills', label: 'Bills' },
    { id: 'top-up', label: 'Top-up' },
  ];

  const allTransactions = [
    { id: 1, icon: '💳', name: 'Pay Anything to John', amount: 500.00, date: 'Aug 15', status: 'Pending' },
    { id: 2, icon: '📄', name: 'SP Services bill', amount: 128.50, date: 'Aug 14', status: 'Completed' },
    { id: 3, icon: '📱', name: 'SingTel top-up', amount: 50.00, date: 'Aug 13', status: 'Completed' },
    { id: 4, icon: '🎁', name: 'Adidas gift card', amount: 100.00, date: 'Aug 12', status: 'Completed' },
    { id: 5, icon: '✈️', name: 'Overseas transfer to Sarah', amount: 250.00, date: 'Aug 11', status: 'Pending' },
    { id: 6, icon: '💰', name: 'Remittance from Mom', amount: 1000.00, date: 'Aug 10', status: 'Completed' },
    { id: 7, icon: '💳', name: 'Credit Card Payment', amount: 750.00, date: 'Aug 09', status: 'Completed' },
  ];

  return (
    <div className="screen all-transactions-screen screen-with-bottom-nav">
      <div className="all-transactions-container">
        {/* Header */}
        <div className="all-transactions-header">
          <h1 className="all-transactions-title">All Transactions</h1>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-pill ${selectedFilter === filter.id ? 'active' : ''}`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Time Filter Dropdown */}
        <div className="time-filter-dropdown">
          <select 
            className="time-filter-select"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="this-month">This month</option>
            <option value="last-month">Last month</option>
            <option value="last-3-months">Last 3 months</option>
            <option value="this-year">This year</option>
          </select>
        </div>

        {/* Search */}
        <div className="transactions-search">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="transactions-list-full">
          {allTransactions.map(transaction => (
            <div key={transaction.id} className="transaction-card-full">
              <div className="transaction-icon-large">{transaction.icon}</div>
              <div className="transaction-info-full">
                <div className="transaction-main-info">
                  <span className="transaction-name-full">{transaction.name}</span>
                  <span className="transaction-date-full">{transaction.date}</span>
                </div>
                <div className="transaction-sub-info">
                  <span className="transaction-amount-full">
                    S${transaction.amount.toFixed(2)}
                  </span>
                  <span className={`transaction-status-badge ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="load-more-section">
          <button className="load-more-btn">Load more</button>
          <button className="download-btn" aria-label="Download">
            ⬇️
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AllTransactionsScreen;
