/**
 * Tests for App Context and Global State Management
 * 
 * Unit tests for the global app state management system including
 * authentication, user data, transactions, and loading states.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useAppContext, appActions } from './AppContext';
import { ScreenType } from '../types';

// Test component that uses the context
const TestComponent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  return (
    <div>
      <div data-testid="auth-status">
        {state.isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="user-name">
        {state.user?.displayName || 'no-user'}
      </div>
      <div data-testid="loading-status">
        {state.isLoading ? 'loading' : 'not-loading'}
      </div>
      <div data-testid="loading-message">
        {state.loadingMessage}
      </div>
      <div data-testid="current-screen">
        {state.currentScreen}
      </div>
      <div data-testid="transaction-count">
        {state.transactions.length}
      </div>
      <button 
        data-testid="set-user-btn"
        onClick={() => dispatch(appActions.setUser({
          id: 'test-user',
          username: 'testuser',
          displayName: 'Test User',
          email: 'test@example.com',
          phoneNumber: '+1234567890',
          accountBalance: 1000,
          currency: 'USD'
        }))}
      >
        Set User
      </button>
      <button 
        data-testid="set-loading-btn"
        onClick={() => dispatch(appActions.setLoading(true, 'Test loading...'))}
      >
        Set Loading
      </button>
      <button 
        data-testid="clear-user-btn"
        onClick={() => dispatch(appActions.clearUser())}
      >
        Clear User
      </button>
    </div>
  );
};

describe('AppContext', () => {
  const renderWithProvider = () => {
    return render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should provide initial state', () => {
    renderWithProvider();
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('no-user');
    expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
    expect(screen.getByTestId('current-screen')).toHaveTextContent(ScreenType.SPLASH);
  });

  it('should handle user authentication', () => {
    renderWithProvider();
    
    act(() => {
      screen.getByTestId('set-user-btn').click();
    });
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
  });

  it('should handle loading state', () => {
    renderWithProvider();
    
    act(() => {
      screen.getByTestId('set-loading-btn').click();
    });
    
    expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');
    expect(screen.getByTestId('loading-message')).toHaveTextContent('Test loading...');
  });

  it('should handle user logout', () => {
    renderWithProvider();
    
    // First set a user
    act(() => {
      screen.getByTestId('set-user-btn').click();
    });
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    
    // Then clear the user
    act(() => {
      screen.getByTestId('clear-user-btn').click();
    });
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('no-user');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAppContext must be used within an AppProvider');
    
    consoleSpy.mockRestore();
  });

  it('should initialize with demo data', async () => {
    renderWithProvider();
    
    // Wait for demo data to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    // Should have some transactions loaded from demo data
    const transactionCount = screen.getByTestId('transaction-count');
    expect(parseInt(transactionCount.textContent || '0')).toBeGreaterThan(0);
  });
});

describe('appActions', () => {
  it('should create correct action objects', () => {
    const user = {
      id: 'test-user',
      username: 'testuser',
      displayName: 'Test User',
      email: 'test@example.com',
      phoneNumber: '+1234567890',
      accountBalance: 1000,
      currency: 'USD'
    };

    expect(appActions.setUser(user)).toEqual({
      type: 'SET_USER',
      payload: user
    });

    expect(appActions.clearUser()).toEqual({
      type: 'CLEAR_USER'
    });

    expect(appActions.setLoading(true, 'Loading...')).toEqual({
      type: 'SET_LOADING',
      payload: { isLoading: true, message: 'Loading...' }
    });

    expect(appActions.setCurrentScreen(ScreenType.DASHBOARD)).toEqual({
      type: 'SET_CURRENT_SCREEN',
      payload: ScreenType.DASHBOARD
    });
  });
});