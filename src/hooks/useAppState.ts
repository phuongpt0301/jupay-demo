/**
 * App State Hook for JuPay Mobile Demo
 * 
 * Custom hook that provides convenient access to global app state
 * and common state operations for components.
 * 
 * Requirements: 4.4, 6.4
 */

import { useCallback } from 'react';
import { useAppContext, appActions, selectors } from '../context';
import type { 
  Transaction, 
  PaymentMethod, 
  ScreenType, 
  User 
} from '../types';

/**
 * App state hook interface
 */
export interface UseAppStateReturn {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  accountBalance: number;
  
  // Loading state
  isLoading: boolean;
  loadingMessage: string;
  
  // Navigation state
  currentScreen: ScreenType;
  navigationHistory: ScreenType[];
  canGoBack: boolean;
  
  // Transaction state
  transactions: Transaction[];
  recentTransactions: Transaction[];
  
  // Payment methods
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod: PaymentMethod | undefined;
  
  // Actions
  setLoading: (isLoading: boolean, message?: string) => void;
  addTransaction: (transaction: Transaction) => void;
  updateUserBalance: (balance: number) => void;
  setCurrentScreen: (screen: ScreenType) => void;
  addToNavigationHistory: (screen: ScreenType) => void;
  goBack: () => void;
  resetAppState: () => void;
  
  // Utilities
  getTransactionsByType: (type: Transaction['type']) => Transaction[];
  getRecentTransactions: (count?: number) => Transaction[];
}

/**
 * Custom hook for app state management
 */
export const useAppState = (): UseAppStateReturn => {
  const { state, dispatch } = useAppContext();

  // Derived state using selectors
  const user = selectors.getCurrentUser(state);
  const isAuthenticated = selectors.isAuthenticated(state);
  const accountBalance = selectors.getAccountBalance(state);
  const { isLoading, message: loadingMessage } = selectors.getLoadingState(state);
  const currentScreen = selectors.getCurrentScreen(state);
  const navigationHistory = selectors.getNavigationHistory(state);
  const canGoBack = selectors.canGoBack(state);
  const transactions = selectors.getTransactions(state);
  const recentTransactions = selectors.getRecentTransactions(state);
  const paymentMethods = selectors.getPaymentMethods(state);
  const defaultPaymentMethod = selectors.getDefaultPaymentMethod(state);

  // Action creators
  const setLoading = useCallback((isLoading: boolean, message?: string) => {
    dispatch(appActions.setLoading(isLoading, message));
  }, [dispatch]);

  const addTransaction = useCallback((transaction: Transaction) => {
    dispatch(appActions.addTransaction(transaction));
  }, [dispatch]);

  const updateUserBalance = useCallback((balance: number) => {
    dispatch(appActions.updateUserBalance(balance));
  }, [dispatch]);

  const setCurrentScreen = useCallback((screen: ScreenType) => {
    dispatch(appActions.setCurrentScreen(screen));
  }, [dispatch]);

  const addToNavigationHistory = useCallback((screen: ScreenType) => {
    dispatch(appActions.addToHistory(screen));
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch(appActions.goBack());
  }, [dispatch]);

  const resetAppState = useCallback(() => {
    dispatch(appActions.resetState());
  }, [dispatch]);

  // Utility functions
  const getTransactionsByType = useCallback((type: Transaction['type']): Transaction[] => {
    return selectors.getTransactionsByType(state, type);
  }, [state]);

  const getRecentTransactions = useCallback((count: number = 5): Transaction[] => {
    return selectors.getRecentTransactions(state, count);
  }, [state]);

  return {
    // User state
    user,
    isAuthenticated,
    accountBalance,
    
    // Loading state
    isLoading,
    loadingMessage,
    
    // Navigation state
    currentScreen,
    navigationHistory,
    canGoBack,
    
    // Transaction state
    transactions,
    recentTransactions,
    
    // Payment methods
    paymentMethods,
    defaultPaymentMethod,
    
    // Actions
    setLoading,
    addTransaction,
    updateUserBalance,
    setCurrentScreen,
    addToNavigationHistory,
    goBack,
    resetAppState,
    
    // Utilities
    getTransactionsByType,
    getRecentTransactions
  };
};

export default useAppState;