import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ScreenType, type Transaction } from '../types';
import useNavigationWithLoading from '../hooks/useNavigationWithLoading';
import { useAppState } from '../hooks/useAppState';
import { ScreenContainer } from '../components';
import './screens.css';

/**
 * PaymentConfirmationScreen Component
 * 
 * Payment confirmation screen showing transaction success/failure.
 * Displays actual transaction details from the payment flow and provides
 * clear success messaging with navigation back to dashboard or transaction history.
 * 
 * Features:
 * - Displays actual transaction details from payment processing
 * - Shows success/failure status with appropriate messaging
 * - Provides transaction ID and timestamp information
 * - Includes navigation back to dashboard or view transaction history
 * - Handles cases where transaction data is not found
 * - Mobile-optimized confirmation display
 * 
 * Requirements: 5.2
 */
const PaymentConfirmationScreen: React.FC = () => {
  const { navigateWithLoading } = useNavigationWithLoading();
  const { transactions, user } = useAppState();
  const [searchParams] = useSearchParams();
  
  // State for transaction details
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load transaction details from URL parameters
   */
  useEffect(() => {
    const transactionId = searchParams.get('transactionId');
    
    if (!transactionId) {
      setError('No transaction ID provided');
      setIsLoading(false);
      return;
    }

    // Find transaction in the app state
    const foundTransaction = transactions.find(txn => txn.id === transactionId);
    
    if (foundTransaction) {
      setTransaction(foundTransaction);
      setError(null);
    } else {
      setError('Transaction not found');
    }
    
    setIsLoading(false);
  }, [searchParams, transactions]);

  /**
   * Handle navigation back to dashboard
   */
  const handleBackToDashboard = () => {
    navigateWithLoading(`/${ScreenType.DASHBOARD}`, 'Returning to dashboard...');
  };

  /**
   * Handle navigation to transaction history
   */
  const handleViewTransactions = () => {
    navigateWithLoading(`/${ScreenType.TRANSACTIONS}`, 'Loading transactions...');
  };

  /**
   * Format currency display
   */
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  /**
   * Format date and time display
   */
  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  /**
   * Get status display information
   */
  const getStatusDisplay = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return {
          icon: '✅',
          message: 'Payment Successful!',
          className: 'success'
        };
      case 'pending':
        return {
          icon: '⏳',
          message: 'Payment Processing',
          className: 'pending'
        };
      case 'failed':
        return {
          icon: '❌',
          message: 'Payment Failed',
          className: 'failed'
        };
      default:
        return {
          icon: '❓',
          message: 'Unknown Status',
          className: 'unknown'
        };
    }
  };

  /**
   * Render loading state
   */
  if (isLoading) {
    return (
      <ScreenContainer title="Payment Confirmation">
        <div className="confirmation-loading">
          <div className="loading-spinner"></div>
          <p>Loading transaction details...</p>
        </div>
      </ScreenContainer>
    );
  }

  /**
   * Render error state
   */
  if (error || !transaction) {
    return (
      <ScreenContainer title="Payment Confirmation">
        <div className="confirmation-error">
          <div className="error-icon">❌</div>
          <h2>Transaction Not Found</h2>
          <p>{error || 'Unable to load transaction details'}</p>
          
          <div className="error-actions">
            <button 
              onClick={handleBackToDashboard}
              className="btn btn--primary"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={handleViewTransactions}
              className="btn btn--secondary"
            >
              View All Transactions
            </button>
          </div>
        </div>
      </ScreenContainer>
    );
  }

  const statusDisplay = getStatusDisplay(transaction.status);

  return (
    <ScreenContainer title="Payment Confirmation">
      <div className="confirmation-content">
        {/* Status Header */}
        <div className={`confirmation-status ${statusDisplay.className}`}>
          <div className="status-icon">{statusDisplay.icon}</div>
          <h2 className="status-message">{statusDisplay.message}</h2>
          {transaction.status === 'completed' && (
            <p className="status-subtitle">
              Your payment has been processed successfully
            </p>
          )}
          {transaction.status === 'pending' && (
            <p className="status-subtitle">
              Your payment is being processed and will complete shortly
            </p>
          )}
          {transaction.status === 'failed' && (
            <p className="status-subtitle">
              Your payment could not be processed. Please try again.
            </p>
          )}
        </div>

        {/* Transaction Details */}
        <div className="confirmation-details">
          <h3>Transaction Details</h3>
          
          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value amount">
              {formatCurrency(transaction.amount, transaction.currency)}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">
              {transaction.type === 'sent' ? 'Sent to' : 
               transaction.type === 'received' ? 'Received from' : 'Paid to'}
            </span>
            <span className="detail-value">
              {transaction.recipient || transaction.sender || 'Unknown'}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Description</span>
            <span className="detail-value">{transaction.description}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value transaction-id">{transaction.id}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value">
              {formatDateTime(transaction.timestamp)}
            </span>
          </div>
          
          {transaction.category && (
            <div className="detail-row">
              <span className="detail-label">Category</span>
              <span className="detail-value">{transaction.category}</span>
            </div>
          )}
        </div>

        {/* Account Balance Update (for completed transactions) */}
        {transaction.status === 'completed' && user && (
          <div className="balance-update">
            <h3>Account Balance</h3>
            <div className="balance-info">
              <span className="balance-label">Current Balance:</span>
              <span className="balance-amount">
                {formatCurrency(user.accountBalance, user.currency)}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="confirmation-actions">
          <button 
            onClick={handleBackToDashboard}
            className="btn btn--primary"
          >
            Back to Dashboard
          </button>
          
          <button 
            onClick={handleViewTransactions}
            className="btn btn--secondary"
          >
            View Transaction History
          </button>
        </div>

        {/* Additional Information */}
        <div className="confirmation-footer">
          {transaction.status === 'completed' && (
            <div className="success-info">
              <p>
                <strong>What happens next?</strong><br />
                Your payment has been sent successfully. The recipient will be notified 
                and the funds will be available in their account immediately.
              </p>
            </div>
          )}
          
          {transaction.status === 'pending' && (
            <div className="pending-info">
              <p>
                <strong>Processing Time:</strong><br />
                Most payments complete within a few minutes. You'll receive a notification 
                once the payment is processed.
              </p>
            </div>
          )}
          
          {transaction.status === 'failed' && (
            <div className="failed-info">
              <p>
                <strong>Need Help?</strong><br />
                If you continue to experience issues, please check your payment method 
                or contact customer support.
              </p>
            </div>
          )}
          
          <div className="support-info">
            <p>
              Questions about this transaction? Contact support at{' '}
              <a href="mailto:support@jupay.com">support@jupay.com</a>
            </p>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};

export default PaymentConfirmationScreen;