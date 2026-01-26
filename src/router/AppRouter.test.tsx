import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { ScreenType } from '../types';

/**
 * AppRouter Component Tests
 * 
 * Tests for the main router configuration including route definitions,
 * protection, and fallback handling.
 */
describe('AppRouter', () => {
  it('should render splash screen on root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    
    // Should redirect to splash screen
    expect(screen.getByText('JuPay Mobile Demo')).toBeInTheDocument();
  });

  it('should render splash screen on splash path', () => {
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.SPLASH}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('JuPay Mobile Demo')).toBeInTheDocument();
  });

  it('should render login screen on login path', () => {
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.LOGIN}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Please enter your credentials')).toBeInTheDocument();
  });

  it('should render dashboard screen on dashboard path', () => {
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.DASHBOARD}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Account Overview')).toBeInTheDocument();
  });

  it('should render payment screen on payment path', () => {
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.PAYMENT}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Send Payment')).toBeInTheDocument();
    expect(screen.getByText('Enter payment details')).toBeInTheDocument();
  });

  it('should render transactions screen on transactions path', () => {
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.TRANSACTIONS}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByText('Your recent transactions')).toBeInTheDocument();
  });

  it('should render profile screen on profile path', () => {
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.PROFILE}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Account settings and preferences')).toBeInTheDocument();
  });

  it('should render payment confirmation screen on payment confirmation path', () => {
    render(
      <MemoryRouter initialEntries={[`/${ScreenType.PAYMENT_CONFIRMATION}`]}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Payment Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Transaction completed successfully')).toBeInTheDocument();
  });

  it('should render not found screen for invalid paths', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText("The page you're looking for doesn't exist.")).toBeInTheDocument();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Go to Login')).toBeInTheDocument();
  });

  it('should have proper route structure with all screen types', () => {
    // Test that all ScreenType values have corresponding routes
    const screenTypes = Object.values(ScreenType);
    
    screenTypes.forEach(screenType => {
      render(
        <MemoryRouter initialEntries={[`/${screenType}`]}>
          <AppRouter />
        </MemoryRouter>
      );
      
      // Each screen should render without errors
      expect(document.querySelector('.screen')).toBeInTheDocument();
    });
  });
});