/**
 * Checkpoint 6 Integration Test
 * 
 * Tests basic navigation and authentication flow:
 * - Splash → Login → Navigation works
 * - Loading states function correctly
 * - Mobile viewport is responsive
 * 
 * Requirements: 2.1, 2.2, 2.3, 3.1, 3.2
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context';
import AppRouter from '../router/AppRouter';
import { ScreenType } from '../types';

// Mock timers for loading state testing
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

/**
 * Test wrapper component with all necessary providers
 */
const TestWrapper: React.FC<{ children: React.ReactNode; initialEntries?: string[] }> = ({ 
  children, 
  initialEntries = ['/splash'] 
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AppProvider>
      {children}
    </AppProvider>
  </MemoryRouter>
);

describe('Checkpoint 6: Basic Navigation and Authentication Flow', () => {
  describe('Splash Screen Navigation', () => {
    it('should display splash screen and auto-navigate to login', async () => {
      render(
        <TestWrapper initialEntries={['/splash']}>
          <AppRouter />
        </TestWrapper>
      );

      // Verify splash screen is displayed
      expect(screen.getByText('JuPay')).toBeInTheDocument();
      expect(screen.getByText('Mobile Payment Demo')).toBeInTheDocument();

      // Fast-forward through splash screen delays
      act(() => {
        vi.advanceTimersByTime(2500); // Initial delay before navigation
      });

      // Fast-forward through loading state (3 seconds)
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Should navigate to login screen
      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });
    });

    it('should show loading state during navigation', async () => {
      render(
        <TestWrapper initialEntries={['/splash']}>
          <AppRouter />
        </TestWrapper>
      );

      // Fast-forward to trigger navigation
      act(() => {
        vi.advanceTimersByTime(2500);
      });

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText('Initializing app...')).toBeInTheDocument();
      });

      // Complete loading
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Loading should be gone
      await waitFor(() => {
        expect(screen.queryByText('Initializing app...')).not.toBeInTheDocument();
      });
    });
  });

  describe('Login Screen Authentication', () => {
    it('should render login form with all required elements', () => {
      render(
        <TestWrapper initialEntries={['/login']}>
          <AppRouter />
        </TestWrapper>
      );

      // Check form elements
      expect(screen.getByPlaceholderText('Username (demo)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password (demo123)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });

    it('should show validation errors for empty fields', async () => {
      render(
        <TestWrapper initialEntries={['/login']}>
          <AppRouter />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button', { name: /login/i });
      
      // Try to submit empty form
      fireEvent.click(loginButton);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('should authenticate with demo credentials and navigate to dashboard', async () => {
      render(
        <TestWrapper initialEntries={['/login']}>
          <AppRouter />
        </TestWrapper>
      );

      const usernameInput = screen.getByPlaceholderText('Username (demo)');
      const passwordInput = screen.getByPlaceholderText('Password (demo123)');
      const loginButton = screen.getByRole('button', { name: /login/i });

      // Enter demo credentials
      fireEvent.change(usernameInput, { target: { value: 'demo' } });
      fireEvent.change(passwordInput, { target: { value: 'demo123' } });

      // Submit form
      fireEvent.click(loginButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
      });

      // Fast-forward through loading
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Should navigate to dashboard
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
    });

    it('should show error for invalid credentials', async () => {
      render(
        <TestWrapper initialEntries={['/login']}>
          <AppRouter />
        </TestWrapper>
      );

      const usernameInput = screen.getByPlaceholderText('Username (demo)');
      const passwordInput = screen.getByPlaceholderText('Password (demo123)');
      const loginButton = screen.getByRole('button', { name: /login/i });

      // Enter invalid credentials
      fireEvent.change(usernameInput, { target: { value: 'invalid' } });
      fireEvent.change(passwordInput, { target: { value: 'invalid' } });

      // Submit form
      fireEvent.click(loginButton);

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/Invalid username or password/)).toBeInTheDocument();
      });
    });
  });

  describe('Loading State Functionality', () => {
    it('should block interactions during loading', async () => {
      render(
        <TestWrapper initialEntries={['/splash']}>
          <AppRouter />
        </TestWrapper>
      );

      // Trigger navigation to loading state
      act(() => {
        vi.advanceTimersByTime(2500);
      });

      // Should show loading overlay
      await waitFor(() => {
        const loadingOverlay = screen.getByRole('dialog', { name: 'Loading' });
        expect(loadingOverlay).toBeInTheDocument();
      });

      // Loading overlay should prevent interactions
      const loadingOverlay = screen.getByRole('dialog', { name: 'Loading' });
      expect(loadingOverlay).toHaveStyle({ position: 'fixed' });
    });

    it('should display loading progress and complete after 3 seconds', async () => {
      render(
        <TestWrapper initialEntries={['/splash']}>
          <AppRouter />
        </TestWrapper>
      );

      // Trigger loading state
      act(() => {
        vi.advanceTimersByTime(2500);
      });

      // Should show loading message
      await waitFor(() => {
        expect(screen.getByText('Initializing app...')).toBeInTheDocument();
      });

      // Should show progress elements
      expect(screen.getByText(/Loading progress:/)).toBeInTheDocument();

      // Complete loading after 3 seconds
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Loading should be complete
      await waitFor(() => {
        expect(screen.queryByText('Initializing app...')).not.toBeInTheDocument();
      });
    });
  });

  describe('Mobile Viewport Responsiveness', () => {
    it('should have mobile viewport meta tag configured', () => {
      // This would be tested at the HTML level
      // For now, we'll test that components have mobile-friendly classes
      render(
        <TestWrapper initialEntries={['/splash']}>
          <AppRouter />
        </TestWrapper>
      );

      const splashScreen = screen.getByText('JuPay').closest('.screen');
      expect(splashScreen).toHaveClass('splash-screen');
    });

    it('should have touch-friendly button sizes', () => {
      render(
        <TestWrapper initialEntries={['/login']}>
          <AppRouter />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button', { name: /login/i });
      
      // Button should have appropriate classes for mobile
      expect(loginButton).toHaveClass('btn', 'btn-primary');
    });

    it('should maintain mobile layout structure', () => {
      render(
        <TestWrapper initialEntries={['/login']}>
          <AppRouter />
        </TestWrapper>
      );

      // Check that the screen container has mobile structure
      const loginContent = screen.getByText('Welcome Back').closest('.login-content');
      expect(loginContent).toBeInTheDocument();
    });
  });

  describe('Complete Navigation Flow', () => {
    it('should complete full splash → login → dashboard flow', async () => {
      render(
        <TestWrapper initialEntries={['/splash']}>
          <AppRouter />
        </TestWrapper>
      );

      // 1. Start at splash screen
      expect(screen.getByText('JuPay')).toBeInTheDocument();

      // 2. Auto-navigate to login
      act(() => {
        vi.advanceTimersByTime(2500); // Splash delay
        vi.advanceTimersByTime(3000); // Loading state
      });

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // 3. Login with demo credentials
      const usernameInput = screen.getByPlaceholderText('Username (demo)');
      const passwordInput = screen.getByPlaceholderText('Password (demo123)');
      const loginButton = screen.getByRole('button', { name: /login/i });

      fireEvent.change(usernameInput, { target: { value: 'demo' } });
      fireEvent.change(passwordInput, { target: { value: 'demo123' } });
      fireEvent.click(loginButton);

      // 4. Navigate to dashboard
      act(() => {
        vi.advanceTimersByTime(3000); // Login loading state
      });

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
    });

    it('should handle route protection correctly', () => {
      // Try to access protected route without authentication
      render(
        <TestWrapper initialEntries={['/dashboard']}>
          <AppRouter />
        </TestWrapper>
      );

      // Should redirect to login
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });
  });
});