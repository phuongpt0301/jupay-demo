/**
 * Authentication Hook for JuPay Mobile Demo
 * 
 * Custom hook that provides authentication-related functionality
 * including login, logout, and authentication state management.
 * 
 * Requirements: 4.4, 6.4
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, appActions, selectors } from '../context';
import { demoDataService } from '../services/demoDataService';
import { ScreenType, type LoginCredentials, type User } from '../types';

/**
 * Authentication hook interface
 */
export interface UseAuthReturn {
  // State
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  refreshUserData: () => void;
  
  // Utilities
  checkAuthStatus: () => boolean;
  requireAuth: () => boolean;
}

/**
 * Custom hook for authentication operations
 */
export const useAuth = (): UseAuthReturn => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  // Get authentication state from global context
  const isAuthenticated = selectors.isAuthenticated(state);
  const user = selectors.getCurrentUser(state);
  const { isLoading } = selectors.getLoadingState(state);

  /**
   * Login function
   * Validates credentials and sets user in global state
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Set loading state
      dispatch(appActions.setLoading(true, 'Authenticating...'));

      // Validate credentials using demo data service
      const isValid = demoDataService.validateCredentials(credentials);
      
      if (!isValid) {
        dispatch(appActions.setLoading(false));
        return false;
      }

      // Get demo user data
      const userData = demoDataService.getDemoUser();
      
      // Set user in global state (this will mark as authenticated)
      dispatch(appActions.setUser(userData));
      
      // Load user's data
      const transactions = demoDataService.getDemoTransactions();
      const paymentMethods = demoDataService.getDemoPaymentMethods();
      
      dispatch(appActions.setTransactions(transactions));
      dispatch(appActions.setPaymentMethods(paymentMethods));
      
      dispatch(appActions.setLoading(false));
      return true;
      
    } catch (error) {
      console.error('Login error:', error);
      dispatch(appActions.setLoading(false));
      return false;
    }
  }, [dispatch]);

  /**
   * Logout function
   * Clears user data and redirects to login
   */
  const logout = useCallback(() => {
    // Clear user data from global state
    dispatch(appActions.clearUser());
    
    // Clear any loading states
    dispatch(appActions.setLoading(false));
    
    // Reset demo data
    demoDataService.resetDemoData();
    
    // Navigate to login screen
    navigate(`/${ScreenType.LOGIN}`, { replace: true });
  }, [dispatch, navigate]);

  /**
   * Refresh user data
   * Reloads transactions, payment methods, and user balance from demo service
   */
  const refreshUserData = useCallback(() => {
    if (!isAuthenticated) return;
    
    try {
      const transactions = demoDataService.getDemoTransactions();
      const paymentMethods = demoDataService.getDemoPaymentMethods();
      const updatedBalance = demoDataService.getAccountBalance();
      
      dispatch(appActions.setTransactions(transactions));
      dispatch(appActions.setPaymentMethods(paymentMethods));
      dispatch(appActions.updateUserBalance(updatedBalance));
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  }, [isAuthenticated, dispatch]);

  /**
   * Check authentication status
   * Returns current authentication state
   */
  const checkAuthStatus = useCallback((): boolean => {
    return isAuthenticated;
  }, [isAuthenticated]);

  /**
   * Require authentication
   * Redirects to login if not authenticated
   */
  const requireAuth = useCallback((): boolean => {
    if (!isAuthenticated) {
      navigate(`/${ScreenType.LOGIN}`, { replace: true });
      return false;
    }
    return true;
  }, [isAuthenticated, navigate]);

  return {
    // State
    isAuthenticated,
    user,
    isLoading,
    
    // Actions
    login,
    logout,
    refreshUserData,
    
    // Utilities
    checkAuthStatus,
    requireAuth
  };
};

export default useAuth;