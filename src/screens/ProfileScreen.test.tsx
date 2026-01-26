/**
 * ProfileScreen Component Tests
 * 
 * Tests for the ProfileScreen component including user profile display,
 * settings management, help sections, and demo functionality.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ProfileScreen from './ProfileScreen';
import { AppProvider } from '../context/AppContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the navigation hook
const mockNavigateWithLoading = vi.fn();
const mockGoBack = vi.fn();

vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    goBack: mockGoBack,
    isLoading: false,
    currentPath: '/profile',
    isNavigationBlocked: false,
    getNavigationHistory: () => [],
    clearNavigationHistory: () => {},
    cancelNavigation: () => {},
    cleanup: () => {}
  })
}));

// Mock the auth hook
const mockLogout = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: {
      id: 'test-user-001',
      username: 'testuser',
      displayName: 'Test User',
      email: 'test@jupay.com',
      phoneNumber: '+1 (555) 123-4567',
      accountBalance: 1250.75,
      currency: 'USD'
    },
    isLoading: false,
    login: vi.fn(),
    logout: mockLogout,
    refreshUserData: vi.fn(),
    checkAuthStatus: () => true,
    requireAuth: () => true
  })
}));

// Mock alert for demo functionality
const mockAlert = vi.fn();
global.alert = mockAlert;

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AppProvider>
      {children}
    </AppProvider>
  </BrowserRouter>
);

describe('ProfileScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAlert.mockClear();
  });

  it('renders profile screen with user information', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Check if main elements are rendered
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@jupay.com')).toBeInTheDocument();
    expect(screen.getByText('Balance: $1,250.75')).toBeInTheDocument();
  });

  it('displays account information section', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('User ID')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
    
    // Check values
    expect(screen.getByText('test-user-001')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('displays account management section', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    expect(screen.getByText('Account Management')).toBeInTheDocument();
    expect(screen.getByText('Payment Methods')).toBeInTheDocument();
    expect(screen.getByText('Manage cards and bank accounts')).toBeInTheDocument();
    expect(screen.getByText('Transaction Limits')).toBeInTheDocument();
    expect(screen.getByText('Set spending and transfer limits')).toBeInTheDocument();
  });

  it('displays settings and preferences section', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    expect(screen.getByText('Settings & Preferences')).toBeInTheDocument();
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getByText('Biometric Authentication')).toBeInTheDocument();
    expect(screen.getByText('Auto-Lock')).toBeInTheDocument();
    expect(screen.getByText('Transaction Alerts')).toBeInTheDocument();
    expect(screen.getByText('Marketing Emails')).toBeInTheDocument();
  });

  it('displays security and privacy section', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    expect(screen.getByText('Security & Privacy')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
    expect(screen.getByText('Device Management')).toBeInTheDocument();
    expect(screen.getByText('Login History')).toBeInTheDocument();
  });

  it('displays help and support section', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    expect(screen.getByText('Help & Support')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
    expect(screen.getByText('App Tutorial')).toBeInTheDocument();
    expect(screen.getByText('Send Feedback')).toBeInTheDocument();
  });

  it('handles settings toggle functionality', async () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Find and click a toggle switch (notifications)
    const notificationToggle = screen.getByLabelText('Disable notifications');
    fireEvent.click(notificationToggle);

    // Wait for the alert to be called
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Demo: notifications setting disabled');
    });
  });

  it('handles account management actions', async () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Test payment methods action
    const paymentMethodsBtn = screen.getByText('Payment Methods');
    fireEvent.click(paymentMethodsBtn);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Demo: Payment methods management would show linked cards and bank accounts with options to add/remove.'
      );
    });
  });

  it('handles security actions', async () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Test change password action
    const changePasswordBtn = screen.getByText('Change Password');
    fireEvent.click(changePasswordBtn);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Demo: Change password form would open here with current and new password fields.'
      );
    });
  });

  it('handles help and support actions', async () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Test FAQ action
    const faqBtn = screen.getByText('FAQ');
    fireEvent.click(faqBtn);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Demo: FAQ section would open here with frequently asked questions about payments, security, and account management.'
      );
    });
  });

  it('handles edit profile action', async () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Find and click edit profile button
    const editBtn = screen.getByLabelText('Edit profile');
    fireEvent.click(editBtn);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Demo: Edit profile form would open here to update name, email, phone, and profile picture.'
      );
    });
  });

  it('handles back to dashboard navigation', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    const backBtn = screen.getByText('Back to Dashboard');
    fireEvent.click(backBtn);

    expect(mockNavigateWithLoading).toHaveBeenCalledWith('/dashboard', 'Loading dashboard...');
  });

  it('handles logout functionality', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('displays proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Check for proper ARIA labels
    expect(screen.getByLabelText('Edit profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Disable notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable biometric authentication')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Test that buttons are focusable
    const editBtn = screen.getByLabelText('Edit profile');
    editBtn.focus();
    expect(document.activeElement).toBe(editBtn);

    const logoutBtn = screen.getByText('Logout');
    logoutBtn.focus();
    expect(document.activeElement).toBe(logoutBtn);
  });

  it('displays fallback data when user is not available', () => {
    // Mock useAuth to return no user
    vi.mocked(require('../hooks/useAuth').useAuth).mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      login: vi.fn(),
      logout: mockLogout,
      refreshUserData: vi.fn(),
      checkAuthStatus: () => false,
      requireAuth: () => false
    });

    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Should display fallback values
    expect(screen.getByText('Demo User')).toBeInTheDocument();
    expect(screen.getByText('demo@jupay.com')).toBeInTheDocument();
    expect(screen.getByText('demo-user-001')).toBeInTheDocument();
  });

  it('maintains mobile-friendly touch targets', () => {
    render(
      <TestWrapper>
        <ProfileScreen />
      </TestWrapper>
    );

    // Check that buttons have minimum touch target size
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      const styles = window.getComputedStyle(button);
      const minHeight = parseInt(styles.minHeight);
      const minWidth = parseInt(styles.minWidth);
      
      // Should meet 44px minimum touch target requirement
      expect(minHeight >= 44 || minWidth >= 44).toBe(true);
    });
  });
});