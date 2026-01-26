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

        <h1>Dashboard</h1>
      </div>
      <BottomNavigation />
    </ScreenContainer>
  );
};

export default DashboardScreen;