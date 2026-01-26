import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { NavigationHook, ScreenType } from '../types';
import { ScreenType as ScreenTypeEnum } from '../types';

/**
 * Custom hook for navigation with loading states
 * 
 * Integrates with React Router to provide navigation with mandatory 3-second loading delays.
 * Includes navigation history tracking, interaction blocking during transitions, and error handling.
 * 
 * Requirements: 2.2, 2.3, 4.4, 4.5
 */
export const useNavigationWithLoading = (): NavigationHook => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [navigationError, setNavigationError] = useState<string | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);

  /**
   * Validate if a path is a valid route
   */
  const isValidRoute = useCallback((path: string): boolean => {
    const validRoutes = Object.values(ScreenTypeEnum).map(screen => `/${screen}`);
    validRoutes.push('/'); // Root route
    
    // Remove query parameters and fragments for validation
    const cleanPath = path.split('?')[0].split('#')[0];
    return validRoutes.includes(cleanPath);
  }, []);

  /**
   * Get fallback route for invalid navigation
   */
  const getFallbackRoute = useCallback((): string => {
    // If user is authenticated, fallback to dashboard, otherwise login
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? `/${ScreenTypeEnum.DASHBOARD}` : `/${ScreenTypeEnum.LOGIN}`;
  }, []);

  /**
   * Handle navigation errors gracefully
   */
  const handleNavigationError = useCallback((error: Error, targetPath: string) => {
    console.error('Navigation error:', error, 'Target path:', targetPath);
    setNavigationError(`Navigation failed: ${error.message}`);
    
    // Clear error after 5 seconds
    setTimeout(() => setNavigationError(null), 2000);
    
    // Fallback to safe route
    const fallbackPath = getFallbackRoute();
    if (targetPath !== fallbackPath) {
      setTimeout(() => {
        try {
          navigate(fallbackPath, { replace: true });
        } catch (fallbackError) {
          console.error('Fallback navigation also failed:', fallbackError);
          // Last resort: reload the page
          window.location.href = fallbackPath;
        }
      }, 500);
    }
  }, [navigate, getFallbackRoute]);

  /**
   * Navigate to a new path with loading state and error handling
   * @param path - The target path to navigate to
   * @param loadingMessage - Optional loading message to display
   * @param onLoadingError - Optional callback for loading errors
   */
  const navigateWithLoading = useCallback((
    path: string, 
    loadingMessage?: string, 
    onLoadingError?: (error: Error) => void
  ) => {
    // Prevent navigation if already loading
    if (isLoading) {
      console.warn('Navigation blocked: already loading');
      return;
    }

    // Validate the target path
    if (!isValidRoute(path)) {
      console.warn('Invalid route attempted:', path);
      const fallbackPath = getFallbackRoute();
      if (path !== fallbackPath) {
        navigateWithLoading(fallbackPath, 'Redirecting to safe location...');
      }
      return;
    }

    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
    }

    // Clear any previous navigation errors
    setNavigationError(null);

    // Start loading state
    setIsLoading(true);

    // Add current path to navigation history if it's different from the target
    if (location.pathname !== path) {
      setNavigationHistory(prev => {
        const newHistory = [...prev];
        // Only add if it's not already the last item in history
        if (newHistory[newHistory.length - 1] !== location.pathname) {
          newHistory.push(location.pathname);
        }
        // Keep history limited to prevent memory issues (max 50 entries)
        return newHistory.slice(-50);
      });
    }

    // Set 3-second loading delay as per requirements
    loadingTimeoutRef.current = window.setTimeout(() => {
      try {
        setIsLoading(false);
        navigate(path);
        loadingTimeoutRef.current = null;
      } catch (error) {
        setIsLoading(false);
        loadingTimeoutRef.current = null;
        const navigationError = error as Error;
        
        // Call loading error callback if provided
        if (onLoadingError) {
          onLoadingError(navigationError);
        }
        
        handleNavigationError(navigationError, path);
      }
    }, 3000);
  }, [isLoading, location.pathname, navigate, isValidRoute, getFallbackRoute, handleNavigationError]);

  /**
   * Navigate back to previous page with loading state and error handling
   */
  const goBack = useCallback(() => {
    if (isLoading) {
      console.warn('Back navigation blocked: already loading');
      return;
    }

    try {
      // Get the last path from history
      const lastPath = navigationHistory[navigationHistory.length - 1];
      
      if (lastPath && isValidRoute(lastPath)) {
        // Remove the last path from history
        setNavigationHistory(prev => prev.slice(0, -1));
        navigateWithLoading(lastPath);
      } else {
        // Fallback to browser back or safe route
        try {
          navigate(-1);
        } catch (error) {
          console.warn('Browser back failed, using fallback route');
          const fallbackPath = getFallbackRoute();
          navigateWithLoading(fallbackPath);
        }
      }
    } catch (error) {
      handleNavigationError(error as Error, 'back navigation');
    }
  }, [isLoading, navigationHistory, navigateWithLoading, navigate, isValidRoute, getFallbackRoute, handleNavigationError]);

  /**
   * Get current navigation path
   */
  const currentPath = location.pathname;

  /**
   * Check if navigation is currently blocked
   */
  const isNavigationBlocked = isLoading;

  /**
   * Get navigation history
   */
  const getNavigationHistory = useCallback(() => {
    return [...navigationHistory];
  }, [navigationHistory]);

  /**
   * Clear navigation history
   */
  const clearNavigationHistory = useCallback(() => {
    setNavigationHistory([]);
  }, []);

  /**
   * Cancel current loading navigation
   */
  const cancelNavigation = useCallback(() => {
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
      setIsLoading(false);
    }
  }, []);

  /**
   * Cleanup timeout on unmount
   */
  const cleanup = useCallback(() => {
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  }, []);

  /**
   * Handle browser navigation events (back/forward buttons)
   */
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If we're currently loading, cancel it
      if (isLoading) {
        cancelNavigation();
      }
      
      // Validate the current location after browser navigation
      if (!isValidRoute(location.pathname)) {
        const fallbackPath = getFallbackRoute();
        navigate(fallbackPath, { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoading, location.pathname, navigate, cancelNavigation, isValidRoute, getFallbackRoute]);

  /**
   * Validate current route on mount and location changes
   */
  useEffect(() => {
    if (!isValidRoute(location.pathname)) {
      console.warn('Invalid route detected on mount:', location.pathname);
      const fallbackPath = getFallbackRoute();
      navigate(fallbackPath, { replace: true });
    }
  }, [location.pathname, navigate, isValidRoute, getFallbackRoute]);

  // Return the hook interface
  return {
    navigateWithLoading,
    isLoading,
    currentPath,
    // Additional utilities
    goBack,
    isNavigationBlocked,
    getNavigationHistory,
    clearNavigationHistory,
    cancelNavigation,
    cleanup,
    // Error handling
    navigationError
  };
};

export default useNavigationWithLoading;