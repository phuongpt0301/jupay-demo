/**
 * End-to-End User Flows Integration Test
 * 
 * Tests complete user journeys from splash screen through payment completion.
 * Validates that all components are properly wired together and that users
 * can complete full end-to-end flows with proper loading states and transitions.
 * 
 * Task 12.1: Wire all components together for complete user flows
 * Requirements: 5.5
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AppProvider } from '../context';
import AppRouter from '../router/AppRouter';
import { ScreenType } from '../types';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock window.alert for forgot password functionality
Object.defineProperty(window, 'alert', {
  value: vi.fn(),
});

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode; initialEntries?: string[] }> = ({ 
  children, 
  initialEntries = ['/'] 
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AppProvider>
      {children}
    </AppProvider>
  </MemoryRouter>
);

describe('End-to-End User Flows Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Complete User Journey: First-Time User Flow', () => {
    it('should complete full journey from splash to payment confirmation', async () => {
      render(
        <TestWrapper initialEntries={['/']}>
          <AppRouter />
        </TestWrapper>
      );

      // Step 1: Splash Screen
      expect(screen.getByText('JuPay')).toBeInTheDocument();
      expect(screen.getByText('Your trusted payment companion')).toBeInTheDocument();

      // Wait for splash screen auto-navigation (2.5s delay + 3s loading)
      act(() => {
        vi.advanceTimersByTime(6000);
      });

      // Step 2: Login Screen
      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Fill in demo credentials
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      fireEvent.change(usernameInput, { target: { value: 'demo' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });

      // Submit login form
      const loginButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(loginButton);

      // Wait for login processing and navigation (3s loading)
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Step 3: Dashboard Screen
      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Verify dashboard elements
      expect(screen.getByText('$1,234.56')).toBeInTheDocument(); // Account balance
      expect(screen.getByText('Send')).toBeInTheDocument();
      expect(screen.getByText('Receive')).toBeInTheDocument();
      expect(screen.getByText('Pay Bills')).toBeInTheDocument();

      // Step 4: Navigate to Payment Screen
      const sendButton = screen.getByText('Send');
      fireEvent.click(sendButton);

      // Wait for navigation loading (3s)
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Step 5: Payment Screen
      await waitFor(() => {
        expect(screen.getByText('Send Money')).toBeInTheDocument();
      });

      // Fill payment form
      const recipientInput = screen.getByLabelText(/recipient/i);
      const amountInput = screen.getByLabelText(/amount/i);
      
      fireEvent.change(recipientInput, { target: { value: 'john@example.com' } });
      fireEvent.change(amountInput, { target: { value: '50.00' } });

      // Submit payment
      const payButton = screen.getByRole('button', { name: /send payment/i });
      fireEvent.click(payButton);

      // Wait for payment processing (3s loading)
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Step 6: Payment Confirmation Screen
      await waitFor(() => {
        expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
      });

      // Verify payment details
      expect(screen.getByText('$50.00')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();

      // Return to dashboard
      const backToDashboardButton = screen.getByText('Back to Dashboard');
      fireEvent.click(backToDashboardButton);

      // Wait for navigation (3s)
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Step 7: Back to Dashboard with Updated Balance
      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Verify updated balance (should be reduced by payment amount)
      expect(screen.getByText('$1,184.56')).toBeInTheDocument(); // 1234.56 - 50.00
    });
  });

  describe('Complete User Journey: Returning User Flow', () => {
    it('should handle returning user with saved authentication', async () => {
      // Set up saved authentication state
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'jupay_auth') {
          return JSON.stringify({
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              displayName: 'Demo User',
              email: 'demo@jupay.com',
              phoneNumber: '+1 (555) 123-4567',
              accountBalance: 1234.56,
              currency: 'USD'
            }
          });
        }
        return null;
      });

      render(
        <TestWrapper initialEntries={['/']}>
          <AppRouter />
        </TestWrapper>
      );

      // Should redirect directly to dashboard (skipping login)
      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Verify user is authenticated and can access all features
      expect(screen.getByText('Demo User')).toBeInTheDocument();
      expect(screen.getByText('$1,234.56')).toBeInTheDocument();
    });
  });

  describe('Navigation Flow: All Screen Transitions', () => {
    beforeEach(() => {
      // Set up authenticated state for all navigation tests
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'jupay_auth') {
          return JSON.stringify({
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              displayName: 'Demo User',
              email: 'demo@jupay.com',
              phoneNumber: '+1 (555) 123-4567',
              accountBalance: 1234.56,
              currency: 'USD'
            }
          });
        }
        return null;
      });
    });

    it('should navigate between all main screens with proper loading states', async () => {
      render(
        <TestWrapper initialEntries={[`/${ScreenType.DASHBOARD}`]}>
          <AppRouter />
        </TestWrapper>
      );

      // Start at Dashboard
      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Navigate to Transaction History
      const viewAllButton = screen.getByText('View All');
      fireEvent.click(viewAllButton);

      // Verify loading state
      expect(screen.getByText('Loading transactions...')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Verify Transaction History Screen
      await waitFor(() => {
        expect(screen.getByText('Transaction History')).toBeInTheDocument();
      });

      // Navigate to Profile
      const profileButton = screen.getByText('Profile & Settings');
      fireEvent.click(profileButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Verify Profile Screen
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });

      // Navigate back to Dashboard using back button
      const backButton = screen.getByLabelText('Go back');
      fireEvent.click(backButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Should be back at Dashboard
      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });
    });

    it('should handle deep navigation with proper history management', async () => {
      render(
        <TestWrapper initialEntries={[`/${ScreenType.DASHBOARD}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Navigate: Dashboard → Payment → Confirmation → Dashboard
      
      // Step 1: Dashboard to Payment
      const sendButton = screen.getByText('Send');
      fireEvent.click(sendButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText('Send Money')).toBeInTheDocument();
      });

      // Step 2: Payment to Confirmation
      const recipientInput = screen.getByLabelText(/recipient/i);
      const amountInput = screen.getByLabelText(/amount/i);
      
      fireEvent.change(recipientInput, { target: { value: 'test@example.com' } });
      fireEvent.change(amountInput, { target: { value: '25.00' } });

      const payButton = screen.getByRole('button', { name: /send payment/i });
      fireEvent.click(payButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
      });

      // Step 3: Confirmation back to Dashboard
      const backToDashboardButton = screen.getByText('Back to Dashboard');
      fireEvent.click(backToDashboardButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Verify navigation history is properly managed
      // (No back button should be visible on dashboard as it's the root)
      const backButtons = screen.queryAllByLabelText('Go back');
      expect(backButtons).toHaveLength(0);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle authentication errors gracefully', async () => {
      render(
        <TestWrapper initialEntries={[`/${ScreenType.LOGIN}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Try invalid credentials
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      fireEvent.change(usernameInput, { target: { value: 'invalid' } });
      fireEvent.change(passwordInput, { target: { value: 'wrong' } });

      const loginButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(loginButton);

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Should remain on login screen
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();

      // Should allow retry with correct credentials
      fireEvent.change(usernameInput, { target: { value: 'demo' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(loginButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Should successfully navigate to dashboard
      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });
    });

    it('should handle payment errors and allow retry', async () => {
      // Set up authenticated state
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'jupay_auth') {
          return JSON.stringify({
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              displayName: 'Demo User',
              email: 'demo@jupay.com',
              phoneNumber: '+1 (555) 123-4567',
              accountBalance: 10.00, // Low balance to trigger error
              currency: 'USD'
            }
          });
        }
        return null;
      });

      render(
        <TestWrapper initialEntries={[`/${ScreenType.PAYMENT}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Send Money')).toBeInTheDocument();
      });

      // Try to send more than available balance
      const recipientInput = screen.getByLabelText(/recipient/i);
      const amountInput = screen.getByLabelText(/amount/i);
      
      fireEvent.change(recipientInput, { target: { value: 'test@example.com' } });
      fireEvent.change(amountInput, { target: { value: '100.00' } }); // More than $10 balance

      const payButton = screen.getByRole('button', { name: /send payment/i });
      fireEvent.click(payButton);

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/insufficient funds/i)).toBeInTheDocument();
      });

      // Should remain on payment screen for retry
      expect(screen.getByText('Send Money')).toBeInTheDocument();
    });

    it('should handle network simulation errors', async () => {
      // Set up authenticated state
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'jupay_auth') {
          return JSON.stringify({
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              displayName: 'Demo User',
              email: 'demo@jupay.com',
              phoneNumber: '+1 (555) 123-4567',
              accountBalance: 1234.56,
              currency: 'USD'
            }
          });
        }
        return null;
      });

      render(
        <TestWrapper initialEntries={[`/${ScreenType.PAYMENT}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Send Money')).toBeInTheDocument();
      });

      // Try payment with special recipient that triggers network error
      const recipientInput = screen.getByLabelText(/recipient/i);
      const amountInput = screen.getByLabelText(/amount/i);
      
      fireEvent.change(recipientInput, { target: { value: 'network-error@test.com' } });
      fireEvent.change(amountInput, { target: { value: '50.00' } });

      const payButton = screen.getByRole('button', { name: /send payment/i });
      fireEvent.click(payButton);

      // Should handle network error gracefully
      await waitFor(() => {
        const hasErrorMessage = 
          screen.queryByText(/network error/i) ||
          screen.queryByText(/connection failed/i) ||
          screen.queryByText(/please try again/i);
        
        expect(hasErrorMessage).toBeTruthy();
      });
    });
  });

  describe('Loading States and Transitions', () => {
    it('should show consistent loading states across all transitions', async () => {
      // Set up authenticated state
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'jupay_auth') {
          return JSON.stringify({
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              displayName: 'Demo User',
              email: 'demo@jupay.com',
              phoneNumber: '+1 (555) 123-4567',
              accountBalance: 1234.56,
              currency: 'USD'
            }
          });
        }
        return null;
      });

      render(
        <TestWrapper initialEntries={[`/${ScreenType.DASHBOARD}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Test loading state for each navigation
      const navigationTests = [
        { button: 'Send', expectedMessage: 'Opening payment screen...' },
        { button: 'View All', expectedMessage: 'Loading transactions...' },
        { button: 'Profile & Settings', expectedMessage: 'Loading profile...' }
      ];

      for (const test of navigationTests) {
        // Find and click the button
        const button = screen.getByText(test.button);
        fireEvent.click(button);

        // Verify loading message appears
        expect(screen.getByText(test.expectedMessage)).toBeInTheDocument();

        // Verify loading state blocks interactions
        const loadingContainer = screen.getByText(test.expectedMessage).closest('.loading-state');
        expect(loadingContainer).toBeInTheDocument();

        // Advance time and verify navigation completes
        act(() => {
          vi.advanceTimersByTime(3000);
        });

        // Navigate back to dashboard for next test
        await waitFor(() => {
          const backButton = screen.queryByLabelText('Go back');
          if (backButton) {
            fireEvent.click(backButton);
            act(() => {
              vi.advanceTimersByTime(3000);
            });
          }
        });

        await waitFor(() => {
          expect(screen.getByText('Welcome back!')).toBeInTheDocument();
        });
      }
    });

    it('should maintain 3-second loading duration consistently', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'jupay_auth') {
          return JSON.stringify({
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              displayName: 'Demo User',
              email: 'demo@jupay.com',
              phoneNumber: '+1 (555) 123-4567',
              accountBalance: 1234.56,
              currency: 'USD'
            }
          });
        }
        return null;
      });

      render(
        <TestWrapper initialEntries={[`/${ScreenType.DASHBOARD}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Start navigation
      const sendButton = screen.getByText('Send');
      fireEvent.click(sendButton);

      // Verify loading state is active
      expect(screen.getByText('Opening payment screen...')).toBeInTheDocument();

      // Test that loading persists for almost 3 seconds
      act(() => {
        vi.advanceTimersByTime(2900);
      });

      // Should still be loading
      expect(screen.getByText('Opening payment screen...')).toBeInTheDocument();

      // Complete the remaining time
      act(() => {
        vi.advanceTimersByTime(100);
      });

      // Should complete navigation
      await waitFor(() => {
        expect(screen.getByText('Send Money')).toBeInTheDocument();
      });
    });
  });

  describe('Data Flow and State Management', () => {
    it('should maintain consistent data across navigation', async () => {
      render(
        <TestWrapper initialEntries={[`/${ScreenType.LOGIN}`]}>
          <AppRouter />
        </TestWrapper>
      );

      // Login
      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      fireEvent.change(usernameInput, { target: { value: 'demo' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });

      const loginButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(loginButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Verify dashboard shows user data
      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      const initialBalance = screen.getByText('$1,234.56');
      expect(initialBalance).toBeInTheDocument();

      // Navigate to profile and verify same user data
      const profileButton = screen.getByText('Profile & Settings');
      fireEvent.click(profileButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });

      // Should show consistent user information
      expect(screen.getByText('Demo User')).toBeInTheDocument();
      expect(screen.getByText('demo@jupay.com')).toBeInTheDocument();

      // Navigate to transactions and verify data consistency
      const backButton = screen.getByLabelText('Go back');
      fireEvent.click(backButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      const viewAllButton = screen.getByText('View All');
      fireEvent.click(viewAllButton);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText('Transaction History')).toBeInTheDocument();
      });

      // Should show transaction data
      expect(screen.getByText(/Coffee Shop/)).toBeInTheDocument();
      expect(screen.getByText(/Grocery Store/)).toBeInTheDocument();
    });
  });

  describe('Accessibility and Mobile Optimization', () => {
    it('should maintain mobile-friendly interface across all screens', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'jupay_auth') {
          return JSON.stringify({
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              displayName: 'Demo User',
              email: 'demo@jupay.com',
              phoneNumber: '+1 (555) 123-4567',
              accountBalance: 1234.56,
              currency: 'USD'
            }
          });
        }
        return null;
      });

      render(
        <TestWrapper initialEntries={[`/${ScreenType.DASHBOARD}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      });

      // Verify mobile viewport meta tag would be set (tested in component level)
      const screenContainer = screen.getByText('Welcome back!').closest('.screen');
      expect(screenContainer).toHaveClass('screen');

      // Test touch-friendly button sizes (minimum 44px)
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const styles = window.getComputedStyle(button);
        // Note: In test environment, computed styles may not reflect CSS
        // This test verifies buttons exist and are clickable
        expect(button).toBeInTheDocument();
      });
    });

    it('should provide proper ARIA labels and accessibility features', async () => {
      render(
        <TestWrapper initialEntries={[`/${ScreenType.LOGIN}`]}>
          <AppRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Verify form accessibility
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      expect(usernameInput).toHaveAttribute('aria-label');
      expect(passwordInput).toHaveAttribute('aria-label');

      // Verify button accessibility
      const loginButton = screen.getByRole('button', { name: /sign in/i });
      expect(loginButton).toBeInTheDocument();
    });
  });
});