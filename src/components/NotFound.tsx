import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import useNavigationWithLoading from '../hooks/useNavigationWithLoading';
import { useAppContext, selectors } from '../context';
import '../screens/screens.css';

/**
 * NotFound Component
 * 
 * Enhanced fallback component for invalid routes with intelligent error handling.
 * Provides navigation back to safe screens based on authentication status.
 * Includes automatic fallback navigation and error recovery.
 * 
 * Requirements: 4.5
 */
const NotFound: React.FC = () => {
  const { navigateWithLoading } = useNavigationWithLoading();
  const { state } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAuthenticated = selectors.isAuthenticated(state);
  
  /**
   * Automatic fallback navigation after a delay
   */
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      const fallbackPath = isAuthenticated ? `/${ScreenType.DASHBOARD}` : `/${ScreenType.LOGIN}`;
      navigateWithLoading(fallbackPath, 'Redirecting to safe location...');
    }, 5000); // 5 second delay before auto-redirect

    return () => clearTimeout(fallbackTimer);
  }, [isAuthenticated, navigateWithLoading]);
  
  /**
   * Navigate to dashboard (authenticated users)
   */
  const handleGoToDashboard = () => {
    navigateWithLoading(`/${ScreenType.DASHBOARD}`, 'Redirecting to Dashboard...');
  };
  
  /**
   * Navigate to login (unauthenticated users or as fallback)
   */
  const handleGoToLogin = () => {
    navigateWithLoading(`/${ScreenType.LOGIN}`, 'Redirecting to Login...');
  };

  /**
   * Navigate to splash screen (fresh start)
   */
  const handleGoToSplash = () => {
    navigateWithLoading(`/${ScreenType.SPLASH}`, 'Restarting app...');
  };

  /**
   * Emergency fallback - reload the entire app
   */
  const handleReloadApp = () => {
    try {
      window.location.href = '/';
    } catch (error) {
      // Last resort: force page reload
      window.location.reload();
    }
  };

  /**
   * Get appropriate primary action based on authentication status
   */
  const getPrimaryAction = () => {
    if (isAuthenticated) {
      return {
        label: 'Go to Dashboard',
        action: handleGoToDashboard,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9,22 9,12 15,12 15,22"></polyline>
          </svg>
        )
      };
    } else {
      return {
        label: 'Go to Login',
        action: handleGoToLogin,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10,17 15,12 10,7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
        )
      };
    }
  };

  const primaryAction = getPrimaryAction();
  
  return (
    <div className="screen not-found-screen">
      <div className="not-found-content">
        {/* Error Icon */}
        <div className="not-found-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>

        {/* Error Message */}
        <h1>Page Not Found</h1>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Current Path Info */}
        <div className="not-found-details">
          <p className="attempted-path">
            <strong>Attempted path:</strong> <code>{location.pathname}</code>
          </p>
          <p className="auto-redirect-info">
            You'll be automatically redirected in 5 seconds...
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="not-found-actions">
          {/* Primary Action */}
          <button 
            onClick={primaryAction.action}
            className="btn btn-primary"
            aria-label={primaryAction.label}
          >
            {primaryAction.icon}
            {primaryAction.label}
          </button>
          
          {/* Secondary Actions */}
          <div className="secondary-actions">
            {isAuthenticated ? (
              <button 
                onClick={handleGoToLogin}
                className="btn btn-secondary"
                aria-label="Go to Login"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10,17 15,12 10,7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Go to Login
              </button>
            ) : (
              <button 
                onClick={handleGoToDashboard}
                className="btn btn-secondary"
                aria-label="Go to Dashboard"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                Go to Dashboard
              </button>
            )}
            
            <button 
              onClick={handleGoToSplash}
              className="btn btn-outline"
              aria-label="Restart app"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23,4 23,10 17,10"></polyline>
                <polyline points="1,20 1,14 7,14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
              Restart App
            </button>
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="emergency-actions">
          <p className="emergency-text">
            Still having trouble?
          </p>
          <button 
            onClick={handleReloadApp}
            className="btn btn-danger btn-sm"
            aria-label="Reload entire app"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="1,4 1,10 7,10"></polyline>
              <polyline points="23,20 23,14 17,14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            Reload App
          </button>
        </div>

        {/* Help Information */}
        <div className="not-found-help">
          <details className="help-details">
            <summary>What can I do?</summary>
            <div className="help-content">
              <ul>
                <li>Use the navigation buttons above to go to a valid page</li>
                <li>Check if you typed the URL correctly</li>
                <li>Try refreshing the page</li>
                <li>If the problem persists, restart the app</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default NotFound;