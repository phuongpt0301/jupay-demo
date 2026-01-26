/**
 * PaymentConfirmationScreen Component Tests
 * 
 * Tests for the payment confirmation screen component including:
 * - Transaction details display
 * - Success/failure status handling
 * - Navigation functionality
 * - Error states and loading states
 * - Mobile responsiveness
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import PaymentConfirmationScreen from './PaymentConfirmationScreen';
import { AppProvider } from '../context/AppContext';
import type { Transaction } from '../types';

// Mock the navigation hook
const mockNavigateWithLoading = vi.fn();
vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    isLoading: false,
    currentPath: '/payment-confirmation',
    goBack: vi.fn(),
    isNavigationBlocked: false,
    getNavigationHistory: () => [],
    clearNavigationHistory: vi.fn(),
    cancelNavigation: vi.fn(),
    cleanup: vi.fn()
  })
}));

// Mock the app state hook
const mockAppState = {
  user: {
    id: 'user_001',
    username: 'testuser',
    displayName: 'Test User',
    email: 'test@example.com',
    phoneNumber: '+1234567890',
    accountBalance: 1500.00,
    currency: 'USD'
  },
  isAuthenticated: true,
  accountBalance: 1500.00,
  isLoading: false,
  loadingMessage: '',
  currentScreen: 'payment-confirmation' as const,
  navigationHistory: [],
  canGoBack: true,
  transactions: [],
  recentTransactions: [],
  paymentMethods: [],
  defaultPaymentMethod: undefined,
  setLoading: vi.fn(),
  addTransaction: vi.fn(),
  setCurrentScreen: vi.fn(),
  addToNavigationHistory: vi.fn(),
  goBack: vi.fn(),
  resetAppState: vi.fn(),
  getTransactionsByType: vi.fn(),
  getRecentTransactions: vi.fn()
};

vi.mock('../hooks/useAppState', () => ({
  useAppState: () => mockAppState
}));

// Test transaction data
const mockTransaction: Transaction = {
  id: 'txn_test_001',
  type: 'sent',
  amount: 100.00,
  currency: 'USD',
  recipient: 'John Doe',
  description: 'Test payment',
  timestamp: new Date('2024-01-15T10:30:00Z'),
  status: 'completed',
  category: 'Transfer'
};

const mockPendingTransaction: Transaction = {
  ...mockTransaction,
  id: 'txn_test_002',
  status: 'pending'
};

const mockFailedTransaction: Transaction = {
  ...mockTransaction,
  id: 'txn_test_003',
  status: 'failed'
};

// Helper function to render component with router and context
const renderWithProviders = (initialEntries: string[] = ['/payment-confirmation']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppProvider>
        <PaymentConfirmationScreen />
      </AppProvider>
    </MemoryRouter>
  );
};

describe('PaymentConfirmationScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock app state
    mockAppState.transactions = [];
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading state initially', () => {
      renderWithProviders(['/payment-confirmation']);
      
      expect(screen.getByText('Loading transaction details...')).toBeInTheDocument();
      expect(screen.getByText('Payment Confirmation')).toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    it('should display error when no transaction ID is provided', async () => {
      renderWithProviders(['/payment-confirmation']);
      
      await waitFor(() => {
        expect(screen.getByText('Transaction Not Found')).toBeInTheDocument();
        expect(screen.getByText('No transaction ID provided')).toBeInTheDocument();
      });
    });

    it('should display error when transaction is not found', async () => {
      mockAppState.transactions = [mockTransaction];
      renderWithProviders(['/payment-confirmation?transactionId=nonexistent']);
      
      await waitFor(() => {
        expect(screen.getByText('Transaction Not Found')).toBeInTheDocument();
        expect(screen.getByText('Transaction not found')).toBeInTheDocument();
      });
    });

    it('should provide navigation options in error state', async () => {
      renderWithProviders(['/payment-confirmation']);
      
      await waitFor(() => {
        expect(screen.getByText('Back to Dashboard')).toBeInTheDocument();
        expect(screen.getByText('View All Transactions')).toBeInTheDocument();
      });
    });
  });

  describe('Successful Transaction Display', () => {
    beforeEach(() => {
      mockAppState.transactions = [mockTransaction];
    });

    it('should display successful transaction details', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
        expect(screen.getByText('Your payment has been processed successfully')).toBeInTheDocument();
      });
    });

    it('should display transaction amount correctly', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('$100.00')).toBeInTheDocument();
      });
    });

    it('should display recipient information', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Sent to')).toBeInTheDocument();
      });
    });

    it('should display transaction description', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('Test payment')).toBeInTheDocument();
      });
    });

    it('should display transaction ID', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('txn_test_001')).toBeInTheDocument();
      });
    });

    it('should display formatted date and time', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        // Check for formatted date (format may vary by locale)
        expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument();
      });
    });

    it('should display category when available', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('Transfer')).toBeInTheDocument();
      });
    });

    it('should display current account balance', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('Current Balance:')).toBeInTheDocument();
        expect(screen.getByText('$1,500.00')).toBeInTheDocument();
      });
    });

    it('should display success information', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText('What happens next?')).toBeInTheDocument();
        expect(screen.getByText(/Your payment has been sent successfully/)).toBeInTheDocument();
      });
    });
  });

  describe('Pending Transaction Display', () => {
    beforeEach(() => {
      mockAppState.transactions = [mockPendingTransaction];
    });

    it('should display pending transaction status', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_002']);
      
      await waitFor(() => {
        expect(screen.getByText('Payment Processing')).toBeInTheDocument();
        expect(screen.getByText('Your payment is being processed and will complete shortly')).toBeInTheDocument();
      });
    });

    it('should display pending information', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_002']);
      
      await waitFor(() => {
        expect(screen.getByText('Processing Time:')).toBeInTheDocument();
        expect(screen.getByText(/Most payments complete within a few minutes/)).toBeInTheDocument();
      });
    });

    it('should not display account balance for pending transactions', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_002']);
      
      await waitFor(() => {
        expect(screen.queryByText('Account Balance')).not.toBeInTheDocument();
      });
    });
  });

  describe('Failed Transaction Display', () => {
    beforeEach(() => {
      mockAppState.transactions = [mockFailedTransaction];
    });

    it('should display failed transaction status', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_003']);
      
      await waitFor(() => {
        expect(screen.getByText('Payment Failed')).toBeInTheDocument();
        expect(screen.getByText('Your payment could not be processed. Please try again.')).toBeInTheDocument();
      });
    });

    it('should display failure information', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_003']);
      
      await waitFor(() => {
        expect(screen.getByText('Need Help?')).toBeInTheDocument();
        expect(screen.getByText(/If you continue to experience issues/)).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      mockAppState.transactions = [mockTransaction];
    });

    it('should navigate back to dashboard when button is clicked', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        const backButton = screen.getByText('Back to Dashboard');
        fireEvent.click(backButton);
      });
      
      expect(mockNavigateWithLoading).toHaveBeenCalledWith('/dashboard', 'Returning to dashboard...');
    });

    it('should navigate to transaction history when button is clicked', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        const historyButton = screen.getByText('View Transaction History');
        fireEvent.click(historyButton);
      });
      
      expect(mockNavigateWithLoading).toHaveBeenCalledWith('/transactions', 'Loading transactions...');
    });

    it('should handle error state navigation', async () => {
      renderWithProviders(['/payment-confirmation']);
      
      await waitFor(() => {
        const backButton = screen.getByText('Back to Dashboard');
        fireEvent.click(backButton);
      });
      
      expect(mockNavigateWithLoading).toHaveBeenCalledWith('/dashboard', 'Returning to dashboard...');
    });
  });

  describe('Support Information', () => {
    beforeEach(() => {
      mockAppState.transactions = [mockTransaction];
    });

    it('should display support contact information', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByText(/Questions about this transaction/)).toBeInTheDocument();
        expect(screen.getByText('support@jupay.com')).toBeInTheDocument();
      });
    });

    it('should have clickable support email link', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        const emailLink = screen.getByText('support@jupay.com');
        expect(emailLink).toHaveAttribute('href', 'mailto:support@jupay.com');
      });
    });
  });

  describe('Currency Formatting', () => {
    it('should format different currencies correctly', async () => {
      const eurTransaction = {
        ...mockTransaction,
        id: 'txn_eur_001',
        currency: 'EUR',
        amount: 85.50
      };
      
      mockAppState.transactions = [eurTransaction];
      mockAppState.user!.currency = 'EUR';
      
      renderWithProviders(['/payment-confirmation?transactionId=txn_eur_001']);
      
      await waitFor(() => {
        // Note: Currency formatting may vary by locale, but should include the amount
        expect(screen.getByText(/85\.50/)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockAppState.transactions = [mockTransaction];
    });

    it('should have proper heading structure', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Payment Confirmation' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Payment Successful!' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Transaction Details' })).toBeInTheDocument();
      });
    });

    it('should have accessible buttons', async () => {
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        const backButton = screen.getByRole('button', { name: 'Back to Dashboard' });
        const historyButton = screen.getByRole('button', { name: 'View Transaction History' });
        
        expect(backButton).toBeInTheDocument();
        expect(historyButton).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle transaction without category', async () => {
      const transactionWithoutCategory = {
        ...mockTransaction,
        id: 'txn_no_category',
        category: undefined
      };
      
      mockAppState.transactions = [transactionWithoutCategory];
      renderWithProviders(['/payment-confirmation?transactionId=txn_no_category']);
      
      await waitFor(() => {
        expect(screen.queryByText('Category')).not.toBeInTheDocument();
      });
    });

    it('should handle transaction without recipient', async () => {
      const transactionWithoutRecipient = {
        ...mockTransaction,
        id: 'txn_no_recipient',
        recipient: undefined,
        type: 'received' as const,
        sender: 'Jane Smith'
      };
      
      mockAppState.transactions = [transactionWithoutRecipient];
      renderWithProviders(['/payment-confirmation?transactionId=txn_no_recipient']);
      
      await waitFor(() => {
        expect(screen.getByText('Received from')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });

    it('should handle user without account balance', async () => {
      mockAppState.user = null;
      mockAppState.transactions = [mockTransaction];
      
      renderWithProviders(['/payment-confirmation?transactionId=txn_test_001']);
      
      await waitFor(() => {
        expect(screen.queryByText('Account Balance')).not.toBeInTheDocument();
      });
    });
  });
});