import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import WelcomeScreen from './WelcomeScreen';

// Mock the navigation hook
const mockNavigateWithLoading = vi.fn();
vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    isLoading: false,
    currentPath: '/splash',
    goBack: vi.fn(),
    isNavigationBlocked: false,
    getNavigationHistory: () => [],
    clearNavigationHistory: vi.fn(),
    cancelNavigation: vi.fn(),
    cleanup: vi.fn()
  })
}));

// Mock window.alert for Learn More functionality
const mockAlert = vi.fn();
Object.defineProperty(window, 'alert', {
  writable: true,
  value: mockAlert
});

// Wrapper component for testing
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('WelcomeScreen (Welcome Screen)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders JuPay branding correctly', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Check for main branding elements
    expect(screen.getByText('JuPay')).toBeInTheDocument();
    expect(screen.getByText('Mobile Payment Demo')).toBeInTheDocument();
  });

  it('displays logo icon', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Check for SVG logo by finding the svg element
    const logoSvg = document.querySelector('svg');
    expect(logoSvg).toBeInTheDocument();
    expect(logoSvg).toHaveAttribute('width', '80');
    expect(logoSvg).toHaveAttribute('height', '80');
  });

  it('shows welcome content after delay', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Initially no welcome content
    expect(screen.queryByText('Welcome to the Future of Payments')).not.toBeInTheDocument();

    // Fast-forward to show welcome content
    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Welcome to the Future of Payments')).toBeInTheDocument();
      expect(screen.getByText(/Experience seamless, secure, and lightning-fast/)).toBeInTheDocument();
    });
  });

  it('displays feature highlights', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Fast-forward to show welcome content
    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Bank-level Security')).toBeInTheDocument();
      expect(screen.getByText('Instant Transfers')).toBeInTheDocument();
      expect(screen.getByText('Mobile Optimized')).toBeInTheDocument();
    });
  });

  it('displays action buttons', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Fast-forward to show welcome content
    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Get Started')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });

  it('navigates to login when Get Started is clicked', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Fast-forward to show welcome content
    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      const getStartedButton = screen.getByText('Get Started');
      fireEvent.click(getStartedButton);
    });

    expect(mockNavigateWithLoading).toHaveBeenCalledWith(
      '/login',
      'Getting started...'
    );
  });

  it('shows app features when Learn More is clicked', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Fast-forward to show welcome content
    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      const learnMoreButton = screen.getByText('Learn More');
      fireEvent.click(learnMoreButton);
    });

    expect(mockAlert).toHaveBeenCalledWith(
      expect.stringContaining('JuPay Mobile Demo Features:')
    );
  });

  it('applies fade-in animation class', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    const splashContent = document.querySelector('.splash-content');
    expect(splashContent).toBeInTheDocument();

    // Initially no fade-in class
    expect(splashContent).not.toHaveClass('fade-in');

    // Fast-forward to trigger fade-in
    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(splashContent).toHaveClass('fade-in');
    });
  });

  it('does not auto-navigate (user interaction required)', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Fast-forward past any potential auto-navigation delay
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    // Navigation should not be called automatically
    expect(mockNavigateWithLoading).not.toHaveBeenCalled();
  });

  it('has proper mobile-optimized structure', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Check for proper CSS classes
    expect(document.querySelector('.screen.splash-screen')).toBeInTheDocument();
    expect(document.querySelector('.splash-content')).toBeInTheDocument();
    expect(document.querySelector('.splash-logo')).toBeInTheDocument();
    expect(document.querySelector('.logo-icon')).toBeInTheDocument();
  });

  it('cleans up timers on unmount', async () => {
    const { unmount } = await act(async () => {
      return render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Unmount before timers complete
    unmount();

    // Fast-forward past all timer delays
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    // Navigation should not be called after unmount
    expect(mockNavigateWithLoading).not.toHaveBeenCalled();
  });

  it('applies delayed fade-in animation to welcome content', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <WelcomeScreen />
        </TestWrapper>
      );
    });

    // Fast-forward to show welcome content
    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      const welcomeContent = document.querySelector('.welcome-content');
      expect(welcomeContent).toHaveClass('fade-in-delayed');
    });
  });
});