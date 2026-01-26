import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LoginScreen from './LoginScreen';
import { DEMO_CREDENTIALS } from '../types';

// Mock the navigation hook
const mockNavigateWithLoading = vi.fn();
vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    isLoading: false,
    goBack: vi.fn(),
    isNavigationBlocked: false
  })
}));

// Mock ScreenContainer
vi.mock('../components', () => ({
  ScreenContainer: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div data-testid="screen-container" data-title={title}>
      {children}
    </div>
  )
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render login form with all required elements', () => {
      render(<LoginScreen />);
      
      expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
      expect(screen.getByText('Please enter your credentials to continue')).toBeInTheDocument();
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Forgot Password?' })).toBeInTheDocument();
    });

    it('should render demo credentials hint', () => {
      render(<LoginScreen />);
      
      expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
      expect(screen.getByText('demo')).toBeInTheDocument();
      expect(screen.getByText('demo123')).toBeInTheDocument();
    });

    it('should have proper form structure', () => {
      render(<LoginScreen />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(usernameInput).toHaveAttribute('type', 'text');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(usernameInput).toHaveAttribute('placeholder', 'Username (demo)');
      expect(passwordInput).toHaveAttribute('placeholder', 'Password (demo123)');
    });
  });

  describe('Form Validation', () => {
    it('should show error when username is empty', async () => {
      render(<LoginScreen />);
      
      const loginButton = screen.getByRole('button', { name: 'Login' });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
      });
      
      expect(mockNavigateWithLoading).not.toHaveBeenCalled();
    });

    it('should show error when password is empty', async () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      fireEvent.change(usernameInput, { target: { value: 'test' } });
      
      const loginButton = screen.getByRole('button', { name: 'Login' });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
      
      expect(mockNavigateWithLoading).not.toHaveBeenCalled();
    });

    it('should show errors for both empty fields', async () => {
      render(<LoginScreen />);
      
      const loginButton = screen.getByRole('button', { name: 'Login' });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('should clear field error when user starts typing', async () => {
      render(<LoginScreen />);
      
      // Trigger validation error
      const loginButton = screen.getByRole('button', { name: 'Login' });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
      });
      
      // Start typing in username field
      const usernameInput = screen.getByLabelText('Username');
      fireEvent.change(usernameInput, { target: { value: 'test' } });
      
      await waitFor(() => {
        expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Demo Credential Validation', () => {
    it('should show error for invalid credentials', async () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });
      
      fireEvent.change(usernameInput, { target: { value: 'wrong' } });
      fireEvent.change(passwordInput, { target: { value: 'wrong' } });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Invalid username or password/)).toBeInTheDocument();
      });
      
      expect(mockNavigateWithLoading).not.toHaveBeenCalled();
    });

    it('should navigate to dashboard with valid demo credentials', async () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });
      
      fireEvent.change(usernameInput, { target: { value: DEMO_CREDENTIALS.username } });
      fireEvent.change(passwordInput, { target: { value: DEMO_CREDENTIALS.password } });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(mockNavigateWithLoading).toHaveBeenCalledWith('/dashboard', 'Logging in...');
      });
    });

    it('should clear login error when user modifies input', async () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });
      
      // Enter invalid credentials
      fireEvent.change(usernameInput, { target: { value: 'wrong' } });
      fireEvent.change(passwordInput, { target: { value: 'wrong' } });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Invalid username or password/)).toBeInTheDocument();
      });
      
      // Modify input
      fireEvent.change(usernameInput, { target: { value: 'demo' } });
      
      await waitFor(() => {
        expect(screen.queryByText(/Invalid username or password/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Forgot Password Functionality', () => {
    it('should show alert when forgot password is clicked', () => {
      // Mock window.alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<LoginScreen />);
      
      const forgotPasswordButton = screen.getByRole('button', { name: 'Forgot Password?' });
      fireEvent.click(forgotPasswordButton);
      
      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('Demo: Password reset functionality')
      );
      
      alertSpy.mockRestore();
    });
  });

  describe('Form Submission State', () => {
    it('should disable form during submission', async () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });
      const forgotPasswordButton = screen.getByRole('button', { name: 'Forgot Password?' });
      
      fireEvent.change(usernameInput, { target: { value: DEMO_CREDENTIALS.username } });
      fireEvent.change(passwordInput, { target: { value: DEMO_CREDENTIALS.password } });
      fireEvent.click(loginButton);
      
      // Check that elements are disabled during submission
      expect(usernameInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(loginButton).toBeDisabled();
      expect(forgotPasswordButton).toBeDisabled();
      
      // Check loading state
      expect(screen.getByText('Logging in...')).toBeInTheDocument();
    });

    it('should prevent multiple submissions', async () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });
      
      fireEvent.change(usernameInput, { target: { value: DEMO_CREDENTIALS.username } });
      fireEvent.change(passwordInput, { target: { value: DEMO_CREDENTIALS.password } });
      
      // Click multiple times rapidly
      fireEvent.click(loginButton);
      fireEvent.click(loginButton);
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(mockNavigateWithLoading).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and descriptions', () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(usernameInput).toHaveAttribute('aria-label', 'Username');
      expect(passwordInput).toHaveAttribute('aria-label', 'Password');
    });

    it('should associate error messages with inputs', async () => {
      render(<LoginScreen />);
      
      const loginButton = screen.getByRole('button', { name: 'Login' });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        
        expect(usernameInput).toHaveAttribute('aria-describedby', 'username-error');
        expect(passwordInput).toHaveAttribute('aria-describedby', 'password-error');
      });
    });

    it('should have proper error message roles', async () => {
      render(<LoginScreen />);
      
      const loginButton = screen.getByRole('button', { name: 'Login' });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        const errorMessages = screen.getAllByRole('alert');
        expect(errorMessages).toHaveLength(2); // Username and password errors
      });
    });
  });

  describe('Form Behavior', () => {
    it('should submit form on Enter key press', async () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      
      fireEvent.change(usernameInput, { target: { value: DEMO_CREDENTIALS.username } });
      fireEvent.change(passwordInput, { target: { value: DEMO_CREDENTIALS.password } });
      
      // Press Enter on password field
      fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' });
      
      await waitFor(() => {
        expect(mockNavigateWithLoading).toHaveBeenCalledWith('/dashboard', 'Logging in...');
      });
    });

    it('should have proper autocomplete attributes', () => {
      render(<LoginScreen />);
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(usernameInput).toHaveAttribute('autocomplete', 'username');
      expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
    });
  });
});