import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AppProvider } from '../context/AppContext';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import { demoDataService } from '../services/demoDataService';

// Mock the navigation hook
const mockNavigateWithLoading = vi.fn();
const mockGoBack = vi.fn();

vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    goBack: mockGoBack,
    isLoading: false,
    currentPath: '/transactions',
    isNavigationBlocked: false,
    getNavigationHistory: () => ['/dashboard', '/transactions'],
    clearNavigationHistory: vi.fn(),
    cancelNavigation: vi.fn(),
    cleanup: vi.fn()
  })
}));

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AppProvider>
      {children}
    </AppProvider>
  </BrowserRouter>
);

describe('TransactionHistoryScreen Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('integrates with app context and displays transactions', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    // Should display the screen title
    expect(screen.getByText('Transaction History')).toBeInTheDocument();

    // Should display search and filter controls
    expect(screen.getByPlaceholderText('Search transactions...')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by transaction type')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by transaction status')).toBeInTheDocument();

    // Should display transaction count
    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      const countText = transactions.length === 1 ? '1 transaction' : `${transactions.length} transactions`;
      expect(screen.getByText(countText)).toBeInTheDocument();
    });
  });

  it('handles back navigation correctly', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    // Find and click the back button (should be in ScreenContainer)
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    // Should call the goBack function
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('displays demo transaction data correctly', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      
      // Should display at least some transactions
      expect(transactions.length).toBeGreaterThan(0);
      
      // Should display the first transaction
      if (transactions.length > 0) {
        expect(screen.getByText(transactions[0].description)).toBeInTheDocument();
      }
    });
  });

  it('filters work with demo data', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const typeFilter = screen.getByLabelText('Filter by transaction type');
    
    // Filter by sent transactions
    fireEvent.change(typeFilter, { target: { value: 'sent' } });

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      const sentTransactions = transactions.filter(t => t.type === 'sent');
      
      // Should show correct count for sent transactions
      if (sentTransactions.length > 0) {
        const countText = sentTransactions.length === 1 ? '1 transaction' : `${sentTransactions.length} transactions`;
        expect(screen.getByText(countText)).toBeInTheDocument();
      }
    });
  });

  it('search functionality works with demo data', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    
    // Search for a common term that should exist in demo data
    fireEvent.change(searchInput, { target: { value: 'payment' } });

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      const matchingTransactions = transactions.filter(t => 
        t.description.toLowerCase().includes('payment') ||
        t.recipient?.toLowerCase().includes('payment') ||
        t.sender?.toLowerCase().includes('payment')
      );
      
      // Should show filtered results
      if (matchingTransactions.length > 0) {
        expect(screen.getByText(matchingTransactions[0].description)).toBeInTheDocument();
      } else {
        // If no matches, should show "no transactions found"
        expect(screen.getByText('No transactions found')).toBeInTheDocument();
      }
    });
  });

  it('transaction expansion works correctly', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      if (transactions.length > 0) {
        const firstTransactionDescription = screen.getByText(transactions[0].description);
        const transactionRow = firstTransactionDescription.closest('.transaction-main-row');
        
        if (transactionRow) {
          // Click to expand
          fireEvent.click(transactionRow);
          
          // Should show expanded details
          expect(screen.getByText('Transaction Details')).toBeInTheDocument();
          expect(screen.getByText('Transaction ID')).toBeInTheDocument();
          expect(screen.getByText(transactions[0].id)).toBeInTheDocument();
        }
      }
    });
  });

  it('handles empty search results gracefully', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    
    // Search for something that definitely won't exist
    fireEvent.change(searchInput, { target: { value: 'nonexistent_transaction_xyz_123' } });

    await waitFor(() => {
      expect(screen.getByText('No transactions found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument();
    });
  });

  it('clear filters functionality works', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    const typeFilter = screen.getByLabelText('Filter by transaction type');
    
    // Apply some filters
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.change(typeFilter, { target: { value: 'sent' } });

    // Should show clear filters button
    await waitFor(() => {
      expect(screen.getByText(/Clear Filters/)).toBeInTheDocument();
    });

    // Click clear filters
    const clearButton = screen.getByText(/Clear Filters/);
    fireEvent.click(clearButton);

    // Filters should be cleared
    expect(searchInput).toHaveValue('');
    expect(typeFilter).toHaveValue('all');
  });

  it('displays correct transaction status badges', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      
      // Check for different status badges
      const completedTransactions = transactions.filter(t => t.status === 'completed');
      const pendingTransactions = transactions.filter(t => t.status === 'pending');
      const failedTransactions = transactions.filter(t => t.status === 'failed');

      if (completedTransactions.length > 0) {
        expect(screen.getByText('Completed')).toBeInTheDocument();
      }
      if (pendingTransactions.length > 0) {
        expect(screen.getByText('Pending')).toBeInTheDocument();
      }
      if (failedTransactions.length > 0) {
        expect(screen.getByText('Failed')).toBeInTheDocument();
      }
    });
  });

  it('formats currency amounts correctly', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      if (transactions.length > 0) {
        const firstTransaction = transactions[0];
        
        // Should format currency with proper sign
        const expectedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: firstTransaction.currency
        }).format(firstTransaction.amount);
        
        const sign = firstTransaction.type === 'received' ? '+' : '-';
        expect(screen.getByText(`${sign}${expectedAmount}`)).toBeInTheDocument();
      }
    });
  });
});