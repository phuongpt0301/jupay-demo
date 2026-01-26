import React from 'react';
import { ScreenType } from '../types';
import useNavigationWithLoading from '../hooks/useNavigationWithLoading';
import { useAppState, useAuth } from '../hooks';
import { ScreenContainer, BottomNavigation } from '../components';
import './screens.css';

/**
 * DashboardScreen Component
 * 
 * Main home screen showing account overview, balance, and quick actions.
 * Serves as the navigation hub to other app sections after login.
 * Displays account balance, recent transactions preview, and quick action buttons.
 * Uses demo data service and app context for data management.
 * 
 * Features:
 * - Account balance display with demo data
 * - Quick action buttons (Send, Receive, Pay Bills)
 * - Recent transactions preview (last 3 transactions)
 * - Navigation to other app sections
 * - Mobile-first responsive design
 * - Logout functionality
 * 
 * Requirements: 3.3, 5.3
 */
const DashboardScreen: React.FC = () => {
  const { navigateWithLoading } = useNavigationWithLoading();
  const { user, accountBalance, recentTransactions } = useAppState();
  const { logout } = useAuth();

  /**
   * Navigate to payment screen for sending money
   */
  const handleSendMoney = () => {
    navigateWithLoading(`/${ScreenType.PAYMENT}`, 'Opening payment screen...');
  };

  /**
   * Handle receive money action (demo functionality)
   */
  const handleReceiveMoney = () => {
    // In a real app, this would show QR code or payment request options
    alert('Demo: Receive money functionality would show QR code or payment request options here.');
  };

  /**
   * Handle pay bills action (demo functionality)
   */
  const handlePayBills = () => {
    // In a real app, this would navigate to bill payment screen
    alert('Demo: Pay bills functionality would show utility companies and bill payment options here.');
  };

  /**
   * Navigate to full transaction history
   */
  const handleViewAllTransactions = () => {
    navigateWithLoading(`/${ScreenType.TRANSACTIONS}`, 'Loading transaction history...');
  };

  /**
   * Navigate to profile and settings
   */
  const handleViewProfile = () => {
    navigateWithLoading(`/${ScreenType.PROFILE}`, 'Loading profile...');
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
  };

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
  const formatTransactionAmount = (transaction: any): string => {
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

  return (
    <ScreenContainer>
      <div className="dashboard-content">
        {/* Dashboard Header with User Greeting */}
        <div className="dashboard-header">
          <div className="user-greeting">
            <h1>Welcome back!</h1>
            <p className="user-name">{user?.displayName || 'User'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="logout-btn"
            aria-label="Logout"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Account Balance Card */}
        <div className="balance-card">
          <div className="balance-header">
            <h2>Account Balance</h2>
            <span className="balance-currency">{user?.currency || 'USD'}</span>
          </div>
          <div className="balance-amount">
            {formatCurrency(accountBalance, user?.currency)}
          </div>
          <div className="balance-subtitle">
            Available Balance
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button 
              onClick={handleSendMoney}
              className="action-btn send-btn"
              aria-label="Send money"
            >
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7,7 17,7 17,17"></polyline>
                </svg>
              </div>
              <span>Send</span>
            </button>
            
            <button 
              onClick={handleReceiveMoney}
              className="action-btn receive-btn"
              aria-label="Receive money"
            >
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="17" y1="7" x2="7" y2="17"></line>
                  <polyline points="17,17 7,17 7,7"></polyline>
                </svg>
              </div>
              <span>Receive</span>
            </button>
            
            <button 
              onClick={handlePayBills}
              className="action-btn bills-btn"
              aria-label="Pay bills"
            >
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <span>Pay Bills</span>
            </button>
          </div>
        </div>

        {/* Recent Transactions Preview */}
        <div className="recent-transactions">
          <div className="section-header">
            <h3>Recent Transactions</h3>
            <button 
              onClick={handleViewAllTransactions}
              className="view-all-btn"
            >
              View All
            </button>
          </div>
          
          {recentTransactions.length > 0 ? (
            <div className="transaction-preview-list">
              {recentTransactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="transaction-preview-item">
                  <div className="transaction-icon">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-description">
                      {transaction.description}
                    </div>
                    <div className="transaction-meta">
                      <span className="transaction-recipient">
                        {transaction.type === 'received' 
                          ? `From ${transaction.sender}` 
                          : `To ${transaction.recipient}`
                        }
                      </span>
                      <span className="transaction-date">
                        {transaction.timestamp.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className={`transaction-amount ${transaction.type}`}>
                    {formatTransactionAmount(transaction)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-transactions">
              <p>No recent transactions</p>
              <p className="no-transactions-subtitle">
                Your transaction history will appear here
              </p>
            </div>
          )}
        </div>
        
        {/* Navigation Actions */}
        <div className="navigation-actions">
          <button 
            onClick={handleViewProfile}
            className="nav-btn profile-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile & Settings
          </button>
        </div>
      </div>
      <BottomNavigation />
    </ScreenContainer>
  );
};

export default DashboardScreen;