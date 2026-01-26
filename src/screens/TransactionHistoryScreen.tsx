import React, { useState, useMemo } from 'react';
import { ScreenContainer } from '../components';
import { useAppState } from '../hooks';
import type { Transaction } from '../types';
import './screens.css';

/**
 * TransactionHistoryScreen Component
 * 
 * Displays a comprehensive list of all user transactions with filtering and search capabilities.
 * Provides detailed views of individual transactions and mobile-optimized scrolling.
 * Uses demo data service for transaction data and includes basic filter/search functionality.
 * 
 * Features:
 * - Scrollable transaction list with demo data
 * - Transaction detail views (expandable items)
 * - Basic filter functionality (by type and status)
 * - Search functionality (by description, recipient, sender)
 * - Mobile-first responsive design
 * - Touch-friendly interactions
 * - Loading states and empty states
 * 
 * Requirements: 3.5, 5.3
 */
const TransactionHistoryScreen: React.FC = () => {
  const { transactions } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sent' | 'received' | 'bill_payment'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);

  /**
   * Filter and search transactions based on current criteria
   */
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === selectedFilter);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === selectedStatus);
    }

    // Search by description, recipient, or sender
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(transaction => 
        transaction.description.toLowerCase().includes(query) ||
        transaction.recipient?.toLowerCase().includes(query) ||
        transaction.sender?.toLowerCase().includes(query) ||
        transaction.category?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [transactions, selectedFilter, selectedStatus, searchQuery]);

  /**
   * Format currency display with proper localization
   */
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  /**
   * Format transaction amount with proper sign and color
   */
  const formatTransactionAmount = (transaction: Transaction): string => {
    const sign = transaction.type === 'received' ? '+' : '-';
    return `${sign}${formatCurrency(transaction.amount, transaction.currency)}`;
  };

  /**
   * Get transaction type icon
   */
  const getTransactionIcon = (type: string): string => {
    switch (type) {
      case 'sent':
        return '↗️';
      case 'received':
        return '↙️';
      case 'bill_payment':
        return '🧾';
      default:
        return '💳';
    }
  };

  /**
   * Get status badge color class
   */
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-unknown';
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /**
   * Format time for display
   */
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Toggle transaction detail expansion
   */
  const toggleTransactionDetail = (transactionId: string) => {
    setExpandedTransaction(
      expandedTransaction === transactionId ? null : transactionId
    );
  };

  /**
   * Clear all filters and search
   */
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFilter('all');
    setSelectedStatus('all');
    setExpandedTransaction(null);
  };

  /**
   * Get filter count for display
   */
  const getActiveFilterCount = (): number => {
    let count = 0;
    if (selectedFilter !== 'all') count++;
    if (selectedStatus !== 'all') count++;
    if (searchQuery.trim()) count++;
    return count;
  };

  return (
    <ScreenContainer title="Transaction History" showBackButton>
      <div className="transactions-content">
        {/* Search and Filter Controls */}
        <div className="transactions-controls">
          {/* Search Input */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search transactions"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="filter-controls">
            <div className="filter-row">
              {/* Type Filter */}
              <div className="filter-group">
                <label className="filter-label">Type</label>
                <select
                  className="filter-select"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as any)}
                  aria-label="Filter by transaction type"
                >
                  <option value="all">All Types</option>
                  <option value="sent">Sent</option>
                  <option value="received">Received</option>
                  <option value="bill_payment">Bill Payment</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <select
                  className="filter-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  aria-label="Filter by transaction status"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {getActiveFilterCount() > 0 && (
              <button
                className="btn btn--secondary btn--sm"
                onClick={clearFilters}
                aria-label="Clear all filters"
              >
                Clear Filters ({getActiveFilterCount()})
              </button>
            )}
          </div>
        </div>

        {/* Transaction Count and Summary */}
        <div className="transactions-summary">
          <p className="transaction-count">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            {getActiveFilterCount() > 0 && ` (filtered from ${transactions.length})`}
          </p>
        </div>

        {/* Transaction List */}
        <div className="transaction-list-container">
          {filteredTransactions.length > 0 ? (
            <div className="transaction-list">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-list-item">
                  {/* Main Transaction Row */}
                  <div 
                    className="transaction-main-row"
                    onClick={() => toggleTransactionDetail(transaction.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedTransaction === transaction.id}
                    aria-label={`Transaction details for ${transaction.description}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleTransactionDetail(transaction.id);
                      }
                    }}
                  >
                    <div className="transaction-icon">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    
                    <div className="transaction-main-details">
                      <div className="transaction-description">
                        {transaction.description}
                      </div>
                      <div className="transaction-meta">
                        <span className="transaction-participant">
                          {transaction.type === 'received' 
                            ? `From ${transaction.sender}` 
                            : `To ${transaction.recipient}`
                          }
                        </span>
                        <span className="transaction-date">
                          {formatDate(transaction.timestamp)}
                        </span>
                      </div>
                      <div className="transaction-status-row">
                        <span className={`status-badge ${getStatusBadgeClass(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                        {transaction.category && (
                          <span className="transaction-category">
                            {transaction.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="transaction-amount-section">
                      <div className={`transaction-amount ${transaction.type}`}>
                        {formatTransactionAmount(transaction)}
                      </div>
                      <div className="expand-indicator">
                        <svg 
                          className={`expand-arrow ${expandedTransaction === transaction.id ? 'expanded' : ''}`}
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor"
                        >
                          <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Transaction Details */}
                  {expandedTransaction === transaction.id && (
                    <div className="transaction-details-expanded">
                      <div className="detail-section">
                        <h4>Transaction Details</h4>
                        <div className="detail-grid">
                          <div className="detail-item">
                            <span className="detail-label">Transaction ID</span>
                            <span className="detail-value">{transaction.id}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Date & Time</span>
                            <span className="detail-value">
                              {formatDate(transaction.timestamp)} at {formatTime(transaction.timestamp)}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Amount</span>
                            <span className="detail-value">
                              {formatCurrency(transaction.amount, transaction.currency)}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Type</span>
                            <span className="detail-value">
                              {transaction.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Status</span>
                            <span className={`detail-value status-text ${getStatusBadgeClass(transaction.status)}`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </div>
                          {transaction.category && (
                            <div className="detail-item">
                              <span className="detail-label">Category</span>
                              <span className="detail-value">{transaction.category}</span>
                            </div>
                          )}
                          {transaction.recipient && (
                            <div className="detail-item">
                              <span className="detail-label">Recipient</span>
                              <span className="detail-value">{transaction.recipient}</span>
                            </div>
                          )}
                          {transaction.sender && (
                            <div className="detail-item">
                              <span className="detail-label">Sender</span>
                              <span className="detail-value">{transaction.sender}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-transactions-found">
              <div className="no-transactions-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>No transactions found</h3>
              <p>
                {getActiveFilterCount() > 0 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Your transaction history will appear here.'
                }
              </p>
              {getActiveFilterCount() > 0 && (
                <button
                  className="btn btn--secondary"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </ScreenContainer>
  );
};

export default TransactionHistoryScreen;