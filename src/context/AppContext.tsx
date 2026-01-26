/**
 * Global App State Management using React Context
 * 
 * This file implements the global application state management system using React Context API.
 * It provides authentication state tracking, user data management, transaction management,
 * and loading state coordination across the entire application.
 * 
 * Requirements: 4.4, 6.4
 */

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type {
  AppState,
  AppAction,
  AppContextType,
  User,
  Transaction,
  PaymentMethod,
  ScreenType
} from '../types';
import { ScreenType as ScreenTypeEnum } from '../types';
import { demoDataService } from '../services/demoDataService';

// ============================================================================
// Initial State
// ============================================================================

/**
 * Initial application state
 */
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  currentScreen: ScreenTypeEnum.SPLASH,
  isLoading: false,
  loadingMessage: '',
  transactions: [],
  paymentMethods: [],
  navigationHistory: []
};

// ============================================================================
// App Reducer
// ============================================================================

/**
 * App state reducer function
 * Handles all state updates through dispatched actions
 */
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };

    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        transactions: [],
        paymentMethods: []
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loadingMessage: action.payload.message || ''
      };

    case 'SET_CURRENT_SCREEN':
      return {
        ...state,
        currentScreen: action.payload
      };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        navigationHistory: [...state.navigationHistory, action.payload]
      };

    case 'GO_BACK':
      const newHistory = [...state.navigationHistory];
      const previousScreen = newHistory.pop();
      return {
        ...state,
        navigationHistory: newHistory,
        currentScreen: previousScreen || ScreenTypeEnum.DASHBOARD
      };

    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };

    case 'UPDATE_USER_BALANCE':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          accountBalance: action.payload
        } : null
      };

    case 'SET_PAYMENT_METHODS':
      return {
        ...state,
        paymentMethods: action.payload
      };

    case 'RESET_STATE':
      return {
        ...initialState
      };

    case 'SET_INITIALIZED':
      return {
        ...state,
        isInitialized: action.payload
      };

    default:
      return state;
  }
};

// ============================================================================
// Context Creation
// ============================================================================

/**
 * App Context for global state management
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

// ============================================================================
// App Provider Component
// ============================================================================

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider Component
 * 
 * Provides global application state to all child components.
 * Manages authentication, user data, transactions, and loading states.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize demo data when the app starts
  useEffect(() => {
    const initializeDemoData = () => {
      try {
        // Load demo transactions and payment methods
        const transactions = demoDataService.getDemoTransactions();
        const paymentMethods = demoDataService.getDemoPaymentMethods();
        
        dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
        dispatch({ type: 'SET_PAYMENT_METHODS', payload: paymentMethods });
      } catch (error) {
        console.error('Failed to initialize demo data:', error);
      }
    };

    initializeDemoData();
  }, []);

  // Persist authentication state to localStorage
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem('jupay_auth', JSON.stringify({
        isAuthenticated: true,
        user: state.user
      }));
    } else {
      localStorage.removeItem('jupay_auth');
    }
  }, [state.isAuthenticated, state.user]);

  // Restore authentication state from localStorage on app start
  useEffect(() => {
    const restoreAuthState = () => {
      try {
        const savedAuth = localStorage.getItem('jupay_auth');
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          if (authData.isAuthenticated && authData.user) {
            dispatch({ type: 'SET_USER', payload: authData.user });

            // Reload demo data for authenticated user
            const transactions = demoDataService.getDemoTransactions();
            const paymentMethods = demoDataService.getDemoPaymentMethods();
            dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
            dispatch({ type: 'SET_PAYMENT_METHODS', payload: paymentMethods });
          }
        }
      } catch (error) {
        console.error('Failed to restore authentication state:', error);
        localStorage.removeItem('jupay_auth');
      } finally {
        // Mark initialization as complete
        dispatch({ type: 'SET_INITIALIZED', payload: true });
      }
    };

    restoreAuthState();
  }, []);

  const contextValue: AppContextType = {
    state,
    dispatch
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// ============================================================================
// Custom Hook for Using App Context
// ============================================================================

/**
 * Custom hook to use the App Context
 * Provides type-safe access to global app state and dispatch function
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
};

// ============================================================================
// Action Creators (Helper Functions)
// ============================================================================

/**
 * Helper functions to create typed actions for common operations
 */
