/**
 * Integration Tests for Global State Management
 * 
 * Tests the integration between components and global state management
 * including authentication flow and state persistence.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context';
import LoginScreen from '../screens/LoginScreen';
import ProtectedRoute from '../components/ProtectedRoute';
import { ScreenType } from '../types';

// Mock the navigation hook to avoid router issues in tests
jest.mock('../hooks/useNavigationWithLoading', () => ({
  __esModule: true,
  default: () => ({
    navigateWithLoading: jest.fn(),
    isLoading: false,
    currentPath: '/login',
    goBack: jest.fn(),
    isNavigationBlocked: false,
    getNavigationHistory: () => [],
    clearNavigationHistory: jest.fn(),
    cancelNavigation: jest.fn(),
    cleanup: jest.fn()
  })
}));

// Mock the ScreenContainer component
jest.mock('../components', () => ({
  ScreenContainer: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div data-testid="screen-container" data-title={title}>
      {children}
    </div>
  )
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AppProvider>
      {children}
    </AppProvider>
  </BrowserRouter>
);

describe('Global State Management Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should handle authentication state in LoginScreen', async () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    // Check that login form is rendered
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Fill in demo credentials
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'demo' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'demo123' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    });
  });

  it('should handle invalid credentials', async () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    // Fill in invalid credentials
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'invalid' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'invalid' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  it('should validate required fields', async () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
});

describe('ProtectedRoute Integration', () => {
  const TestProtectedComponent = () => (
    <div data-testid="protected-content">Protected Content</div>
  );

  it('should redirect unauthenticated users', () => {
    // Mock useNavigate to capture navigation calls
    const mockNavigate = jest.fn();
    jest.doMock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      Navigate: ({ to }: { to: string }) => <div data-testid="redirect" data-to={to} />,
      useLocation: () => ({ pathname: '/dashboard' })
    }));

    render(
      <TestWrapper>
        <ProtectedRoute requireAuth={true}>
          <TestProtectedComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    // Should redirect to login
    expect(screen.getByTestId('redirect')).toHaveAttribute('data-to', `/${ScreenType.LOGIN}`);
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('should allow access for public routes', () => {
    render(
      <TestWrapper>
        <ProtectedRoute requireAuth={false}>
          <TestProtectedComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    // Should render protected content for public routes
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });
});