/**
 * DashboardScreen Component Tests
 * 
 * Tests for the main dashboard screen component including:
 * - Account balance display
 * - Quick action buttons
 * - Recent transactions preview
 * - Navigation functionality
 * - Mobile-first responsive design
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import DashboardScreen from './DashboardScreen';
import { AppProvider } from '../context/AppContext';
import { demoDataService } from '../services/demoDataService';

// Mock the hooks
const mockNavigateWithLoading = vi.fn();
const mockLogout = vi.fn();

vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    isLoading: false,
    goBack: vi.fn()
  })
}));

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    logout: mockLogout,
    isAuthenticated: true,
    user: demoDataService.getDemoUser(),
    isLoading: false
  })
}));

// Mock window.alert for demo functionality
const mockAlert = vi.fn();
Object.defineProperty(window, 'alert', {
  writable: true,
  value: mockAlert
});

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AppProvider>
      {children}
    </AppProvider>
  </BrowserRouter>
);

describe('DashboardScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAlert.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Rendering', () => {
    it('should render user greeting with display name', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
    });

    it('should display account balance with proper formatting', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByText('Account Balance')).toBeInTheDocument();
      expect(screen.getByText('$2,847.50')).toBeInTheDocument();
      expect(screen.getByText('Available Balance')).toBeInTheDocument();
    });

    it('should render all quick action buttons', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByRole('button', { name: /send money/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /receive money/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /pay bills/i })).toBeInTheDocument();
    });

    it('should display recent transactions section', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view all/i })).toBeInTheDocument();
    });

    it('should render logout button', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });
  });

  describe('Quick Actions', () => {
    it('should navigate to payment screen when Send button is clicked', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const sendButton = screen.getByRole('button', { name: /send money/i });
      fireEvent.click(sendButton);

      expect(mockNavigateWithLoading).toHaveBeenCalledWith(
        '/payment',
        'Opening payment screen...'
      );
    });

    it('should show demo alert when Receive button is clicked', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const receiveButton = screen.getByRole('button', { name: /receive money/i });
      fireEvent.click(receiveButton);

      expect(mockAlert).toHaveBeenCalledWith(
        'Demo: Receive money functionality would show QR code or payment request options here.'
      );
    });

    it('should show demo alert when Pay Bills button is clicked', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const billsButton = screen.getByRole('button', { name: /pay bills/i });
      fireEvent.click(billsButton);

      expect(mockAlert).toHaveBeenCalledWith(
        'Demo: Pay bills functionality would show utility companies and bill payment options here.'
      );
    });
  });

  describe('Navigation', () => {
    it('should navigate to transactions when View All is clicked', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const viewAllButton = screen.getByRole('button', { name: /view all/i });
      fireEvent.click(viewAllButton);

      expect(mockNavigateWithLoading).toHaveBeenCalledWith(
        '/transactions',
        'Loading transaction history...'
      );
    });

    it('should navigate to profile when Profile & Settings is clicked', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const profileButton = screen.getByText('Profile & Settings');
      fireEvent.click(profileButton);

      expect(mockNavigateWithLoading).toHaveBeenCalledWith(
        '/profile',
        'Loading profile...'
      );
    });

    it('should call logout when logout button is clicked', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      fireEvent.click(logoutButton);

      expect(mockLogout).toHaveBeenCalled();
    });
  });

  describe('Recent Transactions', () => {
    it('should display recent transactions when available', async () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      // Wait for transactions to load
      await waitFor(() => {
        expect(screen.getByText(/dinner split/i)).toBeInTheDocument();
      });

      // Should show transaction details
      expect(screen.getByText(/sarah chen/i)).toBeInTheDocument();
      expect(screen.getByText(/-\$125\.00/)).toBeInTheDocument();
    });

    it('should show no transactions message when no transactions exist', () => {
      // Mock empty transactions
      vi.mock('../hooks/useAppState', () => ({
        useAppState: () => ({
          user: demoDataService.getDemoUser(),
          accountBalance: 2847.50,
          recentTransactions: [],
          isLoading: false,
          loadingMessage: ''
        })
      }));

      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByText('No recent transactions')).toBeInTheDocument();
      expect(screen.getByText('Your transaction history will appear here')).toBeInTheDocument();
    });

    it('should format transaction amounts correctly based on type', async () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      await waitFor(() => {
        // Should show sent transaction with negative amount
        const sentAmounts = screen.getAllByText(/-\$/);
        expect(sentAmounts.length).toBeGreaterThan(0);

        // Should show received transaction with positive amount
        const receivedAmounts = screen.getAllByText(/\+\$/);
        expect(receivedAmounts.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Currency Formatting', () => {
    it('should format currency amounts correctly', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      // Account balance should be formatted as currency
      expect(screen.getByText('$2,847.50')).toBeInTheDocument();
    });

    it('should display currency code in balance card', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByText('USD')).toBeInTheDocument();
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should have proper mobile-friendly button sizes', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const sendButton = screen.getByRole('button', { name: /send money/i });
      const logoutButton = screen.getByRole('button', { name: /logout/i });

      // Buttons should have minimum touch target size classes
      expect(sendButton).toHaveClass('action-btn');
      expect(logoutButton).toHaveClass('logout-btn');
    });

    it('should have proper container structure for mobile layout', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const dashboardContent = document.querySelector('.dashboard-content');
      expect(dashboardContent).toBeInTheDocument();
      expect(dashboardContent).toHaveClass('dashboard-content');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for buttons', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByRole('button', { name: /send money/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /receive money/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /pay bills/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
    });
  });

  describe('Demo Data Integration', () => {
    it('should display demo user data correctly', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const demoUser = demoDataService.getDemoUser();
      expect(screen.getByText(demoUser.displayName)).toBeInTheDocument();
      expect(screen.getByText(`$${demoUser.accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`)).toBeInTheDocument();
    });

    it('should handle demo data service integration', async () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      // Should display data from demo service
      await waitFor(() => {
        const transactions = demoDataService.getDemoTransactions();
        if (transactions.length > 0) {
          expect(screen.getByText(transactions[0].description)).toBeInTheDocument();
        }
      });
    });
  });
});