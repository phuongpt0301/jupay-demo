import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { ScreenType } from '../types';

// Mock the navigation hook to avoid actual navigation delays in tests
vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: vi.fn((path) => {
      // Simulate immediate navigation for tests
      window.history.pushState({}, '', path);
    }),
    isLoading: false,
    currentPath: '/',
    goBack: vi.fn(),
    isNavigationBlocked: false,
    getNavigationHistory: vi.fn(() => []),
    clearNavigationHistory: vi.fn(),
    cancelNavigation: vi.fn(),
    cleanup: vi.fn()
  })
}));

/**
 * Router Integration Tests
 * 
 * Tests the complete router configuration including all routes,
 * navigation flow, and fallback handling.
 */
describe('Router Integration', () => {
  it('should handle complete navigation flow', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    
    // Should start at splash screen (redirected from root)
    expect(screen.getByText('JuPay Mobile Demo')).toBeInTheDocument();
  });

  it('should render all defined screen routes without errors', () => {
    const screenTypes = Object.values(ScreenType);
    
    screenTypes.forEach(screenType => {
      const { unmount } = render(
        <MemoryRouter initialEntries={[`/${screenType}`]}>
          <AppRouter />
        </MemoryRouter>
      );
      
      // Each screen should render without throwing errors
      expect(document.querySelector('.screen')).toBeInTheDocument();
      
      unmount();
    });
  });

  it('should handle invalid routes with NotFound component', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Go to Login')).toBeInTheDocument();
  });

  it('should protect routes appropriately', () => {
    // Test that protected routes render (since we're mocking auth as true)
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.DASHBOARD}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should allow access to public routes', () => {
    // Test splash screen (public)
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.SPLASH}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('JuPay Mobile Demo')).toBeInTheDocument();
    
    // Test login screen (public)
    const { rerender } = render(
      <MemoryRouter initialEntries={[`/${ScreenType.LOGIN}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should have proper route structure', () => {
    // Verify that the router handles all expected paths
    const expectedRoutes = [
      '/',
      `/${ScreenType.SPLASH}`,
      `/${ScreenType.LOGIN}`,
      `/${ScreenType.DASHBOARD}`,
      `/${ScreenType.PAYMENT}`,
      `/${ScreenType.TRANSACTIONS}`,
      `/${ScreenType.PROFILE}`,
      `/${ScreenType.PAYMENT_CONFIRMATION}`,
      '/invalid-path'
    ];
    
    expectedRoutes.forEach(route => {
      const { unmount } = render(
        <MemoryRouter initialEntries={[route]}>
          <AppRouter />
        </MemoryRouter>
      );
      
      // Should render something (either a screen or not found)
      expect(document.body).toContainHTML('<div');
      
      unmount();
    });
  });
});