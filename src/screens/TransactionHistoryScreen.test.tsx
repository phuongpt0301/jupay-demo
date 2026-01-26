import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TransactionHistoryScreen from './TransactionHistoryScreen';
import { AppProvider } from '../context/AppContext';
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

describe('TransactionHistoryScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders transaction history screen with title', () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    expect(screen.getByText('Transaction History')).toBeInTheDocument();
  });

  it('displays search input and filter controls', () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    // Search input
    expect(screen.getByPlaceholderText('Search transactions...')).toBeInTheDocument();
    
    // Filter controls
    expect(screen.getByLabelText('Filter by transaction type')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by transaction status')).toBeInTheDocument();
  });

  it('displays transaction list with demo data', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    // Wait for transactions to load
    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      if (transactions.length > 0) {
        expect(screen.getByText(transactions[0].description)).toBeInTheDocument();
      }
    });
  });

  it('filters transactions by search query', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    
    // Search for a specific transaction
    fireEvent.change(searchInput, { target: { value: 'Dinner' } });

    await waitFor(() => {
      // Should show transactions containing "Dinner"
      const transactions = demoDataService.getDemoTransactions();
      const dinnerTransactions = transactions.filter(t => 
        t.description.toLowerCase().includes('dinner')
      );
      
      if (dinnerTransactions.length > 0) {
        expect(screen.getByText(dinnerTransactions[0].description)).toBeInTheDocument();
      }
    });
  });

  it('filters transactions by type', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const typeFilter = screen.getByLabelText('Filter by transaction type');
    
    // Filter by sent transactions
    fireEvent.change(typeFilter, { target: { value: 'sent' } });

    await waitFor(() => {
      // Should only show sent transactions
      const transactions = demoDataService.getDemoTransactions();
      const sentTransactions = transactions.filter(t => t.type === 'sent');
      
      if (sentTransactions.length > 0) {
        expect(screen.getByText(sentTransactions[0].description)).toBeInTheDocument();
      }
    });
  });

  it('filters transactions by status', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const statusFilter = screen.getByLabelText('Filter by transaction status');
    
    // Filter by completed transactions
    fireEvent.change(statusFilter, { target: { value: 'completed' } });

    await waitFor(() => {
      // Should only show completed transactions
      const transactions = demoDataService.getDemoTransactions();
      const completedTransactions = transactions.filter(t => t.status === 'completed');
      
      if (completedTransactions.length > 0) {
        expect(screen.getByText(completedTransactions[0].description)).toBeInTheDocument();
      }
    });
  });

  it('expands transaction details when clicked', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      if (transactions.length > 0) {
        const firstTransaction = screen.getByText(transactions[0].description);
        expect(firstTransaction).toBeInTheDocument();
        
        // Click to expand details
        const transactionRow = firstTransaction.closest('.transaction-main-row');
        if (transactionRow) {
          fireEvent.click(transactionRow);
          
          // Should show transaction details
          expect(screen.getByText('Transaction Details')).toBeInTheDocument();
          expect(screen.getByText('Transaction ID')).toBeInTheDocument();
        }
      }
    });
  });

  it('clears search when clear button is clicked', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    
    // Enter search query
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput).toHaveValue('test search');

    // Click clear button
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue('');
  });

  it('shows clear filters button when filters are active', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const typeFilter = screen.getByLabelText('Filter by transaction type');
    
    // Apply a filter
    fireEvent.change(typeFilter, { target: { value: 'sent' } });

    await waitFor(() => {
      expect(screen.getByText(/Clear Filters/)).toBeInTheDocument();
    });
  });

  it('clears all filters when clear filters button is clicked', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    const typeFilter = screen.getByLabelText('Filter by transaction type');
    const statusFilter = screen.getByLabelText('Filter by transaction status');
    
    // Apply filters
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.change(typeFilter, { target: { value: 'sent' } });
    fireEvent.change(statusFilter, { target: { value: 'completed' } });

    // Click clear filters
    const clearButton = screen.getByText(/Clear Filters/);
    fireEvent.click(clearButton);

    // All filters should be cleared
    expect(searchInput).toHaveValue('');
    expect(typeFilter).toHaveValue('all');
    expect(statusFilter).toHaveValue('all');
  });

  it('displays transaction count', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      const countText = transactions.length === 1 ? '1 transaction' : `${transactions.length} transactions`;
      expect(screen.getByText(countText)).toBeInTheDocument();
    });
  });

  it('shows no transactions message when no results found', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    
    // Search for something that won't match
    fireEvent.change(searchInput, { target: { value: 'nonexistent transaction xyz123' } });

    await waitFor(() => {
      expect(screen.getByText('No transactions found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument();
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
        const expectedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: firstTransaction.currency
        }).format(firstTransaction.amount);
        
        // Should display formatted currency (with + or - sign)
        const sign = firstTransaction.type === 'received' ? '+' : '-';
        expect(screen.getByText(`${sign}${expectedAmount}`)).toBeInTheDocument();
      }
    });
  });

  it('displays correct status badges', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
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

  it('supports keyboard navigation for transaction expansion', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      if (transactions.length > 0) {
        const firstTransaction = screen.getByText(transactions[0].description);
        const transactionRow = firstTransaction.closest('.transaction-main-row');
        
        if (transactionRow) {
          // Focus and press Enter
          transactionRow.focus();
          fireEvent.keyDown(transactionRow, { key: 'Enter' });
          
          // Should expand details
          expect(screen.getByText('Transaction Details')).toBeInTheDocument();
        }
      }
    });
  });

  it('handles empty transaction list gracefully', () => {
    // Mock empty transaction list
    vi.spyOn(demoDataService, 'getDemoTransactions').mockReturnValue([]);

    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    expect(screen.getByText('0 transactions')).toBeInTheDocument();
    expect(screen.getByText('No transactions found')).toBeInTheDocument();
    expect(screen.getByText('Your transaction history will appear here.')).toBeInTheDocument();
  });

  it('maintains accessibility with proper ARIA labels', () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    // Check for proper ARIA labels
    expect(screen.getByLabelText('Search transactions')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by transaction type')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by transaction status')).toBeInTheDocument();
  });

  it('shows transaction categories when available', async () => {
    render(
      <TestWrapper>
        <TransactionHistoryScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const transactions = demoDataService.getDemoTransactions();
      const transactionsWithCategory = transactions.filter(t => t.category);
      
      if (transactionsWithCategory.length > 0) {
        expect(screen.getByText(transactionsWithCategory[0].category!)).toBeInTheDocument();
      }
    });
  });
});