export const appActions = {
  /**
   * Set user and mark as authenticated
   */
  setUser: (user: User): AppAction => ({
    type: 'SET_USER',
    payload: user
  }),

  /**
   * Clear user and mark as unauthenticated
   */
  clearUser: (): AppAction => ({
    type: 'CLEAR_USER'
  }),

  /**
   * Set loading state with optional message
   */
  setLoading: (isLoading: boolean, message?: string): AppAction => ({
    type: 'SET_LOADING',
    payload: { isLoading, message }
  }),

  /**
   * Set current screen
   */
  setCurrentScreen: (screen: ScreenType): AppAction => ({
    type: 'SET_CURRENT_SCREEN',
    payload: screen
  }),

  /**
   * Add screen to navigation history
   */
  addToHistory: (screen: ScreenType): AppAction => ({
    type: 'ADD_TO_HISTORY',
    payload: screen
  }),

  /**
   * Go back to previous screen
   */
  goBack: (): AppAction => ({
    type: 'GO_BACK'
  }),

  /**
   * Set all transactions
   */
  setTransactions: (transactions: Transaction[]): AppAction => ({
    type: 'SET_TRANSACTIONS',
    payload: transactions
  }),

  /**
   * Add a new transaction
   */
  addTransaction: (transaction: Transaction): AppAction => ({
    type: 'ADD_TRANSACTION',
    payload: transaction
  }),

  /**
   * Update user account balance
   */
  updateUserBalance: (balance: number): AppAction => ({
    type: 'UPDATE_USER_BALANCE',
    payload: balance
  }),

  /**
   * Set payment methods
   */
  setPaymentMethods: (paymentMethods: PaymentMethod[]): AppAction => ({
    type: 'SET_PAYMENT_METHODS',
    payload: paymentMethods
  }),

  /**
   * Reset entire app state
   */
  resetState: (): AppAction => ({
    type: 'RESET_STATE'
  })
};

// ============================================================================
// Higher-Order Component for Authentication
// ============================================================================

/**
 * Higher-order component that provides authentication state to wrapped components
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { state } = useAppContext();
    
    return (
      <Component 
        {...props} 
        isAuthenticated={state.isAuthenticated}
        user={state.user}
      />
    );
  };
};

// ============================================================================
// Selectors (Helper Functions for State Access)
// ============================================================================

/**
 * Selector functions for accessing specific parts of the state
 */
export const selectors = {
  /**
   * Get authentication status
   */
  isAuthenticated: (state: AppState): boolean => state.isAuthenticated,

  /**
   * Get initialization status
   */
  isInitialized: (state: AppState): boolean => state.isInitialized,

  /**
   * Get current user
   */
  getCurrentUser: (state: AppState): User | null => state.user,

  /**
   * Get loading state
   */
  getLoadingState: (state: AppState): { isLoading: boolean; message: string } => ({
    isLoading: state.isLoading,
    message: state.loadingMessage
  }),

  /**
   * Get current screen
   */
  getCurrentScreen: (state: AppState): ScreenType => state.currentScreen,

  /**
   * Get navigation history
   */
  getNavigationHistory: (state: AppState): ScreenType[] => state.navigationHistory,

  /**
   * Get all transactions
   */
  getTransactions: (state: AppState): Transaction[] => state.transactions,

  /**
   * Get recent transactions
   */
  getRecentTransactions: (state: AppState, count: number = 5): Transaction[] => 
    state.transactions.slice(0, count),

  /**
   * Get transactions by type
   */
  getTransactionsByType: (state: AppState, type: Transaction['type']): Transaction[] =>
    state.transactions.filter(transaction => transaction.type === type),

  /**
   * Get payment methods
   */
  getPaymentMethods: (state: AppState): PaymentMethod[] => state.paymentMethods,

  /**
   * Get default payment method
   */
  getDefaultPaymentMethod: (state: AppState): PaymentMethod | undefined =>
    state.paymentMethods.find(method => method.isDefault),

  /**
   * Get account balance from user
   */
  getAccountBalance: (state: AppState): number => state.user?.accountBalance || 0,

  /**
   * Check if user can go back in navigation
   */
  canGoBack: (state: AppState): boolean => state.navigationHistory.length > 0
};

export default AppContext;